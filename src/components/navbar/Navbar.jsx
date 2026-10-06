import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const navItems = [
    "Home",
    "Transformations",
    "Solutions",
    "Industries",
    "About",
    "Insights",
    "Contact",
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 lg:px-8 py-5">
      <div className="max-w-7xl mx-auto">
        <nav className="backdrop-blur-xl bg-black/40 border border-[#1E2A1E] rounded-full px-6 lg:px-8 h-20 flex items-center justify-between shadow-[0_0_30px_rgba(76,175,80,0.08)]">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/images/devtreez-logo.png"
              alt="devtreez"
              className="w-10 h-10 object-contain"
            />

            <h1 className="text-3xl font-bold">
              <span className="text-white">dev</span>
              <span className="text-[#4CAF50]">treez</span>
            </h1>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-10">
            {navItems.map((item, index) => (
              <li
                key={index}
                className="relative text-gray-300 hover:text-[#4CAF50] transition-all duration-300 cursor-pointer text-sm font-medium group"
              >
                {item}

                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#4CAF50] transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden lg:flex items-center">
            <button className="group flex items-center gap-2 bg-[#4CAF50] hover:bg-[#58d25d] text-black font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(76,175,80,0.4)]">
              Let's Talk

              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-all"
              />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="lg:hidden text-white"
          >
            {mobileMenu ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="lg:hidden mt-4 backdrop-blur-xl bg-black/90 border border-[#1E2A1E] rounded-3xl p-6">

            <ul className="flex flex-col gap-6">
              {navItems.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-300 hover:text-[#4CAF50] transition-all"
                >
                  {item}
                </li>
              ))}
            </ul>

            <button className="mt-8 w-full bg-[#4CAF50] text-black font-semibold py-3 rounded-full">
              Let's Talk
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;