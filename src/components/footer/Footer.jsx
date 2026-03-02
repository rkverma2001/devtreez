import { Facebook, Instagram, Linkedin, Twitter, Github } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-slate-300 rounded-t-4xl  pt-16">

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Top Section */}
        <div className="grid md:grid-cols-4 gap-12">

          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold text-white">
              dev<span className="text-emerald-500">treez</span>
            </h2>

            <p className="mt-4 text-sm text-slate-400 leading-relaxed">
              Building scalable digital products powered by AI, cloud, 
              and cutting-edge engineering. We transform ideas into 
              high-performance systems.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              {[Facebook, Twitter, Linkedin, Instagram, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-slate-800 flex items-center 
                             justify-center hover:bg-emerald-500/20 
                             transition duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-3 text-sm">
              <li>Custom Software Development</li>
              <li>AI & Machine Learning Solutions</li>
              <li>Cloud Architecture</li>
              <li>Full Stack Web Development</li>
              <li>Mobile Application Development</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Stay Updated
            </h4>

            <p className="text-sm text-slate-400 mb-4">
              Get insights on AI, technology trends, and product engineering.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-slate-800 border border-slate-700 
                           rounded-lg px-4 py-2 text-sm 
                           placeholder:text-slate-500
                           focus:outline-none focus:ring-1 
                           focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-green-600
                           px-4 py-2 rounded-lg text-sm font-semibold 
                           text-white hover:opacity-90 transition cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 mt-12" />

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col md:flex-row 
                        justify-between items-center text-xs text-slate-500">

          <p>
            © {new Date().getFullYear()} Devtreez Technologies. All rights reserved.
          </p>

          <div className="flex gap-6 mt-3 md:mt-0">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;