import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../../data/siteContent";

function ProjectCard({ project, index }) {
  const Icon = project.icon;

  return (
    <article className="group relative w-[85vw] sm:w-[480px] lg:w-[540px] shrink-0 rounded-[2rem] border border-white/10 bg-surface overflow-hidden transition-colors duration-500 hover:border-brand/40">
      {/* Visual */}
      <div className={`relative h-40 sm:h-48 xl:h-56 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-48 h-48 rounded-full border border-white/20 transition-transform duration-700 group-hover:scale-125" />
          <div className="absolute w-32 h-32 rounded-full border border-white/25 transition-transform duration-700 group-hover:scale-150" />
          <div className="relative w-20 h-20 rounded-3xl bg-ink/60 backdrop-blur-md border border-white/20 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
            <Icon className="w-10 h-10 text-white" />
          </div>
        </div>
        <span className="absolute top-5 left-6 font-display text-6xl font-bold text-white/15">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="absolute top-6 right-6 px-3 py-1 rounded-full bg-ink/60 backdrop-blur-md border border-white/15 text-xs font-semibold uppercase tracking-wider">
          {project.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-2xl sm:text-3xl font-semibold">{project.title}</h3>
          <span className="shrink-0 w-11 h-11 rounded-full border border-white/15 flex items-center justify-center transition-all duration-300 group-hover:bg-brand group-hover:border-brand group-hover:text-black">
            <ArrowUpRight size={20} />
          </span>
        </div>
        <p className="mt-3 text-gray-400 leading-relaxed">{project.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

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
              Projects That <span className="text-gradient">Drive Results</span>
            </h2>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="hidden sm:inline">Scroll to explore</span>
            <div className="w-40 h-[3px] rounded-full bg-white/10 overflow-hidden">
              <motion.div
                style={{ scaleX: scrollYProgress }}
                className="h-full origin-left bg-gradient-to-r from-brand to-aqua"
              />
            </div>
          </div>
        </div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="relative flex gap-6 w-max px-6 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
