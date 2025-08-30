import React from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';

const Contacts: React.FC = () => {
  const contacts = [
    {
      name: "Babatunde Oluwadunsin",
      role: "Bride Brother",
      phone: "+234810868011",
      email: "dami@example.com",
      message: "Feel free to send a Whatsapp message in case you call and I am unable to pick at the moment and vice-versa!"
    },
    {
      name: "Oluyomi Olushola Michael", 
      role: "Groom Brother",
      phone: "+2348148075891",
      message: "Feel free to send a Whatsapp message in case you call and I am unable to pick at the moment and vice-versa!"
    }
  ];

  return (
    <section className="py-20 px-4 bg-ivory relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-16 left-5 w-32 h-32 golden-swirl"></div>
      <div className="absolute bottom-24 right-10 w-24 h-24 bg-gold opacity-5 organic-shape-2"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <MessageCircle className="w-12 h-12 text-gold mx-auto mb-6" />
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-mocha mb-4">
            Get in Touch
          </h2>
          <div className="w-20 h-0.5 bg-gold mx-auto mb-6"></div>
          <p className="font-sans text-lg text-dark-soft max-w-2xl mx-auto">
            Have questions about the wedding? Feel free to reach out to either of us
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {contacts.map((contact, index) => (
            <div key={index} className="glass-effect p-8 rounded-3xl text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-24 h-24 bg-gradient-to-br from-gold to-gold/70 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="font-serif text-2xl font-bold text-white">
                  {contact.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>

              <h3 className="font-serif text-3xl font-semibold text-mocha mb-2">
                {contact.name}
              </h3>
              
              <p className="font-sans text-gold font-medium mb-6">
                {contact.role}
              </p>

              <div className="space-y-4 mb-6">
                <a 
                  href={`tel:${contact.phone}`}
                  className="flex items-center justify-center gap-3 text-dark-soft hover:text-mocha transition-colors duration-300"
                >
                  <Phone className="w-5 h-5 text-gold" />
                  <span className="font-sans">{contact.phone}</span>
                </a>
                
                <a 
                  href={`mailto:${contact.email}`}
                  className="flex items-center justify-center gap-3 text-dark-soft hover:text-mocha transition-colors duration-300"
                >
                  <Mail className="w-5 h-5 text-gold" />
                  <span className="font-sans">{contact.email}</span>
                </a>
              </div>

              <p className="font-sans text-sm text-dark-soft italic">
                "{contact.message}"
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="glass-effect p-8 rounded-3xl max-w-2xl mx-auto">
            <h3 className="font-serif text-2xl font-semibold text-mocha mb-4">
              Wedding Party & Family
            </h3>
            <p className="font-sans text-dark-soft mb-4">
              For questions about accommodations, transportation, or other wedding details, 
              you can also reach out to our families and wedding party.
            </p>
            <p className="font-sans text-sm text-gold font-medium">
              Contact information available upon request
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;