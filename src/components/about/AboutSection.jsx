import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import { ShieldCheck, Zap, Users } from "lucide-react";
import { stats } from "../../data/siteContent";
import Reveal from "../ui/Reveal";
import FloatingShapes from "../ui/FloatingShapes";
import SectionHeading from "../ui/SectionHeading";

const pillars = [
  { icon: Zap, title: "AI in everything we ship", text: "Every product is designed to learn, automate and get smarter over time." },
  { icon: ShieldCheck, title: "Enterprise-grade quality", text: "Secure architecture, clean code and testing built into every sprint." },
  { icon: Users, title: "A true partner", text: "One dedicated team from first idea to launch and beyond." },
];

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, { duration: 2.2, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, count, value]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="relative py-28 lg:py-36 scroll-mt-20">
      <FloatingShapes preset="right" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Why devtreez"
            title="Engineering The"
            highlight="Future, Today"
            description="We combine world-class engineering with applied AI to help startups and enterprises launch faster, scale smarter and stay ahead."
          />

          <div className="mt-10 space-y-6">
            {pillars.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={0.1 * i} className="flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center">
                  <Icon size={22} className="text-brand" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{title}</h3>
                  <p className="text-gray-400">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={0.1 * i}>
              <div
                className={`relative rounded-3xl border border-white/10 bg-surface p-8 overflow-hidden group hover:border-brand/40 transition-colors duration-500 ${
                  i % 2 === 1 ? "sm:translate-y-10" : ""
                }`}
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-brand/10 blur-2xl group-hover:bg-brand/25 transition-colors duration-500" />
                <div className="relative font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="relative mt-3 text-gray-400 text-sm sm:text-base">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
