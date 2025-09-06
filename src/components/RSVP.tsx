import React, { useState } from 'react';
import { PaperAirplaneIcon, UsersIcon } from '@heroicons/react/24/outline';
import { FormService } from '../services/formService';
import { useToast } from '../context/ToastContext';

const RSVP: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: '1',
    attendance: '',
    dietary: '',
    message: '',
    needsAccommodation: '',
    phone: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const result = await FormService.submitRSVP({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        guests: parseInt(formData.guests),
        attendance: formData.attendance,
        dietary: formData.dietary,
        message: formData.message,
        needs_accommodation: formData.needsAccommodation
      });

      if (result.success) {
        // Clear form
        setFormData({
          name: '',
          email: '',
          guests: '1',
          attendance: '',
          dietary: '',
          message: '',
          needsAccommodation: '',
          phone: ''
        });

        if (formData.needsAccommodation === 'yes') {
          // Add timestamp to URL parameters for security
          const timestamp = Date.now().toString();
          
          setTimeout(() => {
            const hotelsSection = document.getElementById('hotels');
            if (hotelsSection) {
              const params = new URLSearchParams();
              params.set('success', 'true');
              params.set('name', formData.name);
              params.set('email', formData.email);
              params.set('guests', formData.guests);
              params.set('phone', formData.phone);
              params.set('timestamp', timestamp);
              
              window.history.replaceState({}, '', `${window.location.pathname}?${params}#hotels`);
              
              hotelsSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
            }
          }, 500);
          
          addToast(`Thank you for your RSVP! Your entry code is ${result.uniqueCode}. Check your email for details. We've scrolled you to the accommodation section.`, 'success');
        } else {
          addToast(`Thank you for your RSVP! Your entry code is ${result.uniqueCode}. Check your email for confirmation details.`, 'success');
        }
      }
    } catch (error) {
      console.error('RSVP submission error:', error);
      addToast('Sorry, there was an error submitting your RSVP. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="rsvp" className="py-20 px-4 bg-gradient-to-b from-beige to-ivory relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 right-10 w-40 h-40 golden-swirl-2"></div>
      <div className="absolute bottom-10 left-5 w-28 h-28 golden-swirl"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <UsersIcon className="w-12 h-12 text-gold mx-auto mb-6" />
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-mocha mb-4">
            RSVP
          </h2>
          <div className="w-20 h-0.5 bg-gold mx-auto mb-6"></div>
          <p className="font-sans text-lg text-dark-soft max-w-2xl mx-auto">
            Please let us know if you'll be joining us for this special celebration
          </p>
          <p className="font-sans text-sm text-gold font-medium mt-4">
            Kindly respond by November 15th, 2025
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-effect p-8 md:p-12 rounded-3xl shadow-2xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block font-sans text-mocha font-medium mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
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
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gold/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold bg-ivory/50"
                placeholder="your.email@example.com"
              />
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
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gold/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold bg-ivory/50"
                placeholder="+234 810 868 0111"
              />
            </div>

            <div>
              <label htmlFor="guests" className="block font-sans text-mocha font-medium mb-2">
                Number of Guests
              </label>
              <select
                id="guests"
                name="guests"
                value={formData.guests}
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
              <label htmlFor="attendance" className="block font-sans text-mocha font-medium mb-2">
                Will you attend? *
              </label>
              <select
                id="attendance"
                name="attendance"
                required
                value={formData.attendance}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gold/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold bg-ivory/50"
              >
                <option value="">Please select</option>
                <option value="yes">Yes, I'll be there!</option>
                <option value="no">Sorry, can't make it</option>
              </select>
            </div>

            {/* Added Accommodation Question */}
            <div>
              <label htmlFor="needsAccommodation" className="block font-sans text-mocha font-medium mb-2">
                Need Accommodation? *
              </label>
              <select
                id="needsAccommodation"
                name="needsAccommodation"
                required
                value={formData.needsAccommodation}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gold/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold bg-ivory/50"
              >
                <option value="">Please select</option>
                <option value="yes">Yes, I need a hotel room</option>
                <option value="no">No, I have accommodation</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="dietary" className="block font-sans text-mocha font-medium mb-2">
              Dietary Restrictions
            </label>
            <input
              type="text"
              id="dietary"
              name="dietary"
              value={formData.dietary}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gold/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold bg-ivory/50"
              placeholder="Vegetarian, vegan, allergies, etc."
            />
          </div>

          <div className="mt-6">
            <label htmlFor="message" className="block font-sans text-mocha font-medium mb-2">
              Special Message (Optional)
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gold/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold bg-ivory/50 resize-none"
              placeholder="Share your excitement or well wishes..."
            />
          </div>

          <div className="mt-8 text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-12 py-4 rounded-full font-sans font-medium transition-all duration-300 shadow-lg inline-flex items-center gap-2 ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed text-white' 
                  : 'bg-gold hover:bg-gold/90 text-white transform hover:scale-105'
              }`}
            >
              <PaperAirplaneIcon className="w-5 h-5" />
              {isSubmitting ? 'Submitting...' : 'Send RSVP'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RSVP;