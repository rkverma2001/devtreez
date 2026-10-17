import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CalendarCheck, CalendarDays, CalendarPlus, Clock, Loader2, Video } from "lucide-react";
import { services } from "../data/siteContent";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import HeadingBar from "../components/ui/HeadingBar";
import Honeypot from "../components/ui/Honeypot";
import { api, apiEnabled, sendByEmail } from "../lib/api";

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 transition";

const dayLabel = (date) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });

const localTime = (iso) => new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
const visitorTz = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return "your time zone";
  }
};

function downloadIcs({ start, end }) {
  const fmt = (d) => new Date(d).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//devtreez//Discovery call//EN",
    "BEGIN:VEVENT",
    `UID:${fmt(start)}-devtreez@devtreez.com`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    "SUMMARY:devtreez discovery call",
    "DESCRIPTION:Free 30-minute discovery call with devtreez. We'll share the meeting link by email.",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const a = Object.assign(document.createElement("a"), { href: url, download: "devtreez-discovery-call.ics" });
  a.click();
  URL.revokeObjectURL(url);
}

// Used when no backend is configured: collects preferred times and sends the request by email.
function EmailBookingForm({ initialEmail }) {
  const [form, setForm] = useState({ name: "", email: initialEmail ?? "", company: "", topic: "", times: "", details: "" });
  const [errors, setErrors] = useState({});
  const [href, setHref] = useState(null);
  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Please tell us your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Please enter a valid email.";
    if (!form.times.trim()) next.times = "Tell us a few days and times that suit you.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setHref(
      sendByEmail(`Discovery call request from ${form.name}`, {
        Name: form.name,
        Email: form.email,
        Company: form.company,
        Topic: form.topic,
        "Preferred times": form.times,
        Details: form.details,
      })
    );
  };

  if (href) {
    return (
      <div className="py-12 text-center" role="status">
        <CalendarCheck className="mx-auto w-16 h-16 text-brand" />
        <h2 className="mt-6 font-display text-3xl font-bold">Almost done!</h2>
        <p className="mt-3 text-gray-400 max-w-md mx-auto">
          Your email app should open with your request ready to send. We'll reply with a confirmed time and meeting link.{" "}
          <a href={href} className="text-brand underline">Open it again</a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid sm:grid-cols-2 gap-5">
      <div className="sm:col-span-2">
        <h2 className="flex items-center gap-2 font-display text-2xl font-semibold">
          <CalendarDays className="text-brand" size={22} /> Request a time
        </h2>
        <HeadingBar className="mt-3 w-12" />
        <p className="mt-4 text-gray-400">Calls run Monday to Friday, 10:00 to 18:00 IST. Tell us what suits you and we'll confirm by email.</p>
      </div>
      {[
        ["name", "Your name", "Jane Doe", "name"],
        ["email", "Work email", "jane@company.com", "email"],
        ["company", "Company (optional)", "Company name", "organization"],
      ].map(([key, label, placeholder, auto]) => (
        <label key={key} className="block">
          <span className="block text-sm text-gray-300 mb-2">{label}</span>
          <input type={key === "email" ? "email" : "text"} value={form[key]} onChange={update(key)} placeholder={placeholder} autoComplete={auto} className={inputClass} />
          {errors[key] && <span className="mt-1.5 block text-xs text-red-400">{errors[key]}</span>}
        </label>
      ))}
      <label className="block">
        <span className="block text-sm text-gray-300 mb-2">What would you like to discuss?</span>
        <select value={form.topic} onChange={update("topic")} className={inputClass}>
          <option value="" className="bg-ink">Choose a topic</option>
          {services.map((s) => (
            <option key={s.slug} className="bg-ink">{s.title}</option>
          ))}
          <option className="bg-ink">Something else</option>
        </select>
      </label>
      <label className="block sm:col-span-2">
        <span className="block text-sm text-gray-300 mb-2">Preferred days and times (IST)</span>
        <input value={form.times} onChange={update("times")} placeholder="e.g. Tue or Wed afternoon, Thu after 3 pm" className={inputClass} />
        {errors.times && <span className="mt-1.5 block text-xs text-red-400">{errors.times}</span>}
      </label>
      <label className="block sm:col-span-2">
        <span className="block text-sm text-gray-300 mb-2">Anything we should know? (optional)</span>
        <textarea rows={3} value={form.details} onChange={update("details")} className={`${inputClass} resize-none`} />
      </label>
      <button
        type="submit"
        className="sm:col-span-2 group flex items-center justify-center gap-2 bg-gradient-to-r from-brand to-volt px-7 py-4 rounded-full font-semibold text-black shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all cursor-pointer"
      >
        Request a call <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </form>
  );
}

