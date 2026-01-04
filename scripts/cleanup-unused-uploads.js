const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function cleanup() {
    console.log('Starting cleanup of unused images...');

    if (!process.env.POSTGRES_URL) {
        console.error('Error: POSTGRES_URL is not defined in environment.');
        process.exit(1);
    }

    const pool = new Pool({
        connectionString: process.env.POSTGRES_URL,
        ssl: { rejectUnauthorized: false },
    });

    try {
        // 1. Fetch all used paths from DB
        const queries = [
            'SELECT image FROM events WHERE image IS NOT NULL',
            'SELECT video FROM events WHERE video IS NOT NULL',
            'SELECT image FROM team_members WHERE image IS NOT NULL',
            'SELECT image FROM gallery WHERE image IS NOT NULL',
            'SELECT image FROM faculty_coordinators WHERE image IS NOT NULL'
        ];

        const usedPaths = new Set();

        for (const sql of queries) {
            const result = await pool.query(sql);
            for (const row of result.rows) {
                // Determine which column was selected (image or video)
                const val = row.image || row.video;
                if (val && typeof val === 'string') {
                    // Normalize: remove query params if any, ensure it starts with /
                    // If DB has "uploads/..." instead of "/uploads/...", handle it.
                    let cleanPath = val.trim();
                    if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;
                    usedPaths.add(cleanPath);
                }
            }
        }

        console.log(`Found ${usedPaths.size} unique file references in database.`);

        // 2. Scan public/uploads
        const publicDir = path.join(process.cwd(), 'public');
        const uploadsDir = path.join(publicDir, 'uploads');

        if (!fs.existsSync(uploadsDir)) {
            console.log('No uploads directory found.');
            return;
        }

        let deletedCount = 0;
        let retainedCount = 0;
        let errorCount = 0;

        async function scanAndClean(dir) {
            const entries = await fs.promises.readdir(dir, { withFileTypes: true });

            for (const entry of entries) {
                const fullPath = path.join(dir, entry.name);

                if (entry.isDirectory()) {
                    await scanAndClean(fullPath);
                } else if (entry.isFile()) {
                    // Get path relative to public folder, e.g., "/uploads/images/abc.jpg"
                    // path.relative returns "uploads\images\abc.jpg" on windows
                    // We need to convert backslashes to forward slashes and ensure leading slash
                    let relPath = path.relative(publicDir, fullPath);
                    relPath = relPath.split(path.sep).join('/');
                    if (!relPath.startsWith('/')) relPath = '/' + relPath;

                    if (!usedPaths.has(relPath)) {
                        console.log(`Deleting unused file: ${relPath}`);
                        try {
                            await fs.promises.unlink(fullPath);
                            deletedCount++;
                        } catch (err) {
                            console.error(`Failed to delete ${relPath}:`, err.message);
                            errorCount++;
                        }
                    } else {
                        retainedCount++;
                    }
                }
            }
        }

        await scanAndClean(uploadsDir);

        console.log('Cleanup complete.');
        console.log(`Deleted: ${deletedCount}`);
        console.log(`Retained: ${retainedCount}`);
        console.log(`Errors: ${errorCount}`);

    } catch (err) {
        console.error('Error during cleanup:', err);
    } finally {
        await pool.end();
    }
}

cleanup();
