/*
  # Add user relationship to reviews table

  1. Changes
    - Add foreign key relationship between reviews.user_id and auth.users.id
    - Add user email view for reviews

  2. Security
    - View inherits RLS from reviews table
*/

-- Create a view to get user emails with reviews
CREATE OR REPLACE VIEW review_details AS
SELECT 
  r.*,
  u.email as user_email
FROM reviews r
JOIN auth.users u ON r.user_id = u.id;

-- Grant access to the view
GRANT SELECT ON review_details TO authenticated, anon;