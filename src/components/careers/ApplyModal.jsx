import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, Loader2, Send, X } from "lucide-react";
import Honeypot from "../ui/Honeypot";
import { api, apiEnabled, sendByEmail } from "../../lib/api";

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 transition";

const fields = [
  ["name", "Full name", "text", "name"],
  ["email", "Email", "email", "email"],
  ["phone", "Phone (optional)", "tel", "tel"],
  ["linkedin", "LinkedIn URL (optional)", "url", "url"],
  ["portfolio", "Portfolio / GitHub URL (optional)", "url", "url"],
  ["resumeUrl", "Resume link, e.g. Google Drive (optional)", "url", "off"],
];

const empty = { name: "", email: "", phone: "", linkedin: "", portfolio: "", resumeUrl: "", coverLetter: "", website: "" };

// Mounted with a `key` per role by the Careers page, so each opening starts with a fresh form.
export default function ApplyModal({ role, onClose }) {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    dialogRef.current?.querySelector("input")?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Please tell us your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Please enter a valid email.";
    setErrors(next);
    if (Object.keys(next).length) return;
    if (!apiEnabled) {
      sendByEmail(`Application: ${role.title} - ${form.name}`, {
        Role: role.title,
        Name: form.name,
        Email: form.email,
        Phone: form.phone,
        LinkedIn: form.linkedin,
        Portfolio: form.portfolio,
        Resume: form.resumeUrl,
        "Why I'm a great fit": form.coverLetter,
      });
      setDone(true);
      return;
    }
    setSending(true);
    try {
      await api.post("/api/applications", { ...form, role: role.title });
      setDone(true);
    } catch (error) {
      setErrors({ ...error.fields, _: error.message });
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-ink/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-title"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-[2rem] border border-white/10 bg-surface p-6 sm:p-8 shadow-2xl"
      >
        <button onClick={onClose} aria-label="Close" className="absolute top-5 right-5 text-gray-400 hover:text-white cursor-pointer">
          <X size={22} />
        </button>

        {done ? (
          <div className="py-10 text-center" role="status">
            <CheckCircle2 className="mx-auto w-14 h-14 text-brand" />
            <h2 className="mt-5 font-display text-2xl font-bold">Application received</h2>
            <p className="mt-2 text-gray-400">
              {apiEnabled
                ? `Thanks, ${form.name.split(" ")[0]}! We'll review it and get back to you.`
                : "Your email app should open with your application ready to send. Attach your resume if you like."}
            </p>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <p className="text-brand text-xs font-semibold uppercase tracking-[0.2em]">Apply</p>
            <h2 id="apply-title" className="mt-2 font-display text-2xl sm:text-3xl font-bold pr-8">{role.title}</h2>
            <p className="mt-1 text-sm text-gray-400">{role.team} · {role.type} · {role.location}</p>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {fields.map(([key, label, type, auto]) => (
                <label key={key} className={`block ${key === "resumeUrl" ? "sm:col-span-2" : ""}`}>
                  <span className="block text-sm text-gray-300 mb-2">{label}</span>
                  <input type={type} value={form[key]} onChange={update(key)} autoComplete={auto} className={inputClass} />
                  {errors[key] && <span className="mt-1.5 block text-xs text-red-400">{errors[key]}</span>}
                </label>
              ))}
              <label className="block sm:col-span-2">
                <span className="block text-sm text-gray-300 mb-2">Why are you a great fit? (optional)</span>
                <textarea rows={4} value={form.coverLetter} onChange={update("coverLetter")} className={`${inputClass} resize-none`} />
              </label>
            </div>
            <Honeypot value={form.website} onChange={update("website")} />

            {errors._ && <p role="alert" className="mt-4 rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-300">{errors._}</p>}

            <button
              type="submit"
              disabled={sending}
              className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand to-volt px-7 py-4 rounded-full font-semibold text-black cursor-pointer disabled:opacity-60 disabled:cursor-wait"
            >
              {sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              {sending ? "Submitting…" : "Submit application"}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