export default function BookMeetingPage() {
  const { state } = useLocation();
  const [config, setConfig] = useState(null);
  const [date, setDate] = useState(null);
  const [slots, setSlots] = useState(null);
  const [slot, setSlot] = useState(null);
  const [form, setForm] = useState({ name: "", email: state?.email ?? "", company: "", topic: "", details: "", website: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: apiEnabled, error: "" });
  const [booking, setBooking] = useState(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!apiEnabled) return;
    api
      .get("/api/meetings/config")
      .then((c) => {
        setConfig(c);
        setDate(c.dates[0] ?? null);
        setStatus({ loading: false, error: "" });
      })
      .catch((e) => setStatus({ loading: false, error: e.message }));
  }, []);

  useEffect(() => {
    if (!date) return;
    let cancelled = false;
    api
      .get(`/api/meetings/availability?date=${date}`)
      .then((r) => !cancelled && setSlots(r.slots))
      .catch((e) => !cancelled && setStatus((s) => ({ ...s, error: e.message })));
    return () => {
      cancelled = true;
    };
  }, [date]);

  const pickDate = (d) => {
    setSlots(null);
    setSlot(null);
    setDate(d);
  };

  const shownDates = useMemo(() => config?.dates.slice(0, 15) ?? [], [config]);
  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!slot) next.start = "Choose a time slot.";
    if (!form.name.trim()) next.name = "Please tell us your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Please enter a valid email.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setSending(true);
    try {
      const result = await api.post("/api/meetings", { ...form, start: slot.start });
      setBooking(result);
    } catch (error) {
      setErrors({ ...error.fields, _: error.message });
      if (error.status === 409) {
        setSlot(null);
        api.get(`/api/meetings/availability?date=${date}`).then((r) => setSlots(r.slots)).catch(() => {});
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Book a Meeting"
        image="meeting"
        video="table"
        imageAlt="Team meeting around a table"
        title="Book Your Free"
        highlight="Discovery Call"
        description="30 minutes with our team to explore your idea, the right technology and a realistic plan. No cost, no obligation."
      />

      <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-28">
        <Reveal>
          <div className="rounded-[2rem] border border-white/10 bg-surface p-6 sm:p-10">
            {!apiEnabled ? (
              <EmailBookingForm initialEmail={state?.email} />
            ) : (
            <AnimatePresence mode="wait">
              {booking ? (
                <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-12 text-center" role="status">
                  <CalendarCheck className="mx-auto w-16 h-16 text-brand" />
                  <h2 className="mt-6 font-display text-3xl font-bold">You're booked!</h2>
                  <p className="mt-3 text-gray-300">
                    {dayLabel(date)} at{" "}
                    <span className="font-semibold text-white">{slot?.label} {config?.timeZone}</span>
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    That's {localTime(booking.start)} in {visitorTz()}.
                  </p>
                  <p className="mt-4 text-gray-400">Our team will send the meeting link to {form.email} before the call.</p>
                  <button
                    onClick={() => downloadIcs(booking)}
                    className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 hover:border-brand/50 hover:text-brand transition-colors cursor-pointer"
                  >
                    <CalendarPlus size={18} /> Add to calendar
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0 }} className="grid lg:grid-cols-[1fr_360px] gap-10">
                  <div>
                    <h2 className="flex items-center gap-2 font-display text-2xl font-semibold">
                      <CalendarDays className="text-brand" size={22} /> Pick a day
                    </h2>
                    <HeadingBar className="mt-3 w-12" />

                    {status.loading && <p className="mt-6 flex items-center gap-2 text-gray-400"><Loader2 className="animate-spin" size={16} /> Loading availability…</p>}
                    {status.error && (
                      <p role="alert" className="mt-6 rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                        {status.error} You can also <Link to="/contact" className="underline">send us a message</Link>.
                      </p>
                    )}

                    <div className="mt-6 flex gap-2 overflow-x-auto no-scrollbar pb-2">
                      {shownDates.map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => pickDate(d)}
                          aria-pressed={d === date}
                          className={`shrink-0 px-4 py-3 rounded-2xl border text-sm text-center transition-colors cursor-pointer ${
                            d === date ? "bg-brand border-brand text-black font-semibold" : "border-white/10 text-gray-300 hover:border-white/25"
                          }`}
                        >
                          {dayLabel(d)}
                        </button>
                      ))}
                    </div>

                    <h3 className="mt-8 flex items-center gap-2 font-display text-xl font-semibold">
                      <Clock className="text-brand" size={20} /> Choose a time
                      {config && <span className="text-sm font-normal text-gray-500">({config.timeZone})</span>}
                    </h3>
                    <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-2 min-h-[120px]">
                      {date && slots === null && <p className="col-span-full flex items-center gap-2 text-gray-400"><Loader2 className="animate-spin" size={16} /> Checking free slots…</p>}
                      {slots?.length === 0 && <p className="col-span-full text-gray-400">No free slots on this day. Please pick another date.</p>}
                      {slots?.map((s) => (
                        <button
                          key={s.start}
                          type="button"
                          onClick={() => setSlot(s)}
                          aria-pressed={slot?.start === s.start}
                          title={`${localTime(s.start)} in ${visitorTz()}`}
                          className={`py-2.5 rounded-xl border text-sm tabular-nums transition-colors cursor-pointer ${
                            slot?.start === s.start ? "bg-brand/15 border-brand text-brand font-semibold" : "border-white/10 text-gray-300 hover:border-brand/50"
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                    {errors.start && <p className="mt-2 text-xs text-red-400">{errors.start}</p>}
                  </div>

                  <div className="space-y-4">
                    <h2 className="flex items-center gap-2 font-display text-2xl font-semibold">
                      <Video className="text-brand" size={22} /> Your details
                    </h2>
                    <HeadingBar className="w-12" />
                    {[
                      ["name", "Your name", "Jane Doe", "name"],
                      ["email", "Work email", "jane@company.com", "email"],
                      ["company", "Company (optional)", "Company name", "organization"],
                    ].map(([key, label, placeholder, auto]) => (
                      <label key={key} className="block">
                        <span className="block text-sm text-gray-300 mb-2">{label}</span>
                        <input
                          type={key === "email" ? "email" : "text"}
                          value={form[key]}
                          onChange={update(key)}
                          placeholder={placeholder}
                          autoComplete={auto}
                          className={inputClass}
                        />
                        {errors[key] && <span className="mt-1.5 block text-xs text-red-400">{errors[key]}</span>}
                      </label>
                    ))}
                    <label className="block">
                      <span className="block text-sm text-gray-300 mb-2">What would you like to discuss?</span>
                      <select value={form.topic} onChange={update("topic")} className={inputClass}>
                        <option value="" className="bg-ink">Choose a topic</option>
                        {services.map((s) => (
                          <option key={s.slug} className="bg-ink">{s.title}</option>
                        ))}
                        <option className="bg-ink">Something else</option>
                      </select>
                    </label>
                    <label className="block">
                      <span className="block text-sm text-gray-300 mb-2">Anything we should know? (optional)</span>
                      <textarea rows={3} value={form.details} onChange={update("details")} className={`${inputClass} resize-none`} />
                    </label>
                    <Honeypot value={form.website} onChange={update("website")} />

                    {errors._ && (
                      <p role="alert" className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-300">{errors._}</p>
                    )}

                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full group flex items-center justify-center gap-2 bg-gradient-to-r from-brand to-volt px-7 py-4 rounded-full font-semibold text-black shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-wait"
                    >
                      {sending ? <Loader2 size={18} className="animate-spin" /> : null}
                      {slot ? `Book ${dayLabel(date)}, ${slot.label}` : "Book meeting"}
                      {!sending && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
            )}
          </div>
        </Reveal>
      </section>
    </>
  );
}
