import React from 'react';
import { Camera } from 'lucide-react';

const Gallery: React.FC = () => {
  const images = [
    'https://images.pexels.com/photos/1488315/pexels-photo-1488315.jpeg',
    'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg',
    'https://images.pexels.com/photos/1779424/pexels-photo-1779424.jpeg',
    'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg',
    'https://images.pexels.com/photos/1779426/pexels-photo-1779426.jpeg',
    'https://images.pexels.com/photos/1444424/pexels-photo-1444424.jpeg'
  ];

  return (
    <section className="py-20 px-4 bg-ivory relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-32 left-10 w-24 h-24 bg-gold opacity-5 organic-shape"></div>
      <div className="absolute bottom-40 right-5 w-32 h-32 golden-swirl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <Camera className="w-12 h-12 text-gold mx-auto mb-6" />
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-mocha mb-4">
            Our Love Story
          </h2>
          <div className="w-20 h-0.5 bg-gold mx-auto mb-6"></div>
          <p className="font-sans text-lg text-dark-soft max-w-2xl mx-auto">
            From friendship to forever - the beautiful journey of Dami & Femi
          </p>
        </div>

        <div className="text-center mt-12">
          <div className="glass-effect p-8 rounded-3xl max-w-4xl mx-auto mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-mocha mb-4">Dami's Story</h3>
                <p className="font-sans text-sm text-dark-soft text-left leading-relaxed">
                  "It all started when a friend sent me a message asking to send my number to a friend of hers. My first instinct was to say no, but I reluctantly said yes. I wasn't interested in any relationship and was preparing to travel for my masters in 3 weeks.
                  <br/><br/>
                  I got a message from someone who introduced himself as Boluwatifemi - I thought nobody bears that name! We met up in Ilorin, I was nonchalant, he did most of the talking, and I left thinking we could be friends.
                  <br/><br/>
                  I travelled and focused on my Masters. We talked occasionally, then more consistently. Femi became one of my close friends, and the attraction grew. I loved how selfless he is and his love for God. After two years, he asked the question, and after much scrutiny... I said yes. And now we are here."
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-semibold text-mocha mb-4">Femi's Story</h3>
                <p className="font-sans text-sm text-dark-soft text-left leading-relaxed">
                  "My heart wasn't looking for love; it was chasing purpose. Then one day, a conversation with a friend changed everything when Damilola's picture appeared.
                  <br/><br/>
                  I was captivated by her beauty and incredible calmness. I literally begged for her number! Our first date in Ilorin - I spoke the entire time while she smiled and drank water. I thought, 'This can't work. She's too calm for my pace!'
                  <br/><br/>
                  Through our chats, I discovered the incredible woman behind the calm smile: her depth, solution-driven advice, respect, and fierce drive for purpose. Falling in love became the easiest thing. After two years of friendship, prayer, and confirmation, I knew she was the one. My analytical baby girl took her time, sought counsel, and gave me the most cherished 'Yes.' Knowing my Ayanfe has been my greatest blessing."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;