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
      name: 'Cold Press Juicer Machines, Fretta Slow Masticating Juicer',
      description: 'Slow masticating juicer with 108mm & 1.0L hopper for whole fruits and vegetables, 200W self feeding high yield juice extractor',
      price: '£77.99',
      image: 'https://m.media-amazon.com/images/I/51kPvTbNKjL.__AC_SX300_SY300_QL70_ML2_.jpg',
      amazonUrl: 'https://www.amazon.co.uk/hz/wishlist/ls/QTIVU9W0Q471',
      category: 'kitchen',
      rating: 4.5,
      features: ['108mm Wide Hopper', '1.0L Capacity', 'PCTG BPA-Free', 'Self Feeding', 'High Yield']
    },
    {
      id: '2',
      name: 'VYTRONIX 3-in-1 Cordless Vacuum Cleaner',
      description: '22.2V powerful & lightweight cordless vacuum with 40 minute run time, great for pet hair, carpets & hard floors',
      price: '£64.99',
      image: 'https://m.media-amazon.com/images/I/71wbk5eppzL._AC_SL1500_.jpg',
      amazonUrl: 'https://www.amazon.co.uk/hz/wishlist/ls/QTIVU9W0Q471',
      category: 'electronics',
      rating: 4.3,
      features: ['3-in-1 Design', '40 Min Runtime', 'Lithium-Ion Battery', 'Pet Hair Specialist', 'Lightweight']
    },
    {
      id: '3',
      name: 'HaWare Dinner Set, 12 Piece Stoneware Dinnerware',
      description: 'Service for 4, reactive glaze dining ware with plates and bowls, chip and scratch resistant',
      price: '£47.99',
      image: 'https://m.media-amazon.com/images/I/61pKXfRznML._AC_SX679_.jpg',
      amazonUrl: 'https://www.amazon.co.uk/hz/wishlist/ls/QTIVU9W0Q471',
      category: 'kitchen',
      rating: 4.6,
      features: ['12-Piece Set', 'Service for 4', 'Microwave Safe', 'Dishwasher Safe', 'Cream Khaki']
    },
    {
      id: '4',
      name: 'Richmount Nebula Dinner Set for 4',
      description: '12-piece speckled dinnerware stoneware set, scratch resistant, dishwasher & microwave safe',
      price: '£49.95',
      image: 'https://m.media-amazon.com/images/I/61rJGH4Kq5L._AC_SX679_.jpg',
      amazonUrl: 'https://www.amazon.co.uk/hz/wishlist/ls/QTIVU9W0Q471',
      category: 'kitchen',
      rating: 4.4,
      features: ['12-Piece Set', 'Speckled Design', 'Scratch Resistant', 'Microwave Safe', 'Creamy with Colorful Speckles']
    },
    {
      id: '5',
      name: 'Vencier Thick Wooden Cutting Boards Set',
      description: 'Perfect for meat carving, vegetable and bread cutting - bamboo chopping board ensemble (3pc set)',
      price: '£12.49',
      image: 'https://m.media-amazon.com/images/I/81p3fNxmAsL.__AC_SX300_SY300_QL70_ML2_.jpg',
      amazonUrl: 'https://www.amazon.co.uk/hz/wishlist/ls/QTIVU9W0Q471',
      category: 'kitchen',
      rating: 4.6,
      features: ['3-Piece Set', 'Bamboo Material', 'Thick & Durable', 'Multi-Purpose', 'Easy Clean']
    },
    {
      id: '6',
      name: 'Amazon.co.uk Gift Card',
      description: 'Gift card for custom amount in a mini envelope - perfect for letting us choose what we need most',
      price: 'Custom Amount',
      image: 'https://m.media-amazon.com/images/I/81aBF-rtg6L.__AC_SY445_SX342_QL70_ML2_.jpg',
      amazonUrl: 'https://www.amazon.co.uk/hz/wishlist/ls/QTIVU9W0Q471',
      category: 'electronics',
      rating: 4.8,
      features: ['Custom Amount', 'Mini Envelope', 'Instant Delivery', 'No Expiry', 'Flexible Choice']
    },
    {
      id: '7',
      name: 'Sensio Home Multi Functional 3 in 1 Grill Maker',
      description: 'Stylish waffle, deep fill sandwich, panini or grill maker with interchangeable non-stick plates',
      price: 'See Options',
      image: 'https://m.media-amazon.com/images/I/718X09Y+CzL._AC_SX679_.jpg',
      amazonUrl: 'https://www.amazon.co.uk/hz/wishlist/ls/QTIVU9W0Q471',
      category: 'kitchen',
      rating: 4.1,
      features: ['3-in-1 Function', 'Non-Stick Plates', 'Easy Clean', 'Secure Lock', 'Ready Lights']
    },
    {
      id: '8',
      name: 'BAIGELONG Hand Electric Mixer',
      description: '300W ultra power food kitchen mixer with 5 self-control speeds + turbo boost, 5 stainless steel attachments',
      price: '£16.99',
      image: 'https://m.media-amazon.com/images/I/71lFCR84YTL._AC_SX679_.jpg',
      amazonUrl: 'https://www.amazon.co.uk/hz/wishlist/ls/QTIVU9W0Q471',
      category: 'kitchen',
      rating: 4.1,
      features: ['300W Power', '5 Speed Settings', 'Turbo Boost', '5 Attachments', 'Handheld Design']
    },
    {
      id: '9',
      name: 'Knife Set with Block, 10 Pieces',
      description: 'Complete knife set with built-in sharpener, scissors, peeler, grater, chopping board - dishwasher safe',
      price: '£29.99',
      image: 'https://m.media-amazon.com/images/I/51xyFQsnABL._AC_SX679_.jpg',
      amazonUrl: 'https://www.amazon.co.uk/hz/wishlist/ls/QTIVU9W0Q471',
      category: 'kitchen',
      rating: 4.0,
      features: ['10-Piece Set', 'Built-in Sharpener', 'Stainless Steel', 'Dishwasher Safe', 'Complete Tools']
    },
    {
      id: '10',
      name: 'Kitchen Academy Enameled Cast Iron Cookware Set',
      description: '7 pieces induction hob pans set & Dutch oven sets, ceramic non-stick pots and pans set, PFOA & PFOS-free',
      price: '£139.99',
      image: 'https://m.media-amazon.com/images/I/71hMHr5pWtL._AC_SX679_.jpg',
      amazonUrl: 'https://www.amazon.co.uk/hz/wishlist/ls/QTIVU9W0Q471',
      category: 'kitchen',
      rating: 4.9,
      features: ['7-Piece Set', 'Cast Iron', 'Induction Compatible', 'Non-Stick', 'PFOA-Free']
    },
    {
      id: '11',
      name: 'Russell Hobbs Textures 2 Slice Toaster',
      description: 'Extra wide slots, 6 browning levels, frozen, cancel & reheat function with indicator lights, removable crumb tray',
      price: 'See Options',
      image: 'https://m.media-amazon.com/images/I/510tED5xNmL._AC_SX679_.jpg',
      amazonUrl: 'https://www.amazon.co.uk/hz/wishlist/ls/QTIVU9W0Q471',
      category: 'kitchen',
      rating: 4.3,
      features: ['Extra Wide Slots', '6 Browning Levels', 'Frozen Function', 'Indicator Lights', '850W']
    },
    {
      id: '12',
      name: 'Ninja 3-in-1 Detect Power Blender Processor Pro',
      description: 'Powerful 1200W blender with food processor bowl, dough blade, single serve cup - make pizza dough, blend, chop & mix',
      price: '£222.83',
      image: 'https://m.media-amazon.com/images/I/71SpHctDs7L._AC_SX679_.jpg',
      amazonUrl: 'https://www.amazon.co.uk/hz/wishlist/ls/QTIVU9W0Q471',
      category: 'kitchen',
      rating: 4.8,
      features: ['1200W Power', '3-in-1 Function', 'Food Processor', 'Dough Blade', 'Single Serve Cup']
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
        </div>

        {/* Gift Registry Guidelines Section */}
        <div className="mt-16 max-w-5xl mx-auto space-y-10">
          <div className="text-center">
            <h3 className="font-serif text-3xl font-semibold text-mocha mb-3">
              Gift Registry Guidelines
            </h3>
            <div className="w-20 h-0.5 bg-gold mx-auto mb-6"></div>
          </div>

          {/* Why Digital Registry */}
          <div className="bg-gold/5 p-6 rounded-2xl shadow-sm">
            <p className="font-sans text-base text-mocha leading-relaxed">
              <strong>Why a digital registry?</strong> Since we're celebrating in a
              different city from where we live, we've created this convenient
              online registry. Items will be shipped directly to our home,
              making it easier for everyone!
            </p>
          </div>

          {/* Two-column Info */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/60 rounded-xl p-6 shadow-sm">
              <h4 className="font-sans font-semibold text-mocha text-lg mb-2">
                Shipping Information
              </h4>
              <p className="font-sans text-sm text-dark-soft leading-relaxed">
                Since we're celebrating in a different city from where we live,
                we've created this convenient online registry, so you won't
                need to worry about transporting your gifts to the wedding venue.
              </p>
            </div>

            <div className="bg-white/60 rounded-xl p-6 shadow-sm">
              <h4 className="font-sans font-semibold text-mocha text-lg mb-2">
                Alternative Options
              </h4>
              <p className="font-sans text-sm text-dark-soft leading-relaxed mb-4">
                If you prefer to give a monetary gift, we've also set up options
                for cash gifts that can be transferred directly to our account.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="https://revolut.me/amiria2122"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gold hover:bg-gold/90 text-white text-center px-4 py-3 rounded-lg font-sans font-medium transition-all duration-300 shadow-md"
                >
                  💷 Give via Revolut (Pound Account)
                </a>
                <a
                  href="https://flutterwave.com/donate/vmlqzuuy3qpu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gold hover:bg-gold/90 text-white text-center px-4 py-3 rounded-lg font-sans font-medium transition-all duration-300 shadow-md"
                >
                  🇳🇬 Give via Flutterwave (Naira Account)
                </a>
              </div>
            </div>
          </div>

          {/* How it works */}
          <div className="bg-gold/10 p-6 rounded-xl border border-gold/20 shadow-sm">
            <p className="font-sans text-sm text-mocha leading-relaxed">
              <strong>How it works:</strong> Simply click "Buy on Amazon" on any
              item you'd like to gift us. Amazon will handle delivery directly to
              our home. Your presence at our wedding is the greatest gift of all –
              these items are just suggestions for those who wish to contribute to
              our new journey together.
            </p>
          </div>
        </div>

        <p className="font-sans text-lg text-dark-soft max-w-3xl mx-auto mb-4">
          {/* Used this to add extra height cause I can't stress myself */}
        </p>
        <p className="font-sans text-lg text-dark-soft max-w-3xl mx-auto mb-4">
          {/* Used this to add extra height cause I can't stress myself */}
        </p>

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
                      {[...Array(Math.floor(item.rating))].map((_, i) => (
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
                    className="flex-1 bg-gold text-white py-3 rounded-xl font-sans font-medium flex items-center justify-center gap-2 hover:bg-gold/90 transition-all"
                  >
                    Buy on Amazon <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="font-sans text-dark-soft text-lg">No items in this category yet. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default GiftRegistry;
