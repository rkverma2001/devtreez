import { useId } from "react";
import { motion } from "motion/react";

// Gradient highlight with a hand-drawn swoosh that draws itself in when scrolled into view.
export default function AnimatedUnderline({ children, className = "", animateOnMount = false }) {
  const id = `ul-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const trigger = animateOnMount
    ? { animate: { pathLength: 1, opacity: 1 } }
    : { whileInView: { pathLength: 1, opacity: 1 }, viewport: { once: true, margin: "-60px" } };

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10 text-gradient">{children}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 300 24"
        preserveAspectRatio="none"
        className="absolute left-0 -bottom-[0.18em] w-full h-[0.32em] overflow-visible"
      >
        <defs>
          <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="55%" stopColor="#b5f23d" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <motion.path
          d="M3 16 C 70 5, 160 4, 297 11"
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth="5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          {...trigger}
          transition={{ duration: 1.1, delay: 0.45, ease: [0.65, 0, 0.35, 1] }}
        />
        <motion.path
          d="M40 22 C 110 15, 200 14, 262 18"
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.6"
          initial={{ pathLength: 0, opacity: 0 }}
          {...(animateOnMount
            ? { animate: { pathLength: 1, opacity: 0.6 } }
            : { whileInView: { pathLength: 1, opacity: 0.6 }, viewport: { once: true, margin: "-60px" } })}
          transition={{ duration: 0.9, delay: 1.1, ease: [0.65, 0, 0.35, 1] }}
        />
      </svg>
    </span>
  );
}
