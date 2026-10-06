import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { navItems } from "../../data/siteContent";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 w-full z-50 px-4 lg:px-8 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <nav
          className={`backdrop-blur-xl border rounded-full px-5 lg:px-8 flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? "h-16 bg-ink/80 border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
              : "h-20 bg-white/[0.03] border-white/10"
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/devtreez_tree.svg"
              alt=""
              className="w-10 h-10 object-contain"
            />
            <span className="font-display text-2xl lg:text-3xl font-bold">
              <span className="text-white">dev</span>
              <span className="text-brand">treez</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden xl:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `relative text-sm font-medium group transition-colors duration-300 ${isActive ? "text-white" : "text-gray-300 hover:text-white"}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      <span
                        className={`absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-brand to-aqua transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            to="/contact"
            className="hidden xl:flex group items-center gap-2 bg-brand hover:bg-volt text-black font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(34,197,94,0.45)]"
          >
            Let's Talk
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="xl:hidden text-white"
            aria-label={mobileMenu ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenu}
          >
            {mobileMenu ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className="xl:hidden mt-3 backdrop-blur-xl bg-ink/95 border border-white/10 rounded-3xl p-6 max-h-[calc(100vh-7rem)] overflow-y-auto"
            >
              <ul className="flex flex-col gap-5">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <NavLink
                      to={item.to}
                      end={item.to === "/"}
                      onClick={() => setMobileMenu(false)}
                      className={({ isActive }) =>
                        `text-lg transition-colors ${isActive ? "text-brand font-semibold" : "text-gray-300 hover:text-brand"}`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              <Link
                to="/contact"
                onClick={() => setMobileMenu(false)}
                className="mt-8 block text-center w-full bg-brand text-black font-semibold py-3 rounded-full"
              >
                Let's Talk
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;
