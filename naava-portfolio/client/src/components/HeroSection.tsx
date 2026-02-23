/*
 * Design: Neo-Brutalist Editorial — "The Social Newsroom"
 * Hero: Masthead-style with oversized headline, editorial layout, hero image
 */
import { motion } from "framer-motion";
import { PERSONAL } from "@/lib/data";
import { IMAGES } from "@/lib/images";
import { ArrowDown, MapPin } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[#0A0A0A] overflow-hidden grain-overlay">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="Editorial collage background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-[#0A0A0A]/40 to-[#0A0A0A]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-12 min-h-screen flex flex-col justify-between">
        {/* Top: Edition line */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4 text-[#E8E4DF]/60"
        >
          <span className="text-xs font-mono uppercase tracking-[0.3em]">
            Digital Edition
          </span>
          <span className="h-px flex-1 bg-[#E8E4DF]/20" />
          <span className="text-xs font-mono uppercase tracking-[0.3em]">
            Est. 2019
          </span>
        </motion.div>

        {/* Center: Main headline */}
        <div className="flex-1 flex flex-col justify-center py-12 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {/* Stamp badge */}
            <div className="mb-6 sm:mb-8">
              <span className="stamp text-[#C8FF00] text-xs sm:text-sm">
                Digital Marketing Strategist
              </span>
            </div>

            {/* Name */}
            <h1
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.85] tracking-tighter text-[#E8E4DF]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              NAAVA
              <br />
              <span className="text-[#FF3B30]">N.</span>{" "}
              <span className="text-stroke text-[#E8E4DF]">HEDWIG</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-8 sm:mt-12 max-w-xl"
          >
            <p className="text-base sm:text-lg text-[#E8E4DF]/80 leading-relaxed">
              {PERSONAL.overview}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 sm:mt-8 flex flex-wrap items-center gap-4 sm:gap-6"
          >
            <div className="flex items-center gap-2 text-[#C8FF00]">
              <MapPin size={16} />
              <span className="text-sm font-mono">{PERSONAL.location}</span>
            </div>
            <span className="text-[#E8E4DF]/30">|</span>
            <a
              href={`mailto:${PERSONAL.email}`}
              className="text-sm font-mono text-[#FF3B30] hover:text-[#C8FF00] transition-colors underline underline-offset-4"
            >
              {PERSONAL.email}
            </a>
          </motion.div>
        </div>

        {/* Bottom: Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="flex items-center gap-4"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowDown size={20} className="text-[#C8FF00]" />
          </motion.div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#E8E4DF]/40">
            Scroll to explore
          </span>
        </motion.div>
      </div>
    </section>
  );
}
