/*
  # Allow anonymous reviews

  1. Changes
    - Make user_id column nullable in reviews table to allow anonymous reviews
    - Update foreign key constraint to handle cascading deletes
  
  2. Security
    - Maintain existing RLS policies
    - Anonymous reviews will still be protected by RLS policies
*/

-- Make user_id column nullable
ALTER TABLE reviews 
ALTER COLUMN user_id DROP NOT NULL;

-- Update foreign key constraint to handle cascading deletes and null values
ALTER TABLE reviews 
DROP CONSTRAINT reviews_user_id_fkey,
ADD CONSTRAINT reviews_user_id_fkey 
  FOREIGN KEY (user_id) 
  REFERENCES auth.users(id) 
  ON DELETE CASCADE 
  DEFERRABLE INITIALLY IMMEDIATE;