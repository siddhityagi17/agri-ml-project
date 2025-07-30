import React from "react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section
      id="contact"
      className="min-h-screen bg-gradient-to-br from-lime-100 via-green-100 to-lime-200 flex flex-col items-center justify-center px-4 py-20"
    >
      <motion.h2
  initial={{ opacity: 0, y: -20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="text-4xl md:text-5xl font-extrabold text-center mb-10 bg-gradient-to-r from-green-700 via-lime-500 to-green-700 bg-clip-text text-transparent animate-pulse drop-shadow-[0_0_10px_#84cc16]"
>
  ✨ Contact <span className="text-yellow-400 animate-glow">Us</span>
</motion.h2>


      <motion.form
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-xl"
      >
        {/* Name */}
       <div className="relative z-0 w-full mb-6 group">
  <input
    type="text"
    name="name"
    required
    className="block py-3 px-2 w-full text-md font-semibold text-green-900 bg-transparent border-0 border-b-2 border-green-500 appearance-none focus:outline-none focus:ring-0 focus:border-lime-600 peer placeholder-transparent"
    placeholder="Your Name"
  />
  <label
    htmlFor="name"
    className="absolute font-medium text-green-700 text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6"
  >
    Name
  </label>
</div>


        {/* Email */}
       <div className="relative z-0 w-full mb-6 group">
  <input
    type="email"
    name="email"
    required
    className="block py-3 px-2 w-full text-md font-semibold text-green-900 bg-transparent border-0 border-b-2 border-green-500 appearance-none focus:outline-none focus:ring-0 focus:border-lime-600 peer placeholder-transparent"
    placeholder="Your Email"
  />
  <label
    htmlFor="email"
    className="absolute font-medium text-green-700 text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6"
  >
    Email
  </label>
</div>



        {/* Message */}
       <div className="relative z-0 w-full mb-6 group">
  <textarea
    name="message"
    rows="4"
    required
    className="block py-3 px-2 w-full text-md font-semibold text-green-900 bg-transparent border-0 border-b-2 border-green-500 appearance-none focus:outline-none focus:ring-0 focus:border-lime-600 peer placeholder-transparent resize-none"
    placeholder="Your Message"
  ></textarea>
  <label
    htmlFor="message"
    className="absolute font-medium text-green-700 text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6"
  >
    Message
  </label>
</div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition duration-300 tracking-wide"
        >
          Send Message
        </motion.button>
      </motion.form>
    </section>
  );
};

export default Contact;
