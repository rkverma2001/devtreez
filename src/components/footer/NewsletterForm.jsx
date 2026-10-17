import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import Honeypot from "../ui/Honeypot";
import { api, apiEnabled, sendByEmail } from "../../lib/api";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [state, setState] = useState({ status: "idle", message: "" });

  const submit = async (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setState({ status: "error", message: "Please enter a valid email." });
    if (!apiEnabled) {
      sendByEmail("Subscribe me to devtreez updates", { Email: email });
      return setState({ status: "done", message: "Your email app should open: just hit send to subscribe." });
    }
    setState({ status: "sending", message: "" });
    try {
      await api.post("/api/subscribers", { email, source: "footer", website });
      setState({ status: "done", message: "You're subscribed. Thanks!" });
      setEmail("");
    } catch (error) {
      setState({ status: "error", message: error.message });
    }
  };

  if (state.status === "done") {
    return (
      <p role="status" className="flex items-center gap-2 text-sm text-brand">
        <CheckCircle2 size={16} /> {state.message}
      </p>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="relative">
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          aria-label="Email for newsletter"
          autoComplete="email"
          className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-brand"
        />
        <button
          type="submit"
          disabled={state.status === "sending"}
          className="inline-flex items-center gap-1.5 bg-gradient-to-r from-brand to-volt px-4 py-2 rounded-lg text-sm font-semibold text-black hover:opacity-90 transition cursor-pointer disabled:opacity-60"
        >
          {state.status === "sending" && <Loader2 size={14} className="animate-spin" />}
          Subscribe
        </button>
      </div>
      <Honeypot value={website} onChange={(e) => setWebsite(e.target.value)} />
      {state.status === "error" && <p role="alert" className="mt-2 text-xs text-red-400">{state.message}</p>}
    </form>
  );
}
