/*
  # Add reviewer name to reviews table

  1. Changes
    - Add reviewer_name column to reviews table
    - Set default value to 'Anonymous'
    - Make the column required
*/

-- Add reviewer_name column with default value
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS reviewer_name text NOT NULL DEFAULT 'Anonymous';