/*
  # Add reviewer_name to reviews table

  1. Changes
    - Add reviewer_name column to reviews table
    - Make it required for new reviews
    - Set default value for existing reviews
*/

ALTER TABLE reviews ADD COLUMN reviewer_name text NOT NULL DEFAULT 'Anonymous';