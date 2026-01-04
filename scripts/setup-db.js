const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config({ path: path.join(__dirname, '../.env.local') });

async function setupDatabase() {
    let pool;
    try {
        console.log('Connecting to Supabase...');
        pool = new Pool({
            connectionString: process.env.POSTGRES_URL,
            ssl: { rejectUnauthorized: false }
        });

        console.log('Reading schema.sql...');
        const schemaPath = path.join(__dirname, '../schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        console.log('Applying schema...');
        await pool.query(schema);

        
        console.log('Schema applied successfully!');
    } catch (error) {
        console.error('Error setting up database:', error);
    } finally {
        if (pool) {
            await pool.end();
        }
    }
}

setupDatabase();
