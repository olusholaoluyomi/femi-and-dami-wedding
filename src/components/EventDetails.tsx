import React from 'react';
import { Calendar, Clock, MapPin, Shirt } from 'lucide-react';

const EventDetails: React.FC = () => {
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

        {/* Reuse Venue Section Twice */}
        <div className="space-y-16">
          {[1, 2].map((idx) => (
            <div key={idx} className="text-center">
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
