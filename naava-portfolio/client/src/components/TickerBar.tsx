/*
 * Design: Neo-Brutalist Editorial — "The Social Newsroom"
 * TickerBar: Scrolling horizontal stats bar like a news ticker
 */
import { STATS } from "@/lib/data";

export default function TickerBar() {
  const items = [...STATS, ...STATS, ...STATS, ...STATS];

  return (
    <div className="bg-[#0A0A0A] border-y-4 border-[#FF3B30] py-4 overflow-hidden">
      <div className="flex animate-ticker whitespace-nowrap">
        {items.map((stat, i) => (
          <div key={i} className="flex items-center gap-3 px-6 sm:px-10">
            <span
              className="text-2xl sm:text-3xl font-bold text-[#C8FF00]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {stat.value}
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E8E4DF]">
                {stat.label}
              </span>
              <span className="text-[10px] font-mono text-[#E8E4DF]/50">
                {stat.detail}
              </span>
            </div>
            <span className="text-[#FF3B30] text-xl ml-4">///</span>
          </div>
        ))}
      </div>
    </div>
  );
}
