import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { projects } from "../data/siteContent";
import PageHero from "../components/ui/PageHero";
import ProjectCard from "../components/projects/ProjectCard";
import CtaSection from "../components/cta/CtaSection";

const categories = ["All", ...new Set(projects.map((p) => p.category))];

export default function ProjectsPage() {
  const [active, setActive] = useState("All");
  const visible = projects.filter((p) => active === "All" || p.category === active);

  return (
    <>
      <PageHero
        eyebrow="Our Work"
        image="teamwork"
        video="typing"
        imageAlt="Overhead view of a team working on laptops"
        title="Projects With"
        highlight="Live Demos"
        description="Explore what we build. Every project below has an interactive demo you can try right in your browser."
      />

      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-12">
        <div className="flex flex-wrap justify-center gap-2 mb-12" role="tablist" aria-label="Filter projects by category">
          {categories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={active === c}
              onClick={() => setActive(c)}
              className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                active === c ? "text-black" : "text-gray-300 border border-white/10 hover:border-white/25"
              }`}
            >
              {active === c && (
                <motion.span layoutId="project-filter" className="absolute inset-0 rounded-full bg-brand" transition={{ type: "spring", duration: 0.5 }} />
              )}
              <span className="relative">{c}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectCard project={project} index={projects.indexOf(project)} className="h-full" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <CtaSection />
    </>
  );
}
