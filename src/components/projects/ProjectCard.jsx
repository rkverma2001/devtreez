import { Link } from "react-router-dom";
import { ArrowUpRight, PlayCircle } from "lucide-react";

export default function ProjectCard({ project, index, className = "" }) {
  const Icon = project.icon;

  return (
    <Link
      to={`/projects/${project.slug}`}
      className={`group relative block rounded-[2rem] border border-white/10 bg-surface overflow-hidden transition-all duration-500 hover:border-brand/40 hover:shadow-[0_20px_60px_-20px_rgba(34,197,94,0.35)] ${className}`}
    >
      {/* Visual */}
      <div className={`relative h-40 sm:h-48 xl:h-56 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-48 h-48 rounded-full border border-white/20 transition-transform duration-700 group-hover:scale-125" />
          <div className="absolute w-32 h-32 rounded-full border border-white/25 transition-transform duration-700 group-hover:scale-150" />
          <div className="relative w-20 h-20 rounded-3xl bg-ink/60 backdrop-blur-md border border-white/20 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
            <Icon className="w-10 h-10 text-white" />
          </div>
        </div>
        <span className="absolute top-5 left-6 font-display text-6xl font-bold text-white/15">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="absolute top-6 right-6 px-3 py-1 rounded-full bg-ink/60 backdrop-blur-md border border-white/15 text-xs font-semibold uppercase tracking-wider">
          {project.category}
        </span>
        <span className="absolute bottom-4 left-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ink/70 backdrop-blur-md border border-brand/30 text-brand text-xs font-semibold">
          <PlayCircle size={14} /> Live demo
        </span>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-2xl sm:text-3xl font-semibold">{project.title}</h3>
          <span className="shrink-0 w-11 h-11 rounded-full border border-white/15 flex items-center justify-center transition-all duration-300 group-hover:bg-brand group-hover:border-brand group-hover:text-black">
            <ArrowUpRight size={20} />
          </span>
        </div>
        <p className="mt-3 text-gray-400 leading-relaxed">{project.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
