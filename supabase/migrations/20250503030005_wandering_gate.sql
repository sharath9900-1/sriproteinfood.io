/*
  # Remove reviews from specific user
  
  1. Changes
    - Safely remove all reviews from user with email 'sharathbn9591@gmail.com'
    - Uses a join with auth.users to ensure correct user identification
*/

DO $$ 
BEGIN
  DELETE FROM reviews r
  USING auth.users u
  WHERE r.user_id = u.id
  AND u.email = 'sharathbn9591@gmail.com';
END $$;