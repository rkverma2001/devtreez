import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Bot, Loader2, MessageCircle, RotateCcw, Send, X } from "lucide-react";
import { api } from "../../lib/api";

const STORAGE_KEY = "devtreez-chat";
const GREETING = { role: "assistant", text: "Hi! I'm the devtreez assistant. Ask me about our AI, web, app and cloud services, or how to start a project." };
const SUGGESTIONS = ["What services do you offer?", "Can you build an AI chatbot for us?", "How do we start a project?"];

const load = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? null;
  } catch {
    return null;
  }
};
const save = (value) => {
  try {
    if (value) localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* storage unavailable (private mode): the chat still works for this page view */
  }
};

// Turn site paths the assistant mentions (e.g. /book-meeting) into links.
const PATH = /(\/(?:book-meeting|contact|services|projects|technologies|industries|about|careers))\b/;
const IS_PATH = /^\/(?:book-meeting|contact|services|projects|technologies|industries|about|careers)$/;
function RichText({ text, onNavigate }) {
  return text.split(PATH).map((part, i) =>
    IS_PATH.test(part) ? (
      <Link key={i} to={part} onClick={onNavigate} className="text-brand underline underline-offset-2 hover:text-volt">
        {part === "/book-meeting" ? "book a call" : part.slice(1)}
      </Link>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  // The panel is closed in the pre-rendered HTML, so restoring here can't cause a hydration mismatch.
  const [messages, setMessages] = useState(() => load()?.messages ?? [GREETING]);
  const [sessionId, setSessionId] = useState(() => load()?.sessionId ?? null);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending, open]);

  const send = async (raw) => {
    const message = raw.trim();
    if (!message || sending) return;
    const withUser = [...messages, { role: "user", text: message }];
    setMessages(withUser);
    setInput("");
    setError("");
    setSending(true);
    try {
      const res = await api.post("/api/chat", { message, ...(sessionId && { sessionId }) });
      const next = [...withUser, { role: "assistant", text: res.reply }];
      setMessages(next);
      setSessionId(res.sessionId);
      save({ sessionId: res.sessionId, messages: next });
    } catch (e) {
      setError(e.message);
      setMessages(messages);
      setInput(message);
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    setMessages([GREETING]);
    setSessionId(null);
    setError("");
    save(null);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Chat with devtreez"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed z-[65] bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[380px] h-[min(560px,calc(100svh-8rem))] flex flex-col rounded-3xl border border-white/10 bg-surface/95 backdrop-blur-xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-gradient-to-r from-brand/15 to-aqua/10">
              <span className="w-9 h-9 rounded-full bg-brand/20 flex items-center justify-center"><Bot size={18} className="text-brand" /></span>
              <div className="flex-1">
                <p className="font-semibold leading-tight">devtreez assistant</p>
                <p className="text-xs text-gray-400">AI-powered · usually instant</p>
              </div>
              <button onClick={reset} aria-label="Start a new chat" title="New chat" className="text-gray-400 hover:text-white cursor-pointer"><RotateCcw size={16} /></button>
              <button onClick={() => setOpen(false)} aria-label="Close chat" className="text-gray-400 hover:text-white cursor-pointer"><X size={20} /></button>
            </div>

            <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3" aria-live="polite">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <p
                    className={`max-w-[85%] whitespace-pre-line px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      m.role === "user" ? "bg-brand text-black rounded-br-sm" : "bg-white/5 border border-white/10 rounded-bl-sm"
                    }`}
                  >
                    {m.role === "assistant" ? <RichText text={m.text} onNavigate={() => setOpen(false)} /> : m.text}
                  </p>
                </div>
              ))}
              {sending && (
                <p className="flex items-center gap-2 text-sm text-gray-400"><Loader2 size={14} className="animate-spin" /> Thinking…</p>
              )}
              {messages.length === 1 && !sending && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button key={s} onClick={() => send(s)} className="px-3 py-1.5 rounded-full border border-white/10 text-xs text-gray-300 hover:border-brand/50 hover:text-brand cursor-pointer">
                      {s}
                    </button>
                  ))}
                </div>
              )}
              {error && <p role="alert" className="rounded-xl border border-red-400/40 bg-red-400/10 px-3 py-2 text-xs text-red-300">{error}</p>}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex gap-2 p-3 border-t border-white/10"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={2000}
                placeholder="Ask about services, timelines…"
                aria-label="Message"
                className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-brand"
              />
              <button type="submit" disabled={sending || !input.trim()} aria-label="Send" className="w-10 h-10 shrink-0 rounded-full bg-brand text-black flex items-center justify-center cursor-pointer disabled:opacity-50">
                <Send size={16} />
              </button>
            </form>
            <p className="px-4 pb-3 -mt-1 text-[10px] text-gray-500 text-center">AI answers may be imperfect. For specifics, book a call with our team.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Chat with us"}
        aria-expanded={open}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
        className="fixed z-[65] bottom-5 right-4 sm:right-6 w-14 h-14 rounded-full bg-gradient-to-br from-brand to-volt text-black flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.5)] hover:scale-105 transition-transform cursor-pointer"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
        {!open && <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-aqua border-2 border-ink animate-pulse" />}
      </motion.button>
    </>
  );
}
