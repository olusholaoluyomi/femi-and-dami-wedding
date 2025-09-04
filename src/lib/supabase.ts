import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export interface RSVPSubmission {
  id?: string;
  unique_code?: string;
  name: string;
  email: string;
  phone: string;
  guests: number;
  attendance: string;
  dietary: string;
  message: string;
  needs_accommodation: string;
  created_at?: string;
  synced_to_sheets?: boolean;
}

export interface HotelReservation {
  id?: string;
  unique_code?: string;
  hotel: string;
  checkin: string;
  checkout: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  created_at?: string;
  synced_to_sheets?: boolean;
}