import 'dotenv/config';
import postgres from "postgres";

const client = postgres(process.env.DATABASE_URL!);

const tables = await client`
  SELECT table_name,
         (SELECT count(*) FROM information_schema.columns c WHERE c.table_name = t.table_name) as col_count
  FROM information_schema.tables t
  WHERE table_schema = 'public'
  ORDER BY table_name
`;

console.log("\n📋 Tables in DB:");
for (const t of tables) {
  const rows = await client`SELECT count(*) as n FROM ${client(t.table_name)}`;
  console.log(`  ${t.table_name} — ${rows[0].n} rows, ${t.col_count} columns`);
}

// Show columns for each table
for (const t of tables) {
  const cols = await client`
    SELECT column_name, data_type
    FROM information_schema.columns
    WHERE table_name = ${t.table_name} AND table_schema = 'public'
    ORDER BY ordinal_position
  `;
  console.log(`\n  [${t.table_name}] columns:`);
  cols.forEach(c => console.log(`    - ${c.column_name} (${c.data_type})`));
}

await client.end();
