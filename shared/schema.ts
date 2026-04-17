import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// ─── Recruitment Module ───────────────────────────────────────────────────────

export const adminUsers = pgTable("admin_users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull(), // 'admin' | 'core_team' | 'screener'
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = typeof adminUsers.$inferInsert;

export const applications = pgTable("applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  city: text("city"),
  programInterest: text("program_interest"),
  notes: text("notes"),
  status: text("status").notNull().default("pending"), // pending | assigned | interviewed | cleared | rejected
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Application = typeof applications.$inferSelect;
export type InsertApplication = typeof applications.$inferInsert;

export const assignments = pgTable("assignments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  applicationId: varchar("application_id").notNull().references(() => applications.id, { onDelete: "cascade" }),
  screenerId: varchar("screener_id").notNull().references(() => adminUsers.id),
  assignedById: varchar("assigned_by_id").notNull().references(() => adminUsers.id),
  assignedAt: timestamp("assigned_at").notNull().defaultNow(),
  status: text("status").notNull().default("pending"), // pending | completed
});

export type Assignment = typeof assignments.$inferSelect;
export type InsertAssignment = typeof assignments.$inferInsert;

export const teleInterviews = pgTable("tele_interviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  applicationId: varchar("application_id").notNull().references(() => applications.id, { onDelete: "cascade" }),
  conductedById: varchar("conducted_by_id").notNull().references(() => adminUsers.id),

  // Section 1: Intro + Background
  basicIntro: text("basic_intro"), // student | working_professional | other
  basicIntroOther: text("basic_intro_other"),
  basicIntroNotes: text("basic_intro_notes"),
  sourceOfApplication: text("source_of_application"), // friend_referral | instagram | linkedin | whatsapp | college_campus | other
  sourceOther: text("source_other"),
  intentToApply: text("intent_to_apply"), // clear_specific | generic | weak_unclear
  intentComment: text("intent_comment"),

  // Section 2: Purpose Setting
  candidateAligned: boolean("candidate_aligned"),

  // Section 3: Location & Mode
  currentLocation: text("current_location"), // hyderabad | visakhapatnam | other
  locationOther: text("location_other"),
  openToOnGround: boolean("open_to_on_ground"),
  onlyOnline: boolean("only_online"),
  willingToTravel: boolean("willing_to_travel"),

  // Section 4: Time Commitment
  confirmsWeeklyCommitment: text("confirms_weekly_commitment"), // confirmed | not_sure
  availabilityWeekdays: boolean("availability_weekdays"),
  availabilityWeekends: boolean("availability_weekends"),
  availabilityMorning: boolean("availability_morning"),
  availabilityAfternoon: boolean("availability_afternoon"),
  availabilityEvening: boolean("availability_evening"),

  // Section 5: Area Selection
  selectedAreas: text("selected_areas"), // JSON array string
  selectedAtLeast2Areas: boolean("selected_at_least_2_areas"),
  comfortableWithTravel: boolean("comfortable_with_travel"),
  areaComment: text("area_comment"),
  comfortableVisitingSchools: boolean("comfortable_visiting_schools"),
  comfortableVisitingCCIs: boolean("comfortable_visiting_ccis"),

  // Section 6: Commitment Duration
  commitmentDuration: text("commitment_duration"), // 3_months | 6_months | 1_year_plus

  // Section 7: Recruitment Day
  recruitmentDayAttendance: text("recruitment_day_attendance"), // yes | maybe | no

  // Section 8: WhatsApp Engagement
  agreesToBeActive: text("agrees_to_be_active"), // agrees | hesitant
  comfortableSharingContent: boolean("comfortable_sharing_content"),

  // Section 9: Reliability Signal
  hasLongTermCommitment: boolean("has_long_term_commitment"),
  reliabilityExample: text("reliability_example"),

  // Section 10: Final Confirmation
  finalConfirmation: text("final_confirmation"), // fully_confirmed | partial | not_confirmed

  // Section 11: Decision
  decision: text("decision"), // strong | maybe | reject

  // Section 12: Final Notes
  finalNotes: text("final_notes"),

  completedAt: timestamp("completed_at").notNull().defaultNow(),
});

export type TeleInterview = typeof teleInterviews.$inferSelect;
export type InsertTeleInterview = typeof teleInterviews.$inferInsert;

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
