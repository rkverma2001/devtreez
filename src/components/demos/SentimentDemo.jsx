import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Smile, Frown, Meh } from "lucide-react";
import DemoFrame from "./DemoFrame";

const lexicon = {
  love: 3, amazing: 3, excellent: 3, fantastic: 3, awesome: 3, brilliant: 3, perfect: 3,
  great: 2, good: 2, happy: 2, fast: 2, helpful: 2, easy: 2, recommend: 2, thanks: 2, friendly: 2, smooth: 2,
  nice: 1, fine: 1, okay: 0.5, works: 1, quick: 1,
  bad: -2, slow: -2, poor: -2, broken: -2, confusing: -2, late: -2, rude: -2, disappointed: -2, expensive: -1, bug: -2, crash: -2, crashes: -2,
  terrible: -3, awful: -3, worst: -3, hate: -3, useless: -3, horrible: -3,
};
const negations = new Set(["not", "no", "never", "don't", "didn't", "isn't", "wasn't", "can't", "won't"]);
const intensifiers = { very: 1.5, really: 1.5, super: 1.6, extremely: 2, so: 1.3 };

const presets = [
  "The new app is amazing, checkout is super fast and support was really helpful!",
  "Delivery was late again and the tracking page is confusing. Really disappointed.",
  "Setup was easy, but the app crashes when I upload photos.",
];

function analyse(text) {
  const tokens = text.split(/(\s+)/);
  let score = 0;
  let prev = [];
  const marked = tokens.map((tok) => {
    const word = tok.toLowerCase().replace(/[^a-z']/g, "");
    if (!word) return { tok, weight: 0 };
    let weight = lexicon[word] ?? 0;
    if (weight) {
      const boost = prev.reduce((m, w) => m * (intensifiers[w] ?? 1), 1);
      const negated = prev.some((w) => negations.has(w));
      weight = weight * boost * (negated ? -0.8 : 1);
      score += weight;
    }
    prev = [...prev.slice(-1), word];
    return { tok, weight };
  });
  const normalised = Math.max(-1, Math.min(1, score / 6));
  return { marked, normalised };
}

export default function SentimentDemo() {
  const [text, setText] = useState(presets[0]);
  const { marked, normalised } = useMemo(() => analyse(text), [text]);

  const label = normalised > 0.15 ? "Positive" : normalised < -0.15 ? "Negative" : "Neutral";
  const Icon = label === "Positive" ? Smile : label === "Negative" ? Frown : Meh;
  const color = label === "Positive" ? "text-brand" : label === "Negative" ? "text-red-400" : "text-gray-300";

  return (
    <DemoFrame title="Sentiment Analysis · NLP">
      <div className="flex flex-wrap gap-2 mb-4">
        {presets.map((p, i) => (
          <button
            key={p}
            onClick={() => setText(p)}
            className="px-3 py-1.5 rounded-full border border-white/10 text-xs text-gray-300 hover:border-brand/50 hover:text-brand cursor-pointer"
          >
            Example {i + 1}
          </button>
        ))}
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        aria-label="Text to analyse"
        className="w-full rounded-2xl bg-ink/60 border border-white/10 p-4 text-sm focus:outline-none focus:border-brand resize-none"
      />

      <div className="mt-5 grid sm:grid-cols-[1fr_200px] gap-5">
        <div className="rounded-2xl border border-white/10 bg-ink/60 p-4 text-sm leading-loose">
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 mb-2">Word-level signals</h4>
          <p>
            {marked.map((m, i) =>
              m.weight ? (
                <mark
                  key={i}
                  className={`rounded px-1 ${m.weight > 0 ? "bg-brand/20 text-brand" : "bg-red-400/20 text-red-300"}`}
                  title={`${m.weight > 0 ? "+" : ""}${m.weight.toFixed(1)}`}
                >
                  {m.tok}
                </mark>
              ) : (
                <span key={i} className="text-gray-300">{m.tok}</span>
              )
            )}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-ink/60 p-4 flex flex-col items-center justify-center text-center" aria-live="polite">
          <Icon size={40} className={color} />
          <p className={`mt-2 font-display text-2xl font-bold ${color}`}>{label}</p>
          <div className="mt-4 w-full">
            <div className="relative h-2 rounded-full bg-gradient-to-r from-red-400/60 via-gray-500/60 to-brand/70">
              <motion.span
                animate={{ left: `${((normalised + 1) / 2) * 100}%` }}
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-ink"
              />
            </div>
            <div className="mt-1 flex justify-between text-[10px] text-gray-500">
              <span>Negative</span>
              <span className="tabular-nums">{normalised.toFixed(2)}</span>
              <span>Positive</span>
            </div>
          </div>
        </div>
      </div>
    </DemoFrame>
  );
}
