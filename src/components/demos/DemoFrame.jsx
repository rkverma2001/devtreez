export default function DemoFrame({ title, children, note = "Interactive demo · simulated data" }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-surface overflow-hidden shadow-[0_30px_80px_-30px_rgba(34,197,94,0.25)]">
      <div className="flex items-center gap-3 px-5 py-3 border-b border-white/10 bg-white/[0.02]">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="w-3 h-3 rounded-full bg-red-400/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
          <span className="w-3 h-3 rounded-full bg-brand/70" />
        </div>
        <span className="text-sm font-medium text-gray-300 truncate">{title}</span>
        <span className="ml-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand/10 border border-brand/30 text-brand text-[11px] font-semibold uppercase tracking-wider shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
          Live
        </span>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
      <p className="px-6 pb-4 text-xs text-gray-500">{note}</p>
    </div>
  );
}
