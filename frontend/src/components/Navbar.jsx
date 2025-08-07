import React from 'react';
import { Link } from 'react-scroll';

const navItems = ["home", "about", "predict", "contact"];

const Navbar = () => {
  return (
    <nav className="fixed w-full bg-green-700 shadow-xl z-50 font-sans">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
       <h1
  className="text-3xl font-extrabold text-white tracking-wide transform transition-transform duration-700 ease-in-out hover:rotate-[360deg] hover:scale-110"
>
  Agri<span className="text-yellow-300">ML</span>
</h1>


        <div className="flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item}
              to={item}
              smooth={true}
              duration={500}
              className="relative cursor-pointer text-yellow-200 uppercase tracking-wider text-sm font-semibold transition-all duration-300 ease-in-out hover:text-white hover:scale-105 group"
            >
              <span className="relative z-10">{item}</span>

              {/* animated underline */}
              <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500 ease-out"></span>

              {/* glowing border animation */}
              <span className="absolute -left-1 -right-1 -top-1 -bottom-1 border border-yellow-300 opacity-0 group-hover:opacity-60 rounded-md transition-all duration-500 group-hover:shadow-[0_0_10px_2px_#fde047]"></span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
