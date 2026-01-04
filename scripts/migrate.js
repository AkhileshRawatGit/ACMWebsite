const mysql = require('mysql2/promise');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env.local') });

async function migrate() {
    let connection;
    try {
        console.log('Connecting to database...');
        connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST || 'localhost',
            port: parseInt(process.env.MYSQL_PORT || '3306'),
            database: process.env.MYSQL_DATABASE || 'acm_srhu',
            user: process.env.MYSQL_USER || 'root',
            password: process.env.MYSQL_PASSWORD || '',
        });

        console.log('Connected. Checking table structures...');

        // Helper to check if column exists
        async function columnExists(table, column) {
            const [rows] = await connection.query(
                `SELECT count(*) as count FROM information_schema.columns 
         WHERE table_schema = ? AND table_name = ? AND column_name = ?`,
                [process.env.MYSQL_DATABASE || 'acm_srhu', table, column]
            );
            return rows[0].count > 0;
        }

        // Update Events Table
        console.log('Updating events table...');
        if (!(await columnExists('events', 'video'))) {
            await connection.query('ALTER TABLE events ADD COLUMN video TEXT');
            console.log('Added video column to events');
        }

        if (!(await columnExists('events', 'results'))) {
            await connection.query('ALTER TABLE events ADD COLUMN results TEXT');
            console.log('Added results column to events');
        }

        // Update Gallery Table
        console.log('Updating gallery table...');
        if (!(await columnExists('gallery', 'type'))) {
            await connection.query("ALTER TABLE gallery ADD COLUMN type VARCHAR(10) DEFAULT 'image'");
            console.log('Added type column to gallery');

            // Update existing records
            await connection.query("UPDATE gallery SET type = 'image' WHERE type IS NULL");
            console.log('Updated existing gallery items to type=image');
        }

        // Create Faculty Coordinators Table
        console.log('Creating faculty_coordinators table...');
        const [facultyTableExists] = await connection.query(
            `SELECT count(*) as count FROM information_schema.tables 
             WHERE table_schema = ? AND table_name = 'faculty_coordinators'`,
            [process.env.MYSQL_DATABASE || 'acm_srhu']
        );

        if (facultyTableExists[0].count === 0) {
            await connection.query(`
                CREATE TABLE faculty_coordinators (
                    id INT PRIMARY KEY AUTO_INCREMENT,
                    name VARCHAR(255) NOT NULL,
                    title VARCHAR(100) NOT NULL,
                    image VARCHAR(500),
                    bio TEXT,
                    email VARCHAR(255) NOT NULL,
                    phone VARCHAR(50),
                    linkedin_url VARCHAR(500),
                    twitter_url VARCHAR(500),
                    website_url VARCHAR(500),
                    department VARCHAR(100),
                    office_location VARCHAR(255),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )
            `);
            console.log('Created faculty_coordinators table');

            // Insert default data
            await connection.query(`
                INSERT INTO faculty_coordinators (name, title, image, bio, email) 
                VALUES (
                    'Dr. Rajesh Kumar',
                    'Faculty Coordinator',
                    '/professor-faculty-member-portrait.jpg',
                    'With over 15 years of experience in computer science education, Dr. Kumar leads our chapter\\'s vision for innovation and student development.',
                    'r.kumar@srhu.edu.in'
                )
            `);
            console.log('Inserted default faculty coordinator');
        } else {
            console.log('Faculty coordinators table already exists');
        }

        console.log('Migration completed successfully.');
    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

migrate();
