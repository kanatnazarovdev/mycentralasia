import React from "react";
import type { Metadata } from "next";
import HistorySection from "@/components/home/HistorySection";

export const metadata: Metadata = {
  title: "Silk Road History & Central Asian Civilizations",
  description:
    "Explore 4,000 years of Central Asian history: Bronze Age Oxus oasis cities, Sogdian Silk Road merchants, the Timurid Renaissance, and nomadic steppe empires.",
};

export default function HistoryPage() {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 sm:px-8 pt-16 pb-6">
        <div className="font-mono text-[11px] tracking-[0.24em] text-amber-300 uppercase">
          HISTORICAL ARCHIVE
        </div>
        <h1 className="mt-3 font-serif text-4xl sm:text-6xl font-normal text-[#F4F1EA]">
          History of Central Asia
        </h1>
        <p className="mt-4 max-w-2xl text-base text-stone-300 font-light leading-relaxed">
          For millennia, the oases and mountain passes between the Caspian Sea
          and the Tian Shan served as Eurasia’s primary conduit of science,
          architecture, religion, and trade.
        </p>
      </div>
      <HistorySection compact={false} />
    </div>
  );
}
