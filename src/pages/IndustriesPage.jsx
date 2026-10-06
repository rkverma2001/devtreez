import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import { industries, projects } from "../data/siteContent";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import CtaSection from "../components/cta/CtaSection";

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="AI Built For"
        highlight="Your Industry"
        description="Every industry has its own data, regulations and customers. We bring domain know-how along with the technology."
      />

      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-12 grid md:grid-cols-2 gap-6">
        {industries.map(({ icon: Icon, name, description, useCases, projectSlug }, i) => {
          const project = projects.find((p) => p.slug === projectSlug);
          return (
            <Reveal key={name} delay={(i % 2) * 0.1}>
              <div className="group relative h-full rounded-[2rem] border border-white/10 bg-surface p-8 overflow-hidden hover:border-brand/40 transition-colors duration-500">
                <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-brand/10 blur-3xl group-hover:bg-brand/25 transition-colors duration-500" />
                <div className="relative">
                  <div className="flex items-center gap-4">
                    <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand/25 to-aqua/20 border border-white/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <Icon className="w-7 h-7 text-brand" />
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl font-semibold">{name}</h2>
                  </div>
                  <p className="mt-5 text-gray-400">{description}</p>
                  <ul className="mt-5 space-y-2">
                    {useCases.map((u) => (
                      <li key={u} className="flex items-center gap-2.5 text-gray-300">
                        <Check size={16} className="text-brand" /> {u}
                      </li>
                    ))}
                  </ul>
                  {project && (
                    <Link
                      to={`/projects/${project.slug}`}
                      className="mt-7 inline-flex items-center gap-1.5 text-brand font-semibold hover:text-volt transition-colors"
                    >
                      See the {project.title} demo <ArrowUpRight size={18} />
                    </Link>
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
      </section>

      <CtaSection />
    </>
  );
}
