import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HISTORY_TIMELINE } from "@/data/centralAsiaData";

export default function HistorySection({ compact = false }: { compact?: boolean }) {
  const items = compact ? HISTORY_TIMELINE.slice(0, 3) : HISTORY_TIMELINE;

  return (
    <section className="border-b border-white/12 bg-[#08090B] py-20 text-[#F4F1EA]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/15 pb-8">
          <div>
            <div className="font-mono text-[11px] tracking-[0.24em] text-amber-300/90 uppercase">
              HISTORICAL CHRONICLE • 2200 BCE – PRESENT
            </div>
            <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-normal text-[#F4F1EA]">
              Civilizations of the Crossroads
            </h2>
          </div>

          {compact && (
            <Link
              href="/history"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.18em] text-stone-300 hover:text-white border-b border-white/30 pb-1 self-start md:self-auto"
            >
              <span>FULL HISTORICAL TIMELINE</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>

        <div className="divide-y divide-white/10">
          {items.map((era, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 gap-4 py-8 lg:grid-cols-12 lg:gap-8 items-start"
            >
              <div className="lg:col-span-3">
                <div className="font-mono text-xs tracking-[0.2em] text-amber-300">
                  {era.yearRange}
                </div>
                <div className="mt-1 font-mono text-[10px] tracking-[0.18em] text-stone-500 uppercase">
                  {era.period}
                </div>
              </div>

              <div className="lg:col-span-6">
                <h3 className="font-serif text-xl sm:text-2xl text-white">
                  {era.title}
                </h3>
                <p className="mt-2.5 text-sm text-stone-300/85 leading-relaxed font-light">
                  {era.summary}
                </p>
              </div>

              <div className="lg:col-span-3 lg:text-right">
                <div className="font-mono text-[10px] tracking-[0.18em] text-stone-400 uppercase">
                  {era.region}
                </div>
                <div className="mt-1.5 inline-block border border-white/15 bg-white/[0.02] px-2.5 py-1 font-mono text-[10px] text-stone-300">
                  {era.keyArtifact}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
