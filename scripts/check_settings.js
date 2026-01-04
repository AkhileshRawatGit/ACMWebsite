const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function checkSettings() {
    const config = {
        host: process.env.MYSQL_HOST || 'localhost',
        port: parseInt(process.env.MYSQL_PORT || '3306'),
        database: process.env.MYSQL_DATABASE || 'acm_srhu',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '',
    };

    console.log("Connecting with config:", { ...config, password: '***' });
    const connection = await mysql.createConnection(config);

    try {
        const [rows] = await connection.execute("SELECT id, type, data, updated_at FROM settings WHERE type = 'site_settings' ORDER BY updated_at DESC LIMIT 1");
        console.log("Found " + rows.length + " rows.");
        if (rows.length > 0) {
            const row = rows[0];
            console.log(`Row ID=${row.id}, Updated=${row.updated_at}`);

            let data = row.data;
            if (typeof data === 'string') {
                try {
                    data = JSON.parse(data);
                } catch (e) {
                    console.log("Failed to parse data string");
                }
            }

            if (data && data.stats) {
                console.log("Stats found in DB:", data.stats);
            } else {
                console.log("No stats object found in data:", data);
            }
        } else {
            console.log("No settings found.");
        }

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await connection.end();
    }
}

checkSettings();
