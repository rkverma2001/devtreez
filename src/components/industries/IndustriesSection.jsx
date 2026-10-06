import { industries } from "../../data/siteContent";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

export default function IndustriesSection() {
  return (
    <section id="industries" className="relative py-28 lg:py-36 bg-surface/50 border-y border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          eyebrow="Industries"
          title="Transforming"
          highlight="Every Industry"
          description="Deep domain expertise paired with AI that understands how your business really works."
        />

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {industries.map(({ icon: Icon, name }, i) => (
            <Reveal key={name} delay={(i % 4) * 0.08}>
              <div className="group relative aspect-square sm:aspect-[4/3] rounded-3xl border border-white/10 bg-ink p-6 flex flex-col justify-between overflow-hidden cursor-default transition-all duration-500 hover:-translate-y-1 hover:border-transparent">
                <div className="absolute inset-0 bg-gradient-to-br from-brand via-emerald-600 to-aqua opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Icon className="relative w-9 h-9 text-brand group-hover:text-black transition-colors duration-500" />
                <h3 className="relative font-display text-lg sm:text-xl font-semibold group-hover:text-black transition-colors duration-500">
                  {name}
                </h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
