import React from "react";
import type { Metadata } from "next";
import HistorySection from "@/components/home/HistorySection";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Silk Road History & Central Asian Civilizations (Bronze Age to Present)",
  description:
    "Explore 4,000 years of Central Asian history: the Oxus civilization, Saka steppe nomads, Sogdian Silk Road merchants, the Timurid Renaissance in Samarkand, and modern independence.",
  alternates: {
    canonical: "https://mycentralasia.com/history",
  },
  openGraph: {
    title: "Silk Road History & Central Asian Civilizations | My Central Asia",
    description:
      "Chronological archive covering the Bactria-Margiana Archaeological Complex, Sogdian trade networks, Al-Khwarizmi and Ibn Sina, and the Timurid golden age.",
    url: "https://mycentralasia.com/history",
    type: "website",
  },
};

export default function HistoryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        url: "https://mycentralasia.com/history",
        name: "History of Central Asia & The Silk Road",
        description:
          "Comprehensive historical timeline of Central Asia from Bronze Age oasis kingdoms to the Timurid Renaissance and modern republics.",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://mycentralasia.com" },
          { "@type": "ListItem", position: 2, name: "History", item: "https://mycentralasia.com/history" },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#F5F1E8] text-[#101D2E]">
      <JsonLd data={jsonLd} />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 pt-14 pb-8 border-b border-[#101D2E]/15">
        <div className="font-mono text-[11px] tracking-[0.24em] text-[#B84A27] uppercase">
          HISTORICAL ARCHIVE • TRANSOXIANA & THE STEPPE
        </div>
        <h1 className="mt-3 font-serif text-4xl sm:text-6xl font-normal text-[#101D2E]">
          History of Central Asia
        </h1>
        <p className="mt-4 max-w-3xl text-base sm:text-lg text-[#101D2E]/80 font-light leading-relaxed">
          For millennia, the oases and mountain passes between the Caspian Sea
          and the Tian Shan served as Eurasia&apos;s primary conduit of science,
          architecture, religion, and overland trade—shaping algebra, astronomy,
          and global commerce.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#101D2E]/10 text-sm">
          <div>
            <div className="font-mono text-[10px] tracking-[0.2em] text-[#0F4C81] uppercase">
              2200 BCE – 500 BCE
            </div>
            <div className="mt-1 font-serif text-lg font-medium">Oxus & Saka Foundations</div>
            <p className="mt-1 text-xs text-[#101D2E]/70 leading-relaxed">
              Fortified Bronze Age oasis towns along the Amu Darya meet mounted
              Saka confederations across the Tian Shan and Kazakh steppe.
            </p>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[0.2em] text-[#0F4C81] uppercase">
              200 BCE – 1000 CE
            </div>
            <div className="mt-1 font-serif text-lg font-medium">Sogdian & Islamic Golden Age</div>
            <p className="mt-1 text-xs text-[#101D2E]/70 leading-relaxed">
              Panjikent and Samarkand anchor transcontinental trade while
              scholars like Al-Khwarizmi, Al-Biruni, and Ibn Sina transform global science.
            </p>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[0.2em] text-[#0F4C81] uppercase">
              1370 – PRESENT
            </div>
            <div className="mt-1 font-serif text-lg font-medium">Timurid Renaissance to Modernity</div>
            <p className="mt-1 text-xs text-[#101D2E]/70 leading-relaxed">
              Monumental turquoise domes and Ulugh Beg&apos;s observatory give way
              to the Silk Road khanates, 20th-century transformations, and five sovereign republics.
            </p>
          </div>
        </div>
      </div>

      <HistorySection compact={false} />
    </div>
  );
}
