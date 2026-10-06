import { useState } from "react";
import DemoFrame from "./DemoFrame";

const inputs = [
  { key: "usage", label: "Monthly usage", min: 0, max: 100, unit: "%" },
  { key: "tickets", label: "Support tickets", min: 0, max: 10, unit: "" },
  { key: "tenure", label: "Tenure", min: 0, max: 36, unit: " mo" },
];

// Small fixed network: 3 inputs → 4 hidden (tanh) → 1 output (sigmoid) = churn risk.
const W1 = [
  [-1.6, 1.2, -0.4, 0.3],
  [1.4, -0.3, 1.5, 0.6],
  [-0.9, -1.1, -0.2, -1.4],
];
const B1 = [0.3, -0.2, -0.5, 0.4];
const W2 = [1.5, -1.3, 1.2, 1.1];
const B2 = -0.4;

const sigmoid = (x) => 1 / (1 + Math.exp(-x));

function forward(values) {
  const x = inputs.map((inp) => (values[inp.key] - inp.min) / (inp.max - inp.min));
  const hidden = B1.map((b, j) => Math.tanh(x.reduce((s, xi, i) => s + xi * W1[i][j], b)));
  const out = sigmoid(hidden.reduce((s, h, j) => s + h * W2[j], B2));
  return { x, hidden, out };
}

const layerX = [70, 260, 450];
const ys = (n) => Array.from({ length: n }, (_, i) => 50 + (i * 220) / Math.max(1, n - 1));

export default function NeuralNetDemo() {
  const [values, setValues] = useState({ usage: 25, tickets: 6, tenure: 4 });
  const { x, hidden, out } = forward(values);

  const inY = ys(3);
  const hidY = ys(4);
  const outY = [160];

  const edge = (w, a) => {
    const strength = Math.min(1, Math.abs(w * a));
    return {
      stroke: w * a >= 0 ? `rgba(34,197,94,${0.15 + strength * 0.8})` : `rgba(248,113,113,${0.15 + strength * 0.8})`,
      strokeWidth: 1 + strength * 4,
    };
  };

  const node = (a) => `rgba(181,242,61,${0.15 + Math.abs(a) * 0.85})`;
  const risk = Math.round(out * 100);
  const riskLabel = risk > 65 ? "High risk" : risk > 35 ? "Medium risk" : "Low risk";
  const riskColor = risk > 65 ? "text-red-400" : risk > 35 ? "text-yellow-200" : "text-brand";

  return (
    <DemoFrame title="Neural Network Visualiser · Churn prediction">
      <div className="grid lg:grid-cols-[240px_1fr] gap-6">
        <div className="space-y-5">
          {inputs.map((inp) => (
            <label key={inp.key} className="block">
              <span className="flex justify-between text-sm">
                <span className="text-gray-300">{inp.label}</span>
                <span className="text-brand tabular-nums">
                  {values[inp.key]}
                  {inp.unit}
                </span>
              </span>
              <input
                type="range"
                min={inp.min}
                max={inp.max}
                value={values[inp.key]}
                onChange={(e) => setValues((v) => ({ ...v, [inp.key]: Number(e.target.value) }))}
                className="mt-2 w-full accent-[#22c55e]"
              />
            </label>
          ))}

          <div className="rounded-2xl border border-white/10 bg-ink/60 p-4 text-center" aria-live="polite">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Predicted churn</p>
            <p className={`mt-1 font-display text-4xl font-bold tabular-nums ${riskColor}`}>{risk}%</p>
            <p className={`text-sm font-semibold ${riskColor}`}>{riskLabel}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-ink/60 overflow-hidden">
          <svg viewBox="0 0 520 320" className="w-full h-auto" role="img" aria-label={`Neural network diagram, churn ${risk}%`}>
            {inY.map((y1, i) =>
              hidY.map((y2, j) => <line key={`a${i}${j}`} x1={layerX[0]} y1={y1} x2={layerX[1]} y2={y2} {...edge(W1[i][j], x[i])} />)
            )}
            {hidY.map((y1, j) => (
              <line key={`b${j}`} x1={layerX[1]} y1={y1} x2={layerX[2]} y2={outY[0]} {...edge(W2[j], hidden[j])} />
            ))}

            {inY.map((y, i) => (
              <g key={`in${i}`}>
                <circle cx={layerX[0]} cy={y} r="20" fill="#0b1210" />
                <circle cx={layerX[0]} cy={y} r="20" fill={node(x[i])} stroke="#22c55e" strokeWidth="2" />
                <text x={layerX[0]} y={y + 36} textAnchor="middle" fontSize="11" fill="#9ca3af">{inputs[i].label}</text>
              </g>
            ))}
            {hidY.map((y, j) => (
              <g key={`h${j}`}>
                <circle cx={layerX[1]} cy={y} r="18" fill="#0b1210" />
                <circle cx={layerX[1]} cy={y} r="18" fill={node(hidden[j])} stroke="#22d3ee" strokeWidth="2" />
              </g>
            ))}
            <circle cx={layerX[2]} cy={outY[0]} r="30" fill="#0b1210" />
            <circle cx={layerX[2]} cy={outY[0]} r="30" fill={`rgba(248,113,113,${0.15 + out * 0.85})`} stroke="#f87171" strokeWidth="2" />
            <text x={layerX[2]} y={outY[0] + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">{risk}%</text>

            <text x={layerX[0]} y="20" textAnchor="middle" fontSize="11" fill="#6b7280">INPUT</text>
            <text x={layerX[1]} y="20" textAnchor="middle" fontSize="11" fill="#6b7280">HIDDEN</text>
            <text x={layerX[2]} y="20" textAnchor="middle" fontSize="11" fill="#6b7280">OUTPUT</text>
          </svg>
          <div className="flex gap-5 px-4 pb-3 text-xs text-gray-400">
            <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-brand" /> Excitatory signal</span>
            <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-red-400" /> Inhibitory signal</span>
            <span className="ml-auto">Thicker = stronger</span>
          </div>
        </div>
      </div>
    </DemoFrame>
  );
}
