import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

// Muted, looping background video from /public/videos (Mixkit free license).
// Loads only near the viewport, pauses off-screen, shows the poster for reduced-motion users,
// and has a pause button (WCAG 2.2.2).
export default function BackgroundVideo({ name, className = "", controlsClassName = "bottom-6 right-6" }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setLoaded(true);
      },
      { rootMargin: "200px" }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (visible && playing && !reduced) video.play().catch(() => {});
    else video.pause();
  }, [visible, playing, reduced]);

  return (
    <>
      <video
        ref={ref}
        className={className}
        poster={`/videos/${name}-poster.webp`}
        src={loaded && !reduced ? `/videos/${name}.mp4` : undefined}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      />
      {!reduced && (
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause background video" : "Play background video"}
          className={`absolute z-10 w-10 h-10 rounded-full bg-ink/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-ink/80 transition-colors cursor-pointer ${controlsClassName}`}
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>
      )}
    </>
  );
}
