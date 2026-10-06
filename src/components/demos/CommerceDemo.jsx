import { useState } from "react";
import { motion } from "motion/react";
import { Headphones, Watch, Shirt, Footprints, Laptop, Camera, Dumbbell, Coffee, Sparkles, RotateCcw } from "lucide-react";
import DemoFrame from "./DemoFrame";

const products = [
  { id: 1, name: "Noise-cancelling headphones", category: "Tech", price: 8999, icon: Headphones },
  { id: 2, name: "Smart fitness watch", category: "Fitness", price: 5499, icon: Watch },
  { id: 3, name: "Linen summer shirt", category: "Fashion", price: 1799, icon: Shirt },
  { id: 4, name: "Trail running shoes", category: "Fitness", price: 4299, icon: Footprints },
  { id: 5, name: "Ultralight laptop", category: "Tech", price: 64999, icon: Laptop },
  { id: 6, name: "Mirrorless camera", category: "Tech", price: 52999, icon: Camera },
  { id: 7, name: "Adjustable dumbbells", category: "Fitness", price: 6999, icon: Dumbbell },
  { id: 8, name: "Pour-over coffee kit", category: "Home", price: 2499, icon: Coffee },
  { id: 9, name: "Oversized denim jacket", category: "Fashion", price: 3299, icon: Shirt },
];

const tint = {
  Tech: "from-cyan-500/30 to-emerald-500/20",
  Fitness: "from-lime-400/30 to-emerald-500/20",
  Fashion: "from-emerald-400/30 to-teal-500/20",
  Home: "from-teal-400/30 to-cyan-500/20",
};

const inr = (n) => `₹${n.toLocaleString("en-IN")}`;

export default function CommerceDemo() {
  const [affinity, setAffinity] = useState({});
  const [viewed, setViewed] = useState([]);

  const view = (p) => {
    setAffinity((a) => ({ ...a, [p.category]: (a[p.category] ?? 0) + 1 }));
    setViewed((v) => [p.id, ...v.filter((id) => id !== p.id)]);
  };

  const reset = () => {
    setAffinity({});
    setViewed([]);
  };

  const totalSignals = Object.values(affinity).reduce((a, b) => a + b, 0);
  const recommendations = products
    .filter((p) => !viewed.includes(p.id))
    .map((p) => ({ ...p, score: (affinity[p.category] ?? 0) / Math.max(1, totalSignals) }))
    .sort((a, b) => b.score - a.score || a.id - b.id)
    .slice(0, 3);

  const topCategory = Object.entries(affinity).sort((a, b) => b[1] - a[1])[0]?.[0];

  return (
    <DemoFrame title="Personalised Storefront">
      <div className="flex items-center justify-between gap-3 mb-4">
        <p className="text-sm text-gray-400">Click products to browse. Recommendations update in real time.</p>
        <button onClick={reset} className="shrink-0 inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white cursor-pointer">
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {products.map((p) => {
          const Icon = p.icon;
          const seen = viewed.includes(p.id);
          return (
            <button
              key={p.id}
              onClick={() => view(p)}
              className={`text-left rounded-2xl border overflow-hidden transition-all cursor-pointer hover:-translate-y-1 ${
                seen ? "border-brand/50" : "border-white/10 hover:border-white/25"
              }`}
            >
              <div className={`h-20 bg-gradient-to-br ${tint[p.category]} flex items-center justify-center`}>
                <Icon size={30} />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium leading-snug line-clamp-2">{p.name}</p>
                <p className="mt-1 text-xs text-gray-500">
                  {p.category} · {inr(p.price)}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-brand/30 bg-brand/5 p-4 sm:p-5">
        <h4 className="flex items-center gap-2 font-semibold">
          <Sparkles size={18} className="text-brand" /> Recommended for you
        </h4>
        <p className="mt-1 text-xs text-gray-400">
          {topCategory
            ? `Because you've been browsing ${topCategory.toLowerCase()} (${Math.round((affinity[topCategory] / totalSignals) * 100)}% of your activity)`
            : "Browse a few products to personalise this row."}
        </p>
        <div className="mt-4 grid sm:grid-cols-3 gap-3">
          {recommendations.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                layout
                key={p.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 rounded-xl bg-ink/70 border border-white/10 p-3"
              >
                <span className={`w-10 h-10 shrink-0 rounded-lg bg-gradient-to-br ${tint[p.category]} flex items-center justify-center`}>
                  <Icon size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm truncate">{p.name}</span>
                  <span className="block text-xs text-gray-500">{Math.round(p.score * 100)}% match</span>
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </DemoFrame>
  );
}
