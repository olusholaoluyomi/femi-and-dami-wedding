import React, { useState } from 'react';
import { Gift, ExternalLink, Heart, ShoppingCart, Star } from 'lucide-react';

interface GiftItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  amazonUrl: string;
  category: string;
  rating?: number;
  features?: string[];
}

const GiftRegistry: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample gift items - you can replace these with your actual Amazon links
  const giftItems: GiftItem[] = [
    {
      id: '1', 
      name: 'Ninja Foodi Personal Blender',
      description: 'Powerful personal blender perfect for smoothies, protein shakes, and frozen drinks',
      price: '£79.99',
      image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg',
      amazonUrl: 'https://www.amazon.co.uk/hz/wishlist/ls/QTIVU9W0Q471',
      category: 'kitchen',
      rating: 5,
      features: ['Personal Size', 'Powerful Motor', 'BPA-Free', 'Easy Clean']
    },
    {
      id: '2',
      name: 'Egyptian Cotton Bedding Set',
      description: 'Luxurious 400 thread count Egyptian cotton bedding set',
      price: '£89.99',
      image: 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg',
      amazonUrl: 'https://www.amazon.co.uk/hz/wishlist/ls/QTIVU9W0Q471',
      category: 'bedroom',
      rating: 5,
      features: ['400 Thread Count', 'Egyptian Cotton', 'Machine Washable', 'Hypoallergenic']
    },
    {
      id: '3',
      name: 'Sage Barista Express Coffee Machine',
      description: 'Professional espresso machine with built-in grinder',
      price: '£499.99',
      image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg',
      amazonUrl: 'https://www.amazon.co.uk/hz/wishlist/ls/QTIVU9W0Q471',
      category: 'kitchen',
      rating: 5,
      features: ['Built-in Grinder', 'Steam Wand', 'Pressure Gauge', 'Stainless Steel']
    },
    {
      id: '4',
      name: 'Amazon Echo Show 8',
      description: 'Smart display with Alexa for video calls and smart home control',
      price: '£119.99',
      image: 'https://images.pexels.com/photos/4790268/pexels-photo-4790268.jpeg',
      amazonUrl: 'https://www.amazon.co.uk/hz/wishlist/ls/QTIVU9W0Q471',
      category: 'electronics',
      rating: 5,
      features: ['8" HD Display', 'Voice Control', 'Video Calling', 'Smart Home Hub']
    },
    {
      id: '5',
      name: 'Denby Pottery Dinnerware Set',
      description: 'Handcrafted stoneware dinnerware set, perfect for entertaining',
      price: '£159.99',
      image: 'https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg',
      amazonUrl: 'https://www.amazon.co.uk/hz/wishlist/ls/QTIVU9W0Q471',
      category: 'kitchen',
      rating: 5,
      features: ['16-Piece Set', 'Handcrafted', 'Dishwasher Safe', 'Oven Safe']
    },
    {
      id: '6',
      name: 'Luxury Throw Cushions',
      description: 'Velvet throw cushions with gold embroidered details',
      price: '£45.99',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      amazonUrl: 'https://www.amazon.co.uk/hz/wishlist/ls/QTIVU9W0Q471',
      category: 'home-decor',
      rating: 5,
      features: ['Set of 2', 'Velvet Fabric', 'Gold Embroidery', 'Hidden Zipper']
    },
    {
      id: '7',
      name: 'Le Creuset Cast Iron Casserole',
      description: 'Premium enameled cast iron casserole dish for slow cooking',
      price: '£249.99',
      image: 'https://images.pexels.com/photos/4226769/pexels-photo-4226769.jpeg',
      amazonUrl: 'https://www.amazon.co.uk/hz/wishlist/ls/QTIVU9W0Q471',
      category: 'kitchen',
      rating: 5,
      features: ['Cast Iron', 'Enamel Coating', 'Oven Safe', 'Lifetime Warranty']
    },
    {
      id: '8',
      name: 'Dyson V15 Detect Vacuum',
      description: 'Advanced cordless vacuum with laser dust detection',
      price: '£599.99',
      image: 'https://images.pexels.com/photos/4107120/pexels-photo-4107120.jpeg',
      amazonUrl: 'https://www.amazon.co.uk/hz/wishlist/ls/QTIVU9W0Q471',
      category: 'electronics',
      rating: 5,
      features: ['Cordless', 'Laser Detection', '60min Runtime', 'HEPA Filter']
    },
    {
      id: '9',
      name: 'Luxury Towel Set',
      description: 'Premium Egyptian cotton towel set in ivory and gold',
      price: '£79.99',
      image: 'https://images.pexels.com/photos/6045242/pexels-photo-6045242.jpeg',
      amazonUrl: 'https://www.amazon.co.uk/hz/wishlist/ls/QTIVU9W0Q471',
      category: 'bedroom',
      rating: 5,
      features: ['Egyptian Cotton', '600 GSM', 'Quick Dry', 'Set of 6']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Gifts', icon: <Gift className="w-4 h-4" /> },
    { id: 'kitchen', name: 'Kitchen', icon: <ShoppingCart className="w-4 h-4" /> },
    { id: 'bedroom', name: 'Bedroom', icon: <Heart className="w-4 h-4" /> },
    { id: 'electronics', name: 'Electronics', icon: <Star className="w-4 h-4" /> },
    { id: 'home-decor', name: 'Home Decor', icon: <Gift className="w-4 h-4" /> }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? giftItems 
    : giftItems.filter(item => item.category === selectedCategory);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-ivory to-beige relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 right-10 w-32 h-32 golden-swirl"></div>
      <div className="absolute bottom-32 left-5 w-40 h-40 golden-swirl-2"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gold opacity-5 organic-shape"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <Gift className="w-12 h-12 text-gold mx-auto mb-6" />
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-mocha mb-4">
            Gift Registry
          </h2>
          <div className="w-20 h-0.5 bg-gold mx-auto mb-6"></div>
          <p className="font-sans text-lg text-dark-soft max-w-3xl mx-auto mb-4">
            Your presence is the greatest gift, but if you'd like to bless us with something special, 
            we've curated a selection of items that will help us build our new home together.
          </p>
          <div className="glass-effect p-6 rounded-2xl max-w-2xl mx-auto">
            <p className="font-sans text-sm text-mocha">
              <strong>Why a digital registry?</strong> Since we're celebrating in a different city from where we live, 
              we've created this convenient online registry. Items will be shipped directly to our home, 
              making it easier for everyone!
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-sans font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gold text-white shadow-lg'
                  : 'bg-white/50 text-mocha hover:bg-gold/20 border border-gold/30'
              }`}
            >
              {category.icon}
              {category.name}
            </button>
          ))}
        </div>

        {/* Gift Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="glass-effect rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mocha/60 via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="font-sans font-semibold text-mocha text-sm">{item.price}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-serif text-xl font-semibold text-mocha flex-1">
                    {item.name}
                  </h3>
                  {item.rating && (
                    <div className="flex items-center gap-1 ml-2">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-gold fill-current" />
                      ))}
                    </div>
                  )}
                </div>
                
                <p className="font-sans text-dark-soft text-sm mb-4 leading-relaxed">
                  {item.description}
                </p>

                {item.features && (
                  <div className="mb-4">
                    <p className="font-sans text-xs font-medium text-gold uppercase tracking-wide mb-2">
                      Key Features
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {item.features.map((feature, i) => (
                        <span 
                          key={i}
                          className="bg-gold/10 text-gold px-2 py-1 rounded-full text-xs font-sans"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <a
                    href={item.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gold hover:bg-gold/90 text-white px-4 py-3 rounded-xl font-sans font-medium transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Buy on Amazon
                  </a>
                  <a
                    href={item.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-transparent border-2 border-gold/30 text-gold hover:bg-gold/10 px-3 py-3 rounded-xl transition-all duration-300 flex items-center justify-center"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-16 text-center">
          <div className="glass-effect p-8 rounded-3xl max-w-4xl mx-auto">
            <h3 className="font-serif text-2xl font-semibold text-mocha mb-4">
              Gift Registry Guidelines
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-sans font-semibold text-mocha mb-2">Shipping Information</h4>
                <p className="font-sans text-sm text-dark-soft mb-4">
                  Since we're celebrating in a different city from where we live, we've created this convenient 
                  online registry. All gifts will be shipped directly to our home address in the UK, so you don't 
                  need to worry about transportation to the wedding venue.
                </p>
              </div>
              <div>
                <h4 className="font-sans font-semibold text-mocha mb-2">Alternative Options</h4>
                <p className="font-sans text-sm text-dark-soft mb-4">
                  If you prefer to give a monetary gift, we've also set up options for cash gifts 
                  that can be transferred directly to our account. 
                  <a 
                    href="#cash-gifts" 
                    className="text-gold hover:text-gold/80 font-medium underline transition-colors duration-300"
                  >
                    Click Here to continue
                  </a>
                </p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gold/10 rounded-xl">
              <p className="font-sans text-sm text-mocha">
                <strong>How it works:</strong> Simply click "Buy on Amazon" on any item you'd like to gift us. 
                Amazon will handle delivery directly to our home. Your presence at our wedding is the greatest 
                gift of all - these items are just suggestions for those who wish to contribute to our new journey together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiftRegistry;