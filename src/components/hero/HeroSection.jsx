import React from "react";

const HeroSection = () => {
  return (
    <section className="py-16 flex flex-col lg:flex-row items-center justify-between text-white">
      
      {/* Left Side - AI Tree SVG */}
      <div className="w-full lg:w-1/2 flex justify-center mb-12 lg:mb-0">
        <img
          src="/devtreez_tree.svg"
          alt="AI Tree"
          className="w-[350px] h-auto"
        />
      </div>

      {/* Right Side - Content */}
      <div className="w-full lg:w-1/2 max-w-xl">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          Growing Ideas <br />
          Into Global <br />
          Innovations
        </h2>

        <p className="text-gray-300 text-lg mb-8">
          Start With a Website. Scale With Apps. Rule With AI
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="What’s Your Email ?"
            className="px-4 py-1 rounded-lg bg-[#B8F29D] text-black focus:outline-none"
          />
          <button className="bg-gradient-to-r from-green-500 to-green-600
px-6 py-3 rounded-lg font-semibold text-black
hover:from-green-600 hover:to-green-700
transition-all duration-300 cursor-pointer">
  Book a Meeting
</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;