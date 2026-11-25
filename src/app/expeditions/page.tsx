import React from "react";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { EXPEDITIONS } from "@/data/centralAsiaData";

export const metadata: Metadata = {
  title: "Central Asia Expeditions & Guided Silk Road Tours",
  description:
    "Curated overland expeditions, high-altitude horse treks, and cultural tours across Kyrgyzstan, Uzbekistan, and Tajikistan operated with WildInKyrgyzstan.com.",
};

export default function ExpeditionsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 sm:px-8 py-16">
      <div className="border-b border-[#101D2E]/15 pb-10">
        <div className="font-mono text-[11px] tracking-[0.24em] text-[#B84A27] uppercase">
          FIELD OPERATIONS • WILD KYRGYZSTAN
        </div>
        <h1 className="mt-3 font-serif text-4xl sm:text-6xl font-normal text-[#101D2E]">
          Silk Road & Alpine Expeditions
        </h1>
        <p className="mt-4 max-w-2xl text-base text-[#101D2E]/75 font-light">
          Small-group and private overland expeditions linking nomadic high-mountain
          camps in Kyrgyzstan with the ancient oasis cities of Uzbekistan and the
          Pamir Highway.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {EXPEDITIONS.map((tour) => (
          <div
            key={tour.id}
            className="flex flex-col justify-between border border-[#101D2E]/15 bg-white/75 p-8"
          >
            <div>
              <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-[#101D2E]/60">
                <span>{tour.countries.join(" • ").toUpperCase()}</span>
                <span className="text-[#B84A27]">{tour.duration}</span>
              </div>
              <h2 className="mt-4 font-serif text-2xl text-[#101D2E]">
                {tour.title}
              </h2>
              <p className="mt-3 text-sm text-[#101D2E]/75 leading-relaxed font-light">
                {tour.summary}
              </p>
              <div className="mt-6 space-y-1.5 border-t border-[#101D2E]/10 pt-4 font-mono text-[10px] tracking-[0.16em] text-[#101D2E]/60">
                <div>SEASON: {tour.season.toUpperCase()}</div>
                <div>GRADE: {tour.difficulty.toUpperCase()}</div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-[#101D2E]/10 pt-4">
              <div>
                <div className="font-mono text-[9px] text-[#101D2E]/50">FROM</div>
                <div className="font-mono text-lg font-semibold text-[#101D2E]">
                  {tour.priceFrom}
                </div>
              </div>
              <a
                href={tour.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#101D2E] px-5 py-2.5 font-mono text-[10px] font-semibold tracking-[0.18em] text-[#F5F1E8] uppercase hover:bg-white"
              >
                <span>BOOK VIA WILD KYRGYZSTAN</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
