import React, { useState, useEffect } from 'react';
import { 
  Wifi, Utensils, Car, Coffee, Bath, Dumbbell, Music, Shield, Sun, Snowflake, Tv,
  Users, Key, Wine, ConciergeBell, Leaf, Star, Briefcase, Hotel, MapPin, X, CheckCircle
} from 'lucide-react';

const Hotels: React.FC = () => {
  const [reservationData, setReservationData] = useState({
    hotel: '',
    checkin: '',
    checkout: '',
    guests: '2',
    name: '',
    email: '',
    phone: ''
  });

  const [toast, setToast] = useState<{message: string; show: boolean}>({message: '', show: false});

  // Auto-fill from URL parameters (if coming from RSVP form)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const email = urlParams.get('email');
    const guests = urlParams.get('guests');
    const phone = urlParams.get('phone');
    
    if (name || email || guests || phone) {
      setReservationData(prev => ({
        ...prev,
        ...(name && { name }),
        ...(email && { email }),
        ...(guests && { guests }),
        ...(phone && { phone })
      }));
    }

    // Also check if there's a success message to show
    const success = urlParams.get('success');
    if (success === 'true') {
      showToast('Thank you for your RSVP! Please complete your accommodation booking below.');
    }
  }, []);

  const showToast = (message: string) => {
    setToast({message, show: true});
    setTimeout(() => setToast({message: '', show: false}), 5000);
  };

  const hotels = [
    // ... your existing hotels array remains the same ...
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Hotel reservation:', reservationData);
    
    // Show success toast instead of alert
    showToast('Reservation request submitted! The hotel will contact you to confirm.');
    
    // Clear form after submission
    setReservationData({
      hotel: '',
      checkin: '',
      checkout: '',
      guests: '2',
      name: reservationData.name, // Keep name if already filled from RSVP
      email: reservationData.email, // Keep email if already filled from RSVP
      phone: reservationData.phone // Keep phone if already filled from RSVP
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setReservationData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const getAmenityIcon = (amenity: string) => {
    // ... your existing getAmenityIcon function remains the same ...
  };

  return (
    <section id="hotels" className="py-20 px-4 bg-gradient-to-b from-beige to-ivory relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-32 right-5 w-36 h-36 golden-swirl-2"></div>
      <div className="absolute bottom-20 left-10 w-28 h-28 golden-swirl"></div>
      
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-100 border-l-4 border-green-400 text-green-800 px-4 py-3 rounded-lg shadow-lg max-w-md w-full mx-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5" />
          <span className="flex-1 font-sans">{toast.message}</span>
          <button
            onClick={() => setToast({message: '', show: false})}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* ... your existing hotel options code remains the same ... */}

        {/* Reservation Form */}
        <div className="glass-effect p-8 md:p-12 rounded-3xl">
          <h3 className="font-serif text-3xl font-semibold text-mocha text-center mb-8">
            Make a Reservation
          </h3>

          {!reservationData.name && (
            <div className="bg-amber-100 border-l-4 border-amber-500 text-amber-700 p-4 mb-6 rounded">
              <p className="font-sans">Please complete the RSVP form first to auto-fill your information.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="hotel" className="block font-sans text-mocha font-medium mb-2">
                  Preferred Hotel *
                </label>
                <select
                  id="hotel"
                  name="hotel"
                  required
                  value={reservationData.hotel}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gold/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold bg-ivory/50"
                >
                  <option value="">Select a hotel</option>
                  {hotels.map((hotel, i) => (
                    <option key={i} value={hotel.name}>{hotel.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="guests" className="block font-sans text-mocha font-medium mb-2">
                  Number of Guests
                </label>
                <select
                  id="guests"
                  name="guests"
                  value={reservationData.guests}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gold/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold bg-ivory/50"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                </select>
              </div>

              <div>
                <label htmlFor="checkin" className="block font-sans text-mocha font-medium mb-2">
                  Check-in Date *
                </label>
                <input
                  type="date"
                  id="checkin"
                  name="checkin"
                  required
                  value={reservationData.checkin}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gold/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold bg-ivory/50"
                />
              </div>

              <div>
                <label htmlFor="checkout" className="block font-sans text-mocha font-medium mb-2">
                  Check-out Date *
                </label>
                <input
                  type="date"
                  id="checkout"
                  name="checkout"
                  required
                  value={reservationData.checkout}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gold/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold bg-ivory/50"
                />
              </div>

              <div>
                <label htmlFor="name" className="block font-sans text-mocha font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={reservationData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gold/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold bg-ivory/50"
                  placeholder="Your full name"
                  readOnly={!!reservationData.name} // Make read-only if already filled
                />
                {reservationData.name && (
                  <p className="text-xs text-gold mt-1">Filled from your RSVP</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block font-sans text-mocha font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={reservationData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gold/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold bg-ivory/50"
                  placeholder="your.email@example.com"
                  readOnly={!!reservationData.email} // Make read-only if already filled
                />
                {reservationData.email && (
                  <p className="text-xs text-gold mt-1">Filled from your RSVP</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block font-sans text-mocha font-medium mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={reservationData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gold/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold bg-ivory/50"
                placeholder="(555) 123-4567"
                readOnly={!!reservationData.phone} // Make read-only if already filled
              />
              {reservationData.phone && (
                <p className="text-xs text-gold mt-1">Filled from your RSVP</p>
              )}
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-gold hover:bg-gold/90 text-white px-12 py-4 rounded-full font-sans font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Request Reservation
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hotels;