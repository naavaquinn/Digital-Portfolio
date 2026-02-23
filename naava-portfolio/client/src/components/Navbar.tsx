/*
 * Design: Neo-Brutalist Editorial — "The Social Newsroom"
 * Navbar: Masthead-style with bold borders and editorial typography
 */
import { useState, useEffect } from "react";
import { NAV_ITEMS } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#E8E4DF]/95 backdrop-blur-sm border-b-4 border-[#0A0A0A]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Name */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2"
          >
            <span
              className="text-lg sm:text-xl font-bold tracking-tight text-[#0A0A0A]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              NAAVA
            </span>
            <span className="hidden sm:inline-block text-xs font-mono text-[#FF3B30] tracking-widest uppercase">
              // Portfolio
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="px-4 py-2 text-sm font-semibold uppercase tracking-wider text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#C8FF00] transition-colors duration-200"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-[#0A0A0A]"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[#0A0A0A] border-b-4 border-[#FF3B30] overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-left px-4 py-3 text-lg font-bold uppercase tracking-wider text-[#E8E4DF] hover:text-[#C8FF00] hover:pl-6 transition-all duration-200"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
