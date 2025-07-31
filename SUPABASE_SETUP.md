# Supabase Permission Fix

## Problem

You're getting a `permission denied for schema public` error when trying to access the `movie` table. This happens because Supabase has Row Level Security (RLS) enabled but no policies are configured to allow access.

## Solution

### Step 1: Go to Supabase Dashboard

1. Open your Supabase project dashboard
2. Navigate to the **SQL Editor** (in the left sidebar)

### Step 2: Run the SQL Commands

Copy and paste the following SQL into the SQL Editor and run it:

```sql
-- Enable RLS on the movie table
ALTER TABLE movie ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anonymous users to read all movies
CREATE POLICY "Allow anonymous read access" ON movie
FOR SELECT USING (true);

-- Create a policy that allows authenticated users to read all movies
CREATE POLICY "Allow authenticated read access" ON movie
FOR SELECT USING (auth.role() = 'authenticated');
```

### Step 3: Verify the Policies

Run this query to verify the policies were created:

```sql
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
```

### Step 4: Test Your Application

After running the SQL commands, your application should work without the permission error.

## Alternative Solutions

### Option 1: Disable RLS (Quick Fix)

If you don't need security policies, you can disable RLS entirely:

```sql
ALTER TABLE movie DISABLE ROW LEVEL SECURITY;
```

### Option 2: Use Service Role Key (Not Recommended)

You could use the service role key instead of the anon key, but this bypasses all security.

## Understanding RLS Policies

- **RLS (Row Level Security)**: A PostgreSQL feature that restricts which rows users can access
- **Policies**: Rules that define what operations are allowed on which rows
- **Anonymous users**: Users who haven't logged in (using `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
- **Authenticated users**: Users who have logged in (using the same anon key but with auth context)

## Common Issues

1. **Policy not created**: Make sure you run the CREATE POLICY commands
2. **Wrong table name**: Ensure the table is named `movie` (not `movies`)
3. **Environment variables**: Verify your Supabase URL and anon key are correct

## Next Steps

After fixing the permission issue, you can:

1. Add more specific policies for different user roles
2. Implement user authentication
3. Add policies for INSERT, UPDATE, and DELETE operations as needed
