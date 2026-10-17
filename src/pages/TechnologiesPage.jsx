import { techCategories, techDemos } from "../data/siteContent";
import { demos } from "../components/demos";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import CtaSection from "../components/cta/CtaSection";
import TechLogo from "../components/ui/TechLogo";

export default function TechnologiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Technology Lab"
        image="circuit"
        video="programmer"
        imageAlt="Close-up of a computer circuit board"
        title="See Our Tech"
        highlight="In Action"
        description="Don't just read about AI, cloud and data. Play with them. These live demos run right in your browser."
      >
        <div className="flex flex-wrap justify-center gap-2">
          {techDemos.map((d) => (
            <a
              key={d.key}
              href={`#${d.key}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-sm text-gray-300 hover:border-brand/50 hover:text-brand transition-colors"
            >
              <d.icon size={16} /> {d.title}
            </a>
          ))}
        </div>
      </PageHero>

      <section className="max-w-6xl mx-auto px-6 lg:px-8 space-y-24 lg:space-y-32 pb-12">
        {techDemos.map((d, i) => {
          const Demo = demos[d.key];
          return (
            <div key={d.key} id={d.key} className="scroll-mt-32">
              <Reveal className="mb-8 flex items-start gap-5">
                <span className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-brand/25 to-aqua/20 border border-white/10 flex items-center justify-center">
                  <d.icon className="w-7 h-7 text-brand" />
                </span>
                <div>
                  <span className="text-brand text-xs font-semibold uppercase tracking-[0.2em]">
                    Demo {String(i + 1).padStart(2, "0")} · {d.category}
                  </span>
                  <h2 className="mt-1 font-display text-3xl sm:text-4xl font-bold tracking-tight">{d.title}</h2>
                  <p className="mt-2 text-gray-400">{d.description}</p>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <Demo />
              </Reveal>
            </div>
          );
        })}
      </section>

      <section className="py-28 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Stack"
            title="Technologies We"
            highlight="Master"
            description="We pick the right tool for each problem, never the trendiest one."
          />
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {techCategories.map((cat, i) => (
              <Reveal key={cat.title} delay={(i % 3) * 0.1}>
                <div className="h-full rounded-3xl border border-white/10 bg-surface p-7 hover:border-brand/40 transition-colors">
                  <h3 className="font-display text-xl font-semibold">{cat.title}</h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 hover:border-white/25 hover:text-white transition-colors"
                      >
                        <TechLogo name={item} className="w-4 h-4" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
