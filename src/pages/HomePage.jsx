import HeroSection from "../components/hero/HeroSection";
import TechMarquee from "../components/marquee/TechMarquee";
import ServicesSection from "../components/services/ServicesSection";
import ProjectsShowcase from "../components/projects/ProjectsShowcase";
import AboutSection from "../components/about/AboutSection";
import IndustriesSection from "../components/industries/IndustriesSection";
import ProcessSection from "../components/process/ProcessSection";
import CtaSection from "../components/cta/CtaSection";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <TechMarquee />
      <ServicesSection />
      <ProjectsShowcase />
      <AboutSection />
      <IndustriesSection />
      <ProcessSection />
      <CtaSection />
    </>
  );
};

export default HomePage;
