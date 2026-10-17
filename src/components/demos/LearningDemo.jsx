import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Lightbulb, CheckCircle2, XCircle } from "lucide-react";
import DemoFrame from "./DemoFrame";

const levels = ["Beginner", "Developing", "Confident", "Advanced", "Expert"];

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function makeQuestion(level) {
  let prompt, answer, hint;
  if (level === 0) {
    const a = rand(2, 20), b = rand(2, 20);
    prompt = `${a} + ${b}`;
    answer = a + b;
    hint = "Add the tens first, then the ones.";
  } else if (level === 1) {
    const a = rand(3, 12), b = rand(3, 12);
    prompt = `${a} × ${b}`;
    answer = a * b;
    hint = `Think of it as ${a} groups of ${b}.`;
  } else if (level === 2) {
    const a = rand(2, 9), b = rand(2, 9), c = rand(5, 30);
    prompt = `${a} × ${b} + ${c}`;
    answer = a * b + c;
    hint = "Multiply before you add.";
  } else if (level === 3) {
    const pct = [10, 20, 25, 50][rand(0, 3)], base = rand(2, 20) * 20;
    prompt = `${pct}% of ${base}`;
    answer = (pct / 100) * base;
    hint = `${pct}% is the same as ${pct}/100.`;
  } else {
    const x = rand(2, 12), m = rand(2, 9), c = rand(1, 20);
    prompt = `Solve for x: ${m}x + ${c} = ${m * x + c}`;
    answer = x;
    hint = `Subtract ${c} from both sides, then divide by ${m}.`;
  }

  const options = new Set([answer]);
  while (options.size < 4) {
    const delta = rand(1, Math.max(3, Math.round(answer * 0.2)));
    options.add(Math.max(0, answer + (Math.random() < 0.5 ? -delta : delta)));
  }
  return { prompt, answer, hint, options: [...options].sort(() => Math.random() - 0.5) };
}

export default function LearningDemo() {
  const [level, setLevel] = useState(0);
  const [mastery, setMastery] = useState(10);
  // Fixed first question so pre-rendered HTML matches the first client render.
  const [question, setQuestion] = useState({ prompt: "7 + 8", answer: 15, hint: "Add the tens first, then the ones.", options: [13, 15, 16, 14] });
  const [picked, setPicked] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [streak, setStreak] = useState(0);

  const answer = (option) => {
    if (picked !== null) return;
    setPicked(option);
    const correct = option === question.answer;
    const nextLevel = correct ? Math.min(levels.length - 1, level + (streak >= 1 ? 1 : 0)) : Math.max(0, level - 1);
    setStreak(correct ? streak + 1 : 0);
    setMastery((m) => Math.max(0, Math.min(100, m + (correct ? 12 : -8))));
    setTimeout(() => {
      setLevel(nextLevel);
      setQuestion(makeQuestion(nextLevel));
      setPicked(null);
      setShowHint(false);
    }, 1200);
  };

  const correct = picked !== null && picked === question.answer;

  return (
    <DemoFrame title="Adaptive Learning App">
      <div className="grid lg:grid-cols-[1fr_240px] gap-5">
        <div className="rounded-2xl border border-white/10 bg-ink/60 p-6">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Level: <span className="text-brand font-semibold">{levels[level]}</span></span>
            <span>Streak: {streak} 🔥</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={question.prompt}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <p className="mt-6 font-display text-3xl sm:text-4xl font-bold text-center">{question.prompt} = ?</p>

              <div className="mt-8 grid grid-cols-2 gap-3">
                {question.options.map((o) => {
                  const isAnswer = o === question.answer;
                  const state =
                    picked === null ? "border-white/10 hover:border-brand/50" : isAnswer ? "border-brand bg-brand/15" : o === picked ? "border-red-400 bg-red-400/10" : "border-white/10 opacity-50";
                  return (
                    <button
                      key={o}
                      onClick={() => answer(o)}
                      className={`py-4 rounded-xl border text-xl font-semibold tabular-nums transition-colors cursor-pointer ${state}`}
                    >
                      {o}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-5 min-h-[48px]" aria-live="polite">
            {picked !== null ? (
              <p className={`flex items-center justify-center gap-2 font-semibold ${correct ? "text-brand" : "text-red-400"}`}>
                {correct ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                {correct ? "Correct! Adjusting difficulty…" : `Not quite. The answer is ${question.answer}. Easing off a little…`}
              </p>
            ) : showHint ? (
              <p className="flex items-center justify-center gap-2 text-sm text-volt">
                <Lightbulb size={16} /> {question.hint}
              </p>
            ) : (
              <button onClick={() => setShowHint(true)} className="mx-auto flex items-center gap-2 text-sm text-gray-400 hover:text-volt cursor-pointer">
                <Lightbulb size={16} /> Ask the AI tutor for a hint
              </button>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-ink/60 p-5">
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Learner profile</h4>
          <p className="mt-4 text-sm text-gray-400">Mastery</p>
          <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div animate={{ width: `${mastery}%` }} className="h-full bg-gradient-to-r from-brand to-volt" />
          </div>
          <p className="mt-1 text-xs text-gray-500 tabular-nums">{mastery}%</p>

          <p className="mt-6 text-sm text-gray-400">Difficulty path</p>
          <ol className="mt-3 space-y-2">
            {levels.map((l, i) => (
              <li key={l} className="flex items-center gap-2 text-sm">
                <span className={`w-2.5 h-2.5 rounded-full ${i < level ? "bg-brand" : i === level ? "bg-volt ring-4 ring-volt/20" : "bg-white/15"}`} />
                <span className={i === level ? "text-white font-semibold" : "text-gray-500"}>{l}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-xs text-gray-500">Two correct answers in a row level you up; a miss eases the difficulty.</p>
        </div>
      </div>
    </DemoFrame>
  );
}
