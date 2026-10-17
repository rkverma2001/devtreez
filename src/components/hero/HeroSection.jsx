import { Fragment, useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import HeroReel from "./HeroReel";

const headline = [["Growing", "Ideas"], ["Into", "Global"], ["Innovations"]];
const rotatingWords = ["Websites", "Mobile Apps", "AI Agents", "Cloud Platforms"];

const HeroSection = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const navigate = useNavigate();
  const { scrollY } = useScroll();
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
      className="relative min-h-[100svh] flex items-center overflow-hidden pt-32 pb-36 [@media(max-height:820px)]:pt-28 [@media(max-height:820px)]:pb-32"
    >
      {/* Cinematic video reel */}
      <HeroReel />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60 pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none [mask-image:linear-gradient(to_right,black,transparent_60%)]" />
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-brand/20 blur-[140px] animate-blob pointer-events-none" />

      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full"
      >
        {/* Content */}
        <div className="max-w-3xl">
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

          <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-8xl lg:[@media(max-height:820px)]:text-7xl font-bold leading-[1.02] tracking-tight">
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
            <p className="mt-8 [@media(max-height:820px)]:mt-5 text-xl sm:text-2xl text-gray-300 flex flex-wrap items-center gap-x-2">
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
              className="mt-10 [@media(max-height:820px)]:mt-6 flex flex-col sm:flex-row gap-3 max-w-xl"
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

      </motion.div>

    </section>
  );
};

export default HeroSection;
