import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ScanLine, RotateCcw } from "lucide-react";
import DemoFrame from "./DemoFrame";

const samples = [
  {
    name: "Scan A",
    urgency: "High",
    findings: [
      { x: 92, y: 120, w: 60, h: 54, label: "Opacity, right lower zone", confidence: 91 },
      { x: 196, y: 82, w: 38, h: 34, label: "Small nodule, left upper zone", confidence: 74 },
    ],
  },
  {
    name: "Scan B",
    urgency: "Routine",
    findings: [],
  },
  {
    name: "Scan C",
    urgency: "Medium",
    findings: [{ x: 178, y: 150, w: 56, h: 40, label: "Possible effusion, left base", confidence: 82 }],
  },
];

const urgencyStyles = {
  High: "text-red-300 border-red-400/40 bg-red-400/10",
  Medium: "text-yellow-200 border-yellow-400/40 bg-yellow-400/10",
  Routine: "text-brand border-brand/40 bg-brand/10",
};

function ChestIllustration() {
  return (
    <g>
      <rect width="320" height="260" fill="#020403" />
      <defs>
        <radialGradient id="lung" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#3b4a44" />
          <stop offset="100%" stopColor="#111815" />
        </radialGradient>
      </defs>
      {/* lungs */}
      <path d="M150 50 C110 40 70 70 68 140 C66 200 90 225 140 220 C150 180 152 110 150 50Z" fill="url(#lung)" />
      <path d="M170 50 C210 40 250 70 252 140 C254 200 230 225 180 220 C170 180 168 110 170 50Z" fill="url(#lung)" />
      {/* spine */}
      <rect x="152" y="20" width="16" height="230" rx="6" fill="#56645e" opacity="0.7" />
      {/* ribs */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i} stroke="#6f7f78" strokeWidth="5" fill="none" opacity="0.55" strokeLinecap="round">
          <path d={`M152 ${62 + i * 26} C120 ${50 + i * 26} 80 ${62 + i * 28} 64 ${92 + i * 26}`} />
          <path d={`M168 ${62 + i * 26} C200 ${50 + i * 26} 240 ${62 + i * 28} 256 ${92 + i * 26}`} />
        </g>
      ))}
      {/* clavicles */}
      <path d="M60 40 C100 30 130 40 152 46" stroke="#8a9a93" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M260 40 C220 30 190 40 168 46" stroke="#8a9a93" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.6" />
    </g>
  );
}

export default function ImagingDemo() {
  const [sampleIndex, setSampleIndex] = useState(0);
  const [status, setStatus] = useState("idle");
  const timerRef = useRef(null);
  const sample = samples[sampleIndex];

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const run = () => {
    setStatus("scanning");
    timerRef.current = setTimeout(() => setStatus("done"), 2200);
  };

  const choose = (i) => {
    clearTimeout(timerRef.current);
    setSampleIndex(i);
    setStatus("idle");
  };

  return (
    <DemoFrame
      title="Diagnostic Imaging Assistant"
      note="Illustrative demo with a drawn image and simulated findings. Not a medical device and not medical advice."
    >
      <div className="grid lg:grid-cols-[1fr_280px] gap-5">
        <div className="relative rounded-2xl border border-white/10 overflow-hidden bg-black">
          <svg viewBox="0 0 320 260" className="w-full h-auto" role="img" aria-label={`Chest X-ray illustration, ${sample.name}`}>
            <ChestIllustration />
            <AnimatePresence>
              {status === "done" &&
                sample.findings.map((f, i) => (
                  <motion.g key={f.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.3 }}>
                    <rect x={f.x} y={f.y} width={f.w} height={f.h} rx="6" fill="rgba(239,68,68,0.12)" stroke="#f87171" strokeWidth="2" strokeDasharray="5 3" />
                    <rect x={f.x} y={f.y - 16} width="34" height="14" rx="3" fill="#f87171" />
                    <text x={f.x + 17} y={f.y - 6} textAnchor="middle" fontSize="9" fontWeight="700" fill="#05070a">
                      {f.confidence}%
                    </text>
                  </motion.g>
                ))}
            </AnimatePresence>
          </svg>

          {status === "scanning" && (
            <motion.div
              initial={{ top: "0%" }}
              animate={{ top: "100%" }}
              transition={{ duration: 2.1, ease: "easeInOut" }}
              className="absolute left-0 right-0 h-1 bg-aqua shadow-[0_0_30px_8px_rgba(34,211,238,0.6)]"
            />
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            {samples.map((s, i) => (
              <button
                key={s.name}
                onClick={() => choose(i)}
                className={`flex-1 px-3 py-2 rounded-xl border text-sm cursor-pointer transition-colors ${
                  i === sampleIndex ? "border-brand/50 bg-brand/10 text-brand" : "border-white/10 text-gray-300 hover:border-white/20"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>

          <button
            onClick={status === "done" ? () => setStatus("idle") : run}
            disabled={status === "scanning"}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-brand to-volt text-black font-semibold disabled:opacity-60 cursor-pointer"
          >
            {status === "done" ? <RotateCcw size={18} /> : <ScanLine size={18} />}
            {status === "scanning" ? "Analysing…" : status === "done" ? "Reset" : "Run AI analysis"}
          </button>

          <div className="rounded-2xl border border-white/10 bg-ink/60 p-4 text-sm flex-1" aria-live="polite">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">AI findings</h4>
            {status !== "done" ? (
              <p className="mt-3 text-gray-400">
                {status === "scanning" ? "Model is reading the scan…" : "Choose a scan and run the analysis."}
              </p>
            ) : (
              <>
                <span className={`mt-3 inline-flex px-3 py-1 rounded-full border text-xs font-semibold ${urgencyStyles[sample.urgency]}`}>
                  Worklist priority: {sample.urgency}
                </span>
                {sample.findings.length === 0 ? (
                  <p className="mt-3 text-gray-300">No regions of interest detected.</p>
                ) : (
                  <ul className="mt-3 space-y-2">
                    {sample.findings.map((f) => (
                      <li key={f.label} className="flex justify-between gap-3">
                        <span className="text-gray-300">{f.label}</span>
                        <span className="text-red-300 font-semibold tabular-nums">{f.confidence}%</span>
                      </li>
                    ))}
                  </ul>
                )}
                <p className="mt-3 text-xs text-gray-500">Flagged for radiologist review. Final diagnosis is always made by a clinician.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </DemoFrame>
  );
}
