import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var pgPool: Pool | undefined;
}

function createPool() {
  const connectionString = process.env.POSTGRES_URL;

  if (!connectionString) {
    throw new Error("POSTGRES_URL environment variable is not defined");
  }

  return new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }, // ✅ REQUIRED FOR SUPABASE
    max: 10,
    idleTimeoutMillis: 30000,
  });
}

const pool = global.pgPool ?? createPool();

if (process.env.NODE_ENV !== "production") {
  global.pgPool = pool;
}

export async function query<T = any>(sql: string, params?: any[]): Promise<T[]> {
  const result = await pool.query(sql, params);
  return result.rows;
}

export async function queryOne<T = any>(sql: string, params?: any[]): Promise<T | null> {
  const rows = await query<T>(sql, params);
  return rows.length > 0 ? rows[0] : null;
}

export async function execute(sql: string, params?: any[]) {
  return pool.query(sql, params);
}
