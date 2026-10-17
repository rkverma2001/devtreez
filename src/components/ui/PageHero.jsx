import { motion } from "motion/react";
import Photo from "./Photo";
import AnimatedUnderline from "./AnimatedUnderline";
import BackgroundVideo from "./BackgroundVideo";

export default function PageHero({ eyebrow, title, highlight, description, image, imageAlt = "", video, children }) {
  return (
    <section className="relative pt-44 pb-20 lg:pt-52 lg:pb-28 overflow-hidden">
      {video && (
        <>
          <motion.div
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <BackgroundVideo name={video} className="w-full h-full object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/70 to-ink pointer-events-none" />
        </>
      )}
      {image && !video && (
        <>
          <motion.div
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Photo name={image} alt={imageAlt} sizes="100vw" priority className="w-full h-full object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/75 to-ink" />
        </>
      )}
      <div className="absolute inset-0 bg-grid pointer-events-none [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
      <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full bg-brand/20 blur-[140px] animate-blob" />
      <div className="absolute -top-20 right-0 w-[420px] h-[420px] rounded-full bg-aqua/15 blur-[140px] animate-blob [animation-delay:-6s]" />


      <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-semibold uppercase tracking-[0.2em]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
          {eyebrow}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
        >
          {title} <AnimatedUnderline animateOnMount>{highlight}</AnimatedUnderline>
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-10"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
