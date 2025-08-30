import React from 'react';
import { Camera, Wine, Mountain, Utensils, Car, MapPin } from 'lucide-react';

const Tourism: React.FC = () => {
  const attractions = [
    {
      icon: <Mountain className="w-8 h-8" />,
      title: "Owu Falls",
      description: "Visit one of West Africa's most spectacular waterfalls in Kwara State",
      locations: ["Hiking Experience", "One with Nature", "Road Trip", "Photography Spots", "Picnic & Relaxation", "Bird Watching", "Swimming in Natural Pools", "Adventure & Exploration", "Camping Experience"],
      image: "https://i.ytimg.com/vi/Mg_aEuZ2D7I/hq720.jpg"
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Esie Museum", 
      description: "Explore ancient stone sculptures and rich Yoruba cultural heritage",
      locations: ["Soapstone Mystery", "History Shrine", "Cultural & Historical Tour", "Art Appreciation", "Photography Spots", "Guided Museum Experience", "Local Craft Exploration", "One with History", "Learning & Discovery", "Family Outing"],
      image: "https://www.thehopenewspaper.com/wp-content/uploads/2024/02/Jog-78.jpg"
    },
    {
      icon: <Utensils className="w-8 h-8" />,
      title: "Innovation & Tech",
description: "Explore cutting-edge technology, startups, and creative spaces in Ilorin",
locations: ["Co-Working Spaces", "Startup Showcases", "Tech Workshops", "Networking Events", "AI & Robotics Demos"],
      image: "https://miro.medium.com/v2/resize:fit:1400/1*qKGmxa8aGXgEbnjytY3Shg.jpeg"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Ilorin Emirate",
      description: "Visit the historic Emir's Palace and learn about local traditions",
      locations: ["Emir's Palace", "Central Mosque", "Traditional Markets"],
      image: "https://images.pexels.com/photos/1152254/pexels-photo-1152254.jpeg"
    },
    {
      icon: <Wine className="w-8 h-8" />,
      title: "Pategi Regatta",
      description: "Experience the annual fishing festival and river culture",
      locations: ["River Niger", "Pategi", "Cultural Festival"],
      image: "https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg"
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: "Shopping & Markets",
      description: "Explore vibrant local markets and shopping centers",
      locations: ["Mandate Market", "Shoprite Ilorin", "Local Crafts"],
      image: "https://images.pexels.com/photos/3764568/pexels-photo-3764568.jpeg"
    }
  ];

  return (
    <section className="py-20 px-4 bg-ivory relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 left-5 w-32 h-32 golden-swirl"></div>
      <div className="absolute bottom-32 right-10 w-40 h-40 golden-swirl-2"></div>
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-gold opacity-5 organic-shape"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <Camera className="w-12 h-12 text-gold mx-auto mb-6" />
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-mocha mb-4">
            Explore Ilorin & Kwara State
          </h2>
          <div className="w-20 h-0.5 bg-gold mx-auto mb-6"></div>
          <p className="font-sans text-lg text-dark-soft max-w-2xl mx-auto">
            Discover the rich culture and beautiful attractions of Ilorin and Kwara State
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {attractions.map((attraction, index) => (
            <div 
              key={index} 
              className="glass-effect rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={attraction.image} 
                  alt={attraction.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mocha/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <div className="text-gold bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                    {attraction.icon}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold text-mocha mb-3">
                  {attraction.title}
                </h3>
                
                <p className="font-sans text-dark-soft text-sm mb-4">
                  {attraction.description}
                </p>

                <div className="space-y-2">
                  <p className="font-sans text-xs font-medium text-gold uppercase tracking-wide">
                    Recommended Places
                  </p>
                  <ul className="space-y-1">
                    {attraction.locations.map((location, i) => (
                      <li key={i} className="font-sans text-sm text-dark-soft flex items-center">
                        <div className="w-1.5 h-1.5 bg-gold rounded-full mr-2 flex-shrink-0"></div>
                        {location}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="glass-effect p-8 rounded-3xl max-w-3xl mx-auto">
            <h3 className="font-serif text-2xl font-semibold text-mocha mb-4">
              Need Help Planning?
            </h3>
            <p className="font-sans text-dark-soft mb-6">
              Need help exploring Ilorin? Our local contacts can help arrange tours and plan your perfect visit to Kwara State.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#contacts"
                className="bg-gold hover:bg-gold/90 text-white px-8 py-3 rounded-full font-sans font-medium transition-all duration-300 transform hover:scale-105"
              >
                Contact Us
              </a>
              <a 
                href="https://kwarastate.gov.ng" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-mocha text-mocha hover:bg-mocha hover:text-ivory px-8 py-3 rounded-full font-sans font-medium transition-all duration-300"
              >
                Visit Kwara State
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tourism;