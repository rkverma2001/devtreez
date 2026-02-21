import React from "react";

const HeroSection = () => {
  return (
    <section className="px-10 py-16 flex flex-col lg:flex-row items-center justify-between text-white">
      
      {/* Left Side - AI Tree SVG */}
      <div className="w-full lg:w-1/2 flex justify-center mb-12 lg:mb-0">
        <svg
          viewBox="0 0 300 400"
          className="w-[280px] h-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Trunk */}
          <path
            d="M150 350V200"
            stroke="#22C55E"
            strokeWidth="6"
          />

          {/* Branches */}
          <path d="M150 250L100 200" stroke="#22C55E" strokeWidth="4" />
          <path d="M150 250L200 200" stroke="#22C55E" strokeWidth="4" />
          <path d="M150 200L120 150" stroke="#22C55E" strokeWidth="4" />
          <path d="M150 200L180 150" stroke="#22C55E" strokeWidth="4" />

          {/* Leaves */}
          {[100, 200, 120, 180].map((x, index) => (
            <circle
              key={index}
              cx={x}
              cy={index < 2 ? 200 : 150}
              r="12"
              fill="#22C55E"
            />
          ))}
        </svg>
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
            className="px-4 py-3 rounded-lg bg-green-200 text-black focus:outline-none w-full"
          />
          <button className="bg-[#22C55E] px-6 py-3 rounded-lg font-semibold text-black hover:bg-green-400 transition">
            Book a Meeting
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;