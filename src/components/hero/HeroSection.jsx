import { Fragment, useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ChevronDown, Cpu, Cloud, Smartphone } from "lucide-react";

const headline = [["Growing", "Ideas"], ["Into", "Global"], ["Innovations"]];
const rotatingWords = ["Websites", "Mobile Apps", "AI Agents", "Cloud Platforms"];

const floatingChips = [
  { icon: Cpu, label: "Generative AI", className: "top-[8%] -left-2 sm:left-0", delay: "0s" },
  { icon: Cloud, label: "Cloud Native", className: "top-[45%] -right-2 sm:right-0", delay: "-2s" },
  { icon: Smartphone, label: "Apps & Web", className: "bottom-[6%] left-[8%]", delay: "-4s" },
];

const HeroSection = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const visualY = useTransform(scrollY, [0, 700], [0, 140]);
  const contentY = useTransform(scrollY, [0, 700], [0, -80]);
  const fade = useTransform(scrollY, [0, 550], [1, 0]);

  useEffect(() => {
    const id = setInterval(
      () => setWordIndex((i) => (i + 1) % rotatingWords.length),
      2500
    );
    return () => clearInterval(id);
  }, []);

  let wordCount = 0;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-36 pb-24"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-brand/25 blur-[140px] animate-blob" />
      <div className="absolute top-1/4 -right-40 w-[520px] h-[520px] rounded-full bg-aqua/20 blur-[140px] animate-blob [animation-delay:-5s]" />
      <div className="absolute -bottom-20 left-1/3 w-[420px] h-[420px] rounded-full bg-volt/10 blur-[120px] animate-blob [animation-delay:-9s]" />

      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-16 items-center"
      >
        {/* Content */}
        <div className="order-2 lg:order-1">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300"
          >
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-brand opacity-75 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-brand" />
            </span>
            AI-First Technology Company
          </motion.span>

          <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
            {headline.map((line, lineIndex) => (
              <span key={lineIndex} className="block">
                {line.map((word) => {
                  const delay = 0.4 + wordCount++ * 0.09;
                  return (
                    <Fragment key={word}>
                      <span className="inline-block overflow-hidden align-bottom">
                        <motion.span
                          initial={{ y: "110%" }}
                          animate={{ y: 0 }}
                          transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
                          className={`inline-block ${lineIndex === headline.length - 1 ? "text-gradient" : ""}`}
                        >
                          {word}
                        </motion.span>
                      </span>{" "}
                    </Fragment>
                  );
                })}
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <p className="mt-8 text-xl sm:text-2xl text-gray-300 flex flex-wrap items-center gap-x-2">
              We engineer
              <span className="relative inline-flex h-[1.4em] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rotatingWords[wordIndex]}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.45 }}
                    className="font-semibold text-brand"
                  >
                    {rotatingWords[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </p>

            <p className="mt-3 text-gray-400 text-lg">
              Start With a Website. Scale With Apps. Rule With AI.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigate("/contact", { state: { email: new FormData(e.currentTarget).get("email") } });
              }}
              className="mt-10 flex flex-col sm:flex-row gap-3 max-w-xl"
            >
              <input
                type="email"
                name="email"
                aria-label="Your email"
                placeholder="What's Your Email?"
                className="flex-1 px-5 py-4 rounded-full bg-white/5 border border-white/15 text-white placeholder:text-gray-500 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 transition"
              />
              <button
                type="submit"
                className="group flex items-center justify-center gap-2 bg-gradient-to-r from-brand to-volt px-7 py-4 rounded-full font-semibold text-black shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:shadow-[0_0_45px_rgba(181,242,61,0.6)] transition-all duration-300 cursor-pointer"
              >
                Book a Meeting
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <Link
              to="/projects"
              className="mt-6 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Explore our work <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Visual */}
        <motion.div
          style={{ y: visualY }}
          className="order-1 lg:order-2 relative flex justify-center items-center"
        >
          <div className="absolute w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] rounded-full border border-dashed border-brand/30 animate-spin-slow" />
          <div className="absolute w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] rounded-full border border-aqua/20 animate-spin-slow [animation-direction:reverse]" />
          <div className="absolute w-[260px] h-[260px] rounded-full bg-brand/25 blur-[90px]" />

          <motion.img
            src="/images/devtreez-tree.webp"
            alt="devtreez circuit tree: ideas growing into AI-powered products"
            width="840"
            height="1008"
            fetchPriority="high"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-[260px] sm:w-[360px] lg:w-[420px] h-auto animate-float drop-shadow-[0_0_50px_rgba(34,197,94,0.35)]"
          />

          {floatingChips.map(({ icon: Icon, label, className, delay }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + i * 0.2, duration: 0.6 }}
              className={`absolute ${className}`}
            >
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-ink/70 backdrop-blur-md border border-white/10 text-sm font-medium shadow-xl animate-float"
                style={{ animationDelay: delay }}
              >
                <Icon size={16} className="text-brand" />
                {label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <a
        href="#services"
        aria-label="Scroll to services"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-gray-500 hover:text-white transition-colors"
      >
        Scroll
        <ChevronDown size={18} className="animate-bounce" />
      </a>
    </section>
  );
};

export default HeroSection;
