-- Add new columns to events table for video and results
ALTER TABLE events 
ADD COLUMN IF NOT EXISTS video TEXT,
ADD COLUMN IF NOT EXISTS results TEXT;

-- Add type column to gallery table to distinguish images from videos
ALTER TABLE gallery 
ADD COLUMN IF NOT EXISTS type VARCHAR(10) DEFAULT 'image';

-- Update existing gallery records to have type 'image'
UPDATE gallery SET type = 'image' WHERE type IS NULL;
