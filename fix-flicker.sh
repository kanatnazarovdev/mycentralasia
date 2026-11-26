#!/usr/bin/env bash
set -e

if [ -d "src/app" ]; then
  BASE="src"
else
  BASE="."
fi

echo "🔍 Inspecting Shell.tsx and globals.css for hydration-hiding wrappers..."
ls -la "$BASE/components/" 2>/dev/null || true

# 1. Neutralize any legacy Shell.tsx from WildInKyrgyzstan that hides/unmounts children on hydration
if [ -f "$BASE/components/Shell.tsx" ]; then
  echo "⚠️  Found legacy $BASE/components/Shell.tsx — neutralizing hydration wrapper..."
  cat << 'EOF' > "$BASE/components/Shell.tsx"
"use client";

import React from "react";

export default function Shell({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
EOF
fi

# 2. Ensure CinemaHero renders immediately at opacity: 1 without waiting for Framer Motion hydration
cat << 'EOF' > "$BASE/components/home/CinemaHero.tsx"
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import CountryFlag from "@/components/layout/CountryFlag";

const HERO_CHAPTERS = [
  {
    id: "kg",
    code: "KG" as const,
    name: "Kyrgyzstan",
    slug: "kyrgyzstan",
    plate: "PLATE I — SONG-KUL ALPINE BASIN",
    coords: "41°50'29\"N 75°07'43\"E",
    video: "/videos/kyrgyzstan.mp4",
    accentHex: "#E8112D",
    barClass: "bg-[#E8112D]",
  },
  {
    id: "uz",
    code: "UZ" as const,
    name: "Uzbekistan",
    slug: "uzbekistan",
    plate: "PLATE II — REGISTAN, SAMARKAND",
    coords: "39°39'15\"N 66°57'35\"E",
    video: "/videos/uzbekistan.mp4",
    accentHex: "#38BDF8",
    barClass: "bg-[#0099B5]",
  },
  {
    id: "kz",
    code: "KZ" as const,
    name: "Kazakhstan",
    slug: "kazakhstan",
    plate: "PLATE III — CHARYN CANYON",
    coords: "43°21'08\"N 79°04'44\"E",
    video: "/videos/kazakhstan.mp4",
    accentHex: "#FEC50C",
    barClass: "bg-[#FEC50C]",
  },
  {
    id: "tj",
    code: "TJ" as const,
    name: "Tajikistan",
    slug: "tajikistan",
    plate: "PLATE IV — PAMIR HIGHWAY",
    coords: "37°29'23\"N 71°33'11\"E",
    video: "/videos/tajikistan.mp4",
    accentHex: "#4ADE80",
    barClass: "bg-[#1EB53A]",
  },
];

export default function CinemaHero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_CHAPTERS.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  const current = HERO_CHAPTERS[activeIndex];

  return (
    <section className="relative min-h-[86vh] w-full overflow-hidden bg-[#08090B] text-[#F4F1EA] flex flex-col justify-between border-b border-white/12">
      <div className="pointer-events-none absolute inset-0 z-0">
        <video
          key={current.id}
          src={current.video}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-75 contrast-[1.06] transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090B]/70 via-[#08090B]/35 to-[#08090B]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08090B]/85 via-[#08090B]/30 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8 pt-20 pb-12 my-auto">
        <div className="max-w-3xl">
          <div className="mb-6 flex items-center gap-3 font-mono text-[11px] tracking-[0.24em] text-stone-300 uppercase">
            <span
              className="inline-block h-[1px] w-8 transition-colors duration-700"
              style={{ backgroundColor: current.accentHex }}
            />
            <span>{current.plate}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-normal tracking-[-0.02em] text-[#F4F1EA] leading-[0.98]">
            <span className="block font-sans font-medium tracking-[-0.03em]">
              THE HEARTLAND OF
            </span>
            <span className="block font-serif italic font-normal text-[#F4F1EA]/95 mt-1">
              the Silk Road.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base sm:text-lg text-stone-200/90 leading-relaxed font-light">
            The authoritative digital platform for Central Asia—uniting Silk Road
            history, heirloom culinary archives, regional dispatches, and
            high-altitude overland expeditions.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/news"
              className="bg-[#F4F1EA] px-6 py-3.5 font-mono text-[11px] font-semibold tracking-[0.2em] text-[#08090B] uppercase hover:bg-white transition-colors"
            >
              READ LATEST DISPATCHES
            </Link>
            <Link
              href="/history"
              className="border border-white/30 bg-black/35 px-6 py-3.5 font-mono text-[11px] tracking-[0.2em] text-[#F4F1EA] uppercase backdrop-blur-md hover:border-white transition-colors"
            >
              EXPLORE HISTORY ARCHIVE
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8 py-6 border-t border-white/12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {HERO_CHAPTERS.map((chapter, idx) => {
            const active = idx === activeIndex;
            return (
              <div key={chapter.id} className="text-left">
                <button
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className="w-full text-left group"
                >
                  <div className="mb-2 h-[2px] w-full bg-white/15 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        active
                          ? `w-full ${chapter.barClass}`
                          : "w-0 group-hover:w-1/3 bg-white/40"
                      }`}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CountryFlag code={chapter.code} />
                      <span
                        className={`font-mono text-[11px] tracking-[0.16em] uppercase ${
                          active
                            ? "text-[#F4F1EA] font-semibold"
                            : "text-stone-400 group-hover:text-stone-200"
                        }`}
                      >
                        {chapter.name}
                      </span>
                    </div>
                    <Link
                      href={`/destinations/${chapter.slug}`}
                      className="text-stone-400 hover:text-white"
                      title={`Explore ${chapter.name}`}
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                  <div className="mt-0.5 font-mono text-[9px] tracking-wider text-stone-500">
                    {chapter.coords}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
EOF

# 3. Check if any other layout.tsx exists that could override app/layout.tsx
find "$BASE/app" -name "layout.tsx"

# 4. Build locally to confirm zero errors, then push to GitHub/Vercel
npm run build
git add -A
git commit -m "Eliminate hydration flicker and neutralize legacy Shell wrapper" || true
git push

echo "✅ Built and pushed! Check Vercel Deployments tab to verify the new commit is 'Ready'."
