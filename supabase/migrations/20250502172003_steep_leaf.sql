/*
  # Add reviews table and policies

  1. New Tables
    - `reviews`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `meal_id` (text, not null)
      - `rating` (integer, 1-5)
      - `comment` (text)
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS on `reviews` table
    - Add policies for:
      - Anyone can read reviews
      - Authenticated users can create their own reviews
      - Users can only review each meal once
*/

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  meal_id text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, meal_id)
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read reviews
CREATE POLICY "Reviews are viewable by everyone" 
ON reviews FOR SELECT 
TO public 
USING (true);

-- Allow authenticated users to create their own reviews
CREATE POLICY "Users can create their own reviews" 
ON reviews FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own reviews
CREATE POLICY "Users can update their own reviews" 
ON reviews FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own reviews
CREATE POLICY "Users can delete their own reviews" 
ON reviews FOR DELETE 
TO authenticated 
USING (auth.uid() = user_id);