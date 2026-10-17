import { Eye, Rocket } from "lucide-react";
import { values } from "../data/siteContent";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import Photo from "../components/ui/Photo";
import SectionHeading from "../components/ui/SectionHeading";
import AboutSection from "../components/about/AboutSection";
import ProcessSection from "../components/process/ProcessSection";
import TechMarquee from "../components/marquee/TechMarquee";
import CtaSection from "../components/cta/CtaSection";

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About devtreez"
        image="meeting"
        video="meeting"
        imageAlt="Team meeting around a conference table"
        title="Growing Ideas Into"
        highlight="Global Innovations"
        description="devtreez is an AI-first technology company. Like a tree, we start with strong roots in engineering and grow every idea into something that scales."
      />

      <section className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-6">
        {[
          { icon: Rocket, title: "Our mission", text: "To make world-class AI and software accessible to every ambitious business, from first-time founders to global enterprises.", image: "collab", alt: "Two colleagues reviewing work on a laptop" },
          { icon: Eye, title: "Our vision", text: "A world where every company, regardless of size, runs on intelligent technology that grows with it.", image: "office", alt: "Bright modern open-plan office" },
        ].map(({ icon: Icon, title, text, image, alt }, i) => (
          <Reveal key={title} delay={i * 0.1}>
            <div className="group relative h-full rounded-[2rem] border border-white/10 bg-surface p-10 pt-56 overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-64 overflow-hidden">
                <Photo name={image} alt={alt} className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
              </div>
              <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-brand/15 blur-3xl" />
              <Icon className="relative w-10 h-10 text-brand" />
              <h2 className="relative mt-6 font-display text-3xl font-bold">{title}</h2>
              <p className="relative mt-4 text-lg text-gray-400 leading-relaxed">{text}</p>
            </div>
          </Reveal>
        ))}
      </section>

      <AboutSection />

      <section className="py-28 lg:py-36 bg-surface/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="Our Values" title="What We" highlight="Stand For" />
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.1}>
                <div className="h-full rounded-3xl border border-white/10 bg-ink p-8 text-center hover:border-brand/40 hover:-translate-y-1 transition-all duration-500">
                  <span className="mx-auto w-16 h-16 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-brand" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-semibold">{title}</h3>
                  <p className="mt-3 text-gray-400">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProcessSection />
      <TechMarquee />
      <CtaSection />
    </>
  );
}
