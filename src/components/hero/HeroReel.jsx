import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

// Three-chapter background reel for the home hero: Imagine -> Engineer -> Scale.
// Clips are Mixkit free-license stock (see MEDIA_CREDITS.md).
const scenes = [
  { video: "vision", label: "Imagine", text: "Bold ideas, shaped with AI" },
  { video: "programmer", label: "Engineer", text: "Built by senior product teams" },
  { video: "city", label: "Scale", text: "Grown into global platforms" },
];
const SCENE_MS = 6500;

export default function HeroReel() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [loaded, setLoaded] = useState(() => new Set([0, 1]));
  const videos = useRef([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Advance to the next chapter.
  useEffect(() => {
    if (!playing || reduced) return;
    const id = setTimeout(() => {
      const next = (active + 1) % scenes.length;
      setLoaded((s) => new Set(s).add(next).add((next + 1) % scenes.length));
      setActive(next);
    }, SCENE_MS);
    return () => clearTimeout(id);
  }, [active, playing, reduced]);

  // Play the active clip from the start; pause the others once the cross-fade is done.
  useEffect(() => {
    const current = videos.current[active];
    if (!current || reduced) return;
    if (playing) {
      current.currentTime = 0;
      current.play().catch(() => {});
    } else {
      current.pause();
    }
    const id = setTimeout(() => {
      videos.current.forEach((v, i) => i !== active && v?.pause());
    }, 1300);
    return () => clearTimeout(id);
  }, [active, playing, reduced]);

  const select = (i) => {
    setLoaded((s) => new Set(s).add(i).add((i + 1) % scenes.length));
    setActive(i);
  };

  return (
    <>
      {/* Background layers */}
      <div className="absolute inset-0" aria-hidden="true">
        {scenes.map((s, i) => (
          <video
            key={s.video}
            ref={(el) => (videos.current[i] = el)}
            poster={`/videos/${s.video}-poster.webp`}
            src={!reduced && loaded.has(i) ? `/videos/${s.video}.mp4` : undefined}
            muted
            playsInline
            loop
            preload={i === active ? "auto" : "metadata"}
            className={`absolute inset-0 w-full h-full object-cover transition-[opacity,transform] duration-[1200ms] ease-out ${
              i === active ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          />
        ))}
      </div>

      {/* Chapter bar */}
      <div className="absolute bottom-0 inset-x-0 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-8 flex items-end gap-4 sm:gap-8">
          <div className="flex-1 grid grid-cols-3 gap-4 sm:gap-8">
            {scenes.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onClick={() => select(i)}
                aria-label={`Show chapter ${i + 1}: ${s.label}`}
                aria-current={i === active}
                className="group text-left cursor-pointer"
              >
                <span className="block h-[2px] bg-white/20 overflow-hidden rounded-full">
                  {i === active && (
                    <span
                      key={`${active}-${playing}`}
                      className="block h-full bg-gradient-to-r from-brand to-aqua origin-left animate-[progress_linear_forwards]"
                      style={{
                        animationDuration: `${SCENE_MS}ms`,
                        animationPlayState: playing && !reduced ? "running" : "paused",
                      }}
                    />
                  )}
                  {i < active && <span className="block h-full bg-white/50" />}
                </span>
                <span className="mt-3 flex items-baseline gap-2">
                  <span className={`text-xs font-semibold tabular-nums ${i === active ? "text-brand" : "text-gray-500"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`font-display font-semibold transition-colors ${i === active ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
                    {s.label}
                  </span>
                </span>
                <span className={`hidden md:block mt-1 text-sm transition-colors ${i === active ? "text-gray-300" : "text-gray-500"}`}>
                  {s.text}
                </span>
              </button>
            ))}
          </div>

          {!reduced && (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause background video" : "Play background video"}
              className="shrink-0 w-10 h-10 rounded-full bg-ink/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              {playing ? <Pause size={16} /> : <Play size={16} />}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
