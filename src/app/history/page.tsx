import React from "react";
import type { Metadata } from "next";
import HistorySection from "@/components/home/HistorySection";
import SilkRoadCanvas from "@/components/history/SilkRoadCanvas";
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

const ERA_FILMS = [
  {
    period: "2200 BCE – 500 BCE",
    title: "Oxus Oasis & Saka Steppe",
    caption: "Mounted Saka horsemen crossing the high Tian Shan dawn mist.",
    videoSrc: "/videos/era-oxus.mp4",
  },
  {
    period: "200 BCE – 800 CE",
    title: "Sogdian Silk Road Caravans",
    caption: "Bactrian caravans traversing red sandstone Pamir trade passes.",
    videoSrc: "/videos/era-sogdian.mp4",
  },
  {
    period: "800 CE – 1220 CE",
    title: "Islamic Golden Age",
    caption: "Astronomers and scholars in Bukhara and Khwarezm observatories.",
    videoSrc: "/videos/era-golden.mp4",
  },
  {
    period: "1370 CE – 1507 CE",
    title: "The Timurid Renaissance",
    caption: "Turquoise majolica tilework rising across Registan Samarkand.",
    videoSrc: "/videos/timurid.webm",
  },
];

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
          HISTORICAL ARCHIVE • TRANSOXIANA &amp; THE STEPPE
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
            <div className="mt-1 font-serif text-lg font-medium">Oxus &amp; Saka Foundations</div>
            <p className="mt-1 text-xs text-[#101D2E]/70 leading-relaxed">
              Fortified Bronze Age oasis towns along the Amu Darya meet mounted
              Saka confederations across the Tian Shan and Kazakh steppe.
            </p>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[0.2em] text-[#0F4C81] uppercase">
              200 BCE – 1000 CE
            </div>
            <div className="mt-1 font-serif text-lg font-medium">Sogdian &amp; Islamic Golden Age</div>
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

      {/* Interactive Animated Silk Road Cartography Canvas */}
      <SilkRoadCanvas />

      {/* 4-Era Visual Cinema Reels (5-Second Higgsfield Loops) */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 pb-12">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#101D2E]/15 pb-4 mb-6">
          <div>
            <div className="font-mono text-[10px] tracking-[0.22em] text-[#B84A27] uppercase">
              VISUAL RECONSTRUCTIONS
            </div>
            <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-normal text-[#101D2E]">
              Scenes Across Four Millennia
            </h2>
          </div>
          <span className="font-mono text-[10px] tracking-[0.18em] text-[#101D2E]/60 uppercase">
            16:9 ARCHIVAL MOTION PLATES
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ERA_FILMS.map((film) => (
            <figure
              key={film.period}
              className="group relative overflow-hidden border border-[#101D2E]/20 bg-[#101D2E] text-[#F5F1E8]"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-[#101D2E]">
                <video
                  src={film.videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#101D2E] via-[#101D2E]/35 to-transparent" />
                <figcaption className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <div className="font-mono text-[10px] tracking-[0.2em] text-[#E68A6E] uppercase">
                    {film.period}
                  </div>
                  <h3 className="mt-1 font-serif text-xl sm:text-2xl font-normal text-white">
                    {film.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-[#F5F1E8]/80 font-light">
                    {film.caption}
                  </p>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </section>

      <HistorySection compact={false} />
    </div>
  );
}