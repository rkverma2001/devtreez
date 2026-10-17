import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { MotionConfig, motion, useScroll } from "motion/react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Seo from "../../seo/Seo";

// Links pass the section to scroll to in navigation state (<Link state={{ scrollTo: "id" }}>),
// so URLs stay clean (/services instead of /services#cloud-devops).
function ScrollManager() {
  const { pathname, search, hash, state, key } = useLocation();
  const target = state?.scrollTo ?? (hash ? decodeURIComponent(hash.slice(1)) : null);

  useEffect(() => {
    if (!target) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    // Old #hash links still work; drop the hash from the address bar.
    if (window.location.hash) {
      window.history.replaceState(window.history.state, "", pathname + search);
    }
    // Pages load lazily, so keep looking for the section for a moment.
    let tries = 0;
    let frame;
    const find = () => {
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else if (tries++ < 90) frame = requestAnimationFrame(find);
    };
    find();
    return () => cancelAnimationFrame(frame);
  }, [pathname, search, target, key]);

  return null;
}

export default function Layout() {
  const { scrollYProgress } = useScroll();

  return (
    <MotionConfig reducedMotion="user">
      <ScrollManager />
      <Seo />

      {/* Page scroll progress */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-[3px] origin-left bg-gradient-to-r from-brand via-volt to-aqua z-[60]"
      />

      <Navbar />

      {/* overflow-x-clip (not hidden) keeps sticky sections working */}
      <main className="overflow-x-clip">
        <Suspense fallback={<div className="min-h-screen" />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
    </MotionConfig>
  );
}
