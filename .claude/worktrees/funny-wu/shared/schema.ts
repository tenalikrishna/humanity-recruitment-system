import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const donations = pgTable("donations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  amount: integer("amount").notNull(),
  idType: text("id_type").notNull(),
  idNumber: text("id_number").notNull(),
  donationType: text("donation_type").notNull(),
  razorpayOrderId: text("razorpay_order_id"),
  razorpayPaymentId: text("razorpay_payment_id"),
  razorpaySignature: text("razorpay_signature"),
  razorpaySubscriptionId: text("razorpay_subscription_id"),
  razorpayPlanId: text("razorpay_plan_id"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Schema for API request (user-provided fields only)
export const donationRequestSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  amount: z.number().positive(),
  idType: z.string().min(1),
  idNumber: z.string().min(1),
  donationType: z.string().min(1),
});

export type DonationRequest = z.infer<typeof donationRequestSchema>;

// Schema for database insert (includes all fields)
export const insertDonationSchema = createInsertSchema(donations).omit({
  id: true,
  createdAt: true,
}).extend({
  amount: z.number().positive(),
  email: z.string().email(),
  phone: z.string().min(10),
});

export type InsertDonation = z.infer<typeof insertDonationSchema>;
export type Donation = typeof donations.$inferSelect;
