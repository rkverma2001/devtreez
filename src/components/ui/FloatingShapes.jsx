import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

// Decorative animated objects for section backgrounds: wireframe cube, hexagon, ring,
// twinkling crosses, dot grid and glowing orb. Desktop only, purely decorative.

export function Cube({ size = 115 }) {
  const half = size / 2;
  const faces = [
    `rotateY(0deg) translateZ(${half}px)`,
    `rotateY(90deg) translateZ(${half}px)`,
    `rotateY(180deg) translateZ(${half}px)`,
    `rotateY(-90deg) translateZ(${half}px)`,
    `rotateX(90deg) translateZ(${half}px)`,
    `rotateX(-90deg) translateZ(${half}px)`,
  ];
  return (
    <div style={{ width: size, height: size, perspective: 600 }}>
      <div className="relative w-full h-full animate-cube [transform-style:preserve-3d]">
        {faces.map((t) => (
          <div
            key={t}
            className="absolute inset-0 border border-brand/50 bg-gradient-to-br from-brand/10 to-aqua/5 shadow-[inset_0_0_20px_rgba(34,197,94,0.15)]"
            style={{ transform: t }}
          />
        ))}
      </div>
    </div>
  );
}

export function Hexagon({ size = 140 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="animate-spin-slow">
      <polygon points="50,4 90,27 90,73 50,96 10,73 10,27" fill="none" stroke="rgba(34,211,238,0.45)" strokeWidth="1.5" />
      <polygon points="50,20 76,35 76,65 50,80 24,65 24,35" fill="rgba(34,211,238,0.06)" stroke="rgba(34,211,238,0.25)" strokeWidth="1" />
      <circle cx="50" cy="4" r="3" fill="#22d3ee" />
      <circle cx="90" cy="73" r="2.5" fill="#22c55e" />
    </svg>
  );
}

export function Ring({ size = 170 }) {
  return (
    <div style={{ width: size, height: size, perspective: 500 }}>
      <div className="w-full h-full rounded-full border-2 border-volt/40 animate-ring [transform-style:preserve-3d] shadow-[0_0_30px_rgba(181,242,61,0.15)]">
        <div className="absolute inset-4 rounded-full border border-brand/30" />
      </div>
    </div>
  );
}

export function Crosses() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {Array.from({ length: 6 }, (_, i) => (
        <span
          key={i}
          className="relative w-3 h-3 animate-twinkle"
          style={{ animationDelay: `${i * 0.45}s` }}
        >
          <span className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-full bg-brand" />
          <span className="absolute top-1/2 left-0 -translate-y-1/2 h-px w-full bg-brand" />
        </span>
      ))}
    </div>
  );
}

export function Dots() {
  return (
    <div className="grid grid-cols-6 gap-3 opacity-60">
      {Array.from({ length: 36 }, (_, i) => (
        <span key={i} className="w-1 h-1 rounded-full bg-aqua/60 animate-twinkle" style={{ animationDelay: `${(i % 7) * 0.3}s` }} />
      ))}
    </div>
  );
}

export function Orb({ size = 80 }) {
  return (
    <div
      className="rounded-full animate-float"
      style={{
        width: size,
        height: size,
        background: "radial-gradient(circle at 30% 30%, rgba(181,242,61,0.9), rgba(34,197,94,0.5) 45%, rgba(34,211,238,0.15) 75%, transparent)",
        boxShadow: "0 0 60px rgba(34,197,94,0.45)",
      }}
    />
  );
}

const shapes = { cube: Cube, hexagon: Hexagon, ring: Ring, crosses: Crosses, dots: Dots, orb: Orb };

const presets = {
  left: [
    { type: "cube", className: "left-[4%] top-[18%]", speed: 60 },
    { type: "dots", className: "left-[10%] bottom-[12%]", speed: -40 },
    { type: "orb", className: "left-[22%] top-[8%]", speed: 90, size: 26 },
  ],
  right: [
    { type: "hexagon", className: "right-[5%] top-[14%]", speed: 70 },
    { type: "crosses", className: "right-[12%] bottom-[16%]", speed: -50 },
    { type: "orb", className: "right-[20%] top-[46%]", speed: 110, size: 38 },
  ],
  both: [
    { type: "cube", className: "left-[3%] top-[22%]", speed: 70, size: 95 },
    { type: "crosses", className: "left-[8%] bottom-[14%]", speed: -40 },
    { type: "ring", className: "right-[4%] top-[12%]", speed: 80, size: 150 },
    { type: "dots", className: "right-[9%] bottom-[10%]", speed: -60 },
    { type: "orb", className: "right-[24%] top-[6%]", speed: 120, size: 22 },
  ],
};

export default function FloatingShapes({ preset = "both" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block overflow-hidden">
      {presets[preset].map((s, i) => (
        <Shape key={i} {...s} progress={scrollYProgress} />
      ))}
    </div>
  );
}

function Shape({ type, className, speed, size, progress }) {
  const y = useTransform(progress, [0, 1], [speed, -speed]);
  const Component = shapes[type];
  return (
    <motion.div style={{ y }} className={`absolute ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <Component size={size} />
      </motion.div>
    </motion.div>
  );
}
