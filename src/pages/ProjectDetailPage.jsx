import { Link, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Target, Lightbulb } from "lucide-react";
import { projects } from "../data/siteContent";
import { demos } from "../components/demos";
import Reveal from "../components/ui/Reveal";
import Photo from "../components/ui/Photo";
import TechLogo from "../components/ui/TechLogo";
import AnimatedUnderline from "../components/ui/AnimatedUnderline";
import HeadingBar from "../components/ui/HeadingBar";
import CtaSection from "../components/cta/CtaSection";
import NotFoundPage from "./NotFoundPage";

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return <NotFoundPage />;

  const project = projects[index];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const Icon = project.icon;
  const Demo = demos[project.demo];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-20 lg:pt-48 overflow-hidden">
        <motion.div
          key={project.slug}
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Photo name={project.image} alt={project.imageAlt} sizes="100vw" priority className="w-full h-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/70 to-ink/10" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white">
            <ArrowLeft size={16} /> All projects
          </Link>

          <div className="mt-8 grid lg:grid-cols-[1fr_auto] gap-10 items-end">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex px-3 py-1 rounded-full bg-ink/60 border border-white/15 text-xs font-semibold uppercase tracking-wider"
              >
                {project.category}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
              >
                {project.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl"
              >
                {project.description}
              </motion.p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span key={t} className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ink/60 backdrop-blur-md border border-white/15 text-sm">
                    <TechLogo name={t} className="w-4 h-4" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="hidden lg:flex w-40 h-40 rounded-[2.5rem] bg-ink/60 backdrop-blur-md border border-white/20 items-center justify-center animate-float"
            >
              <Icon className="w-20 h-20" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Demo */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <Reveal>
          <span className="text-brand text-xs font-semibold uppercase tracking-[0.2em]">Try it yourself</span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Interactive <AnimatedUnderline>Demo</AnimatedUnderline>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          {Demo && <Demo />}
        </Reveal>
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-20 grid md:grid-cols-2 gap-6">
        {[
          { icon: Target, title: "The challenge", text: project.challenge },
          { icon: Lightbulb, title: "Our solution", text: project.solution },
        ].map(({ icon: CardIcon, title, text }, i) => (
          <Reveal key={title} delay={i * 0.1}>
            <div className="h-full rounded-3xl border border-white/10 bg-surface p-8">
              <CardIcon className="text-brand" />
              <h3 className="mt-4 font-display text-2xl font-semibold">{title}</h3>
              <HeadingBar className="mt-3 w-12" />
              <p className="mt-3 text-gray-400 leading-relaxed">{text}</p>
            </div>
          </Reveal>
        ))}
        <Reveal delay={0.2} className="md:col-span-2">
          <div className="rounded-3xl border border-white/10 bg-surface p-8">
            <h3 className="font-display text-2xl font-semibold">Key features</h3>
            <HeadingBar className="mt-3 w-12" />
            <ul className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {project.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-gray-300">
                  <Check size={18} className="text-brand shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* Prev / next */}
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 grid sm:grid-cols-2 gap-4" aria-label="More projects">
        <Link to={`/projects/${prev.slug}`} className="group rounded-3xl border border-white/10 p-6 hover:border-brand/40 transition-colors">
          <span className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Previous
          </span>
          <span className="mt-2 block font-display text-xl font-semibold">{prev.title}</span>
        </Link>
        <Link to={`/projects/${next.slug}`} className="group rounded-3xl border border-white/10 p-6 text-right hover:border-brand/40 transition-colors">
          <span className="flex items-center justify-end gap-2 text-xs text-gray-500 uppercase tracking-wider">
            Next <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </span>
          <span className="mt-2 block font-display text-xl font-semibold">{next.title}</span>
        </Link>
      </nav>

      <CtaSection />
    </>
  );
}
