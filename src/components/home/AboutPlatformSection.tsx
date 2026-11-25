import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function AboutPlatformSection() {
  const pillars = [
    {
      num: "01",
      title: "Historical & Architectural Archive",
      detail:
        "From Bronze Age Oxus settlements and Sogdian merchant networks to Timurid observatories in Samarkand and Karakhanid towers in the Tian Shan.",
      linkText: "EXPLORE CHRONICLE",
      href: "/history",
    },
    {
      num: "02",
      title: "Living Gastronomy & Heirloom Recipes",
      detail:
        "Documenting regional foodways—Karakol Dungan ashlyan-fu, Samarkand zighir plov, nomadic hearth cooking, and fermented steppe traditions.",
      linkText: "ENTER CULINARY ARCHIVE",
      href: "/cuisine",
    },
    {
      num: "03",
      title: "Overland Field Intelligence & Expeditions",
      detail:
        "Verified border crossing protocols, seasonal mountain pass windows, and direct expedition operations across Kyrgyzstan, Uzbekistan, and the Pamirs.",
      linkText: "VIEW FIELD EXPEDITIONS",
      href: "/expeditions",
    },
  ];

  return (
    <section className="border-b border-white/12 bg-[#08090B] py-24 text-[#F4F1EA]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
          {/* Left Editorial Statement */}
          <div className="lg:col-span-6 space-y-6">
            <div className="font-mono text-[11px] tracking-[0.24em] text-amber-300 uppercase">
              ABOUT THE PLATFORM • WHAT WE DOCUMENT
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-[1.08] text-[#F4F1EA]">
              A Modern Digital Record of Eurasia’s Most Storied Crossroads.
            </h2>
            <p className="text-base sm:text-lg text-stone-300/90 leading-relaxed font-light">
              For centuries, Central Asia stood at the center of global
              exchange—where scholars, artisans, and nomadic confederations
              shaped science, cuisine, and overland trade. Yet in the modern
              digital era, the region’s cultural depth has remained fragmented
              across outdated guidebooks.
            </p>
            <p className="text-sm sm:text-base text-stone-400 leading-relaxed font-light">
              <strong className="font-medium text-stone-200">MyCentralAsia.com</strong>{" "}
              was built to serve as the definitive English-language reference
              and travel intelligence hub for Kazakhstan, Kyrgyzstan,
              Uzbekistan, Tajikistan, and Turkmenistan—connecting curious
              readers directly to real expeditions on the ground.
            </p>

            {/* Key Regional Metrics */}
            <div className="grid grid-cols-3 gap-4 border-t border-white/15 pt-6">
              <div>
                <div className="font-serif text-2xl sm:text-3xl text-white">5</div>
                <div className="mt-1 font-mono text-[10px] tracking-[0.18em] text-stone-400">
                  SOVEREIGN REPUBLICS
                </div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl text-white">4,000+</div>
                <div className="mt-1 font-mono text-[10px] tracking-[0.18em] text-stone-400">
                  YEARS OF ARCHIVE
                </div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl text-white">7,495m</div>
                <div className="mt-1 font-mono text-[10px] tracking-[0.18em] text-stone-400">
                  PAMIR & TIAN SHAN PEAKS
                </div>
              </div>
            </div>
          </div>

          {/* Right Editorial Pillars */}
          <div className="lg:col-span-6 divide-y divide-white/12 border-t border-b border-white/12">
            {pillars.map((item) => (
              <div key={item.num} className="py-7 first:pt-2 last:pb-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-[0.2em] text-amber-300">
                    {item.num} / PILLAR
                  </span>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.18em] text-stone-300 hover:text-white"
                  >
                    <span>{item.linkText}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
                <h3 className="mt-2 font-serif text-xl sm:text-2xl text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-stone-300/85 leading-relaxed font-light">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
