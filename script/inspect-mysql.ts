import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: 'auth-db2210.helpz.hostinger.com',
  user: 'u553961924',
  password: 'DBpassword@123',
  database: 'u553961924_websitedata',
  ssl: { rejectUnauthorized: false },
});

console.log('✅ Connected to Hostinger MySQL\n');

// Show columns
const [cols] = await connection.execute(`DESCRIBE volunteer_applications`);
console.log('📋 volunteer_applications columns:');
console.table(cols);

// Show sample rows
const [rows] = await connection.execute(`SELECT * FROM volunteer_applications LIMIT 5`);
console.log('\n📄 Sample rows:');
console.log(JSON.stringify(rows, null, 2));

const [count] = await connection.execute(`SELECT COUNT(*) as total FROM volunteer_applications`) as any;
console.log(`\nTotal rows: ${count[0].total}`);

await connection.end();
