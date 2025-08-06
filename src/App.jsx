import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Prediction from './components/Prediction';
import Contact from './components/Contact';

const App = () => {
  return (
    <div className="font-sans">
      <Navbar />
      <Home />
      <About />
      <Prediction />
      <Contact />
     <footer className="text-center py-6 bg-gradient-to-r from-green-100 via-lime-100 to-green-200 shadow-inner">
  <h4
    className="text-lg md:text-xl font-semibold tracking-wide text-green-800 transition duration-300 hover:scale-105 hover:text-yellow-500"
  >
    © 2025 <span className="font-bold text-green-600">AgriML</span>. All Rights Reserved.
  </h4>
  <p className="text-xs text-gray-600 mt-1">
    With AgriML Team 🌿 
  </p>
</footer>

    </div>
  );
};

export default App;
