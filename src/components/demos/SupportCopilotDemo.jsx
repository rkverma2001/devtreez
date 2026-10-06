import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Bot, Send, User } from "lucide-react";
import DemoFrame from "./DemoFrame";

const intents = [
  {
    name: "Order status",
    keywords: ["order", "delivery", "shipping", "track", "where", "arrive"],
    team: "Logistics",
    reply: "I've found your latest order. It left our warehouse yesterday and is due to arrive within 2 business days. Here's your live tracking link.",
  },
  {
    name: "Refund request",
    keywords: ["refund", "return", "money back", "cancel", "broken", "damaged"],
    team: "Billing",
    reply: "I'm sorry about that. I've started a return for you; once the courier collects the item, your refund will be issued to the original payment method within 5–7 days.",
  },
  {
    name: "Account access",
    keywords: ["password", "login", "log in", "sign in", "account", "locked"],
    team: "Tech Support",
    reply: "No problem. I've sent a secure password-reset link to the email on your account. It expires in 30 minutes.",
  },
  {
    name: "Pricing question",
    keywords: ["price", "plan", "cost", "discount", "pricing", "upgrade"],
    team: "Sales",
    reply: "Great question! Our Growth plan includes everything in Starter plus priority support. I can apply a 10% annual-billing discount if you'd like to upgrade.",
  },
];

const negativeWords = ["angry", "terrible", "worst", "broken", "damaged", "late", "never", "bad", "awful", "frustrated", "still"];
const positiveWords = ["thanks", "thank", "great", "love", "awesome", "happy", "good"];

const suggestions = ["Where is my order?", "My item arrived damaged, I want a refund", "I can't log in to my account", "Do you offer a discount on annual plans?"];

function analyse(text) {
  const lower = text.toLowerCase();
  const scored = intents
    .map((intent) => ({ intent, hits: intent.keywords.filter((k) => lower.includes(k)).length }))
    .sort((a, b) => b.hits - a.hits);
  const best = scored[0].hits > 0 ? scored[0].intent : null;

  const neg = negativeWords.filter((w) => lower.includes(w)).length;
  const pos = positiveWords.filter((w) => lower.includes(w)).length;
  const sentiment = neg > pos ? "Negative" : pos > neg ? "Positive" : "Neutral";
  const priority = sentiment === "Negative" ? "High" : best ? "Normal" : "Low";
  const confidence = best ? Math.min(98, 72 + scored[0].hits * 9) : 41;

  return {
    intent: best?.name ?? "General enquiry",
    team: best?.team ?? "Customer Success",
    reply:
      best?.reply ??
      "Thanks for reaching out! I've passed your message to our customer success team, and someone will reply within the hour.",
    sentiment,
    priority,
    confidence,
  };
}

export default function SupportCopilotDemo() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm the support copilot. Ask me anything about your order, refunds, account or pricing." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [insight, setInsight] = useState(null);
  const listRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const send = (text) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    const result = analyse(trimmed);
    setMessages((m) => [...m, { from: "user", text: trimmed }]);
    setInput("");
    setTyping(true);
    setInsight(result);
    timerRef.current = setTimeout(() => {
      setMessages((m) => [...m, { from: "bot", text: result.reply }]);
      setTyping(false);
    }, 1100);
  };

  const sentimentColor = {
    Negative: "text-red-400",
    Positive: "text-brand",
    Neutral: "text-gray-300",
  };

  return (
    <DemoFrame title="AI Support Copilot">
      <div className="grid lg:grid-cols-[1fr_260px] gap-5">
        {/* Chat */}
        <div className="flex flex-col h-[420px] rounded-2xl border border-white/10 bg-ink/60">
          <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3" aria-live="polite">
            <AnimatePresence initial={false}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${m.from === "user" ? "flex-row-reverse" : ""}`}
                >
                  <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${m.from === "user" ? "bg-white/10" : "bg-brand/20"}`}>
                    {m.from === "user" ? <User size={16} /> : <Bot size={16} className="text-brand" />}
                  </span>
                  <p
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      m.from === "user" ? "bg-brand text-black rounded-tr-sm" : "bg-white/5 border border-white/10 rounded-tl-sm"
                    }`}
                  >
                    {m.text}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
            {typing && (
              <div className="flex gap-2 items-center text-gray-400 text-sm">
                <span className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center">
                  <Bot size={16} className="text-brand" />
                </span>
                <span className="flex gap-1">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: `${d * 0.15}s` }} />
                  ))}
                </span>
              </div>
            )}
          </div>

          <div className="px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="shrink-0 px-3 py-1.5 rounded-full border border-white/10 text-xs text-gray-300 hover:border-brand/50 hover:text-brand transition-colors cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex gap-2 p-3 border-t border-white/10"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a customer message…"
              aria-label="Customer message"
              className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-brand"
            />
            <button type="submit" aria-label="Send" className="w-10 h-10 rounded-full bg-brand text-black flex items-center justify-center cursor-pointer hover:bg-volt transition-colors">
              <Send size={16} />
            </button>
          </form>
        </div>

        {/* Ticket insights */}
        <div className="rounded-2xl border border-white/10 bg-ink/60 p-5">
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Ticket insights</h4>
          {insight ? (
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="text-gray-500">Detected intent</dt>
                <dd className="mt-1 font-semibold">{insight.intent}</dd>
                <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    key={insight.confidence + insight.intent}
                    initial={{ width: 0 }}
                    animate={{ width: `${insight.confidence}%` }}
                    className="h-full bg-brand"
                  />
                </div>
                <span className="text-xs text-gray-500">{insight.confidence}% confidence</span>
              </div>
              <div>
                <dt className="text-gray-500">Sentiment</dt>
                <dd className={`mt-1 font-semibold ${sentimentColor[insight.sentiment]}`}>{insight.sentiment}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Priority</dt>
                <dd className="mt-1 font-semibold">{insight.priority}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Routed to</dt>
                <dd className="mt-1 inline-flex px-3 py-1 rounded-full bg-aqua/10 border border-aqua/30 text-aqua font-semibold">
                  {insight.team}
                </dd>
              </div>
            </dl>
          ) : (
            <p className="mt-4 text-sm text-gray-400">Send a message to see how the copilot classifies, prioritises and routes it.</p>
          )}
        </div>
      </div>
    </DemoFrame>
  );
}
