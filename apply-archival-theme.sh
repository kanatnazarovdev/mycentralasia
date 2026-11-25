#!/usr/bin/env bash
set -e

if [ -d "src/app" ]; then
  BASE="src"
else
  BASE="."
fi

TARGETS=("$BASE/app")
if [ -d "$BASE/app/[lang]" ]; then
  TARGETS+=("$BASE/app/[lang]")
fi

echo "🎨 Applying 'Silk Road Archival Monograph' theme (Parchment #F5F1E8 + Lapis Ink #101D2E + Cobalt #0F4C81 + Terracotta #B84A27)..."

# 1. Update Root Layout body colors
python3 - << 'PYEOF'
import os

for path in ["app/layout.tsx", "src/app/layout.tsx", "app/[lang]/layout.tsx", "src/app/[lang]/layout.tsx"]:
    if os.path.exists(path):
        with open(path, "r") as f:
            text = f.read()
        text = text.replace("bg-[#08090B] text-[#F4F1EA]", "bg-[#F5F1E8] text-[#101D2E]")
        text = text.replace("bg-[#0F0E0D] text-[#FAF8F5]", "bg-[#F5F1E8] text-[#101D2E]")
        text = text.replace('color="#F4F1EA"', 'color="#0F4C81"')
        with open(path, "w") as f:
            f.write(text)
PYEOF

# 2. Broadsheet Editorial Header (Parchment + Deep Lapis Rules)
cat << 'EOF' > "$BASE/components/layout/SiteHeader.tsx"
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import { COUNTRIES } from "@/data/centralAsiaData";
import CountryFlag from "./CountryFlag";

