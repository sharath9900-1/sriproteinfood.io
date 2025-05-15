/*
  # Update review policies to allow anonymous reviews
  
  1. Changes
    - Drop existing policies if they exist
    - Create new policies for:
      - Anonymous review submissions
      - Public review viewing
      - Authenticated user review management
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
  -- Drop existing policies
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'reviews' AND policyname = 'Users can update their own reviews'
  ) THEN
    DROP POLICY "Users can update their own reviews" ON reviews;
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'reviews' AND policyname = 'Users can delete their own reviews'
  ) THEN
    DROP POLICY "Users can delete their own reviews" ON reviews;
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'reviews' AND policyname = 'Allow everyone to view reviews'
  ) THEN
    DROP POLICY "Allow everyone to view reviews" ON reviews;
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'reviews' AND policyname = 'Allow anyone to insert reviews'
  ) THEN
    DROP POLICY "Allow anyone to insert reviews" ON reviews;
  END IF;
END $$;

-- Enable RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create new policies
CREATE POLICY "Allow anyone to insert reviews"
ON reviews
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Allow everyone to view reviews"
ON reviews
FOR SELECT
TO public
USING (true);

CREATE POLICY "Users can update their own reviews"
ON reviews
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews"
ON reviews
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);