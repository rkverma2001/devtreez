import { useId, useState } from "react";

const W = 600;
const H = 220;
const PAD = { top: 16, right: 16, bottom: 24, left: 44 };

// Single-series line chart with crosshair tooltip. Points flagged `anomaly` get a red marker.
export default function LiveLineChart({ data, format = (v) => v, label, yMax }) {
  const [hover, setHover] = useState(null);
  const gradientId = `live-area-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const max = yMax ?? Math.max(10, ...data.map((d) => d.v)) * 1.15;
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const x = (i) => PAD.left + (data.length <= 1 ? 0 : (i / (data.length - 1)) * innerW);
  const y = (v) => PAD.top + innerH - (v / max) * innerH;

  const line = data.map((d, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(d.v).toFixed(1)}`).join(" ");
  const area = data.length ? `${line} L${x(data.length - 1)},${PAD.top + innerH} L${x(0)},${PAD.top + innerH} Z` : "";
  const ticks = [0, 0.5, 1].map((f) => max * f);

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    const i = Math.round(((px - PAD.left) / innerW) * (data.length - 1));
    setHover(i >= 0 && i < data.length ? i : null);
  };

  const hd = hover !== null ? data[hover] : null;

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        role="img"
        aria-label={label}
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
          </linearGradient>
        </defs>

        {ticks.map((t) => (
          <g key={t}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} stroke="rgba(255,255,255,0.06)" />
            <text x={PAD.left - 8} y={y(t) + 4} textAnchor="end" fontSize="10" fill="#6b7280">
              {format(Math.round(t))}
            </text>
          </g>
        ))}
        <text x={PAD.left} y={H - 6} fontSize="10" fill="#6b7280">older</text>
        <text x={W - PAD.right} y={H - 6} fontSize="10" fill="#6b7280" textAnchor="end">now</text>

        <path d={area} fill={`url(#${gradientId})`} />
        <path d={line} fill="none" stroke="#22c55e" strokeWidth="2" strokeLinejoin="round" />

        {data.map((d, i) =>
          d.anomaly ? (
            <circle key={d.t} cx={x(i)} cy={y(d.v)} r="5" fill="#f87171" stroke="#0b1210" strokeWidth="2" />
          ) : null
        )}

        {hd && (
          <g>
            <line x1={x(hover)} x2={x(hover)} y1={PAD.top} y2={PAD.top + innerH} stroke="rgba(255,255,255,0.3)" strokeDasharray="3 3" />
            <circle cx={x(hover)} cy={y(hd.v)} r="5" fill="#22c55e" stroke="#0b1210" strokeWidth="2" />
          </g>
        )}
        {/* generous hit target */}
        <rect x={PAD.left} y={PAD.top} width={innerW} height={innerH} fill="transparent" />
      </svg>

      {hd && (
        <div
          className="pointer-events-none absolute top-2 -translate-x-1/2 rounded-lg border border-white/10 bg-ink/95 px-3 py-2 text-xs shadow-xl whitespace-nowrap"
          style={{ left: `${Math.min(85, Math.max(15, (x(hover) / W) * 100))}%` }}
        >
          <p className="text-gray-400">{hd.time}</p>
          <p className="font-semibold text-white tabular-nums">{format(Math.round(hd.v))}</p>
          {hd.anomaly && <p className="text-red-300 font-semibold">⚠ Anomaly</p>}
        </div>
      )}
    </div>
  );
}
