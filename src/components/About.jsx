import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const cardData = [
    {
      title: 'Plant Disease Detection',
      emoji: '🌿',
      description: 'Identify plant diseases early to protect crop health and boost productivity.',
    },
    {
      title: 'Soil Analysis',
      emoji: '🌱',
      description: 'Analyze soil quality to improve farming strategies and yield.',
    },
    {
      title: 'Pest Detection',
      emoji: '🐛',
      description: 'Detect pest types to reduce damage and apply appropriate remedies.',
    },
  ];

  return (
    <section
      id="about"
      className="min-h-screen bg-white flex items-center justify-center px-6 py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="bg-gradient-to-br from-green-50 via-white to-green-100 shadow-2xl rounded-xl max-w-4xl p-10 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-green-800 text-center mb-8 transition-all duration-500 hover:scale-105 hover:rotate-1 hover:text-lime-600 hover:drop-shadow-[0_0_12px_#4ade80]">
          About <span className="text-yellow-500">AgriML</span>
        </h2>

        <div className="p-5 rounded-xl hover:bg-green-50 hover:drop-shadow-[0_0_14px_#4ade80] transition-all duration-300">
          <p className="text-gray-700 text-lg leading-relaxed font-medium">
            <span className="font-semibold text-green-700">AgriML</span> is a smart agriculture assistant that uses machine learning to predict
            plant diseases, pest types, and soil categories with just a few clicks.
            <br />
            Our goal is to simplify farming decisions using technology that’s fast,
            accurate, and accessible to every farmer.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {cardData.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-md py-6 px-4 border hover:shadow-green-300 transition duration-300 relative group overflow-hidden"
            >
              <div className="text-4xl mb-2">{item.emoji}</div>
              <p className="font-semibold text-green-800">{item.title}</p>
              <p className="text-sm text-gray-600 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About;
