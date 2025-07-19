// lib/db.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { file, user } from './schema';


const pool = new Pool({ connectionString: process.env.DB });
export const db = drizzle(pool, { schema: { user, file } });
