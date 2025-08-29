import React from 'react';
import { Heart } from 'lucide-react';
// Import your logo from the assets folder
import logoBg from '../assets/photo_2025-08-25_18-21-25-removebg-preview.png';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-ivory via-beige to-ivory flex items-center justify-center overflow-hidden">
      
      {/* Transparent Logo Background */}
      <img
        src={logoBg}
        alt="O&O #TheHesed Logo"
        className="absolute left-1/2 top-1/2 z-0 pointer-events-none select-none"
        style={{
          width: '600px',
          maxWidth: '90vw',
          height: 'auto',
          maxHeight: '80vh',
          transform: 'translate(-50%, -50%)',
          opacity: 0.18,
          filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.09))'
        }}
      />

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
        
        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-mocha mb-4 text-shadow-soft">
          Dami & Femi
        </h1>
        
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6"></div>
        
        {/* Main Tagline */}
        <p className="font-serif text-xl md:text-2xl text-dark-soft italic mb-4">
          #TheHesed - Where Purpose Met Peace 
        </p>

        {/* Hashtag Meaning */}
        <p className="font-sans text-base md:text-lg text-dark-soft/90 max-w-2xl mx-auto mb-8 leading-relaxed">
          Our Hashtag <span className="font-semibold text-mocha">"#TheHesed"</span> is a Hebrew word from 
          the Bible that describes God's faithful, covenantal love — the kind that keeps promises 
          and never gives up. It's our reminder that our marriage is built on that same kind of
          unwavering love and commitment.
        </p>

      </div>
    </section>
  )
}