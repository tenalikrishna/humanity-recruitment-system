import { type User, type InsertUser, type Donation, type InsertDonation, users, donations } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import crypto from "crypto";

async function withRetry<T>(operation: () => Promise<T>, retries = 5, delay = 2000): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await operation();
    } catch (error: any) {
      const errorMessage = error.message || '';
      const errorCode = error.code || '';
      
      const isRetryable = errorCode === 'EAI_AGAIN' || 
                          errorMessage.includes('EAI_AGAIN') ||
                          errorMessage.includes('getaddrinfo') ||
                          errorCode === 'ECONNRESET' ||
                          errorCode === 'ETIMEDOUT' ||
                          errorCode === 'ENOTFOUND' ||
                          errorMessage.includes('Connection terminated') ||
                          errorMessage.includes('connection') ||
                          errorMessage.includes('socket');
      
      if (isRetryable && i < retries - 1) {
        const waitTime = delay * Math.pow(2, i);
        console.log(`Database operation failed (attempt ${i + 1}/${retries}): ${errorMessage}. Retrying in ${waitTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }
      console.error(`Database operation failed after ${i + 1} attempts:`, error);
      throw error;
    }
  }
  throw new Error("Max retries exceeded");
}

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createDonation(donation: InsertDonation): Promise<Donation>;
  updateDonationPayment(id: string, paymentDetails: {
    razorpayPaymentId: string;
    razorpaySignature: string;
    status: string;
  }): Promise<Donation | undefined>;
  getDonation(id: string): Promise<Donation | undefined>;
  getDonationByOrderId(orderId: string): Promise<Donation | undefined>;
  getAllDonations(): Promise<Donation[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    return withRetry(async () => {
      const result = await db.select().from(users).where(eq(users.id, id));
      return result[0];
    });
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return withRetry(async () => {
      const result = await db.select().from(users).where(eq(users.username, username));
      return result[0];
    });
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    return withRetry(async () => {
      const result = await db.insert(users).values(insertUser).returning();
      return result[0];
    });
  }

  async createDonation(donation: InsertDonation): Promise<Donation> {
    return withRetry(async () => {
      console.log("Creating donation with data:", donation);
      const id = crypto.randomUUID();
      const donationWithId = { ...donation, id };
      await db.insert(donations).values(donationWithId);
      const result = await db.select().from(donations).where(eq(donations.id, id));
      console.log("Insert result:", result);
      if (!result || result.length === 0) {
        throw new Error("Database insert returned empty result");
      }
      return result[0];
    });
  }

  async updateDonationPayment(
    id: string,
    paymentDetails: {
      razorpayPaymentId: string;
      razorpaySignature: string;
      status: string;
    }
  ): Promise<Donation | undefined> {
    return withRetry(async () => {
      await db
        .update(donations)
        .set(paymentDetails)
        .where(eq(donations.id, id));
      const result = await db.select().from(donations).where(eq(donations.id, id));
      return result[0];
    });
  }

  async getDonation(id: string): Promise<Donation | undefined> {
    return withRetry(async () => {
      const result = await db.select().from(donations).where(eq(donations.id, id));
      return result[0];
    });
  }

  async getDonationByOrderId(orderId: string): Promise<Donation | undefined> {
    return withRetry(async () => {
      const result = await db.select().from(donations).where(eq(donations.razorpayOrderId, orderId));
      return result[0];
    });
  }

  async getAllDonations(): Promise<Donation[]> {
    return withRetry(async () => {
      const result = await db.select().from(donations).orderBy(donations.createdAt);
      return result;
    });
  }
}

export const storage = new DatabaseStorage();
