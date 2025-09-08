import { supabase } from '../lib/supabase';
import type { RSVPSubmission, HotelReservation } from '../lib/supabase';

export class FormService {
  static async submitRSVP(formData: Omit<RSVPSubmission, 'id' | 'unique_code' | 'created_at' | 'synced_to_sheets'>) {
    try {
      const { data: rsvpData, error: rsvpError } = await supabase
        .from('rsvp_submissions')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          guests: parseInt(formData.guests.toString()),
          attendance: formData.attendance,
          dietary: formData.dietary,
          message: formData.message,
          needs_accommodation: formData.needs_accommodation
        }])
        .select()
        .single();

      if (rsvpError) {
        console.error('RSVP database error:', rsvpError);
        throw new Error('Failed to submit RSVP');
      }

      // Send confirmation email
      try {
        const emailResponse = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-rsvp-email`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            name: formData.name,
            uniqueCode: rsvpData.unique_code,
            type: 'rsvp'
          })
        });

        if (!emailResponse.ok) {
          console.warn('Email sending failed, but RSVP was saved');
        }
      } catch (emailError) {
        console.warn('Email service error:', emailError);
      }

      // Sync to Google Sheets (optional)
      try {
        const syncResponse = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/sync-to-sheets`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'rsvp',
            recordId: rsvpData.id
          })
        });

        if (!syncResponse.ok) {
          console.warn('Google Sheets sync failed, but RSVP was saved');
        }
      } catch (syncError) {
        console.warn('Sync service error:', syncError);
      }

      return {
        success: true,
        uniqueCode: rsvpData.unique_code,
        data: rsvpData
      };

    } catch (error) {
      console.error('RSVP submission error:', error);
      throw error;
    }
  }

  static async submitHotelReservation(formData: Omit<HotelReservation, 'id' | 'unique_code' | 'created_at' | 'synced_to_sheets'>) {
    try {
      const { data: hotelData, error: hotelError } = await supabase
        .from('hotel_reservations')
        .insert([{
          hotel: formData.hotel,
          checkin: formData.checkin,
          checkout: formData.checkout,
          guests: parseInt(formData.guests.toString()),
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        }])
        .select()
        .single();

      if (hotelError) {
        console.error('Hotel reservation database error:', hotelError);
        throw new Error('Failed to submit hotel reservation');
      }

      // Send confirmation email
      try {
        const emailResponse = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-rsvp-email`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            name: formData.name,
            uniqueCode: hotelData.unique_code,
            type: 'hotel'
          })
        });

        if (!emailResponse.ok) {
          console.warn('Email sending failed, but reservation was saved');
        }
      } catch (emailError) {
        console.warn('Email service error:', emailError);
      }

      // Sync to Google Sheets (optional)
      try {
        const syncResponse = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/sync-to-sheets`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'hotel',
            recordId: hotelData.id
          })
        });

        if (!syncResponse.ok) {
          console.warn('Google Sheets sync failed, but reservation was saved');
        }
      } catch (syncError) {
        console.warn('Sync service error:', syncError);
      }

      return {
        success: true,
        uniqueCode: hotelData.unique_code,
        data: hotelData
      };

    } catch (error) {
      console.error('Hotel reservation error:', error);
      throw error;
    }
  }
}