import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { MotionConfig, motion, useScroll } from "motion/react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Seo from "../../seo/Seo";
import PageDecor from "../ui/PageDecor";

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    // Pages load lazily, so keep looking for the anchor for a moment.
    let tries = 0;
    let frame;
    const find = () => {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else if (tries++ < 90) frame = requestAnimationFrame(find);
    };
    find();
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}

export default function Layout() {
  const { scrollYProgress } = useScroll();
  const { pathname } = useLocation();

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
      <main className="relative isolate overflow-x-clip">
        {pathname !== "/" && <PageDecor key={pathname} />}
        <Suspense fallback={<div className="min-h-screen" />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
    </MotionConfig>
  );
}
