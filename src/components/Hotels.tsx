import React, { useState } from 'react';
import { Hotel, MapPin, Star, Wifi, Car, Utensils } from 'lucide-react';

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

  const hotels = [
    {
      name: "Kwara Hotel",
      distance: "5 minutes from venue",
      rating: 5,
      price: "₦25,000-35,000/night",
      amenities: ["Pool", "Spa", "Restaurant", "Wifi"],
      description: "Premier hotel in the heart of Ilorin"
    },
    {
      name: "De Hallmark Hotel",
      distance: "10 minutes from venue", 
      rating: 4,
      price: "₦20,000-30,000/night",
      amenities: ["Restaurant", "Conference", "Wifi", "Car"],
      description: "Modern hotel with excellent facilities"
    },
    {
      name: "Golden Tulip Essential",
      distance: "15 minutes from venue",
      rating: 4,
      price: "₦18,000-25,000/night", 
      amenities: ["Pool", "Restaurant", "Gym", "Wifi"],
      description: "Comfortable accommodation with modern amenities"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Hotel reservation:', reservationData);
    alert('Reservation request submitted! The hotel will contact you to confirm.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setReservationData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const getAmenityIcon = (amenity: string) => {
    switch(amenity) {
      case 'Wifi': return <Wifi className="w-4 h-4" />;
      case 'Pool': return <div className="w-4 h-4 bg-current rounded-full" />;
      case 'Restaurant': return <Utensils className="w-4 h-4" />;
      case 'Spa': return <div className="w-4 h-4 bg-current rounded" />;
      case 'Golf': return <div className="w-4 h-4 bg-current rounded-full" />;
      case 'Car': return <Car className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-beige to-ivory relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-32 right-5 w-36 h-36 golden-swirl-2"></div>
      <div className="absolute bottom-20 left-10 w-28 h-28 golden-swirl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <Hotel className="w-12 h-12 text-gold mx-auto mb-6" />
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-mocha mb-4">
            Accommodations
          </h2>
          <div className="w-20 h-0.5 bg-gold mx-auto mb-6"></div>
          <p className="font-sans text-lg text-dark-soft max-w-2xl mx-auto">
            We've arranged special rates at these beautiful hotels in Ilorin for our out-of-town guests
          </p>
        </div>

        {/* Hotel Options */}
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
                {hotel.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-1 bg-ivory/50 px-2 py-1 rounded-full text-xs text-gold">
                    {getAmenityIcon(amenity)}
                    <span>{amenity}</span>
                  </div>
                ))}
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
                />
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
                />
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
              />
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