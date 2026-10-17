import { Link } from "react-router-dom";
import { ArrowRight, Check, PlayCircle } from "lucide-react";
import { services, techDemos } from "../data/siteContent";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import Photo from "../components/ui/Photo";
import TechLogo from "../components/ui/TechLogo";
import HeadingBar from "../components/ui/HeadingBar";
import ProcessSection from "../components/process/ProcessSection";
import CtaSection from "../components/cta/CtaSection";

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        image="workshop"
        video="table"
        imageAlt="Team planning a project with sticky notes on a whiteboard"
        title="Everything You Need To"
        highlight="Build With AI"
        description="Six practices, one team. From your first website to enterprise-scale AI, we design, build and run the technology that grows your business."
      >
        <div className="flex flex-wrap justify-center gap-2">
          {services.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-sm text-gray-300 hover:border-brand/50 hover:text-brand transition-colors"
            >
              {s.title}
            </a>
          ))}
        </div>
      </PageHero>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-28 lg:space-y-36 pb-12">
        {services.map((service, i) => {
          const Icon = service.icon;
          const demo = techDemos.find((d) => d.key === service.demo);
          return (
            <div
              key={service.slug}
              id={service.slug}
              className={`scroll-mt-32 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}
            >
              <Reveal>
                <div className="relative aspect-[4/3] rounded-[2rem] border border-white/10 bg-surface overflow-hidden group">
                  <Photo
                    name={service.image}
                    alt={service.imageAlt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-ink/80 via-ink/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 flex items-center gap-4">
                    <span className="w-16 h-16 rounded-2xl bg-ink/70 backdrop-blur-md border border-white/15 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-brand" />
                    </span>
                    <span className="font-display text-6xl font-bold text-white/30">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <span className="text-brand text-xs font-semibold uppercase tracking-[0.2em]">Service {String(i + 1).padStart(2, "0")}</span>
                <h2 className="mt-3 font-display text-4xl lg:text-5xl font-bold tracking-tight">{service.title}</h2>
                <HeadingBar className="mt-4" />
                <p className="mt-5 text-lg text-gray-400 leading-relaxed">{service.details}</p>

                <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">What you get</h3>
                <ul className="mt-4 grid sm:grid-cols-2 gap-3">
                  {service.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-gray-300">
                      <Check size={18} className="text-brand shrink-0 mt-0.5" />
                      {d}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-2">
                  {service.tech.map((t) => (
                    <span key={t} className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 hover:border-white/25 hover:text-white transition-colors">
                      <TechLogo name={t} className="w-4 h-4" />
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-2 bg-brand hover:bg-volt text-black font-semibold px-6 py-3 rounded-full transition-colors"
                  >
                    Start a project <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  {demo && (
                    <Link
                      to={`/technologies#${demo.key}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 hover:border-brand/50 hover:text-brand transition-colors"
                    >
                      <PlayCircle size={18} /> Try the {demo.title} demo
                    </Link>
                  )}
                </div>
              </Reveal>
            </div>
          );
        })}
      </section>

      <ProcessSection />
      <CtaSection />
    </>
  );
}
