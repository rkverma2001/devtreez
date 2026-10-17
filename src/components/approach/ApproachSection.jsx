import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Compass, Cpu, LineChart } from "lucide-react";
import Photo from "../ui/Photo";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

const pillars = [
  { icon: Compass, title: "Consulting-led", text: "We start with your business goals, not a tech stack, and map where AI creates measurable value." },
  { icon: Cpu, title: "Engineering-driven", text: "Senior engineers turn strategy into secure, scalable products, with AI built in from day one." },
  { icon: LineChart, title: "Outcome-focused", text: "We measure success in adoption, efficiency and revenue, and keep improving after launch." },
];

export default function ApproachSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const slowY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const fastY = useTransform(scrollYProgress, [0, 1], [120, -120]);

  return (
    <section id="approach" ref={ref} className="relative py-28 lg:py-36 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        {/* Collage */}
        <div className="relative h-[460px] sm:h-[560px]">
          <motion.div style={{ y: slowY }} className="absolute left-0 top-0 w-[72%] h-[70%] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
            <Photo name="workshop" alt="Strategy workshop with sticky notes on a whiteboard" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
          </motion.div>
          <motion.div style={{ y: fastY }} className="absolute right-0 bottom-0 w-[58%] h-[55%] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
            <Photo name="developers" alt="Engineers reviewing code on large monitors" sizes="(min-width: 1024px) 30vw, 60vw" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
          </motion.div>
          <Reveal delay={0.3} className="absolute left-4 sm:left-8 bottom-6 sm:bottom-12 z-10">
            <div className="rounded-2xl bg-ink/85 backdrop-blur-xl border border-white/15 px-5 py-4 shadow-2xl max-w-[230px]">
              <p className="text-xs uppercase tracking-[0.2em] text-brand font-semibold">From strategy</p>
              <p className="mt-1 font-display text-lg font-bold leading-snug">to production-ready AI</p>
            </div>
          </Reveal>
          <div className="absolute -z-10 left-1/3 top-1/3 w-72 h-72 rounded-full bg-brand/20 blur-[100px]" />
        </div>

        {/* Story */}
        <div>
          <SectionHeading
            align="left"
            eyebrow="Our Approach"
            title="Where Strategy Meets"
            highlight="Engineering"
            description="We pair business strategy with deep engineering expertise, delivered with the speed and focus of a dedicated product team."
          />

          <div className="mt-10 space-y-6">
            {pillars.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={0.1 * i} className="flex gap-4">
                <span className="shrink-0 w-12 h-12 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center">
                  <Icon size={22} className="text-brand" />
                </span>
                <div>
                  <h3 className="font-semibold text-lg">{title}</h3>
                  <p className="text-gray-400">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <Link
              to="/about"
              className="group mt-10 inline-flex items-center gap-2 bg-brand hover:bg-volt text-black font-semibold px-7 py-3.5 rounded-full transition-colors"
            >
              How we work <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
