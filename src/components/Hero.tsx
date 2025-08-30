import React from 'react';
import { Heart } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-ivory via-beige to-ivory flex items-center justify-center overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 golden-swirl"></div>
      <div className="absolute bottom-40 right-20 w-40 h-40 golden-swirl-2"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gold opacity-5 organic-shape"></div>
      <div className="absolute bottom-1/4 left-10 w-20 h-20 bg-mocha opacity-10 organic-shape-2"></div>
      
      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-8">
          <Heart className="w-12 h-12 text-gold mx-auto mb-6 animate-pulse" />
        </div>
        
        {/* Couples Logo */}
        <div className="mb-8">
          <img 
            src="/logo.png" 
            alt="Dami & Femi Logo" 
            className="w-96 h-96 md:w-[30rem] md:h-[30rem] lg:w-[38rem] lg:h-[38rem] mx-auto object-contain"
          />

        </div>
      
        
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6"></div>
        
        {/* Main Tagline */}

        {/* Hashtag Meaning */}
        <p className="font-sans text-base md:text-lg text-dark-soft/90 max-w-2xl mx-auto mb-8 leading-relaxed">
          Our Hashtag <span className="font-semibold text-mocha">"#TheHesed"</span> is a Hebrew word from 
          the Bible that describes God's faithful, covenantal love — the kind that keeps promises 
          and never gives up. It’s our reminder that our marriage is built on that same kind of 
          loyal, action-oriented love.
        </p>
        
        {/* Event Date & Venue */}
        <div className="glass-effect px-8 py-4 rounded-full inline-block mb-8">
          <p className="font-sans text-lg text-mocha font-medium">
            December 10th, 2025 • United Mission Church of Africa (UMCA) Chapel, Tanke, Ilorin, Kwara State. Nigeria.
          </p>
        </div>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#rsvp" 
            className="bg-gold hover:bg-gold/90 text-white px-8 py-3 rounded-full font-sans font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            RSVP Now
          </a>
          <a 
            href="#details" 
            className="bg-transparent border-2 border-mocha text-mocha hover:bg-mocha hover:text-ivory px-8 py-3 rounded-full font-sans font-medium transition-all duration-300"
          >
            Event Details
          </a>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-1 h-8 bg-gradient-to-b from-gold to-transparent rounded-full"></div>
      </div>
    </section>
  );
};

export default Hero;
