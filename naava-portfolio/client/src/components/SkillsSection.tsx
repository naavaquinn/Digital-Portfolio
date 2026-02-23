/*
 * Design: Neo-Brutalist Editorial — "The Social Newsroom"
 * Skills: Displayed as stamp badges with tools section
 */
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SKILLS, TOOLS } from "@/lib/data";
import { IMAGES } from "@/lib/images";
import { Target, Share2, BarChart3, Palette, PenTool } from "lucide-react";

const ICON_MAP: Record<string, React.ReactNode> = {
  target: <Target size={24} />,
  share2: <Share2 size={24} />,
  barChart: <BarChart3 size={24} />,
  palette: <Palette size={24} />,
  penTool: <PenTool size={24} />,
};

export default function SkillsSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="skills" className="bg-[#E8E4DF] relative py-20 sm:py-28 overflow-hidden">
      <div
        ref={ref}
        className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-mono text-[#FF3B30] uppercase tracking-[0.3em]">
              Section 04
            </span>
            <span className="h-px flex-1 bg-[#0A0A0A]/20" />
          </div>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0A0A0A] tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            THE <span className="highlight-marker">ARSENAL</span>
          </h2>
          <p className="mt-4 text-base text-[#0A0A0A]/60 max-w-lg">
            Skills sharpened across industries. Tools mastered for impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Skills */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SKILLS.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 30, rotate: i % 2 === 0 ? -2 : 2 }}
                  animate={
                    isVisible
                      ? { opacity: 1, y: 0, rotate: i % 2 === 0 ? -1 : 1 }
                      : {}
                  }
                  whileHover={{ rotate: 0, scale: 1.02 }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                  className="bg-white border-4 border-[#0A0A0A] p-6 relative group hover:bg-[#0A0A0A] transition-colors duration-300"
                >
                  <div className="text-[#FF3B30] group-hover:text-[#C8FF00] transition-colors mb-4">
                    {ICON_MAP[skill.icon]}
                  </div>
                  <h3
                    className="text-base font-bold text-[#0A0A0A] group-hover:text-[#E8E4DF] transition-colors mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {skill.name}
                  </h3>
                  <p className="text-sm text-[#0A0A0A]/60 group-hover:text-[#E8E4DF]/60 transition-colors">
                    {skill.description}
                  </p>
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-8 h-8 bg-[#FF3B30] group-hover:bg-[#C8FF00] transition-colors" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tools & Image */}
          <div className="lg:col-span-5 space-y-8">
            {/* Tools workspace image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="border-4 border-[#0A0A0A] overflow-hidden"
            >
              <img
                src={IMAGES.toolsWorkspace}
                alt="Digital marketing tools workspace"
                className="w-full aspect-video object-cover"
              />
            </motion.div>

            {/* Tools list */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="bg-[#0A0A0A] border-4 border-[#0A0A0A] p-6"
            >
              <h3
                className="text-lg font-bold text-[#C8FF00] uppercase tracking-wider mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Software & Tools
              </h3>
              <div className="space-y-4">
                {TOOLS.map((tool) => (
                  <div
                    key={tool.name}
                    className="flex items-center justify-between border-b border-[#E8E4DF]/10 pb-3"
                  >
                    <span className="text-base font-semibold text-[#E8E4DF]">
                      {tool.name}
                    </span>
                    <span className="text-xs font-mono text-[#FF3B30] uppercase">
                      {tool.category}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
