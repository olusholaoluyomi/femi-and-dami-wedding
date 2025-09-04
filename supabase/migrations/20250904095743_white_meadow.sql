/*
  # Wedding RSVP and Hotel Reservations System

  1. New Tables
    - `rsvp_submissions`
      - `id` (uuid, primary key)
      - `unique_code` (text, unique entry code)
      - `name` (text, guest full name)
      - `email` (text, guest email)
      - `phone` (text, guest phone number)
      - `guests` (integer, number of guests)
      - `attendance` (text, yes/no attendance)
      - `dietary` (text, dietary restrictions)
      - `message` (text, special message)
      - `needs_accommodation` (text, yes/no accommodation needed)
      - `created_at` (timestamp)
      - `synced_to_sheets` (boolean, tracking sync status)
    
    - `hotel_reservations`
      - `id` (uuid, primary key)
      - `unique_code` (text, unique entry code)
      - `hotel` (text, selected hotel name)
      - `checkin` (date, check-in date)
      - `checkout` (date, check-out date)
      - `guests` (integer, number of guests)
      - `name` (text, guest full name)
      - `email` (text, guest email)
      - `phone` (text, guest phone number)
      - `created_at` (timestamp)
      - `synced_to_sheets` (boolean, tracking sync status)

  2. Security
    - Enable RLS on both tables
    - Add policies for public insert access (for form submissions)
    - Add policies for authenticated read access (for admin)

  3. Functions
    - Function to generate unique 6-character codes
    - Triggers to auto-generate codes on insert
*/

-- Function to generate unique codes
CREATE OR REPLACE FUNCTION generate_unique_code()
RETURNS text AS $$
DECLARE
  chars text := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  result text := '';
  i integer;
BEGIN
  FOR i IN 1..6 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- RSVP Submissions Table
CREATE TABLE IF NOT EXISTS rsvp_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  unique_code text UNIQUE NOT NULL DEFAULT generate_unique_code(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  guests integer DEFAULT 1,
  attendance text NOT NULL,
  dietary text DEFAULT '',
  message text DEFAULT '',
  needs_accommodation text NOT NULL,
  created_at timestamptz DEFAULT now(),
  synced_to_sheets boolean DEFAULT false
);

-- Hotel Reservations Table
CREATE TABLE IF NOT EXISTS hotel_reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  unique_code text UNIQUE NOT NULL DEFAULT generate_unique_code(),
  hotel text NOT NULL,
  checkin date NOT NULL,
  checkout date NOT NULL,
  guests integer DEFAULT 2,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  created_at timestamptz DEFAULT now(),
  synced_to_sheets boolean DEFAULT false
);

-- Enable RLS
ALTER TABLE rsvp_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel_reservations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for RSVP
CREATE POLICY "Anyone can insert RSVP"
  ON rsvp_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read RSVP"
  ON rsvp_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for Hotel Reservations
CREATE POLICY "Anyone can insert hotel reservations"
  ON hotel_reservations
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read hotel reservations"
  ON hotel_reservations
  FOR SELECT
  TO authenticated
  USING (true);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_rsvp_email ON rsvp_submissions(email);
CREATE INDEX IF NOT EXISTS idx_rsvp_code ON rsvp_submissions(unique_code);
CREATE INDEX IF NOT EXISTS idx_hotel_email ON hotel_reservations(email);
CREATE INDEX IF NOT EXISTS idx_hotel_code ON hotel_reservations(unique_code);