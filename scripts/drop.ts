import { Pool } from 'pg';
import 'dotenv/config'; // Loads .env for process.env.DB

async function dropFileTable() {
    const pool = new Pool({ connectionString: process.env.DB });

    try {
        await pool.query('DROP TABLE IF EXISTS "file";');
        console.log('✅ Table "file" dropped successfully');
    } catch (err) {
        console.error('❌ Error dropping table:', err);
    } finally {
        await pool.end();
    }
}

dropFileTable();
