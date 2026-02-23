/*
 * Design: Neo-Brutalist Editorial — "The Social Newsroom"
 * About: Editorial spread with map image and bio
 */
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { IMAGES } from "@/lib/images";
import { PERSONAL, CERTIFICATIONS } from "@/lib/data";
import { Award, Globe } from "lucide-react";

export default function AboutSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="about" className="bg-[#E8E4DF] relative py-20 sm:py-28">
      <div ref={ref} className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-mono text-[#FF3B30] uppercase tracking-[0.3em]">
              Section 01
            </span>
            <span className="h-px flex-1 bg-[#0A0A0A]/20" />
          </div>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0A0A0A] tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            THE <span className="highlight-marker">STORY</span>
          </h2>
        </motion.div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Map image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="relative border-4 border-[#0A0A0A] overflow-hidden">
              <img
                src={IMAGES.africaMap}
                alt="Journey from Uganda to Kenya to France"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-[#0A0A0A] px-4 py-3">
                <div className="flex items-center gap-2 text-[#C8FF00]">
                  <Globe size={14} />
                  <span className="text-xs font-mono uppercase tracking-wider">
                    Uganda → Kenya → France
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Bio text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="space-y-6">
              <p className="text-lg sm:text-xl leading-relaxed text-[#0A0A0A]/90">
                <span className="highlight-red font-bold">Results-driven</span>{" "}
                digital marketing strategist and content creator with a proven
                track record spanning{" "}
                <span className="font-bold">entertainment, fitness, hospitality,</span>{" "}
                and <span className="font-bold">healthcare research</span> across
                East Africa and Europe.
              </p>
              <p className="text-base leading-relaxed text-[#0A0A0A]/70">
                From managing social media strategies for{" "}
                <span className="font-semibold">13 hotel branches</span> across
                East Africa to driving a{" "}
                <span className="font-semibold">30% increase in monthly listeners</span>{" "}
                for entertainment artists, I bring a unique blend of creative
                direction and data-driven strategy to every project.
              </p>
              <p className="text-base leading-relaxed text-[#0A0A0A]/70">
                My journey from data analysis in infectious disease research to
                leading digital marketing campaigns has given me a rare ability to
                bridge the gap between{" "}
                <span className="font-semibold">analytical rigor</span> and{" "}
                <span className="font-semibold">creative storytelling</span>.
              </p>

              {/* Certification badge */}
              <div className="pt-4 border-t-2 border-[#0A0A0A]/10">
                {CERTIFICATIONS.map((cert) => (
                  <div key={cert} className="flex items-center gap-3">
                    <Award size={18} className="text-[#FF3B30]" />
                    <span className="text-sm font-mono text-[#0A0A0A]/60">
                      {cert}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
