require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');

async function testConnection() {
    console.log('Testing database connection...');

    if (!process.env.POSTGRES_URL) {
        console.error('Error: POSTGRES_URL is not defined in environment.');
        process.exit(1);
    }

    try {
        const url = new URL(process.env.POSTGRES_URL);
        console.log(`Host: ${url.hostname}`);
        console.log(`Port: ${url.port}`);
        console.log(`Database: ${url.pathname.replace('/', '')}`);
    } catch (e) {
        console.error('Error parsing POSTGRES_URL:', e.message);
    }

    const pool = new Pool({
        connectionString: process.env.POSTGRES_URL,
        ssl: { rejectUnauthorized: false },
        max: 1,
        connectionTimeoutMillis: 5000,
    });

    try {
        const client = await pool.connect();
        console.log('Successfully connected to the database!');
        const res = await client.query('SELECT NOW()');
        console.log('Current Database Time:', res.rows[0].now);
        client.release();
        await pool.end();
    } catch (err) {
        console.error('Connection failed.');
        console.error('Code:', err.code);
        console.error('Syscall:', err.syscall);
        console.error('Hostname:', err.hostname);
        if (err.message) console.error('Message:', err.message);
    }
}

testConnection();
