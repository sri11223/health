// src/components/Home.js
import React from 'react';
import HeroSection from '../HeroTab';
import FeaturesSection from '../Features';
import WhatWeDoPage from '../whatwedo';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <WhatWeDoPage />
    </div>
  );
};

export default Home;