import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full px-10 py-6 flex items-center justify-between text-white">
      
      {/* Logo */}
      <h1 className="text-2xl font-semibold tracking-wide">
        devtreez
      </h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <a href="#" className="hover:text-green-400 transition">
          LET'S TALK AI
        </a>
        <a href="#" className="hover:text-green-400 transition">
          ABOUT
        </a>
        <a href="#" className="hover:text-green-400 transition">
          SERVICES
        </a>
        <a href="#" className="hover:text-green-400 transition">
          INDUSTRIES
        </a>
        <a href="#" className="hover:text-green-400 transition">
          PORTFOLIO
        </a>
        <a href="#" className="hover:text-green-400 transition">
          RESOURCES
        </a>

        <button className="bg-[#22C55E] px-5 py-2 rounded-lg text-sm font-semibold text-black hover:bg-green-400 transition cursor-pointer">
          CONTACT US
        </button>
      </div>
    </nav>
  );
};

export default Navbar;