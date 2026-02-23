/*
 * Design: Neo-Brutalist Editorial — "The Social Newsroom"
 * Projects: Social media accounts and websites managed, displayed as a grid
 */
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SOCIAL_PROJECTS, WEBSITES_MANAGED } from "@/lib/data";
import { IMAGES } from "@/lib/images";
import { Instagram, Globe, ExternalLink } from "lucide-react";

export default function ProjectsSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="projects"
      className="relative bg-[#0A0A0A] py-20 sm:py-28 overflow-hidden grain-overlay"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.socialCollage}
          alt="Social media collage"
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      <div
        ref={ref}
        className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-mono text-[#C8FF00] uppercase tracking-[0.3em]">
              Section 03
            </span>
            <span className="h-px flex-1 bg-[#E8E4DF]/20" />
          </div>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#E8E4DF] tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            THE <span className="text-[#FF3B30]">PORTFOLIO</span>
          </h2>
          <p className="mt-4 text-base text-[#E8E4DF]/50 max-w-lg">
            A curated selection of social media accounts and websites I've built, managed, and grown.
          </p>
        </motion.div>

        {/* Social Media Projects */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Instagram size={20} className="text-[#FF3B30]" />
            <h3
              className="text-xl font-bold text-[#E8E4DF] uppercase tracking-wider"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Social Media Projects
            </h3>
            <span className="ml-2 px-2 py-0.5 text-xs font-mono bg-[#FF3B30] text-white">
              {SOCIAL_PROJECTS.length}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SOCIAL_PROJECTS.map((project, i) => (
              <motion.div
                key={project}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="group border-2 border-[#E8E4DF]/20 hover:border-[#C8FF00] p-5 transition-all duration-300 hover:bg-[#E8E4DF]/5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[#FF3B30]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base font-semibold text-[#E8E4DF] group-hover:text-[#C8FF00] transition-colors">
                      {project}
                    </span>
                  </div>
                  <ExternalLink
                    size={14}
                    className="text-[#E8E4DF]/30 group-hover:text-[#C8FF00] transition-colors"
                  />
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Instagram size={12} className="text-[#E8E4DF]/30" />
                  <span className="text-xs font-mono text-[#E8E4DF]/30">
                    Instagram
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Websites Managed */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Globe size={20} className="text-[#C8FF00]" />
            <h3
              className="text-xl font-bold text-[#E8E4DF] uppercase tracking-wider"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Websites Managed
            </h3>
            <span className="ml-2 px-2 py-0.5 text-xs font-mono bg-[#C8FF00] text-[#0A0A0A]">
              {WEBSITES_MANAGED.length}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WEBSITES_MANAGED.map((site, i) => (
              <motion.div
                key={site}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i + 0.5, duration: 0.5 }}
                className="group border-2 border-[#E8E4DF]/20 hover:border-[#FF3B30] p-5 transition-all duration-300 hover:bg-[#E8E4DF]/5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[#C8FF00]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base font-semibold text-[#E8E4DF] group-hover:text-[#FF3B30] transition-colors">
                      {site}
                    </span>
                  </div>
                  <ExternalLink
                    size={14}
                    className="text-[#E8E4DF]/30 group-hover:text-[#FF3B30] transition-colors"
                  />
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Globe size={12} className="text-[#E8E4DF]/30" />
                  <span className="text-xs font-mono text-[#E8E4DF]/30">
                    Website
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
