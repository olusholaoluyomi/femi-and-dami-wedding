import React, { useState, useEffect } from 'react';
import { 
  Wifi, Building, Truck, Star, 
  Users, Key, MapPin, Store,
  Cake, Tv, Shield, Sun, GraduationCap
} from 'lucide-react';
import { FormService } from '../services/formService';
import { useToast } from '../context/ToastContext';

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  // Auto-fill from URL parameters and handle expiration
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const email = urlParams.get('email');
    const guests = urlParams.get('guests');
    const phone = urlParams.get('phone');
    const timestamp = urlParams.get('timestamp');
    const success = urlParams.get('success');
    
    // Check if data has expired (5 minutes = 300000ms)
    const now = Date.now();
    const dataAge = timestamp ? now - parseInt(timestamp) : 0;
    const hasExpired = dataAge > 300000; // 5 minutes
    
    if ((name || email || guests || phone) && !hasExpired) {
      setReservationData(prev => ({
        ...prev,
        ...(name && { name }),
        ...(email && { email }),
        ...(guests && { guests }),
        ...(phone && { phone })
      }));
      
      // Set up auto-expiration timer for remaining time
      const remainingTime = 300000 - dataAge;
      if (remainingTime > 0) {
        setTimeout(() => {
          clearUrlData();
          addToast('Form data has expired for security. Please re-submit your RSVP if needed.', 'info');
        }, remainingTime);
      }
    } else if (hasExpired && (name || email || guests || phone)) {
      // Data has expired, clear it
      clearUrlData();
      addToast('Form data has expired for security. Please re-submit your RSVP if needed.', 'info');
    }

    if (success === 'true') {
      addToast('Thank you for your RSVP! Please complete your accommodation booking below.', 'info');
    }
  }, []);

  // Function to clear URL data
  const clearUrlData = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('name');
    url.searchParams.delete('email');
    url.searchParams.delete('guests');
    url.searchParams.delete('phone');
    url.searchParams.delete('success');
    url.searchParams.delete('timestamp');
    window.history.replaceState({}, '', url.toString());
  };

  const hotels = [
    {
      name: "G-Pinnacle Hotels & Suites Ltd",
      distance: "10 minutes drive from venue",
      rating: 5,
      price: "₦55,000-250,000/night",
      amenities: ["Free Wi-Fi", "Free breakfast", "Free parking", "Outdoor pool", "Air-conditioned", "Laundry service", "Room service", "Restaurant", "Kitchens in some rooms", "Fitness center", "Bar", "Smoke-free"],
      description: "Check-In 1:00PM, Check-Out 12:00PM (Noon)"
    },
    {
      name: "G-Pinnacle Signature Hotel",
      distance: "10 minutes drive from venue", 
      rating: 5,
      price: "₦130,000-550,000/night",
      amenities: ["Spa & wellness center", "Sauna", "Terrace & lounge", "Restaurant", "Bar & pool bar", "Outdoor swimming pool", "Free WiFi", "Fitness center", "Hot tub", "24-hour front desk", "Nightclub & live music", "Family-friendly (buffet, rooms)", "Room service & breakfast in room", "Car hire", "Beauty services", "Outdoor seating area", "Full-day security", "Free parking", "Multiple cuisines (African, Asian, International, etc.)", "Varied breakfast options (continental, buffet, vegetarian, vegan, etc.)"],
      description: "Check-In 1:30PM, Check-Out 12:00PM (Noon)"
    },
    {
      name: "De Peace Hotel and Suites",
      distance: "5 minutes from venue",
      rating: 5,
      price: "₦33,000-100,000/night", 
      amenities: ["Restaurant & Bar", "Free Breakfast (continental/Western)", "Free Wi-Fi", "Free Parking (self & valet)", "24-hour Front Desk", "Air-Conditioning", "Daily Housekeeping & Laundry", "Flat-Screen TV & Satellite Channels", "In-Room Refrigerator & Kettle", "Workspace (Desk, Charging Outlets)", "Safe", "Jacuzzi (in select rooms)", "Conference/Event Facilities", "Security Personnel", "Smoke-Free Property"],
      description: "Comfortable accommodation with modern amenities"
    },
    {
      name: "Princess Luxury Hotel",
      distance: "15 minutes from venue",
      rating: 4,
      price: "₦25,000-200,000/night",
      amenities: ["Free Wi-Fi", "Restaurant", "Bar", "Air-conditioned", "Room service", "24-hour front desk", "Free parking", "Laundry service", "Conference facilities", "Security", "Flat-screen TV", "Private bathroom"],
      description: "Elegant hotel offering luxury accommodation with modern facilities"
    },
    {
      name: "Agawoods Hotel",
      distance: "12 minutes from venue",
      rating: 4,
      price: "₦40,000-300,000/night",
      amenities: ["Free Wi-Fi", "Restaurant", "Bar", "Air-conditioned", "Free parking", "24-hour front desk", "Room service", "Laundry service", "Conference room", "Security", "Flat-screen TV", "Private bathroom", "Garden view"],
      description: "Comfortable hotel with serene environment and quality service"
    },
    {
      name: "E-Phoenix Hotel Annex",
      distance: "8 minutes from venue",
      rating: 4,
      price: "₦40,000-300,000/night",
      amenities: ["Free Wi-Fi", "Restaurant", "Air-conditioned", "Free parking", "24-hour front desk", "Room service", "Laundry service", "Security", "Flat-screen TV", "Private bathroom", "Business center", "Event hall"],
      description: "Modern hotel annex with convenient location and essential amenities"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const result = await FormService.submitHotelReservation({
        hotel: reservationData.hotel,
        checkin: reservationData.checkin,
        checkout: reservationData.checkout,
        guests: parseInt(reservationData.guests),
        name: reservationData.name,
        email: reservationData.email,
        phone: reservationData.phone
      });

      if (result.success) {
        // Clear form
        setReservationData({
          hotel: '',
          checkin: '',
          checkout: '',
          guests: '2',
          name: '',
          email: '',
          phone: ''
        });

        // Clear URL data
        clearUrlData();

        addToast(`Hotel reservation submitted! Your reservation code is ${result.uniqueCode}. Check your email for confirmation.`, 'success');
      }
    } catch (error) {
      console.error('Hotel reservation error:', error);
      addToast('Sorry, there was an error submitting your reservation. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setReservationData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      // Connectivity
      case "Free Wi-Fi": return <Wifi className="w-4 h-4" />;
      case "Wifi": return <Wifi className="w-4 h-4" />;

      // Food & Drink
      case "Free breakfast": return <Cake className="w-4 h-4" />;
      case "Breakfast": return <Cake className="w-4 h-4" />;
      case "Breakfast in the room": return <Cake className="w-4 h-4" />;
      case "Child-friendly buffet": return <Cake className="w-4 h-4" />;
      case "Restaurant": return <Store className="w-4 h-4" />;
      case "Brunch": return <Store className="w-4 h-4" />;
      case "Lunch": return <Store className="w-4 h-4" />;
      case "Dinner": return <Store className="w-4 h-4" />;
      case "Bar": return <Store className="w-4 h-4" />;
      case "Pool bar": return <Store className="w-4 h-4" />;

      // Parking & Transport
      case "Free parking": return <Truck className="w-4 h-4" />;
      case "Free on-site private parking": return <Truck className="w-4 h-4" />;
      case "Car hire": return <Truck className="w-4 h-4" />;

      // Wellness & Relaxation
      case "Spa facilities": return <Building className="w-4 h-4" />;
      case "Spa & wellness center": return <Building className="w-4 h-4" />;
      case "Wellness center": return <Building className="w-4 h-4" />;
      case "Sauna": return <Building className="w-4 h-4" />;
      case "Hot tub": return <Building className="w-4 h-4" />;
      case "Jacuzzi": return <Building className="w-4 h-4" />;
      case "Outdoor pool": return <div className="w-4 h-4 bg-current rounded-full" />;
      case "Outdoor swimming pool": return <div className="w-4 h-4 bg-current rounded-full" />;
      case "Pool": return <div className="w-4 h-4 bg-current rounded-full" />;

      // Fitness
      case "Fitness room": return <GraduationCap className="w-4 h-4" />;
      case "Fitness center": return <GraduationCap className="w-4 h-4" />;

      // Rooms & Comfort
      case "Air-conditioned": return <Building className="w-4 h-4" />;
      case "Air-conditioning": return <Building className="w-4 h-4" />;
      case "Room service": return <Building className="w-4 h-4" />;
      case "Private check-in and check-out": return <Key className="w-4 h-4" />;
      case "Family rooms": return <Users className="w-4 h-4" />;
      case "Terrace": return <Sun className="w-4 h-4" />;
      case "Terrace & lounge": return <Sun className="w-4 h-4" />;
      case "Outdoor seating area": return <Sun className="w-4 h-4" />;
      case "Smoke-free": return <Building className="w-4 h-4" />;

      // Entertainment
      case "Nightclub": return <Building className="w-4 h-4" />;
      case "Nightclub & live music": return <Building className="w-4 h-4" />;
      case "Live music": return <Building className="w-4 h-4" />;

      // Services
      case "Laundry service": return <Building className="w-4 h-4" />;
      case "Daily housekeeping": return <Building className="w-4 h-4" />;
      case "Beauty services": return <Star className="w-4 h-4" />;
      case "Full-day security": return <Shield className="w-4 h-4" />;
      case "Security Personnel": return <Shield className="w-4 h-4" />;
      case "24-hour front desk": return <Key className="w-4 h-4" />;

      // Media / Room Features
      case "Flat-screen TV": return <Tv className="w-4 h-4" />;
      case "Satellite TV": return <Tv className="w-4 h-4" />;
      case "Workspace": return <Tv className="w-4 h-4" />;

      // Fallback
      default: return <Star className="w-4 h-4" />;
    }
  };

  return (
    <section id="hotels" className="py-20 px-4 bg-gradient-to-b from-beige to-ivory relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-32 right-5 w-36 h-36 golden-swirl-2"></div>
      <div className="absolute bottom-20 left-10 w-28 h-28 golden-swirl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <Store className="w-12 h-12 text-gold mx-auto mb-6" />
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-mocha mb-4">
            Accommodations
          </h2>
          <div className="w-20 h-0.5 bg-gold mx-auto mb-6"></div>
          <p className="font-sans text-lg text-dark-soft max-w-2xl mx-auto">
            We've arranged special rates at these beautiful hotels in Ilorin for our out-of-town guests
          </p>
        </div>

        {/* Hotel Options - RESTORED SECTION */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {hotels.map((hotel, index) => (
            <div key={index} className="glass-effect p-6 rounded-3xl hover:shadow-xl transition-all duration-300">
              <div className="mb-4">
                <h3 className="font-serif text-xl font-semibold text-mocha mb-2">
                  {hotel.name}
                </h3>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(hotel.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold fill-current" />
                  ))}
                </div>
                <div className="flex items-center text-sm text-dark-soft mb-2">
                  <MapPin className="w-4 h-4 mr-1 text-gold" />
                  {hotel.distance}
                </div>
              </div>

              <p className="font-sans text-sm text-dark-soft mb-4">
                {hotel.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {hotel.amenities.slice(0, 4).map((amenity, i) => (
                  <div key={i} className="flex items-center gap-1 bg-ivory/50 px-2 py-1 rounded-full text-xs text-gold">
                    {getAmenityIcon(amenity)}
                    <span>{amenity}</span>
                  </div>
                ))}
                {hotel.amenities.length > 4 && (
                  <div className="text-xs text-gold italic">
                    +{hotel.amenities.length - 4} more amenities
                  </div>
                )}
              </div>

              <div className="text-center">
                <p className="font-sans font-semibold text-mocha mb-3">
                  {hotel.price}
                </p>
                <button 
                  onClick={() => setReservationData(prev => ({...prev, hotel: hotel.name}))}
                  className="w-full bg-gold/20 hover:bg-gold/30 text-gold border border-gold/30 px-4 py-2 rounded-xl font-sans font-medium transition-all duration-300"
                >
                  Select Hotel
                </button>
              </div>
            </div>
          ))}
        </div>

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
                {reservationData.hotel && (
                  <p className="text-xs text-gold mt-1">Selected from hotel list</p>
                )}
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
                  readOnly={!!reservationData.name}
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
                  readOnly={!!reservationData.email}
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
                placeholder="+234 810 868 0111"
                readOnly={!!reservationData.phone}
              />
              {reservationData.phone && (
                <p className="text-xs text-gold mt-1">Filled from your RSVP</p>
              )}
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-12 py-4 rounded-full font-sans font-medium transition-all duration-300 shadow-lg ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed text-white' 
                    : 'bg-gold hover:bg-gold/90 text-white transform hover:scale-105'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Request Reservation'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hotels;