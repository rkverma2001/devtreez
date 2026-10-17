import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import BackgroundVideo from "../ui/BackgroundVideo";

const tags = ["AI Engineering", "Software Development", "Cloud Platforms", "Digital Consulting"];

// Full-bleed cinematic video section, automotive-site style.
export default function VideoBand() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.05]);
  const textY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={ref} className="relative h-[85vh] min-h-[560px] overflow-hidden">
      <motion.div style={{ scale }} className="absolute inset-0">
        <BackgroundVideo name="city" className="w-full h-full object-cover" controlsClassName="bottom-8 right-8" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/40 to-ink pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent pointer-events-none" />

      <motion.div style={{ y: textY }} className="relative h-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col justify-center">
        <motion.span
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-brand text-xs font-semibold uppercase tracking-[0.3em]"
        >
          Built for scale
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 font-display text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight leading-[1] max-w-4xl"
        >
          Technology for a <span className="text-gradient">world in motion.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 max-w-xl text-lg text-gray-300"
        >
          From city-scale platforms to the apps in your customers' pockets, we engineer software that keeps up with how the world moves.
        </motion.p>
        <div className="mt-8 flex flex-wrap gap-2">
          {tags.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-sm"
            >
              {t}
            </motion.span>
          ))}
        </div>
        <Link
          to="/services"
          className="group mt-10 self-start inline-flex items-center gap-2 bg-brand hover:bg-volt text-black font-semibold px-7 py-3.5 rounded-full transition-colors"
        >
          Explore our solutions <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </section>
  );
}
