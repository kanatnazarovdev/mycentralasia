"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import { COUNTRIES } from "@/data/centralAsiaData";
import CountryFlag from "./CountryFlag";

export default function SiteHeader() {
  const pathname = usePathname();
  const [destinationsOpen, setDestinationsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "JOURNAL & UPDATES", href: "/news" },
    { label: "CULTURE", href: "/culture" },
    { label: "SILK ROAD HISTORY", href: "/history" },
    { label: "CUISINE", href: "/cuisine" },
    { label: "EXPEDITIONS", href: "/expeditions" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 text-[#101D2E] ${
          scrolled
            ? "border-b border-[#101D2E]/15 bg-[#F5F1E8]/72 backdrop-blur-xl backdrop-saturate-150 shadow-[0_10px_30px_rgba(16,29,46,0.08)]"
            : "border-b border-[#101D2E]/15 bg-[#F5F1E8]/95 backdrop-blur-md"
        }`}
      >
        {/* Top Archival Ledger Strip — hides smoothly once you scroll down */}
        <div
          className={`hidden lg:block overflow-hidden border-b border-[#101D2E]/10 bg-[#EBE4D5]/80 transition-all duration-300 ${
            scrolled ? "max-h-0 opacity-0 border-b-0" : "max-h-10 opacity-100"
          }`}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-2 font-mono text-[10px] tracking-[0.2em] text-[#101D2E]/75">
            <div className="flex items-center gap-5">
              <span className="font-semibold text-[#101D2E]">
                CULTURAL ARCHIVE & REGIONAL INTELLIGENCE
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

        {/* Main Glassmorphic Masthead Bar */}
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8 transition-all duration-300 ${
            scrolled ? "py-2.5" : "py-3.5"
          }`}
        >
          <Link href="/" className="flex items-center overflow-hidden">
            <img
              src="/mycentralAsia.svg"
              alt="My Central Asia"
              className={`object-cover object-center mix-blend-multiply contrast-110 transition-all duration-300 ${
                scrolled ? "h-9 w-44" : "h-10 sm:h-11 w-48 sm:w-56"
              }`}
            />
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
                    : "text-[#101D2E]/85 hover:text-[#0F4C81]"
                }`}
              >
                <span>THE 5 STANS</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
              </button>

              {destinationsOpen && (
                <div className="absolute left-0 top-full w-80 border border-[#101D2E]/15 bg-[#F5F1E8]/90 backdrop-blur-2xl backdrop-saturate-150 p-2 shadow-[0_16px_40px_rgba(16,29,46,0.14)]">
                  {COUNTRIES.map((country) => (
                    <Link
                      key={country.slug}
                      href={`/destinations/${country.slug}`}
                      onClick={() => setDestinationsOpen(false)}
                      className="flex items-start gap-3 p-3 hover:bg-[#EBE4D5]/75 transition-colors"
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
                      : "text-[#101D2E]/85 hover:text-[#0F4C81]"
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
              className="inline-flex items-center gap-1.5 bg-[#101D2E]/95 px-4 py-2.5 font-mono text-[10px] font-semibold tracking-[0.18em] text-[#F5F1E8] uppercase backdrop-blur-sm hover:bg-[#0F4C81] transition-colors"
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
          <div className="md:hidden border-t border-[#101D2E]/15 bg-[#F5F1E8]/92 backdrop-blur-2xl px-6 py-6 space-y-6">
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
                    className="flex items-center gap-2 border border-[#101D2E]/15 bg-[#EBE4D5]/60 px-3 py-2 font-mono text-xs text-[#101D2E]"
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

      {/* Spacer so content below doesn't hide underneath the fixed header */}
      <div className="h-[68px] lg:h-[105px]" aria-hidden="true" />
    </>
  );
}