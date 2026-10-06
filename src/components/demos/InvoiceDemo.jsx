import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, AlertTriangle, FileScan, RotateCcw } from "lucide-react";
import DemoFrame from "./DemoFrame";

const invoices = [
  {
    label: "Invoice 1",
    vendor: "Northwind Supplies Pvt Ltd",
    number: "INV-2048",
    date: "12 Sep 2026",
    items: [
      { desc: "Office chairs ×4", amount: 24000 },
      { desc: "Standing desks ×2", amount: 38000 },
      { desc: "Delivery", amount: 1500 },
    ],
    paid: 63500,
  },
  {
    label: "Invoice 2",
    vendor: "Bluepeak Cloud Services",
    number: "BP-7731",
    date: "28 Sep 2026",
    items: [
      { desc: "Compute hours", amount: 41200 },
      { desc: "Storage (2 TB)", amount: 6800 },
      { desc: "Premium support", amount: 9000 },
    ],
    paid: 54000,
  },
];

const inr = (n) => `₹${n.toLocaleString("en-IN")}`;

export default function InvoiceDemo() {
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0); // 0 idle, 1..n extracting fields, n+1 reconciled
  const timerRef = useRef(null);
  const invoice = invoices[index];
  const total = invoice.items.reduce((a, i) => a + i.amount, 0);

  const fields = [
    { key: "Vendor", value: invoice.vendor, confidence: 99 },
    { key: "Invoice no.", value: invoice.number, confidence: 98 },
    { key: "Date", value: invoice.date, confidence: 97 },
    ...invoice.items.map((it) => ({ key: it.desc, value: inr(it.amount), confidence: 95 })),
    { key: "Total", value: inr(total), confidence: 99 },
  ];
  const done = step > fields.length;
  const matched = total === invoice.paid;

  useEffect(() => {
    if (step === 0 || done) return;
    timerRef.current = setTimeout(() => setStep((s) => s + 1), 280);
    return () => clearTimeout(timerRef.current);
  }, [step, done]);

  const choose = (i) => {
    setIndex(i);
    setStep(0);
  };

  return (
    <DemoFrame title="Invoice Automation Suite">
      <div className="flex gap-2 mb-5">
        {invoices.map((inv, i) => (
          <button
            key={inv.label}
            onClick={() => choose(i)}
            className={`px-4 py-2 rounded-xl border text-sm cursor-pointer transition-colors ${
              i === index ? "border-brand/50 bg-brand/10 text-brand" : "border-white/10 text-gray-300 hover:border-white/20"
            }`}
          >
            {inv.label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Paper invoice */}
        <div className="relative rounded-2xl bg-gray-100 text-gray-800 p-6 font-mono text-xs sm:text-sm overflow-hidden">
          <div className="flex justify-between">
            <p className={`font-bold ${step === 1 ? "bg-brand/40" : ""} transition-colors`}>{invoice.vendor}</p>
            <p className="font-bold text-gray-400">INVOICE</p>
          </div>
          <p className={`mt-3 ${step === 2 ? "bg-brand/40" : ""}`}>No: {invoice.number}</p>
          <p className={step === 3 ? "bg-brand/40" : ""}>Date: {invoice.date}</p>
          <div className="mt-4 border-t border-dashed border-gray-400 pt-3 space-y-1">
            {invoice.items.map((it, i) => (
              <div key={it.desc} className={`flex justify-between ${step === 4 + i ? "bg-brand/40" : ""}`}>
                <span>{it.desc}</span>
                <span>{inr(it.amount)}</span>
              </div>
            ))}
          </div>
          <div className={`mt-3 border-t border-gray-400 pt-2 flex justify-between font-bold ${step === fields.length ? "bg-brand/40" : ""}`}>
            <span>TOTAL</span>
            <span>{inr(total)}</span>
          </div>
          {step > 0 && !done && (
            <motion.div
              initial={{ top: 0 }}
              animate={{ top: "100%" }}
              transition={{ duration: fields.length * 0.28, ease: "linear" }}
              className="absolute left-0 right-0 h-0.5 bg-brand shadow-[0_0_20px_4px_rgba(34,197,94,0.6)]"
            />
          )}
        </div>

        {/* Extracted data */}
        <div className="rounded-2xl border border-white/10 bg-ink/60 p-5 flex flex-col">
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Extracted data</h4>
          <ul className="mt-3 space-y-1.5 text-sm flex-1">
            {fields.map((f, i) =>
              step > i ? (
                <motion.li key={f.key} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="flex justify-between gap-3">
                  <span className="text-gray-400 truncate">{f.key}</span>
                  <span className="text-right">
                    {f.value} <span className="text-[10px] text-brand">{f.confidence}%</span>
                  </span>
                </motion.li>
              ) : null
            )}
            {step === 0 && <li className="text-gray-500">Click extract to read the document.</li>}
          </ul>

          {done && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 rounded-xl border p-3 text-sm flex gap-2 ${
                matched ? "border-brand/40 bg-brand/10 text-brand" : "border-yellow-400/40 bg-yellow-400/10 text-yellow-200"
              }`}
              role="status"
            >
              {matched ? <CheckCircle2 size={18} className="shrink-0" /> : <AlertTriangle size={18} className="shrink-0" />}
              {matched
                ? `Matched: payment of ${inr(invoice.paid)} reconciles exactly.`
                : `Exception: payment of ${inr(invoice.paid)} is ${inr(total - invoice.paid)} short. Sent for review.`}
            </motion.div>
          )}

          <button
            onClick={() => setStep(done ? 0 : 1)}
            disabled={step > 0 && !done}
            className="mt-4 flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-brand to-volt text-black font-semibold disabled:opacity-60 cursor-pointer"
          >
            {done ? <RotateCcw size={18} /> : <FileScan size={18} />}
            {done ? "Reset" : step > 0 ? "Extracting…" : "Extract with AI"}
          </button>
        </div>
      </div>
    </DemoFrame>
  );
}
