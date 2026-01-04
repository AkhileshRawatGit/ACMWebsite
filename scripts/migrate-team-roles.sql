-- Migration script to update team_members table with role constraint
-- This script safely adds the CHECK constraint for team member roles

-- Step 1: First, let's see what roles currently exist (for reference)
-- Uncomment and run this if you want to check existing data:
-- SELECT DISTINCT role FROM team_members;

-- Step 2: Drop the existing table constraint if it exists and recreate the table with the new constraint
-- Note: In PostgreSQL, we need to alter the table to add the constraint
ALTER TABLE team_members DROP CONSTRAINT IF EXISTS team_members_role_check;

-- Step 3: Add the new constraint
ALTER TABLE team_members 
ADD CONSTRAINT team_members_role_check 
CHECK (role IN ('Chair', 'Vice Chair', 'Secretary', 'Treasurer', 'Web Master', 'Member'));

-- Step 4 (Optional): Update any existing records that don't match the new roles
-- You can uncomment and modify these as needed based on your existing data:
-- UPDATE team_members SET role = 'Chair' WHERE role = 'President';
-- UPDATE team_members SET role = 'Vice Chair' WHERE role = 'Vice President';
-- UPDATE team_members SET role = 'Member' WHERE role NOT IN ('Chair', 'Vice Chair', 'Secretary', 'Treasurer', 'Web Master', 'Member');

-- Verify the constraint was added
SELECT
    conname AS constraint_name,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conrelid = 'team_members'::regclass
AND conname = 'team_members_role_check';
