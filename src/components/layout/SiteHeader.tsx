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
    <header className="sticky top-0 z-50 w-full border-b border-white/12 bg-[#08090B]/90 backdrop-blur-xl text-[#F4F1EA]">
      <div className="hidden lg:block border-b border-white/[0.06] bg-[#050608]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-2 font-mono text-[10px] tracking-[0.2em] text-stone-400">
          <div className="flex items-center gap-5">
            <span>CENTRAL ASIA DIGITAL ARCHIVE & TRAVEL PORTAL</span>
            <span className="text-stone-600">|</span>
            <div className="flex items-center gap-3">
              {COUNTRIES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/destinations/${c.slug}`}
                  className="flex items-center gap-1.5 hover:text-[#F4F1EA] transition-colors"
                >
                  <CountryFlag code={c.code} className="h-2.5 w-3.5" />
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
              className="hover:text-white transition-colors"
            >
              @MYCENTRALASIA.CO
            </a>
            <a
              href="https://www.wildinkyrgyzstan.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-amber-300/90 hover:text-amber-200 transition-colors"
            >
              <span>FIELD OPERATOR: WILD KYRGYZSTAN</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="font-serif text-xl sm:text-2xl tracking-[0.16em] uppercase text-[#F4F1EA]">
            MYCENTRALASIA
          </span>
          <span className="hidden sm:inline-block border border-white/15 px-1.5 py-0.5 font-mono text-[9px] tracking-[0.2em] text-stone-400">
            .COM
          </span>
        </Link>

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
                  ? "text-white font-semibold"
                  : "text-stone-300 hover:text-white"
              }`}
            >
              <span>THE 5 STANS</span>
              <ChevronDown className="h-3.5 w-3.5 opacity-70" />
            </button>

            {destinationsOpen && (
              <div className="absolute left-0 top-full w-80 border border-white/15 bg-[#0B0D11] p-2 shadow-2xl">
                {COUNTRIES.map((country) => (
                  <Link
                    key={country.slug}
                    href={`/destinations/${country.slug}`}
                    onClick={() => setDestinationsOpen(false)}
                    className="flex items-start gap-3 p-3 hover:bg-white/[0.05] transition-colors"
                  >
                    <CountryFlag code={country.code} className="h-3.5 w-5 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold tracking-wider text-[#F4F1EA] uppercase">
                        {country.name}
                      </div>
                      <div className="mt-0.5 font-sans text-[11px] tracking-normal text-stone-400 line-clamp-1">
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
                    ? "border-b border-[#F4F1EA] text-white font-semibold"
                    : "text-stone-300 hover:text-white"
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
            className="inline-flex items-center gap-1.5 bg-[#F4F1EA] px-4 py-2 font-mono text-[10px] font-semibold tracking-[0.18em] text-[#08090B] uppercase hover:bg-white transition-colors"
          >
            <span>BOOK EXPEDITION</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-stone-300 hover:text-white"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#08090B] px-6 py-6 space-y-6">
          <div className="space-y-3">
            <div className="font-mono text-[10px] tracking-[0.2em] text-stone-500">
              REGIONAL GUIDES
            </div>
            <div className="grid grid-cols-2 gap-2">
              {COUNTRIES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/destinations/${c.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 border border-white/10 px-3 py-2 font-mono text-xs text-stone-200"
                >
                  <CountryFlag code={c.code} />
                  <span>{c.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-3 border-t border-white/10 pt-4 font-mono text-xs tracking-[0.18em]">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 text-stone-200 hover:text-white"
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
