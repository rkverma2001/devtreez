import { Link } from "react-router-dom";
import { ArrowUpRight, PlayCircle } from "lucide-react";
import Photo from "../ui/Photo";
import TechLogo from "../ui/TechLogo";

export default function ProjectCard({ project, index, className = "" }) {
  const Icon = project.icon;

  return (
    <Link
      to={`/projects/${project.slug}`}
      className={`group relative block rounded-[2rem] border border-white/10 bg-surface overflow-hidden transition-all duration-500 hover:border-brand/40 hover:shadow-[0_20px_60px_-20px_rgba(34,197,94,0.35)] ${className}`}
    >
      {/* Visual */}
      <div className="relative h-40 sm:h-48 xl:h-56 overflow-hidden">
        <Photo
          name={project.image}
          alt={project.imageAlt}
          sizes="(min-width: 1024px) 540px, 85vw"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} mix-blend-multiply opacity-70`} />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-ink/20 to-transparent" />
        <span className="absolute top-5 left-6 font-display text-6xl font-bold text-white/25">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="absolute bottom-4 right-6 w-12 h-12 rounded-2xl bg-ink/70 backdrop-blur-md border border-white/20 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
          <Icon className="w-6 h-6 text-white" />
        </div>
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
            <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
              <TechLogo name={tag} className="w-3.5 h-3.5" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
