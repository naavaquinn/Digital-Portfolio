/*
 * Design: Neo-Brutalist Editorial — "The Social Newsroom"
 * Footer: Minimal editorial footer with colophon
 */

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t-4 border-[#FF3B30] py-8 sm:py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className="text-lg font-bold text-[#E8E4DF] tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              NAAVA N. HEDWIG
            </span>
            <span className="text-xs font-mono text-[#FF3B30]">
              // Digital Marketing Strategist
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#E8E4DF]/40">
            <span>&copy; {new Date().getFullYear()}</span>
            <span>|</span>
            <span>Nancy, France</span>
            <span>|</span>
            <span className="text-[#C8FF00]/60">All rights reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
