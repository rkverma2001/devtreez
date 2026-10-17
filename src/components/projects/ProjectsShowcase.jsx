import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { projects } from "../../data/siteContent";
import ProjectCard from "./ProjectCard";
import AnimatedUnderline from "../ui/AnimatedUnderline";

export default function ProjectsShowcase() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [distance, setDistance] = useState(0);
  const distanceValue = useMotionValue(0);

  useEffect(() => {
    const measure = () => {
      const next = Math.max(0, trackRef.current.scrollWidth - window.innerWidth);
      setDistance(next);
      distanceValue.set(next);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [distanceValue]);

  // Vertical scroll through this tall section drives the horizontal track.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(() => -scrollYProgress.get() * distanceValue.get());

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative"
      style={{ height: `calc(100vh + ${distance}px)` }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden pt-24 pb-6">
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-aqua/10 blur-[160px] pointer-events-none" />

        <div className="relative max-w-7xl w-full mx-auto px-6 lg:px-8 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <span className="text-brand text-xs font-semibold uppercase tracking-[0.2em]">
              Featured Work
            </span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Projects That <AnimatedUnderline>Drive Results</AnimatedUnderline>
            </h2>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="hidden sm:inline">Scroll to explore</span>
            <div className="w-28 sm:w-40 h-[3px] rounded-full bg-white/10 overflow-hidden">
              <motion.div
                style={{ scaleX: scrollYProgress }}
                className="h-full origin-left bg-gradient-to-r from-brand to-aqua"
              />
            </div>
            <Link to="/projects" className="inline-flex items-center gap-1.5 text-brand font-semibold whitespace-nowrap hover:text-volt transition-colors">
              View all <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="relative flex gap-6 w-max px-6 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} className="w-[85vw] sm:w-[480px] lg:w-[540px] shrink-0" />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
