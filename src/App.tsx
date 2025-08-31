import React from 'react';
import Hero from './components/Hero';
import EventDetails from './components/EventDetails';
import Gallery from './components/Gallery';
import RSVP from './components/RSVP';
import Contacts from './components/Contacts';
import Hotels from './components/Hotels';
import Tourism from './components/Tourism';
import './styles/globals.css';

function App() {
  return (
    <div className="min-h-screen bg-ivory">
      <Hero />
      <EventDetails />
      <Gallery />
      <RSVP />
      <Contacts />
      <Hotels />
      <Tourism />
    </div>
  );
}

export default App;