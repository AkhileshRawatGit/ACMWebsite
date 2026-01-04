-- Enable UUID extension if needed (Supabase usually has it)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Helper function for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 1. Events Table
CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date TIMESTAMP NOT NULL,
    time VARCHAR(50),
    location VARCHAR(255),
    category VARCHAR(100),
    description TEXT,
    image TEXT,
    video TEXT,
    results TEXT,
    attendees INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_events_updated_at
    BEFORE UPDATE ON events
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 2. Team Members Table
CREATE TABLE IF NOT EXISTS team_members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(100) CHECK (role IN ('Chair', 'Vice Chair', 'Secretary', 'Treasurer', 'Web Master', 'Member')),
    image TEXT,
    bio TEXT,
    email VARCHAR(255),
    social_links JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    category VARCHAR(100),
    image TEXT,
    type VARCHAR(50) DEFAULT 'image',
    event_id INTEGER REFERENCES events(id) ON DELETE SET NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Members Table
CREATE TABLE IF NOT EXISTS members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    roll_number VARCHAR(50),
    branch VARCHAR(100),
    semester INTEGER,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'active'
);

-- 5. Resources Table
CREATE TABLE IF NOT EXISTS resources (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    category VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Settings Table
CREATE TABLE IF NOT EXISTS settings (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL UNIQUE,
    data JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_settings_updated_at
    BEFORE UPDATE ON settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 7. Faculty Coordinators Table
CREATE TABLE IF NOT EXISTS faculty_coordinators (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(100) NOT NULL,
    image TEXT,
    bio TEXT,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    linkedin_url TEXT,
    twitter_url TEXT,
    website_url TEXT,
    department VARCHAR(100),
    office_location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_faculty_coordinators_updated_at
    BEFORE UPDATE ON faculty_coordinators
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
