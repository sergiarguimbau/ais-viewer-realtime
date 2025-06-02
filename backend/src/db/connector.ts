import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// Get DB config from environment variables (use defaults if not set)
const pool = new Pool({
  host: "pgdb", // Docker container name
  port: 5432, // Default Postgres port
  user: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  database: process.env.POSTGRES_DB || "postgres",
});

export const db = drizzle(pool);
