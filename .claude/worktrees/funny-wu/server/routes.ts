import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import Razorpay from "razorpay";
import crypto from "crypto";
import { donationRequestSchema } from "@shared/schema";
import { generateDonationReceipt } from "./receipt-generator";
import { 
  submitVolunteerForm, 
  submitCorporatePartnership, 
  submitContactMessage, 
  submitDonation as submitDonationToSheets,
  submitCEOContact,
  getSpreadsheetUrl 
} from "./googleSheets";

function getRazorpayInstance() {
  const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
  const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!razorpayKeyId || !razorpayKeySecret) {
    throw new Error("Razorpay credentials not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.");
  }

  return new Razorpay({
    key_id: razorpayKeyId,
    key_secret: razorpayKeySecret,
  });
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Health check endpoint for debugging production
  app.get("/api/health", async (req, res) => {
    const databaseUrl = process.env.DATABASE_URL || '';
    const neonUrl = process.env.NEON_DATABASE_URL || '';
    const isHeliumProxy = databaseUrl.includes('@helium/') || databaseUrl.includes('@helium:');
    const isProduction = process.env.NODE_ENV === 'production';
    
    // Extract hostname from URL for debugging (without exposing credentials)
    let neonHost = 'not_set';
    if (neonUrl) {
      try {
        const url = new URL(neonUrl);
        neonHost = url.hostname;
      } catch {
        neonHost = 'invalid_url';
      }
    }
    
    const health = {
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      database: {
        isHeliumProxy,
        pgHost: process.env.PGHOST ? (process.env.PGHOST === 'helium' ? 'helium' : 'external') : 'not_set',
        pgPort: process.env.PGPORT || 'not_set',
        neonConfigured: !!neonUrl,
        neonHost: neonHost,
        usingNeon: isProduction && !!neonUrl,
      },
      razorpay: {
        keyConfigured: !!process.env.RAZORPAY_KEY_ID,
      }
    };
    
    // Test database connection
    try {
      const result = await storage.getDonation('test-health-check');
      health.status = "ok";
    } catch (error: any) {
      if (error.message?.includes('not found')) {
        health.status = "ok";
      } else {
        health.status = "db_error";
        (health as any).dbError = error.message;
      }
    }
    
    res.json(health);
  });

  // Create Razorpay Order (one-time) or Subscription (monthly)
  app.post("/api/donations/create-order", async (req, res) => {
    try {
      console.log("Received donation request:", req.body);
      const donationData = donationRequestSchema.parse(req.body);
      console.log("Parsed donation data:", donationData);
      
      // Get Razorpay instance
      const razorpay = getRazorpayInstance();
      console.log("Razorpay instance created");

      // Check if this is a monthly subscription or one-time donation
      if (donationData.donationType === "monthly") {
        // SUBSCRIPTION FLOW
        console.log("Creating monthly subscription...");
        
        // Step 1: Create a plan dynamically for this amount
        const planData = {
          period: "monthly" as const,
          interval: 1,
          item: {
            name: `Monthly Donation - ₹${donationData.amount}`,
            amount: donationData.amount * 100, // amount in paise
            currency: "INR",
            description: `Monthly recurring donation of ₹${donationData.amount} to HUManity Foundation`,
          },
        };

        console.log("Creating Razorpay plan:", planData);
        const plan = await razorpay.plans.create(planData) as any;
        console.log("Razorpay plan created:", plan);

        if (!plan || !plan.id) {
          throw new Error("Failed to create Razorpay plan");
        }

        // Step 2: Create a subscription with the plan
        const subscriptionData = {
          plan_id: plan.id,
          total_count: 120, // 10 years of monthly payments
          quantity: 1,
          customer_notify: 1 as const,
          notes: {
            donor_name: donationData.name,
            donor_email: donationData.email,
            donor_phone: donationData.phone,
          },
        };

        console.log("Creating Razorpay subscription:", subscriptionData);
        const subscription = await razorpay.subscriptions.create(subscriptionData as any) as any;
        console.log("Razorpay subscription created:", subscription);

        if (!subscription || !subscription.id) {
          throw new Error("Failed to create Razorpay subscription");
        }

        // Store donation in database with subscription details
        console.log("Storing subscription donation in database...");
        const donation = await storage.createDonation({
          ...donationData,
          razorpaySubscriptionId: subscription.id,
          razorpayPlanId: plan.id,
          status: "pending",
        });
        console.log("Subscription donation stored:", donation);

        if (!donation || !donation.id) {
          throw new Error("Failed to store donation in database");
        }

        res.json({
          success: true,
          isSubscription: true,
          subscriptionId: subscription.id,
          amount: donationData.amount * 100,
          currency: "INR",
          donationId: donation.id,
          razorpayKeyId: process.env.RAZORPAY_KEY_ID,
        });

      } else {
        // ONE-TIME PAYMENT FLOW
        const options = {
          amount: donationData.amount * 100, // amount in paisa
          currency: "INR",
          receipt: `receipt_${Date.now()}`,
        };

        console.log("Creating Razorpay order with options:", options);
        const order = await razorpay.orders.create(options);
        console.log("Razorpay order created:", order);
        
        if (!order || !order.id) {
          throw new Error("Failed to create Razorpay order - no order ID returned");
        }
        
        // Store donation in database with pending status
        console.log("Storing donation in database...");
        const donation = await storage.createDonation({
          ...donationData,
          razorpayOrderId: order.id,
          status: "pending",
        });
        console.log("Donation stored:", donation);
        
        if (!donation || !donation.id) {
          throw new Error("Failed to store donation in database");
        }

        res.json({
          success: true,
          isSubscription: false,
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
          donationId: donation.id,
          razorpayKeyId: process.env.RAZORPAY_KEY_ID,
        });
      }
    } catch (error: any) {
      console.error("Error creating order:", error);
      console.error("Full error details:", JSON.stringify(error, null, 2));
      res.status(400).json({ 
        success: false, 
        error: error.message || "Failed to create order" 
      });
    }
  });

  // Verify Payment
  app.post("/api/donations/verify-payment", async (req, res) => {
    try {
      console.log("Received payment verification request:", req.body);
      
      const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
      if (!razorpayKeySecret) {
        throw new Error("Razorpay secret not configured");
      }

      const { 
        razorpay_order_id, 
        razorpay_payment_id, 
        razorpay_signature,
        donation_id 
      } = req.body;

      console.log("Verifying payment:", { razorpay_order_id, razorpay_payment_id, donation_id });

      // Verify signature
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", razorpayKeySecret)
        .update(body.toString())
        .digest("hex");

      const isAuthentic = expectedSignature === razorpay_signature;
      console.log("Signature verification:", { isAuthentic });

      if (isAuthentic) {
        // Update donation status
        const donation = await storage.updateDonationPayment(donation_id, {
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          status: "completed",
        });

        // Save to Google Sheets
        if (donation) {
          try {
            await submitDonationToSheets({
              name: donation.name,
              email: donation.email,
              phone: donation.phone,
              amount: donation.amount,
              idType: donation.idType,
              idNumber: donation.idNumber,
              paymentId: razorpay_payment_id,
              orderId: razorpay_order_id,
            });
          } catch (sheetError) {
            console.error("Error saving to Google Sheets:", sheetError);
            // Don't fail the payment verification if sheets fails
          }
        }

        res.json({
          success: true,
          message: "Payment verified successfully",
          donation,
          receiptUrl: `/api/donations/${donation_id}/receipt`,
        });
      } else {
        // Update as failed
        await storage.updateDonationPayment(donation_id, {
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          status: "failed",
        });

        res.status(400).json({
          success: false,
          message: "Payment verification failed",
        });
      }
    } catch (error: any) {
      console.error("Error verifying payment:", error);
      res.status(400).json({ 
        success: false, 
        error: error.message || "Failed to verify payment" 
      });
    }
  });

  // Verify Subscription Payment
  app.post("/api/donations/verify-subscription", async (req, res) => {
    try {
      console.log("Received subscription verification request:", req.body);
      
      const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
      if (!razorpayKeySecret) {
        throw new Error("Razorpay secret not configured");
      }

      const { 
        razorpay_subscription_id, 
        razorpay_payment_id, 
        razorpay_signature,
        donation_id 
      } = req.body;

      console.log("Verifying subscription:", { razorpay_subscription_id, razorpay_payment_id, donation_id });

      // Verify signature for subscription: payment_id|subscription_id
      const body = razorpay_payment_id + "|" + razorpay_subscription_id;
      const expectedSignature = crypto
        .createHmac("sha256", razorpayKeySecret)
        .update(body.toString())
        .digest("hex");

      const isAuthentic = expectedSignature === razorpay_signature;
      console.log("Subscription signature verification:", { isAuthentic });

      if (isAuthentic) {
        // Update donation status
        const donation = await storage.updateDonationPayment(donation_id, {
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          status: "completed",
        });

        // Save to Google Sheets
        if (donation) {
          try {
            await submitDonationToSheets({
              name: donation.name,
              email: donation.email,
              phone: donation.phone,
              amount: donation.amount,
              idType: donation.idType,
              idNumber: donation.idNumber,
              paymentId: razorpay_payment_id,
              orderId: razorpay_subscription_id,
            });
          } catch (sheetError) {
            console.error("Error saving to Google Sheets:", sheetError);
          }
        }

        res.json({
          success: true,
          message: "Subscription verified successfully",
          donation,
          receiptUrl: `/api/donations/${donation_id}/receipt`,
        });
      } else {
        // Update as failed
        await storage.updateDonationPayment(donation_id, {
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          status: "failed",
        });

        res.status(400).json({
          success: false,
          message: "Subscription verification failed",
        });
      }
    } catch (error: any) {
      console.error("Error verifying subscription:", error);
      res.status(400).json({ 
        success: false, 
        error: error.message || "Failed to verify subscription" 
      });
    }
  });

  // Get Google Sheet URL
  app.get("/api/sheets/url", async (req, res) => {
    try {
      const url = await getSpreadsheetUrl();
      res.json({ success: true, url });
    } catch (error: any) {
      console.error("Error getting sheet URL:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Volunteer Form Submission
  app.post("/api/forms/volunteer", async (req, res) => {
    try {
      const schema = z.object({
        firstName: z.string().min(2),
        lastName: z.string().min(2),
        email: z.string().email(),
        phone: z.string().min(10),
        city: z.string().min(2),
        dob: z.string().min(1),
        occupation: z.string().min(2),
        volunteerType: z.array(z.string()).min(1),
        projects: z.array(z.string()).min(1),
      });
      
      const data = schema.parse(req.body);
      await submitVolunteerForm(data);
      res.json({ success: true, message: "Volunteer application submitted successfully" });
    } catch (error: any) {
      console.error("Error submitting volunteer form:", error);
      res.status(400).json({ success: false, error: error.message });
    }
  });

  // Corporate Partnership Form Submission
  app.post("/api/forms/corporate", async (req, res) => {
    try {
      const schema = z.object({
        pocName: z.string().min(2),
        companyName: z.string().min(2),
        email: z.string().email(),
        phone: z.string().min(10),
        interest: z.array(z.string()).min(1),
        engagementType: z.string(),
        locationType: z.string(),
        existingLocation: z.string().optional(),
        customLocation: z.string().optional(),
        expectedEmployees: z.string().min(1),
        additionalNotes: z.string().optional(),
      });
      
      const data = schema.parse(req.body);
      await submitCorporatePartnership(data);
      res.json({ success: true, message: "Partnership inquiry submitted successfully" });
    } catch (error: any) {
      console.error("Error submitting corporate form:", error);
      res.status(400).json({ success: false, error: error.message });
    }
  });

  // Contact Form Submission
  app.post("/api/forms/contact", async (req, res) => {
    try {
      const schema = z.object({
        name: z.string().min(2),
        email: z.string().email(),
        subject: z.string().min(2),
        message: z.string().min(10),
      });
      
      const data = schema.parse(req.body);
      await submitContactMessage(data);
      res.json({ success: true, message: "Message sent successfully" });
    } catch (error: any) {
      console.error("Error submitting contact form:", error);
      res.status(400).json({ success: false, error: error.message });
    }
  });

  // Partnership Inquiry Form (for both CCI and Schools-AI Programs)
  app.post("/api/partnership-inquiry", async (req, res) => {
    try {
      const schema = z.object({
        projectInterest: z.string().min(1),
        partnershipType: z.string().min(1),
        name: z.string().min(2),
        email: z.string().email(),
        phone: z.string().min(10),
        company: z.string().min(2),
        city: z.string().min(2),
        numberOfSchools: z.string().min(1),
        message: z.string().optional(),
      });
      
      const data = schema.parse(req.body);
      
      // Submit to Google Sheets using the contact message function
      await submitContactMessage({
        name: data.name,
        email: data.email,
        subject: `[Partnership Inquiry] ${data.projectInterest} - ${data.partnershipType} - ${data.company}`,
        message: `Project Interest: ${data.projectInterest}\nPartnership Type: ${data.partnershipType}\nCompany: ${data.company}\nPhone: ${data.phone}\nTarget City: ${data.city}\nNumber of Schools/CCIs: ${data.numberOfSchools}\n\nMessage: ${data.message || 'N/A'}`
      });
      
      res.json({ success: true, message: "Partnership inquiry submitted successfully" });
    } catch (error: any) {
      console.error("Error submitting partnership inquiry:", error);
      res.status(400).json({ success: false, error: error.message });
    }
  });

  // CEO Contact Form submission
  app.post("/api/contact-ceo", async (req, res) => {
    try {
      const schema = z.object({
        name: z.string().min(1, "Name is required"),
        phone: z.string().min(10, "Please enter a valid phone number"),
        company: z.string().min(1, "Company name is required"),
        designation: z.string().optional(),
        message: z.string().optional(),
      });
      
      const data = schema.parse(req.body);
      
      await submitCEOContact(data);
      
      res.json({ success: true, message: "Your message has been received. Expect a response within 24 hours." });
    } catch (error: any) {
      console.error("Error submitting CEO contact form:", error);
      
      // Extract user-friendly error message from Zod validation errors
      if (error.errors && Array.isArray(error.errors)) {
        const firstError = error.errors[0];
        const friendlyMessage = firstError?.message || "Please check your form inputs";
        return res.status(400).json({ success: false, error: friendlyMessage });
      }
      
      res.status(400).json({ success: false, error: error.message || "Failed to submit form" });
    }
  });

  // Download Receipt
  app.get("/api/donations/:id/receipt", async (req, res) => {
    try {
      const { id } = req.params;
      const donation = await storage.getDonation(id);
      
      if (!donation) {
        return res.status(404).json({ success: false, error: "Donation not found" });
      }
      
      if (donation.status !== "completed") {
        return res.status(400).json({ success: false, error: "Payment not completed" });
      }
      
      const receiptBuffer = await generateDonationReceipt(donation);
      const receiptNo = `HUM-${new Date(donation.createdAt).getFullYear()}-${donation.id.slice(0, 8).toUpperCase()}`;
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="receipt-${receiptNo}.pdf"`);
      res.send(receiptBuffer);
    } catch (error: any) {
      console.error("Error generating receipt:", error);
      res.status(500).json({ 
        success: false, 
        error: error.message || "Failed to generate receipt" 
      });
    }
  });

  return httpServer;
}