export default function SiteHeader() {
  const pathname = usePathname();
  const [destinationsOpen, setDestinationsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "JOURNAL & NEWS", href: "/news" },
    { label: "SILK ROAD HISTORY", href: "/history" },
    { label: "CUISINE", href: "/cuisine" },
    { label: "EXPEDITIONS", href: "/expeditions" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#101D2E]/15 bg-[#F5F1E8]/95 backdrop-blur-md text-[#101D2E]">
      {/* Top Archival Ledger Strip */}
      <div className="hidden lg:block border-b border-[#101D2E]/10 bg-[#EBE4D5]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-2 font-mono text-[10px] tracking-[0.2em] text-[#101D2E]/70">
          <div className="flex items-center gap-5">
            <span className="font-semibold text-[#101D2E]">
              MY CENTRAL ASIA • CULTURAL ARCHIVE & REGIONAL INTELLIGENCE
            </span>
            <span className="text-[#101D2E]/25">|</span>
            <div className="flex items-center gap-3">
              {COUNTRIES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/destinations/${c.slug}`}
                  className="flex items-center gap-1.5 hover:text-[#0F4C81] transition-colors"
                >
                  <CountryFlag code={c.code} className="h-2.5 w-3.5 shadow-xs" />
                  <span>{c.code}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="https://instagram.com/mycentralasia.co"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0F4C81] transition-colors"
            >
              @MYCENTRALASIA.CO
            </a>
            <a
              href="https://www.wildinkyrgyzstan.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-semibold text-[#B84A27] hover:underline"
            >
              <span>FIELD PARTNER: WILD KYRGYZSTAN</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Masthead */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="font-serif text-2xl sm:text-[1.7rem] font-semibold tracking-[0.12em] uppercase text-[#101D2E]">
            MY CENTRAL ASIA
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7 font-mono text-[11px] tracking-[0.18em]">
          <div
            className="relative"
            onMouseEnter={() => setDestinationsOpen(true)}
            onMouseLeave={() => setDestinationsOpen(false)}
          >
            <button
              type="button"
              onClick={() => setDestinationsOpen(!destinationsOpen)}
              className={`flex items-center gap-1.5 py-2 transition-colors ${
                pathname?.includes("/destinations")
                  ? "text-[#0F4C81] font-bold"
                  : "text-[#101D2E]/80 hover:text-[#0F4C81]"
              }`}
            >
              <span>THE 5 STANS</span>
              <ChevronDown className="h-3.5 w-3.5 opacity-70" />
            </button>

            {destinationsOpen && (
              <div className="absolute left-0 top-full w-80 border border-[#101D2E]/20 bg-[#F5F1E8] p-2 shadow-xl">
                {COUNTRIES.map((country) => (
                  <Link
                    key={country.slug}
                    href={`/destinations/${country.slug}`}
                    onClick={() => setDestinationsOpen(false)}
                    className="flex items-start gap-3 p-3 hover:bg-[#EBE4D5] transition-colors"
                  >
                    <CountryFlag code={country.code} className="h-3.5 w-5 mt-0.5 shadow-xs" />
                    <div>
                      <div className="text-xs font-bold tracking-wider text-[#101D2E] uppercase">
                        {country.name}
                      </div>
                      <div className="mt-0.5 font-sans text-[11px] tracking-normal text-[#101D2E]/70 line-clamp-1">
                        {country.tagline}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navItems.map((item) => {
            const active = pathname?.endsWith(item.href) || pathname?.includes(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`py-2 transition-colors ${
                  active
                    ? "border-b-2 border-[#B84A27] text-[#101D2E] font-bold"
                    : "text-[#101D2E]/80 hover:text-[#0F4C81]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://www.wildinkyrgyzstan.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#101D2E] px-4 py-2.5 font-mono text-[10px] font-semibold tracking-[0.18em] text-[#F5F1E8] uppercase hover:bg-[#0F4C81] transition-colors"
          >
            <span>BOOK EXPEDITION</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#101D2E]"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#101D2E]/15 bg-[#F5F1E8] px-6 py-6 space-y-6">
          <div className="space-y-3">
            <div className="font-mono text-[10px] tracking-[0.2em] text-[#101D2E]/60">
              REGIONAL GUIDES
            </div>
            <div className="grid grid-cols-2 gap-2">
              {COUNTRIES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/destinations/${c.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 border border-[#101D2E]/15 bg-[#EBE4D5]/50 px-3 py-2 font-mono text-xs text-[#101D2E]"
                >
                  <CountryFlag code={c.code} />
                  <span>{c.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-3 border-t border-[#101D2E]/15 pt-4 font-mono text-xs tracking-[0.18em]">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 text-[#101D2E] hover:text-[#0F4C81]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
EOF

# 3. Archival Footer (Deep Lapis Ink #101D2E anchor so page closes with authority)
cat << 'EOF' > "$BASE/components/layout/SiteFooter.tsx"
import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { COUNTRIES } from "@/data/centralAsiaData";
import CountryFlag from "./CountryFlag";

export default function SiteFooter() {
  return (
    <footer className="border-t border-[#101D2E]/20 bg-[#101D2E] text-[#F5F1E8]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="font-serif text-xl tracking-[0.16em] uppercase text-[#F5F1E8]">
              MY CENTRAL ASIA
            </div>
            <p className="text-sm text-[#F5F1E8]/75 leading-relaxed font-light">
              An independent digital publication and cultural archive documenting
              the history, culinary traditions, and overland expedition routes of
              Central Asia.
            </p>
            <div className="pt-2 font-mono text-[11px] tracking-[0.16em] text-[#F5F1E8]/60">
              BISHKEK • SAMARKAND • ALMATY • DUSHANBE
            </div>
          </div>

          <div>
            <h3 className="font-mono text-[11px] tracking-[0.22em] text-[#F5F1E8]/60 uppercase mb-4">
              DESTINATIONS
            </h3>
            <ul className="space-y-2.5 text-sm">
              {COUNTRIES.map((country) => (
                <li key={country.slug}>
                  <Link
                    href={`/destinations/${country.slug}`}
                    className="inline-flex items-center gap-2.5 text-[#F5F1E8]/85 hover:text-white transition-colors"
                  >
                    <CountryFlag code={country.code} className="h-3 w-4.5" />
                    <span>{country.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[11px] tracking-[0.22em] text-[#F5F1E8]/60 uppercase mb-4">
              EDITORIAL ARCHIVE
            </h3>
            <ul className="space-y-2.5 text-sm text-[#F5F1E8]/85">
              <li>
                <Link href="/news" className="hover:text-white transition-colors">
                  Latest Dispatches & News
                </Link>
              </li>
              <li>
                <Link href="/history" className="hover:text-white transition-colors">
                  Silk Road Historical Timeline
                </Link>
              </li>
              <li>
                <Link href="/cuisine" className="hover:text-white transition-colors">
                  Central Asian Gastronomy & Recipes
                </Link>
              </li>
              <li>
                <Link href="/expeditions" className="hover:text-white transition-colors">
                  Overland Routes & Guided Tours
                </Link>
              </li>
            </ul>
          </div>

          <div className="border border-[#F5F1E8]/20 bg-[#F5F1E8]/[0.04] p-6">
            <div className="font-mono text-[10px] tracking-[0.22em] text-[#E68A6E] uppercase">
              OFFICIAL EXPEDITION PARTNER
            </div>
            <h4 className="mt-2 font-serif text-lg text-white">
              WildInKyrgyzstan.com
            </h4>
            <p className="mt-2 text-xs text-[#F5F1E8]/75 leading-relaxed">
              Curated high-altitude horse treks, nomadic yurt camps, and
              custom overland expeditions across the Tian Shan and Pamirs.
            </p>
            <a
              href="https://www.wildinkyrgyzstan.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 border-b border-[#F5F1E8] pb-0.5 font-mono text-[11px] tracking-[0.16em] text-white hover:text-[#E68A6E] hover:border-[#E68A6E] transition-colors"
            >
              <span>EXPLORE TOURS</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#F5F1E8]/15 pt-6 font-mono text-[11px] tracking-[0.16em] text-[#F5F1E8]/55">
          <div>© {new Date().getFullYear()} MYCENTRALASIA.COM. ALL RIGHTS RESERVED.</div>
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/mycentralasia.co"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              INSTAGRAM
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LINKEDIN
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
EOF

# 4. About Platform Section (Warm Parchment + Cobalt + Terracotta)
cat << 'EOF' > "$BASE/components/home/AboutPlatformSection.tsx"
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
    <section className="border-b border-[#101D2E]/15 bg-[#F5F1E8] py-24 text-[#101D2E]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
          <div className="lg:col-span-6 space-y-6">
            <div className="font-mono text-[11px] tracking-[0.24em] text-[#B84A27] font-semibold uppercase">
              ABOUT THE PLATFORM • WHAT WE DOCUMENT
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-[1.08] text-[#101D2E]">
              A Modern Digital Record of Eurasia’s Most Storied Crossroads.
            </h2>
            <p className="text-base sm:text-lg text-[#101D2E]/85 leading-relaxed font-normal">
              For centuries, Central Asia stood at the center of global
              exchange—where scholars, artisans, and nomadic confederations
              shaped science, cuisine, and overland trade. Yet in the modern
              digital era, the region’s cultural depth has remained fragmented
              across outdated guidebooks.
            </p>
            <p className="text-sm sm:text-base text-[#101D2E]/70 leading-relaxed">
              <strong className="font-semibold text-[#101D2E]">MyCentralAsia.com</strong>{" "}
              serves as the definitive English-language reference and travel
              intelligence hub for Kazakhstan, Kyrgyzstan, Uzbekistan,
              Tajikistan, and Turkmenistan—connecting curious readers directly
              to real expeditions on the ground.
            </p>

            <div className="grid grid-cols-3 gap-4 border-t border-[#101D2E]/15 pt-6">
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-semibold text-[#0F4C81]">5</div>
                <div className="mt-1 font-mono text-[10px] tracking-[0.18em] text-[#101D2E]/65">
                  SOVEREIGN REPUBLICS
                </div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-semibold text-[#0F4C81]">4,000+</div>
                <div className="mt-1 font-mono text-[10px] tracking-[0.18em] text-[#101D2E]/65">
                  YEARS OF ARCHIVE
                </div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-semibold text-[#0F4C81]">7,495m</div>
                <div className="mt-1 font-mono text-[10px] tracking-[0.18em] text-[#101D2E]/65">
                  PAMIR & TIAN SHAN PEAKS
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 divide-y divide-[#101D2E]/15 border-t border-b border-[#101D2E]/15">
            {pillars.map((item) => (
              <div key={item.num} className="py-7 first:pt-2 last:pb-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#B84A27]">
                    {item.num} / PILLAR
                  </span>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold tracking-[0.18em] text-[#0F4C81] hover:underline"
                  >
                    <span>{item.linkText}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
                <h3 className="mt-2 font-serif text-xl sm:text-2xl font-medium text-[#101D2E]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-[#101D2E]/75 leading-relaxed">
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
EOF

# 5. History Chronicle Section (Sandstone #EBE4D5 Band)
cat << 'EOF' > "$BASE/components/home/HistorySection.tsx"
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
EOF

# 6. Update Pages Across Both app/ and app/[lang]/
for T in "${TARGETS[@]}"; do
  cat << 'EOF' > "$T/page.tsx"
import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import CinemaHero from "@/components/home/CinemaHero";
import AboutPlatformSection from "@/components/home/AboutPlatformSection";
import HistorySection from "@/components/home/HistorySection";
import CountryFlag from "@/components/layout/CountryFlag";
import { ARTICLES, COUNTRIES, EXPEDITIONS } from "@/data/centralAsiaData";

export default function HomePage() {
  return (
    <div className="bg-[#F5F1E8] text-[#101D2E]">
      {/* 1. Dramatic Cinema Video Hero */}
      <CinemaHero />

      {/* 2. About My Central Asia (Parchment Editorial) */}
      <AboutPlatformSection />

      {/* 3. The 5 Stans Regional Directory (Sandstone #EBE4D5) */}
      <section className="border-b border-[#101D2E]/15 bg-[#EBE4D5] py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#101D2E]/20 pb-8">
            <div>
              <div className="font-mono text-[11px] font-semibold tracking-[0.24em] text-[#0F4C81] uppercase">
                REGIONAL DIRECTORY • THE FIVE STANS
              </div>
              <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-normal text-[#101D2E]">
                Explore by Nation
              </h2>
            </div>
            <p className="max-w-md text-sm text-[#101D2E]/75">
              Visa protocols, seasonal climate windows, signature culinary traditions,
              and field routes across every republic.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-px bg-[#101D2E]/15 sm:grid-cols-2 lg:grid-cols-5 border border-[#101D2E]/15">
            {COUNTRIES.map((country) => (
              <Link
                key={country.slug}
                href={`/destinations/${country.slug}`}
                className="group flex flex-col justify-between bg-[#F5F1E8] p-6 hover:bg-white transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <CountryFlag code={country.code} className="h-3.5 w-5 shadow-xs" />
                    <ArrowUpRight className="h-4 w-4 text-[#101D2E]/40 group-hover:text-[#0F4C81] transition-colors" />
                  </div>
                  <h3 className="mt-5 font-serif text-2xl font-medium text-[#101D2E]">
                    {country.name}
                  </h3>
                  <div className="mt-1 font-mono text-[10px] tracking-[0.16em] text-[#B84A27] font-semibold uppercase">
                    CAPITAL: {country.capital}
                  </div>
                  <p className="mt-4 text-xs text-[#101D2E]/75 leading-relaxed line-clamp-3">
                    {country.summary}
                  </p>
                </div>

                <div className="mt-6 border-t border-[#101D2E]/10 pt-3 font-mono text-[10px] tracking-[0.14em] text-[#101D2E]/65">
                  BEST: {country.bestSeason.split("(")[0]}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Latest Dispatches, Food & Culture Feed */}
      <section className="border-b border-[#101D2E]/15 bg-[#F5F1E8] py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#101D2E]/20 pb-8">
            <div>
              <div className="font-mono text-[11px] font-semibold tracking-[0.24em] text-[#0F4C81] uppercase">
                DAILY EDITORIAL & FIELD REPORTS
              </div>
              <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-normal text-[#101D2E]">
                Culture, Cuisine & Dispatches
              </h2>
            </div>
            <Link
              href="/news"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-[0.18em] text-[#0F4C81] hover:text-[#101D2E] border-b border-[#0F4C81] pb-1 self-start md:self-auto"
            >
              <span>ALL ARTICLES & NEWS</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            {ARTICLES.map((article) => (
              <article
                key={article.slug}
                className="group flex flex-col justify-between border border-[#101D2E]/15 bg-white/75 p-7 hover:border-[#0F4C81] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-[#101D2E]/65">
                    <span className="flex items-center gap-2 font-semibold text-[#0F4C81]">
                      <CountryFlag code={article.countryCode} className="h-2.5 w-4 shadow-xs" />
                      <span>
                        {article.category} • {article.country.toUpperCase()}
                      </span>
                    </span>
                    <span>{article.readTime}</span>
                  </div>

                  <Link href={`/news/${article.slug}`}>
                    <h3 className="mt-4 font-serif text-2xl sm:text-3xl font-medium text-[#101D2E] group-hover:text-[#0F4C81] leading-snug transition-colors">
                      {article.title}
                    </h3>
                  </Link>

                  <p className="mt-3 text-sm text-[#101D2E]/75 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[#101D2E]/10 pt-4 font-mono text-[10px] tracking-[0.18em] text-[#101D2E]/60">
                  <span>{article.publishedAt}</span>
                  <Link
                    href={`/news/${article.slug}`}
                    className="inline-flex items-center gap-1 font-semibold text-[#B84A27] hover:underline"
                  >
                    <span>READ DISPATCH</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Silk Road Historical Chronicle */}
      <HistorySection compact />

      {/* 6. Curated Expeditions & Wild Kyrgyzstan Conversion */}
      <section className="py-20 bg-[#F5F1E8]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#101D2E]/20 pb-8">
            <div>
              <div className="font-mono text-[11px] font-semibold tracking-[0.24em] text-[#B84A27] uppercase">
                OVERLAND OPERATIONS • WILD KYRGYZSTAN
              </div>
              <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-normal text-[#101D2E]">
                Signature Silk Road Expeditions
              </h2>
            </div>
            <Link
              href="/expeditions"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-[0.18em] text-[#0F4C81] hover:text-[#101D2E] border-b border-[#0F4C81] pb-1 self-start md:self-auto"
            >
              <span>VIEW ALL EXPEDITIONS</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {EXPEDITIONS.map((tour) => (
              <div
                key={tour.id}
                className="flex flex-col justify-between border border-[#101D2E]/15 bg-white/80 p-7"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-[#101D2E]/65">
                    <span>{tour.countries.join(" + ").toUpperCase()}</span>
                    <span className="font-bold text-[#B84A27]">{tour.duration}</span>
                  </div>
                  <h3 className="mt-4 font-serif text-2xl font-medium text-[#101D2E]">
                    {tour.title}
                  </h3>
                  <p className="mt-3 text-sm text-[#101D2E]/75 leading-relaxed">
                    {tour.summary}
                  </p>
                </div>

                <div className="mt-8 border-t border-[#101D2E]/10 pt-4 flex items-center justify-between">
                  <div>
                    <div className="font-mono text-[9px] tracking-[0.18em] text-[#101D2E]/55">
                      STARTING FROM
                    </div>
                    <div className="font-mono text-base font-bold text-[#101D2E]">
                      {tour.priceFrom}
                    </div>
                  </div>
                  <a
                    href={tour.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#101D2E] px-4 py-2.5 font-mono text-[10px] font-semibold tracking-[0.18em] text-[#F5F1E8] uppercase hover:bg-[#0F4C81] transition-colors"
                  >
                    <span>INQUIRE</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
EOF
done

# 7. Update subpages (/news, /cuisine, /destinations, /expeditions) to match Parchment & Lapis palette
python3 - << 'PYEOF'
import os

subpages = []
for root in ["app", "src/app", "app/[lang]", "src/app/[lang]"]:
    for sub in ["news/page.tsx", "news/[slug]/page.tsx", "history/page.tsx", "cuisine/page.tsx", "destinations/[country]/page.tsx", "expeditions/page.tsx"]:
        p = os.path.join(root, sub)
        if os.path.exists(p):
            subpages.append(p)

replacements = [
    ("text-[#F4F1EA]", "text-[#101D2E]"),
    ("text-white", "text-[#101D2E]"),
    ("text-stone-200", "text-[#101D2E]/85"),
    ("text-stone-300/85", "text-[#101D2E]/75"),
    ("text-stone-300", "text-[#101D2E]/75"),
    ("text-stone-400", "text-[#101D2E]/60"),
    ("text-stone-500", "text-[#101D2E]/50"),
    ("text-amber-300", "text-[#B84A27]"),
    ("text-sky-400", "text-[#0F4C81]"),
    ("border-white/25", "border-[#101D2E]/25"),
    ("border-white/20", "border-[#101D2E]/20"),
    ("border-white/15", "border-[#101D2E]/15"),
    ("border-white/12", "border-[#101D2E]/15"),
    ("border-white/10", "border-[#101D2E]/10"),
    ("divide-white/12", "divide-[#101D2E]/15"),
    ("divide-white/10", "divide-[#101D2E]/10"),
    ("bg-white/[0.03]", "bg-white/80"),
    ("bg-white/[0.02]", "bg-white/75"),
    ("bg-white/[0.015]", "bg-white/75"),
    ("bg-[#F4F1EA] px-5 py-3 font-mono text-[11px] font-semibold tracking-[0.18em] text-[#08090B]", "bg-[#101D2E] px-5 py-3 font-mono text-[11px] font-semibold tracking-[0.18em] text-[#F5F1E8]"),
    ("bg-[#F4F1EA] px-5 py-2.5 font-mono text-[10px] font-semibold tracking-[0.18em] text-[#08090B]", "bg-[#101D2E] px-5 py-2.5 font-mono text-[10px] font-semibold tracking-[0.18em] text-[#F5F1E8]"),
    ("hover:bg-white hover:text-black", "hover:bg-[#101D2E] hover:text-[#F5F1E8]"),
]

for p in subpages:
    with open(p, "r") as f:
        text = f.read()
    for old, new in replacements:
        text = text.replace(old, new)
    with open(p, "w") as f:
        f.write(text)
    print(f"📄 Restyled subpage: {p}")
PYEOF

rm -rf .next
echo "✅ Done! My Central Asia now has its own authoritative daylight archival aesthetic—completely distinct from WildInKyrgyzstan.com."
