import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, Pause, Play, Zap } from "lucide-react";
import DemoFrame from "./DemoFrame";
import LiveLineChart from "./LiveLineChart";

const WINDOW = 20;
const Z_THRESHOLD = 3.5;

const clock = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

const median = (xs) => {
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

// Modified z-score (median / MAD): robust to the spikes it is looking for.
function robustZ(values, v) {
  const med = median(values);
  const mad = median(values.map((x) => Math.abs(x - med))) || 1;
  return (0.6745 * (v - med)) / mad;
}

export default function LiveAnalyticsDemo() {
  const [data, setData] = useState([]);
  const [log, setLog] = useState([]);
  const [paused, setPaused] = useState(false);
  const tick = useRef(0);
  const forceSpike = useRef(false);
  const dataRef = useRef([]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      tick.current += 1;
      const t = tick.current;
      const d = dataRef.current;
      const base = 120 + Math.sin(t / 6) * 18 + (Math.random() - 0.5) * 10;
      // No random spikes until the detector has a baseline to compare against.
      const spike = forceSpike.current || (t > WINDOW && Math.random() < 0.04);
      forceSpike.current = false;
      const v = spike ? base + 70 + Math.random() * 40 : base;
      const recent = d.slice(-WINDOW).map((p) => p.v);
      const z = recent.length >= 10 ? robustZ(recent, v) : 0;
      const point = { t, v, time: clock(), anomaly: Math.abs(z) > Z_THRESHOLD, z };

      dataRef.current = [...d.slice(-59), point];
      setData(dataRef.current);
      if (point.anomaly) {
        setLog((l) => [{ t, time: point.time, v, z }, ...l].slice(0, 5));
      }
    }, 500);
    return () => clearInterval(id);
  }, [paused]);

  const current = data.at(-1)?.v ?? 0;
  const avg = data.length ? data.reduce((a, p) => a + p.v, 0) / data.length : 0;
  const anomalies = data.filter((p) => p.anomaly).length;

  return (
    <DemoFrame title="Real-Time Anomaly Detection">
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <button
          onClick={() => setPaused((p) => !p)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-sm hover:border-white/25 cursor-pointer"
        >
          {paused ? <Play size={16} /> : <Pause size={16} />} {paused ? "Resume stream" : "Pause stream"}
        </button>
        <button
          onClick={() => (forceSpike.current = true)}
          disabled={paused || data.length < 10}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand to-volt text-black text-sm font-semibold disabled:opacity-50 cursor-pointer"
        >
          <Zap size={16} /> Inject a spike
        </button>
        <span className="text-xs text-gray-500">Robust z-score (median/MAD) over the last {WINDOW} points · alert above {Z_THRESHOLD}</span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Orders / min (now)", value: Math.round(current) },
          { label: "Average", value: Math.round(avg) },
          { label: "Anomalies (window)", value: anomalies },
        ].map((k) => (
          <div key={k.label} className="rounded-2xl border border-white/10 bg-ink/60 p-3">
            <p className="text-xs text-gray-500">{k.label}</p>
            <p className="mt-1 font-display text-xl sm:text-2xl font-bold tabular-nums">{k.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_240px] gap-5">
        <div className="rounded-2xl border border-white/10 bg-ink/60 p-3">
          <p className="px-2 text-xs text-gray-500">Orders per minute · red markers are anomalies</p>
          <LiveLineChart data={data} label="Orders per minute with anomalies marked" yMax={260} />
        </div>

        <div className="rounded-2xl border border-white/10 bg-ink/60 p-4" aria-live="polite">
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Alert log</h4>
          {log.length === 0 ? (
            <p className="mt-3 text-sm text-gray-400">Watching the stream… inject a spike to trigger an alert.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              <AnimatePresence initial={false}>
                {log.map((a) => (
                  <motion.li
                    key={a.t}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-2 rounded-xl border border-red-400/30 bg-red-400/10 p-2.5 text-xs"
                  >
                    <AlertTriangle size={14} className="text-red-300 shrink-0 mt-0.5" />
                    <span>
                      <span className="block font-semibold text-red-200">Spike: {Math.round(a.v)} orders/min</span>
                      <span className="text-gray-400">
                        {a.time} · score {a.z.toFixed(1)}
                      </span>
                    </span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>
      </div>
    </DemoFrame>
  );
}
