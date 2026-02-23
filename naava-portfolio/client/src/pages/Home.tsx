/*
 * Design: Neo-Brutalist Editorial — "The Social Newsroom"
 * Home: Full portfolio page assembling all sections
 */
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TickerBar from "@/components/TickerBar";
import AboutSection from "@/components/AboutSection";
import MetricsSection from "@/components/MetricsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <TickerBar />
      <AboutSection />
      <MetricsSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
