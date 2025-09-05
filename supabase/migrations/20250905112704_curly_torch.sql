/*
# Create unique code generation function

1. New Functions
  - `generate_unique_code()` - Generates 6-character alphanumeric codes
  - Ensures uniqueness across both RSVP and hotel reservation tables

2. Security
  - Function is accessible to authenticated and anonymous users
  - Used as default value for unique_code columns
*/

-- Function to generate unique 6-character alphanumeric codes
CREATE OR REPLACE FUNCTION generate_unique_code()
RETURNS TEXT AS $$
DECLARE
  chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  result TEXT := '';
  i INTEGER;
  code_exists BOOLEAN;
BEGIN
  LOOP
    result := '';
    -- Generate 6-character code
    FOR i IN 1..6 LOOP
      result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
    END LOOP;
    
    -- Check if code exists in either table
    SELECT EXISTS(
      SELECT 1 FROM rsvp_submissions WHERE unique_code = result
      UNION
      SELECT 1 FROM hotel_reservations WHERE unique_code = result
    ) INTO code_exists;
    
    -- Exit loop if code is unique
    EXIT WHEN NOT code_exists;
  END LOOP;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;