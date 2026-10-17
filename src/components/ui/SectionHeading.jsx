import Reveal from "./Reveal";
import AnimatedUnderline from "./AnimatedUnderline";

export default function SectionHeading({ eyebrow, title, highlight, description, align = "center" }) {
  const alignment = align === "center" ? "text-center mx-auto items-center" : "text-left items-start";

  return (
    <Reveal className={`flex flex-col max-w-3xl ${alignment}`}>
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-semibold uppercase tracking-[0.2em]">
        <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
        {eyebrow}
      </span>

      <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
        {title} <AnimatedUnderline>{highlight}</AnimatedUnderline>
      </h2>

      {description && (
        <p className="mt-5 text-lg text-gray-400 leading-relaxed">{description}</p>
      )}
    </Reveal>
  );
}
