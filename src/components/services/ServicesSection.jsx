import { useRef } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { services } from "../../data/siteContent";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

function ServiceCard({ service, index }) {
  const ref = useRef(null);
  const Icon = service.icon;

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--x", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <Reveal delay={(index % 3) * 0.12} className="h-full">
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        className="group relative h-full rounded-3xl border border-white/10 bg-surface p-8 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-brand/40 hover:shadow-[0_20px_60px_-20px_rgba(34,197,94,0.35)]"
      >
        {/* Cursor spotlight */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(420px circle at var(--x) var(--y), rgba(34,197,94,0.14), transparent 45%)",
          }}
        />

        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand/25 to-aqua/20 border border-white/10 flex items-center justify-center mb-7 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
            <Icon className="w-7 h-7 text-brand" />
          </div>

          <h3 className="font-display text-2xl font-semibold">{service.title}</h3>
          <p className="mt-3 text-gray-400 leading-relaxed">{service.description}</p>

          <ul className="mt-6 space-y-2.5">
            {service.points.map((point) => (
              <li key={point} className="flex items-center gap-2.5 text-sm text-gray-300">
                <Check size={16} className="text-brand shrink-0" />
                {point}
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="mt-8 inline-flex items-center gap-1.5 text-brand font-semibold"
          >
            Explore More
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </div>
      </div>
    </Reveal>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-28 lg:py-36 scroll-mt-20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand/10 blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          eyebrow="What We Do"
          title="How We Power"
          highlight="Your Growth"
          description="Intelligent digital experiences, built around your vision, from the first website to enterprise-scale AI."
        />

        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
