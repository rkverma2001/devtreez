import { motion } from "motion/react";

// Short gradient bar that grows in under a heading when it scrolls into view.
export default function HeadingBar({ className = "" }) {
  return (
    <motion.span
      aria-hidden="true"
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
      className={`block h-1 w-16 rounded-full origin-left bg-gradient-to-r from-brand via-volt to-aqua shadow-[0_0_14px_rgba(34,197,94,0.6)] ${className}`}
    />
  );
}
