/*
 * Design: Neo-Brutalist Editorial — "The Social Newsroom"
 * Contact: Bold CTA section with editorial styling
 */
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { PERSONAL } from "@/lib/data";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export default function ContactSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="contact" className="bg-[#E8E4DF] relative py-20 sm:py-28">
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
              Section 05
            </span>
            <span className="h-px flex-1 bg-[#0A0A0A]/20" />
          </div>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0A0A0A] tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            LET'S <span className="highlight-red">CONNECT</span>
          </h2>
          <p className="mt-4 text-base text-[#0A0A0A]/60 max-w-lg">
            Ready to bring results-driven digital marketing to your brand? Let's talk.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Big CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <a
              href={`mailto:${PERSONAL.email}`}
              className="group block bg-[#0A0A0A] border-4 border-[#0A0A0A] p-8 sm:p-12 hover:bg-[#FF3B30] transition-colors duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono text-[#C8FF00] group-hover:text-[#E8E4DF] uppercase tracking-wider transition-colors">
                  Get in touch
                </span>
                <ArrowUpRight
                  size={24}
                  className="text-[#C8FF00] group-hover:text-[#E8E4DF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                />
              </div>
              <h3
                className="text-2xl sm:text-3xl font-bold text-[#E8E4DF] mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                SEND ME AN EMAIL
              </h3>
              <p className="text-sm font-mono text-[#E8E4DF]/60 group-hover:text-[#E8E4DF]/80 transition-colors break-all">
                {PERSONAL.email}
              </p>
            </a>
          </motion.div>

          {/* Right: Contact details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-6"
          >
            {/* Phone */}
            <div className="border-4 border-[#0A0A0A] p-6 hover:bg-[#0A0A0A] group transition-colors duration-300">
              <div className="flex items-center gap-4">
                <Phone
                  size={20}
                  className="text-[#FF3B30] group-hover:text-[#C8FF00] transition-colors"
                />
                <div>
                  <span className="text-xs font-mono text-[#0A0A0A]/40 group-hover:text-[#E8E4DF]/40 uppercase tracking-wider block transition-colors">
                    Phone
                  </span>
                  <span className="text-lg font-semibold text-[#0A0A0A] group-hover:text-[#E8E4DF] transition-colors">
                    {PERSONAL.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="border-4 border-[#0A0A0A] p-6 hover:bg-[#0A0A0A] group transition-colors duration-300">
              <div className="flex items-center gap-4">
                <Mail
                  size={20}
                  className="text-[#FF3B30] group-hover:text-[#C8FF00] transition-colors"
                />
                <div>
                  <span className="text-xs font-mono text-[#0A0A0A]/40 group-hover:text-[#E8E4DF]/40 uppercase tracking-wider block transition-colors">
                    Email
                  </span>
                  <span className="text-base font-semibold text-[#0A0A0A] group-hover:text-[#E8E4DF] transition-colors break-all">
                    {PERSONAL.email}
                  </span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="border-4 border-[#0A0A0A] p-6 hover:bg-[#0A0A0A] group transition-colors duration-300">
              <div className="flex items-center gap-4">
                <MapPin
                  size={20}
                  className="text-[#FF3B30] group-hover:text-[#C8FF00] transition-colors"
                />
                <div>
                  <span className="text-xs font-mono text-[#0A0A0A]/40 group-hover:text-[#E8E4DF]/40 uppercase tracking-wider block transition-colors">
                    Location
                  </span>
                  <span className="text-lg font-semibold text-[#0A0A0A] group-hover:text-[#E8E4DF] transition-colors">
                    {PERSONAL.location}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
