import React from 'react';
import Hero from './Hero';
import MenuSection from './MenuSection';
import InfoSection from './InfoSection';
import Contact from './Contact';

const Home: React.FC = () => {
  return (
    <main className="flex flex-col w-full min-h-screen">
      <Hero />
      <InfoSection />
      <MenuSection />
      <Contact />
    </main>
  );
};

export default Home;