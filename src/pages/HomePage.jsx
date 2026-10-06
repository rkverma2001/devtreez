import { MotionConfig, motion, useScroll } from "motion/react";
import Navbar from "../components/navbar/Navbar";
import HeroSection from "../components/hero/HeroSection";
import TechMarquee from "../components/marquee/TechMarquee";
import ServicesSection from "../components/services/ServicesSection";
import ProjectsShowcase from "../components/projects/ProjectsShowcase";
import AboutSection from "../components/about/AboutSection";
import IndustriesSection from "../components/industries/IndustriesSection";
import ProcessSection from "../components/process/ProcessSection";
import CtaSection from "../components/cta/CtaSection";
import Footer from "../components/footer/Footer";

const HomePage = () => {
  const { scrollYProgress } = useScroll();

  return (
    <MotionConfig reducedMotion="user">
      {/* Page scroll progress */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-[3px] origin-left bg-gradient-to-r from-brand via-volt to-aqua z-[60]"
      />

      <Navbar />

      {/* overflow-x-clip (not hidden) keeps the sticky projects showcase working */}
      <main className="overflow-x-clip">
        <HeroSection />
        <TechMarquee />
        <ServicesSection />
        <ProjectsShowcase />
        <AboutSection />
        <IndustriesSection />
        <ProcessSection />
        <CtaSection />
      </main>

      <Footer />
    </MotionConfig>
  );
};

export default HomePage;
