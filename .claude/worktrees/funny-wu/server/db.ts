import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

function getDatabaseUrl(): string {
  const isProduction = process.env.NODE_ENV === 'production';
  const databaseUrl = process.env.DATABASE_URL || '';
  const neonUrl = process.env.NEON_DATABASE_URL || '';
  const isHeliumProxy = databaseUrl.includes('@helium/') || databaseUrl.includes('@helium:');
  
  if (isProduction && neonUrl) {
    console.log('Production mode: Using NEON_DATABASE_URL');
    return neonUrl;
  }
  
  if (isProduction && isHeliumProxy) {
    if (neonUrl) {
      console.log('Production mode: Falling back to NEON_DATABASE_URL (helium not accessible)');
      return neonUrl;
    }
    throw new Error('Production deployment requires NEON_DATABASE_URL - the internal helium database is not accessible in production.');
  }
  
  if (databaseUrl) {
    console.log('Using DATABASE_URL');
    return databaseUrl;
  }
  
  throw new Error("DATABASE_URL or NEON_DATABASE_URL must be set. Did you forget to provision a database?");
}

function getDatabaseConfig(): pg.PoolConfig {
  const databaseUrl = getDatabaseUrl();
  const isProduction = process.env.NODE_ENV === 'production';
  const isHeliumProxy = databaseUrl.includes('@helium/') || databaseUrl.includes('@helium:');
  
  console.log(`Database config: NODE_ENV=${process.env.NODE_ENV}, isNeon=${databaseUrl.includes('neon.tech')}, isHelium=${isHeliumProxy}`);
  
  const config: pg.PoolConfig = {
    connectionString: databaseUrl,
    connectionTimeoutMillis: 30000,
    idleTimeoutMillis: 60000,
    max: 10,
  };
  
  if (databaseUrl.includes('neon.tech') || databaseUrl.includes('sslmode=require') || isProduction) {
    config.ssl = { rejectUnauthorized: false };
  }
  
  return config;
}

const pool = new pg.Pool(getDatabaseConfig());

pool.on('error', (err) => {
  console.error('Unexpected database pool error:', err);
});

export const db = drizzle(pool, { schema });
