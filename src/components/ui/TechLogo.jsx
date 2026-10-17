import { techLogos } from "../../data/techLogos";

// Near-black brand colours would vanish on the dark theme, so those brighten to white on hover.
const isDark = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return ((n >> 16) & 255) * 0.299 + ((n >> 8) & 255) * 0.587 + (n & 255) * 0.114 < 60;
};

export default function TechLogo({ name, className = "w-5 h-5" }) {
  const logo = techLogos[name];
  if (!logo) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`shrink-0 fill-current text-gray-400 transition-colors duration-300 group-hover:text-[var(--brand)] ${className}`}
      style={{ "--brand": isDark(logo.hex) ? "#ffffff" : logo.hex }}
    >
      <path d={logo.path} />
    </svg>
  );
}
