import React from 'react';
import { motion } from 'framer-motion';
import soil from '../assets/soil.jpg';
import leaf from '../assets/leaf.jpg';
import pest from '../assets/pest.jpg';

const Home = () => {
  return (
    <section
      id="home"
      className="h-screen bg-gradient-to-br from-green-100 via-lime-200 to-green-300 flex flex-col justify-center items-center px-4"
    >
   <motion.img
  src={soil}
  alt="Soil Icon"
  className="w-24 h-24 rounded-full absolute top-24 left-10 shadow-lg z-0 hover:scale-110 transition duration-300"
  initial={{ y: 0 }}
  animate={{ y: [0, -20, 0] }}
  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
/>



<motion.img
  src={leaf}
  alt="Leaf Icon"
  className="w-20 h-20 rounded-full absolute top-1/2 right-10 shadow-md z-0 hover:scale-110 transition duration-300"
  initial={{ y: 0 }}
  animate={{ y: [0, 25, 0] }}
  transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
/>

<motion.img
  src={pest}
  alt="Pest Icon"
  className="w-20 h-20 rounded-full absolute bottom-10 left-1/3 shadow-md z-0 hover:scale-110 transition duration-300"
  initial={{ y: 0 }}
  animate={{ y: [-10, 10, -10] }}
  transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
/>


      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="text-center max-w-3xl"
      >
        {/* Heading */}
        <motion.h2
          whileHover={{ scale: 1.05 }}
          className="text-5xl md:text-6xl font-extrabold text-green-900 leading-tight mb-6 tracking-wide transition duration-300 drop-shadow-[0_2px_8px_rgba(34,197,94,0.5)] hover:drop-shadow-[0_0_30px_rgba(250,204,21,1)]"
        >
          Welcome to{' '}
          <span className="text-yellow-400 drop-shadow-[0_2px_8px_rgba(234,179,8,0.5)] hover:drop-shadow-[0_0_30px_rgba(250,204,21,1)] transition duration-300">
            AgriML
          </span>
        </motion.h2>

        {/* Subheading */}
        <motion.p
          className="text-lg md:text-xl text-gray-800 font-medium mb-8"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
        >
          AI-powered predictions for soil, pests, and plant health —{' '}
          <span className="text-green-700 font-semibold ml-1 glow-text">
            all in one place.
          </span>
        </motion.p>

        {/* Call to Action Button */}
        <motion.a
          href="#predict"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="inline-block bg-green-700 text-white text-lg font-semibold px-8 py-3 rounded-xl shadow-md hover:bg-green-800 hover:drop-shadow-[0_0_10px_#4ade80] transition-all duration-300"
        >
          🚀 Try Prediction
        </motion.a>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 text-green-700 animate-bounce"
      >
        ↓ Scroll
      </motion.div>
    </section>
  );
};

export default Home;
