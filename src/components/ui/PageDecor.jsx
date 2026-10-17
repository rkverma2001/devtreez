import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Cube, Hexagon, Ring, Crosses, Dots, Orb } from "./FloatingShapes";

// Floating objects spread down the page gutters on inner pages, behind the content.
const slots = [
  { Shape: Hexagon, side: "right", top: "14%", speed: 120 },
  { Shape: Cube, side: "left", top: "24%", speed: 160, size: 95 },
  { Shape: Crosses, side: "right", top: "36%", speed: -80 },
  { Shape: Orb, side: "left", top: "44%", speed: 200, size: 46 },
  { Shape: Ring, side: "right", top: "55%", speed: 140, size: 150 },
  { Shape: Dots, side: "left", top: "66%", speed: -100 },
  { Shape: Cube, side: "right", top: "77%", speed: 180, size: 80 },
  { Shape: Hexagon, side: "left", top: "88%", speed: 120, size: 110 },
];

export default function PageDecor() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 hidden md:block overflow-hidden">
      {slots.map((s, i) => (
        <Slot key={i} {...s} progress={scrollYProgress} />
      ))}
    </div>
  );
}

function Slot({ Shape, side, top, speed, size, progress }) {
  const y = useTransform(progress, [0, 1], [speed, -speed]);
  return (
    <motion.div style={{ y, top }} className={`absolute opacity-80 ${side === "left" ? "left-[1.5%]" : "right-[1.5%]"}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <Shape size={size} />
      </motion.div>
    </motion.div>
  );
}
