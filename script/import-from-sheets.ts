import 'dotenv/config';
import { readSheet } from "../server/googleSheets";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { applications } from "../shared/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL not set");

const client = postgres(databaseUrl);
const db = drizzle(client);

async function run() {
  console.log("📥 Reading 'Volunteer Applications' sheet...");
  const rows = await readSheet("Volunteer Applications");

  if (rows.length === 0) {
    console.log("No data found in sheet.");
    await client.end();
    return;
  }

  // Skip header row if first cell looks like a header (not a date)
  const firstRow = rows[0];
  const startIndex = firstRow[0]?.toLowerCase().includes("time") || firstRow[0]?.toLowerCase().includes("date") ? 1 : 0;
  const dataRows = rows.slice(startIndex);

  console.log(`Found ${dataRows.length} rows (skipping ${startIndex} header row(s))`);

  // Fetch existing emails to skip duplicates
  const existing = await db.select({ email: applications.email }).from(applications);
  const existingEmails = new Set(existing.map(r => r.email.toLowerCase().trim()));

  let inserted = 0;
  let skipped = 0;

  for (const row of dataRows) {
    // Sheet columns (from submitVolunteerForm):
    // [0] timestamp, [1] firstName, [2] lastName, [3] email, [4] phone,
    // [5] city, [6] dob, [7] occupation, [8] volunteerType, [9] projects
    const [timestamp, firstName, lastName, email, phone, city, dob, occupation, volunteerType, projects] = row;

    if (!email) { skipped++; continue; }
    const normalizedEmail = email.toLowerCase().trim();
    if (existingEmails.has(normalizedEmail)) {
      console.log(`  ⏭  Skipping duplicate: ${normalizedEmail}`);
      skipped++;
      continue;
    }

    const name = [firstName, lastName].filter(Boolean).join(" ").trim() || "Unknown";
    const createdAt = timestamp ? new Date(timestamp) : new Date();

    await db.insert(applications).values({
      id: crypto.randomUUID(),
      name,
      email: normalizedEmail,
      phone: phone || "",
      city: city || null,
      programInterest: projects || null,
      notes: [
        occupation ? `Occupation: ${occupation}` : null,
        volunteerType ? `Type: ${volunteerType}` : null,
        dob ? `DOB: ${dob}` : null,
      ].filter(Boolean).join(" | ") || null,
      status: "pending",
      createdAt,
      updatedAt: createdAt,
    });

    existingEmails.add(normalizedEmail);
    console.log(`  ✅ Imported: ${name} (${normalizedEmail})`);
    inserted++;
  }

  console.log(`\nDone! Imported: ${inserted}, Skipped (duplicates/empty): ${skipped}`);
  await client.end();
}

run().catch(err => {
  console.error("❌ Import failed:", err.message);
  process.exit(1);
});
