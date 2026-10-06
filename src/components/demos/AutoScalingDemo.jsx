import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Server, Zap } from "lucide-react";
import DemoFrame from "./DemoFrame";
import LiveLineChart from "./LiveLineChart";

const CAPACITY = 200; // requests/sec one server handles comfortably
const MIN_SERVERS = 2;
const MAX_SERVERS = 12;

const clock = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

export default function AutoScalingDemo() {
  const [auto, setAuto] = useState(true);
  const [manual, setManual] = useState(600);
  const [history, setHistory] = useState([]);
  const [servers, setServers] = useState(3);
  const tick = useRef(0);
  const trafficRef = useRef(manual);

  const traffic = history.at(-1)?.v ?? manual;

  useEffect(() => {
    const id = setInterval(() => {
      tick.current += 1;
      const t = tick.current;
      const next = auto
        ? Math.max(80, 900 + Math.sin(t / 8) * 650 + Math.sin(t / 2.3) * 120 + (Math.random() - 0.5) * 80)
        : manual + (Math.random() - 0.5) * 40;
      trafficRef.current = next;
      setHistory((h) => [...h.slice(-39), { t, v: next, time: clock() }]);
    }, 600);
    return () => clearInterval(id);
  }, [auto, manual]);

  // Scale one server per cooldown period toward the target, like a real autoscaler.
  useEffect(() => {
    const id = setInterval(() => {
      const target = Math.min(MAX_SERVERS, Math.max(MIN_SERVERS, Math.ceil(trafficRef.current / (CAPACITY * 0.75))));
      setServers((s) => s + Math.sign(target - s));
    }, 900);
    return () => clearInterval(id);
  }, []);

  const utilisation = traffic / (servers * CAPACITY);
  const latency = Math.round(35 + Math.max(0, utilisation - 0.7) * 600);
  const cost = servers * 14;

  return (
    <DemoFrame title="Cloud Auto-Scaling Simulator">
      <div className="flex flex-wrap items-center gap-4 mb-5">
        <div className="inline-flex rounded-full border border-white/10 p-1 text-sm">
          {[
            { v: true, l: "Live traffic" },
            { v: false, l: "Manual" },
          ].map((o) => (
            <button
              key={o.l}
              onClick={() => setAuto(o.v)}
              className={`px-4 py-1.5 rounded-full cursor-pointer transition-colors ${auto === o.v ? "bg-brand text-black font-semibold" : "text-gray-300"}`}
            >
              {o.l}
            </button>
          ))}
        </div>
        {!auto && (
          <label className="flex items-center gap-3 text-sm flex-1 min-w-[220px]">
            <Zap size={16} className="text-volt" />
            <input
              type="range"
              min={100}
              max={2200}
              step={50}
              value={manual}
              onChange={(e) => setManual(Number(e.target.value))}
              className="flex-1 accent-[#22c55e]"
              aria-label="Requests per second"
            />
            <span className="tabular-nums w-20 text-right">{manual} rps</span>
          </label>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: "Traffic", value: `${Math.round(traffic)} rps` },
          { label: "Servers", value: servers },
          { label: "Latency (p95)", value: `${latency} ms`, warn: latency > 120 },
          { label: "Cost", value: `₹${cost}/hr` },
        ].map((k) => (
          <div key={k.label} className={`rounded-2xl border p-3 ${k.warn ? "border-yellow-400/40 bg-yellow-400/10" : "border-white/10 bg-ink/60"}`}>
            <p className="text-xs text-gray-500">{k.label}</p>
            <p className="mt-1 font-display text-xl font-bold tabular-nums">{k.value}</p>
            {k.warn && <p className="text-[11px] text-yellow-200">⚠ Scaling up…</p>}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_260px] gap-5">
        <div className="rounded-2xl border border-white/10 bg-ink/60 p-3">
          <p className="px-2 text-xs text-gray-500">Requests per second</p>
          <LiveLineChart data={history} label="Requests per second over time" format={(v) => `${v}`} yMax={2400} />
        </div>

        <div className="rounded-2xl border border-white/10 bg-ink/60 p-4">
          <p className="text-xs text-gray-500 mb-3">Cluster ({servers}/{MAX_SERVERS} nodes)</p>
          <div className="grid grid-cols-4 gap-2">
            <AnimatePresence>
              {Array.from({ length: servers }, (_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.4 }}
                  className="aspect-square rounded-xl border border-brand/40 bg-brand/10 flex items-center justify-center"
                >
                  <Server size={18} className="text-brand" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <p className="mt-4 text-xs text-gray-500">Load per node</p>
          <div className="mt-1 h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              animate={{ width: `${Math.min(100, utilisation * 100)}%` }}
              className={`h-full ${utilisation > 0.85 ? "bg-yellow-400" : "bg-brand"}`}
            />
          </div>
          <p className="mt-1 text-xs text-gray-400 tabular-nums">{Math.round(utilisation * 100)}% utilised</p>
        </div>
      </div>
    </DemoFrame>
  );
}
