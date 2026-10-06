import { techStack } from "../../data/siteContent";

export default function TechMarquee() {
  const items = [...techStack, ...techStack];

  return (
    <section className="relative py-10 border-y border-white/5 bg-surface/60 overflow-hidden">
      <p className="text-center text-xs uppercase tracking-[0.3em] text-gray-500 mb-6 px-6">
        Built with the technologies behind the world's leading products
      </p>

      <div className="[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {items.map((tech, i) => (
            <span
              key={i}
              aria-hidden={i >= techStack.length}
              className="mr-4 px-6 py-2.5 rounded-full border border-white/10 bg-white/[0.03] text-gray-300 text-sm font-medium whitespace-nowrap hover:border-brand/50 hover:text-brand transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
