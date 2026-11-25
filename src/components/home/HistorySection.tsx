import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HISTORY_TIMELINE } from "@/data/centralAsiaData";

export default function HistorySection({ compact = false }: { compact?: boolean }) {
  const items = compact ? HISTORY_TIMELINE.slice(0, 3) : HISTORY_TIMELINE;

  return (
    <section className="border-b border-[#101D2E]/15 bg-[#EBE4D5] py-20 text-[#101D2E]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#101D2E]/20 pb-8">
          <div>
            <div className="font-mono text-[11px] font-semibold tracking-[0.24em] text-[#B84A27] uppercase">
              HISTORICAL CHRONICLE • 2200 BCE – PRESENT
            </div>
            <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-normal text-[#101D2E]">
              Civilizations of the Crossroads
            </h2>
          </div>

          {compact && (
            <Link
              href="/history"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-[0.18em] text-[#0F4C81] hover:text-[#101D2E] border-b border-[#0F4C81] pb-1 self-start md:self-auto"
            >
              <span>FULL HISTORICAL TIMELINE</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>

        <div className="divide-y divide-[#101D2E]/15">
          {items.map((era, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 gap-4 py-8 lg:grid-cols-12 lg:gap-8 items-start"
            >
              <div className="lg:col-span-3">
                <div className="font-mono text-xs font-bold tracking-[0.2em] text-[#0F4C81]">
                  {era.yearRange}
                </div>
                <div className="mt-1 font-mono text-[10px] tracking-[0.18em] text-[#101D2E]/60 uppercase">
                  {era.period}
                </div>
              </div>

              <div className="lg:col-span-6">
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#101D2E]">
                  {era.title}
                </h3>
                <p className="mt-2.5 text-sm text-[#101D2E]/80 leading-relaxed">
                  {era.summary}
                </p>
              </div>

              <div className="lg:col-span-3 lg:text-right">
                <div className="font-mono text-[10px] tracking-[0.18em] text-[#101D2E]/65 uppercase">
                  {era.region}
                </div>
                <div className="mt-1.5 inline-block border border-[#101D2E]/20 bg-[#F5F1E8] px-2.5 py-1 font-mono text-[10px] text-[#101D2E]">
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
