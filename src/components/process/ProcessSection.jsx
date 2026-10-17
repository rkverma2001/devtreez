import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import { processSteps } from "../../data/siteContent";
import Reveal from "../ui/Reveal";
import FloatingShapes from "../ui/FloatingShapes";
import SectionHeading from "../ui/SectionHeading";

export default function ProcessSection() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 70%", "end 60%"],
  });

  return (
    <section id="process" className="relative py-28 lg:py-36">
      <FloatingShapes preset="both" />
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <SectionHeading
          eyebrow="How We Work"
          title="From Idea To"
          highlight="Impact"
          description="A proven, transparent process that takes you from first conversation to a product your customers love."
        />

        <div ref={timelineRef} className="relative mt-20">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-white/10">
            <motion.div
              style={{ scaleY: scrollYProgress }}
              className="w-full h-full origin-top bg-gradient-to-b from-brand via-volt to-aqua"
            />
          </div>

          <div className="space-y-16">
            {processSteps.map(({ icon: Icon, title, description }, i) => (
              <div
                key={title}
                className={`relative flex items-start md:items-center gap-8 ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-ink border-2 border-brand flex items-center justify-center shadow-[0_0_25px_rgba(34,197,94,0.5)] z-10">
                  <Icon size={20} className="text-brand" />
                </div>

                <Reveal
                  y={30}
                  className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${i % 2 === 1 ? "md:text-left" : "md:text-right"}`}
                >
                  <span className="font-display text-sm font-semibold text-brand tracking-[0.2em]">
                    STEP {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-display text-2xl sm:text-3xl font-semibold">{title}</h3>
                  <p className="mt-3 text-gray-400 leading-relaxed">{description}</p>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
