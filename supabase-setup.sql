-- Supabase RLS Setup for Movie Table
-- Run this in your Supabase SQL Editor to fix the permission denied error

-- Step 1: Enable RLS on the movie table (if not already enabled)
ALTER TABLE movie ENABLE ROW LEVEL SECURITY;

-- Step 2: Create a policy that allows anonymous users to read all movies
CREATE POLICY "Allow anonymous read access" ON movie
FOR SELECT USING (true);

-- Step 3: Create a policy that allows authenticated users to read all movies
CREATE POLICY "Allow authenticated read access" ON movie
FOR SELECT USING (auth.role() = 'authenticated');

-- Step 4: Optional - Create a policy for inserting movies (if you need it)
-- CREATE POLICY "Allow authenticated insert" ON movie
-- FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Step 5: Optional - Create a policy for updating movies (if you need it)
-- CREATE POLICY "Allow authenticated update" ON movie
-- FOR UPDATE USING (auth.role() = 'authenticated');

-- Step 6: Optional - Create a policy for deleting movies (if you need it)
-- CREATE POLICY "Allow authenticated delete" ON movie
-- FOR DELETE USING (auth.role() = 'authenticated');

-- Verify the policies were created
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'movie'; 