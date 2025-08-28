import React from 'react';
import { Calendar, Clock, MapPin, Shirt } from 'lucide-react';

const EventDetails: React.FC = () => {
  const events = [
    {
      title: "Traditional Wedding",
      date: "December 9th, 2025",
      time: "10:00 AM - 2:00 PM",
      location: "Family Compound",
      dress: "Traditional Attire"
    },
    {
      title: "Church Wedding",
      date: "December 10th, 2025", 
      time: "10:00 AM - 12:00 PM",
      location: "UMCA Chapel, Tanke",
      dress: "Corporate - Black Tie"
    },
    {
      title: "Reception & Dinner",
      date: "December 10th, 2025",
      time: "2:00 PM - 8:00 PM", 
      location: "Reception Venue",
      dress: "Corporate - Black Tie"
    }
  ];

  return (
    <section id="details" className="py-20 px-4 bg-gradient-to-b from-ivory to-beige relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-10 right-10 w-28 h-28 golden-swirl"></div>
      <div className="absolute bottom-20 left-5 w-36 h-36 golden-swirl-2"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-mocha mb-4">
            Celebration Timeline
          </h2>
          <div className="w-20 h-0.5 bg-gold mx-auto mb-6"></div>
          <p className="font-sans text-lg text-dark-soft max-w-2xl mx-auto">
            Join us for a celebration of love, laughter, and unforgettable memories in beautiful Ilorin
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div key={index} className="glass-effect p-8 rounded-3xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center mb-6">
                <h3 className="font-serif text-2xl font-semibold text-mocha mb-2">
                  {event.title}
                </h3>
                <div className="w-12 h-0.5 bg-gold mx-auto"></div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gold mr-3 flex-shrink-0" />
                  <span className="font-sans text-dark-soft">{event.date}</span>
                </div>
                
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gold mr-3 flex-shrink-0" />
                  <span className="font-sans text-dark-soft">{event.time}</span>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-gold mr-3 flex-shrink-0" />
                  <span className="font-sans text-dark-soft">{event.location}</span>
                </div>
                
                <div className="flex items-center">
                  <Shirt className="w-5 h-5 text-gold mr-3 flex-shrink-0" />
                  <span className="font-sans text-dark-soft">{event.dress}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="glass-effect p-8 rounded-3xl max-w-3xl mx-auto">
            <h3 className="font-serif text-3xl font-semibold text-mocha mb-4">
              Church Wedding Venue
            </h3>
            <p className="font-sans text-lg text-dark-soft mb-4">
              United Mission Church of Africa (UMCA) Chapel
            </p>
            <p className="font-sans text-dark-soft">
              Tanke, Ilorin, Kwara State, Nigeria
            </p>
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block mt-4 text-gold hover:text-gold/80 font-medium transition-colors duration-300"
            >
              Get Directions →
            </a>
            <div className="mt-6 p-4 bg-gold/10 rounded-xl">
              <p className="font-sans text-sm text-mocha font-medium mb-2">Wedding Colors</p>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-ivory border border-gold/30 rounded-full"></div>
                <div className="w-4 h-4 bg-beige rounded-full"></div>
                <div className="w-4 h-4 bg-gold rounded-full"></div>
                <div className="w-4 h-4 bg-amber-100 rounded-full"></div>
                <span className="font-sans text-xs text-dark-soft ml-2">Ivory, Beige, Gold & Mousse</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;