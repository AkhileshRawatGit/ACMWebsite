const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env.local') });

async function checkDatabase() {
    let pool;
    let output = '';

    try {
        output += 'Connecting to database...\n';
        pool = new Pool({
            connectionString: process.env.POSTGRES_URL,
            ssl: { rejectUnauthorized: false } // Required for Supabase often
        });

        output += '\n=== CHECKING TABLES ===\n\n';
        const { rows: tables } = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);
        output += 'Tables in database:\n';
        tables.forEach(table => output += ' - ' + table.table_name + '\n');

        output += '\n=== CHECKING team_members TABLE ===\n\n';
        try {
            const { rows: columns } = await pool.query(`
                SELECT column_name, data_type, is_nullable
                FROM information_schema.columns 
                WHERE table_name = 'team_members'
            `);

            if (columns.length > 0) {
                output += 'team_members columns:\n';
                columns.forEach(col => {
                    output += `  ${col.column_name}: ${col.data_type} ${col.is_nullable === 'YES' ? 'NULL' : 'NOT NULL'}\n`;
                });

                const { rows: count } = await pool.query('SELECT COUNT(*) as count FROM team_members');
                output += `\nTotal team members in database: ${count[0].count}\n`;
            } else {
                output += 'team_members table does not exist (no columns found)\n';
            }

        } catch (error) {
            output += 'Error checking team_members: ' + error.message + '\n';
        }

        output += '\n=== DONE ===\n';

        // Write to file
        fs.writeFileSync(path.join(__dirname, '../db-check-result.txt'), output, 'utf8');
        console.log(output);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        if (pool) {
            await pool.end();
        }
    }
}

checkDatabase();
