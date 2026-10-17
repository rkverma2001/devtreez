import { Link } from "react-router-dom";
import { ArrowUpRight, Briefcase, MapPin } from "lucide-react";
import { openRoles, perks } from "../data/siteContent";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import Photo from "../components/ui/Photo";
import SectionHeading from "../components/ui/SectionHeading";

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        image="team"
        imageAlt="Developers working together on laptops"
        title="Build The Future"
        highlight="With Us"
        description="Join a team of engineers, designers and AI specialists shipping products used around the world."
      >
        <a href="#roles" className="inline-flex items-center gap-2 bg-brand hover:bg-volt text-black font-semibold px-7 py-3.5 rounded-full transition-colors">
          See open roles <ArrowUpRight size={18} />
        </a>
      </PageHero>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {perks.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 0.08}>
            <div className="h-full rounded-3xl border border-white/10 bg-surface p-7 hover:border-brand/40 transition-colors">
              <Icon className="w-8 h-8 text-brand" />
              <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-gray-400">{text}</p>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 mt-6 grid grid-cols-2 md:grid-cols-3 gap-5">
        {[
          ["developers", "Engineers reviewing code together"],
          ["workshop", "Product workshop at a whiteboard"],
          ["collab", "Colleagues collaborating at a laptop"],
        ].map(([name, alt], i) => (
          <Reveal key={name} delay={i * 0.1} className={i === 2 ? "col-span-2 md:col-span-1" : ""}>
            <div className="group relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10">
              <Photo
                name={name}
                alt={alt}
                sizes="(min-width: 768px) 33vw, 50vw"
                className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
            </div>
          </Reveal>
        ))}
      </section>

      <section id="roles" className="py-28 lg:py-36 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="Open Roles" title="Find Your" highlight="Next Role" />
          <div className="mt-14 space-y-4">
            {openRoles.map((role, i) => (
              <Reveal key={role.title} delay={i * 0.06}>
                <Link
                  to="/contact"
                  state={{ message: `I'd like to apply for the ${role.title} role.` }}
                  className="group flex flex-col sm:flex-row sm:items-center gap-4 rounded-3xl border border-white/10 bg-surface p-6 sm:p-7 hover:border-brand/40 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-display text-xl sm:text-2xl font-semibold group-hover:text-brand transition-colors">{role.title}</h3>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1.5"><Briefcase size={14} /> {role.team} · {role.type}</span>
                      <span className="flex items-center gap-1.5"><MapPin size={14} /> {role.location}</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-brand font-semibold">
                    Apply <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 text-center text-gray-400">
            Don't see your role?{" "}
            <Link to="/contact" className="text-brand hover:text-volt font-semibold">
              Tell us how you'd contribute
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
