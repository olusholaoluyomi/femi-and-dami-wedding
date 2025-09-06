import { supabase } from '../lib/supabase';
import type { RSVPSubmission, HotelReservation } from '../lib/supabase';

export class FormService {
  private static async callEdgeFunction(functionName: string, payload: any) {
    try {
      const { data, error } = await supabase.functions.invoke(functionName, {
        body: payload
      });

      if (error) {
        console.error(`Edge function ${functionName} error:`, error);
        throw new Error(`Failed to call ${functionName}: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error(`Edge function ${functionName} network error:`, error);
      throw new Error(`Network error calling ${functionName}: ${error.message}`);
    }
  }

  static async submitRSVP(formData: Omit<RSVPSubmission, 'id' | 'unique_code' | 'created_at' | 'synced_to_sheets'>) {
    try {
      // Insert RSVP into database
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
        throw new Error('Failed to save RSVP');
      }

      // Send email with unique code
      try {
        await this.callEdgeFunction('send-rsvp-email', {
          email: formData.email,
          name: formData.name,
          uniqueCode: rsvpData.unique_code,
          type: 'rsvp'
        });
        console.log('Email sent successfully');
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't throw here - RSVP is saved, email failure shouldn't block the process
      }

      // Sync to Google Sheets
      try {
        await this.callEdgeFunction('sync-to-sheets', {
          type: 'rsvp',
          recordId: rsvpData.id
        });
        console.log('Google Sheets sync successful');
      } catch (syncError) {
        console.error('Google Sheets sync failed:', syncError);
        // Don't throw here - RSVP is saved, sync failure shouldn't block the process
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
      // Insert hotel reservation into database
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
        throw new Error('Failed to save hotel reservation');
      }

      // Send email with unique code
      try {
        await this.callEdgeFunction('send-rsvp-email', {
          email: formData.email,
          name: formData.name,
          uniqueCode: hotelData.unique_code,
          type: 'hotel'
        });
        console.log('Hotel email sent successfully');
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't throw here - reservation is saved, email failure shouldn't block the process
      }

      // Sync to Google Sheets
      try {
        await this.callEdgeFunction('sync-to-sheets', {
          type: 'hotel',
          recordId: hotelData.id
        });
        console.log('Hotel Google Sheets sync successful');
      } catch (syncError) {
        console.error('Google Sheets sync failed:', syncError);
        // Don't throw here - reservation is saved, sync failure shouldn't block the process
      }

      return {
        success: true,
        uniqueCode: hotelData.unique_code,
        data: hotelData
      };

    } catch (error) {
      console.error('Hotel reservation submission error:', error);
      throw error;
    }
  }
}