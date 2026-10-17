import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CalendarDays, CheckCircle2, Clock, Loader2, Mail, MapPin, MessageSquare, Phone, Sparkles } from "lucide-react";
import { contactInfo, faqs, services } from "../data/siteContent";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import HeadingBar from "../components/ui/HeadingBar";
import Honeypot from "../components/ui/Honeypot";
import { api } from "../lib/api";

const budgets = ["Under ₹5L", "₹5L – ₹15L", "₹15L – ₹50L", "₹50L+", "Not sure yet"];

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 transition";

export default function ContactPage() {
  const { state } = useLocation();
  const [form, setForm] = useState({
    name: "",
    email: state?.email ?? "",
    company: "",
    service: "",
    budget: "",
    message: state?.message ?? "",
    website: "",
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState("");
  const [openFaq, setOpenFaq] = useState(0);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Please tell us your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Please enter a valid email.";
    if (form.message.trim().length < 10) next.message = "A sentence or two about your project helps us prepare.";
    setErrors(next);
    setServerError("");
    if (Object.keys(next).length) return;
    setSending(true);
    try {
      await api.post("/api/leads", { ...form, source: "contact" });
      setSent(true);
    } catch (error) {
      setErrors(error.fields);
      setServerError(error.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        image="handshake"
        video="coworkers"
        imageAlt="Two people shaking hands in an office"
        title="Let's Build"
        highlight="What's Next"
        description="Tell us about your idea. We'll get back within one business day with next steps."
      />

      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-28 grid lg:grid-cols-[1fr_380px] gap-8">
        <Reveal>
          <div className="rounded-[2rem] border border-white/10 bg-surface p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center"
                  role="status"
                >
                  <CheckCircle2 className="mx-auto w-16 h-16 text-brand" />
                  <h2 className="mt-6 font-display text-3xl font-bold">Thanks, {form.name.split(" ")[0]}!</h2>
                  <p className="mt-3 text-gray-400">We've got your message and will reply to {form.email} soon.</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0 }} className="grid sm:grid-cols-2 gap-5">
                  <Field label="Your name" error={errors.name}>
                    <input value={form.name} onChange={update("name")} className={inputClass} placeholder="Jane Doe" autoComplete="name" />
                  </Field>
                  <Field label="Work email" error={errors.email}>
                    <input type="email" value={form.email} onChange={update("email")} className={inputClass} placeholder="jane@company.com" autoComplete="email" />
                  </Field>
                  <Field label="Company (optional)">
                    <input value={form.company} onChange={update("company")} className={inputClass} placeholder="Company name" autoComplete="organization" />
                  </Field>
                  <Field label="What do you need?">
                    <select value={form.service} onChange={update("service")} className={inputClass}>
                      <option value="" className="bg-ink">Choose a service</option>
                      {services.map((s) => (
                        <option key={s.slug} className="bg-ink">{s.title}</option>
                      ))}
                    </select>
                  </Field>

                  <fieldset className="sm:col-span-2">
                    <legend className="text-sm text-gray-300 mb-2">Budget</legend>
                    <div className="flex flex-wrap gap-2">
                      {budgets.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setForm((f) => ({ ...f, budget: b }))}
                          aria-pressed={form.budget === b}
                          className={`px-4 py-2 rounded-full text-sm border transition-colors cursor-pointer ${
                            form.budget === b ? "bg-brand border-brand text-black font-semibold" : "border-white/10 text-gray-300 hover:border-white/25"
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <Field label="Tell us about your project" error={errors.message} className="sm:col-span-2">
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={update("message")}
                      className={`${inputClass} resize-none`}
                      placeholder="What are you building, and what does success look like?"
                    />
                  </Field>

                  <Honeypot value={form.website} onChange={update("website")} />

                  {serverError && (
                    <p role="alert" className="sm:col-span-2 rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                      {serverError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="sm:col-span-2 group flex items-center justify-center gap-2 bg-gradient-to-r from-brand to-volt px-7 py-4 rounded-full font-semibold text-black shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:shadow-[0_0_45px_rgba(181,242,61,0.6)] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-wait"
                  >
                    {sending ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        Send message <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                  <p className="sm:col-span-2 text-center text-sm text-gray-400">
                    Prefer to talk?{" "}
                    <Link to="/book-meeting" state={{ email: form.email }} className="inline-flex items-center gap-1 text-brand font-semibold hover:text-volt">
                      <CalendarDays size={15} /> Book a free 30-minute call
                    </Link>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        <div className="space-y-5">
          <Reveal delay={0.05}>
            <address className="not-italic rounded-[2rem] border border-brand/30 bg-gradient-to-br from-brand/10 to-aqua/5 p-7">
              <h3 className="font-display text-xl font-semibold">Reach us directly</h3>
              <HeadingBar className="mt-3 w-10" />
              <ul className="mt-5 space-y-4">
                {[
                  { icon: Phone, label: "Call us", value: contactInfo.phone, href: contactInfo.phoneHref },
                  { icon: Mail, label: "Email", value: contactInfo.email, href: contactInfo.emailHref },
                  { icon: MapPin, label: "Office", value: contactInfo.address, href: contactInfo.mapHref, external: true },
                ].map(({ icon: Icon, label, value, href, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                      className="group flex items-center gap-4"
                    >
                      <span className="shrink-0 w-11 h-11 rounded-xl bg-brand/15 border border-brand/30 flex items-center justify-center group-hover:bg-brand group-hover:text-black transition-colors">
                        <Icon size={20} className="text-brand group-hover:text-black transition-colors" />
                      </span>
                      <span>
                        <span className="block text-xs uppercase tracking-wider text-gray-500">{label}</span>
                        <span className="block font-semibold text-white group-hover:text-brand transition-colors">{value}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </address>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[2rem] border border-white/10 bg-surface p-7 space-y-5">
              {[
                { icon: Clock, title: "Fast response", text: "A reply within one business day." },
                { icon: MessageSquare, title: "Free discovery call", text: "30 minutes to explore your idea, no strings attached." },
                { icon: Sparkles, title: "Clear proposal", text: "Scope, timeline and cost within a week." },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-4">
                  <span className="shrink-0 w-11 h-11 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center">
                    <Icon size={20} className="text-brand" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm text-gray-400">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="rounded-[2rem] border border-white/10 bg-surface p-7">
              <h3 className="font-display text-xl font-semibold">FAQ</h3>
              <HeadingBar className="mt-3 w-10" />
              <div className="mt-4 divide-y divide-white/10">
                {faqs.map((f, i) => (
                  <div key={f.q} className="py-3">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                      aria-expanded={openFaq === i}
                      className="w-full flex justify-between gap-3 text-left text-sm font-medium cursor-pointer"
                    >
                      {f.q}
                      <span className={`text-brand transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                    </button>
                    <AnimatePresence initial={false}>
                      {openFaq === i && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden text-sm text-gray-400"
                        >
                          <span className="block pt-2">{f.a}</span>
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({ label, error, className = "", children }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-sm text-gray-300 mb-2">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-red-400">{error}</span>}
    </label>
  );
}
