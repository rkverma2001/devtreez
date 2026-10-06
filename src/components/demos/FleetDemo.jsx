import { useEffect, useState } from "react";
import { AlertTriangle, Fuel, Gauge, Truck } from "lucide-react";
import DemoFrame from "./DemoFrame";

const routes = [
  [[40, 300], [160, 300], [160, 180], [320, 180], [320, 60], [560, 60]],
  [[40, 60], [240, 60], [240, 260], [460, 260], [460, 330]],
  [[560, 320], [400, 320], [400, 120], [120, 120], [120, 40]],
  [[300, 340], [300, 220], [520, 220], [520, 140], [580, 140]],
  [[20, 200], [200, 200], [200, 330], [380, 330]],
];

const vehicles = [
  { id: "DT-101", driver: "Aarav", speed: 0.045, offset: 0.1, baseSpeed: 62 },
  { id: "DT-204", driver: "Meera", speed: 0.035, offset: 0.4, baseSpeed: 48 },
  { id: "DT-317", driver: "Kabir", speed: 0.05, offset: 0.7, baseSpeed: 71, alert: "Brake pads at 18%: service due" },
  { id: "DT-422", driver: "Isha", speed: 0.04, offset: 0.2, baseSpeed: 55 },
  { id: "DT-509", driver: "Rohan", speed: 0.03, offset: 0.55, baseSpeed: 44 },
];

function pointOnRoute(points, t) {
  const segs = points.slice(1).map((p, i) => Math.hypot(p[0] - points[i][0], p[1] - points[i][1]));
  const total = segs.reduce((a, b) => a + b, 0);
  // ping-pong along the route
  const phase = t % 2;
  let dist = (phase < 1 ? phase : 2 - phase) * total;
  for (let i = 0; i < segs.length; i++) {
    if (dist <= segs[i]) {
      const r = dist / segs[i];
      const [x1, y1] = points[i];
      const [x2, y2] = points[i + 1];
      return [x1 + (x2 - x1) * r, y1 + (y2 - y1) * r];
    }
    dist -= segs[i];
  }
  return points.at(-1);
}

export default function FleetDemo() {
  const [time, setTime] = useState(0);
  const [selected, setSelected] = useState("DT-317");

  useEffect(() => {
    const id = setInterval(() => setTime((t) => t + 0.1), 100);
    return () => clearInterval(id);
  }, []);

  const live = vehicles.map((v, i) => {
    const t = v.offset + time * v.speed;
    const [x, y] = pointOnRoute(routes[i], t);
    const speed = Math.round(v.baseSpeed + Math.sin(time * 0.8 + i) * 8);
    // drains slowly, then "refuels" back up
    const fuel = Math.round(20 + ((((66 - i * 9 - time * 0.3) % 66) + 66) % 66));
    return { ...v, x, y, speed, fuel };
  });

  const avgSpeed = Math.round(live.reduce((a, v) => a + v.speed, 0) / live.length);
  const current = live.find((v) => v.id === selected);

  return (
    <DemoFrame title="Connected Fleet Dashboard">
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { icon: Truck, label: "Active vehicles", value: live.length },
          { icon: Gauge, label: "Avg speed", value: `${avgSpeed} km/h` },
          { icon: AlertTriangle, label: "Alerts", value: live.filter((v) => v.alert).length },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-ink/60 p-3 sm:p-4">
            <Icon size={18} className="text-brand" />
            <p className="mt-2 font-display text-xl sm:text-2xl font-bold tabular-nums">{value}</p>
            <p className="text-xs text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_240px] gap-5">
        <div className="rounded-2xl border border-white/10 bg-ink/80 overflow-hidden">
          <svg viewBox="0 0 600 360" className="w-full h-auto" role="img" aria-label="Live fleet map">
            <defs>
              <pattern id="fleet-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M30 0H0V30" fill="none" stroke="rgba(255,255,255,0.04)" />
              </pattern>
            </defs>
            <rect width="600" height="360" fill="url(#fleet-grid)" />
            {routes.map((r, i) => (
              <polyline
                key={i}
                points={r.map((p) => p.join(",")).join(" ")}
                fill="none"
                stroke={live[i].id === selected ? "rgba(34,197,94,0.6)" : "rgba(255,255,255,0.12)"}
                strokeWidth={live[i].id === selected ? 4 : 6}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
            {live.map((v) => (
              <g
                key={v.id}
                transform={`translate(${v.x} ${v.y})`}
                onClick={() => setSelected(v.id)}
                className="cursor-pointer"
              >
                {v.alert && <circle r="16" fill="rgba(239,68,68,0.2)" className="animate-ping" style={{ transformOrigin: "center", transformBox: "fill-box" }} />}
                <circle r="9" fill={v.alert ? "#ef4444" : "#22c55e"} stroke="#05070a" strokeWidth="3" />
                {v.id === selected && <circle r="14" fill="none" stroke="#b5f23d" strokeWidth="2" />}
                <text y="-16" textAnchor="middle" fontSize="11" fill="#e5e7eb" fontWeight="600">
                  {v.id}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="space-y-2">
          {live.map((v) => (
            <button
              key={v.id}
              onClick={() => setSelected(v.id)}
              className={`w-full text-left rounded-xl border px-4 py-3 transition-colors cursor-pointer ${
                v.id === selected ? "border-brand/50 bg-brand/10" : "border-white/10 bg-ink/60 hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">{v.id}</span>
                <span className="text-xs text-gray-400 tabular-nums">{v.speed} km/h</span>
              </div>
              <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                <Fuel size={12} /> {v.fuel}%
                {v.alert && (
                  <span className="ml-auto inline-flex items-center gap-1 text-red-400">
                    <AlertTriangle size={12} /> Service
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {current && (
        <div className={`mt-5 rounded-2xl border p-4 text-sm ${current.alert ? "border-red-400/40 bg-red-400/10" : "border-white/10 bg-ink/60"}`}>
          <span className="font-semibold">{current.id}</span> · Driver {current.driver} · {current.speed} km/h · Fuel {current.fuel}%
          {current.alert ? (
            <p className="mt-1 flex items-center gap-2 text-red-300">
              <AlertTriangle size={14} /> Predictive maintenance: {current.alert}
            </p>
          ) : (
            <p className="mt-1 text-gray-400">All systems healthy.</p>
          )}
        </div>
      )}
    </DemoFrame>
  );
}
