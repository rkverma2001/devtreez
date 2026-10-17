import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import { services } from "../../data/siteContent";
import Reveal from "../ui/Reveal";
import Photo from "../ui/Photo";
import TechLogo from "../ui/TechLogo";
import { techLogos } from "../../data/techLogos";
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
        className="group relative h-full rounded-3xl border border-white/10 bg-surface overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-brand/40 hover:shadow-[0_20px_60px_-20px_rgba(34,197,94,0.35)]"
      >
        {/* Cursor spotlight */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(420px circle at var(--x) var(--y), rgba(34,197,94,0.14), transparent 45%)",
          }}
        />

        <div className="relative h-44 overflow-hidden">
          <Photo
            name={service.image}
            alt={service.imageAlt}
            sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
            className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />
        </div>

        <div className="relative px-8 pb-8 -mt-10">
          <div className="w-14 h-14 rounded-2xl bg-ink border border-white/15 flex items-center justify-center mb-6 shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
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

          <div className="mt-7 pt-5 border-t border-white/10 flex items-center gap-3.5">
            {service.tech
              .filter((t) => techLogos[t])
              .map((t) => (
                <span key={t} title={t} className="inline-flex">
                  <TechLogo name={t} className="w-5 h-5" />
                  <span className="sr-only">{t}</span>
                </span>
              ))}
          </div>

          <Link
            to="/services"
            state={{ scrollTo: service.slug }}
            className="mt-6 inline-flex items-center gap-1.5 text-brand font-semibold"
          >
            Explore More
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="relative pt-16 lg:pt-24 pb-28 lg:pb-36 scroll-mt-20">
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

        <Reveal className="mt-14 text-center">
          <Link
            to="/technologies"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/15 hover:border-brand/50 hover:text-brand transition-colors font-semibold"
          >
            Try our live technology demos <ArrowUpRight size={18} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
