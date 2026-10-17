import { Facebook, Instagram, Linkedin, Twitter, Github, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { contactInfo, services } from "../../data/siteContent";
import NewsletterForm from "./NewsletterForm";

const Footer = () => {
  return (
    <footer className="relative bg-surface text-slate-300 border-t border-white/10 rounded-t-[2.5rem] pt-20 overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-brand/10 blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">

        {/* Top Section */}
        <div className="grid md:grid-cols-4 gap-12">

          {/* Brand Section */}
          <div>
            <h2 className="font-display text-2xl font-bold text-white">
              dev<span className="text-brand">treez</span>
            </h2>

            <p className="mt-4 text-sm text-slate-400 leading-relaxed">
              Building scalable digital products powered by AI, cloud, 
              and cutting-edge engineering. We transform ideas into 
              high-performance systems.
            </p>

            {/* Contact details */}
            <address className="not-italic mt-5 space-y-2 text-sm">
              <a href={contactInfo.phoneHref} className="flex items-center gap-2.5 hover:text-brand transition-colors">
                <Phone size={15} className="text-brand" /> {contactInfo.phone}
              </a>
              <a href={contactInfo.emailHref} className="flex items-center gap-2.5 hover:text-brand transition-colors">
                <Mail size={15} className="text-brand" /> {contactInfo.email}
              </a>
              <p className="flex items-center gap-2.5">
                <MapPin size={15} className="text-brand" /> {contactInfo.address}
              </p>
            </address>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              {[Facebook, Twitter, Linkedin, Instagram, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center 
                             justify-center hover:bg-brand hover:text-black hover:border-brand 
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
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to="/services" state={{ scrollTo: s.slug }} className="hover:text-brand transition-colors">{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              {[
                ["/about", "About Us"],
                ["/projects", "Projects"],
                ["/technologies", "Technology Demos"],
                ["/industries", "Industries"],
                ["/careers", "Careers"],
                ["/contact", "Contact"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-brand transition-colors">{label}</Link>
                </li>
              ))}
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

            <NewsletterForm />
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12" />

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

      {/* Oversized wordmark */}
      <p
        aria-hidden="true"
        className="relative font-display font-bold text-outline text-center leading-none select-none text-[22vw] -mb-[4vw]"
      >
        devtreez
      </p>
    </footer>
  );
};

export default Footer;