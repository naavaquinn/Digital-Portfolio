/*
 * Design: Neo-Brutalist Editorial — "The Social Newsroom"
 * Experience: Case studies presented as "front page stories"
 */
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { EXPERIENCE } from "@/lib/data";
import { MapPin, Calendar, TrendingUp } from "lucide-react";

function ExperienceCard({
  exp,
  index,
}: {
  exp: (typeof EXPERIENCE)[0];
  index: number;
}) {
  const { ref, isVisible } = useScrollReveal(0.1);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -60 : 60 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative"
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-0 ${
          isEven ? "" : "lg:direction-rtl"
        }`}
      >
        {/* Metric side */}
        <div
          className={`lg:col-span-3 flex flex-col justify-center items-center lg:items-start ${
            isEven ? "lg:order-1" : "lg:order-2 lg:items-end"
          }`}
        >
          <div
            className={`bg-[#0A0A0A] border-4 border-[#FF3B30] p-6 sm:p-8 text-center ${
              isEven ? "rotate-[-2deg]" : "rotate-[2deg]"
            } hover:rotate-0 transition-transform duration-300`}
          >
            <span
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#C8FF00] block"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {exp.metric}
            </span>
            <span className="text-xs font-mono text-[#E8E4DF]/70 uppercase tracking-wider mt-2 block">
              {exp.metricLabel}
            </span>
          </div>
        </div>

        {/* Content side */}
        <div
          className={`lg:col-span-9 ${
            isEven ? "lg:order-2 lg:pl-8" : "lg:order-1 lg:pr-8"
          }`}
        >
          <div className="bg-[#E8E4DF] border-4 border-[#0A0A0A] p-6 sm:p-8 relative">
            {/* Top bar */}
            <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-mono text-[#0A0A0A]/50">
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span>{exp.period}</span>
              </div>
              <span>|</span>
              <div className="flex items-center gap-1">
                <MapPin size={12} />
                <span>{exp.location}</span>
              </div>
            </div>

            {/* Role & Company */}
            <h3
              className="text-xl sm:text-2xl font-bold text-[#0A0A0A] mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {exp.role}
            </h3>
            <p className="text-base font-semibold text-[#FF3B30] mb-4">
              {exp.company}
            </p>

            {/* Highlights */}
            <ul className="space-y-3 mb-6">
              {exp.highlights.map((h, i) => (
                <li key={i} className="flex gap-3 text-sm text-[#0A0A0A]/80">
                  <TrendingUp
                    size={14}
                    className="text-[#FF3B30] mt-1 flex-shrink-0"
                  />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {exp.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-bold uppercase tracking-wider border-2 border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#C8FF00] transition-colors duration-200"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Issue number */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
              <span className="text-xs font-mono text-[#0A0A0A]/20 uppercase">
                #{String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="experience" className="bg-[#E8E4DF] relative py-20 sm:py-28">
      {/* Diagonal cut top */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-[#0A0A0A]" style={{
        clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 100%)"
      }} />

      <div ref={ref} className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 sm:mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-mono text-[#FF3B30] uppercase tracking-[0.3em]">
              Section 02
            </span>
            <span className="h-px flex-1 bg-[#0A0A0A]/20" />
          </div>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0A0A0A] tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            FRONT PAGE <span className="highlight-red">STORIES</span>
          </h2>
          <p className="mt-4 text-base text-[#0A0A0A]/60 max-w-lg">
            Each role, a headline. Each result, a front-page story.
          </p>
        </motion.div>

        {/* Experience cards */}
        <div className="space-y-12 sm:space-y-16">
          {EXPERIENCE.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
