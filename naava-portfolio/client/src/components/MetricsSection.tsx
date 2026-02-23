/*
 * Design: Neo-Brutalist Editorial — "The Social Newsroom"
 * Metrics: Full-width data visualization section with animated counters
 */
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";
import { IMAGES } from "@/lib/images";

function MetricCounter({
  target,
  suffix,
  label,
  sublabel,
  delay,
}: {
  target: number;
  suffix: string;
  label: string;
  sublabel: string;
  delay: number;
}) {
  const { count, ref } = useCountUp(target, 2500);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay, duration: 0.6 }}
      className="text-center p-6 sm:p-8 border-2 border-[#E8E4DF]/20 hover:border-[#C8FF00] transition-colors duration-300"
    >
      <span
        className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#C8FF00] block"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {count}
        {suffix}
      </span>
      <span className="text-sm font-bold text-[#E8E4DF] uppercase tracking-wider mt-2 block">
        {label}
      </span>
      <span className="text-xs font-mono text-[#E8E4DF]/40 mt-1 block">
        {sublabel}
      </span>
    </motion.div>
  );
}

export default function MetricsSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="relative bg-[#0A0A0A] py-20 sm:py-28 overflow-hidden grain-overlay">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.metricsBg}
          alt="Data visualization background"
          className="w-full h-full object-cover opacity-15"
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
          className="mb-12 sm:mb-16 text-center"
        >
          <span className="text-xs font-mono text-[#C8FF00] uppercase tracking-[0.3em]">
            By The Numbers
          </span>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#E8E4DF] tracking-tight mt-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            PROOF OF <span className="text-[#FF3B30]">IMPACT</span>
          </h2>
        </motion.div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCounter
            target={30}
            suffix="%"
            label="Listener Growth"
            sublabel="Streaming platforms"
            delay={0}
          />
          <MetricCounter
            target={13}
            suffix=""
            label="Hotel Branches"
            sublabel="Across East Africa"
            delay={0.15}
          />
          <MetricCounter
            target={9}
            suffix="+"
            label="Social Accounts"
            sublabel="Instagram managed"
            delay={0.3}
          />
          <MetricCounter
            target={20}
            suffix="%"
            label="Sales Boost"
            sublabel="Marketing materials"
            delay={0.45}
          />
        </div>
      </div>
    </section>
  );
}
