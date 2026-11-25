import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { COUNTRIES } from "@/data/centralAsiaData";
import CountryFlag from "./CountryFlag";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/15 bg-[#050608] text-[#F4F1EA]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="font-serif text-xl tracking-[0.18em] uppercase">
              MYCENTRALASIA.COM
            </div>
            <p className="text-sm text-stone-400 leading-relaxed font-light">
              An independent digital publication and cultural archive documenting
              the history, culinary traditions, and overland expedition routes of
              Central Asia.
            </p>
            <div className="pt-2 font-mono text-[11px] tracking-[0.16em] text-stone-400">
              BISHKEK • SAMARKAND • ALMATY • DUSHANBE
            </div>
          </div>

          <div>
            <h3 className="font-mono text-[11px] tracking-[0.22em] text-stone-400 uppercase mb-4">
              DESTINATIONS
            </h3>
            <ul className="space-y-2.5 text-sm">
              {COUNTRIES.map((country) => (
                <li key={country.slug}>
                  <Link
                    href={`/destinations/${country.slug}`}
                    className="inline-flex items-center gap-2.5 text-stone-300 hover:text-white transition-colors"
                  >
                    <CountryFlag code={country.code} className="h-3 w-4.5" />
                    <span>{country.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[11px] tracking-[0.22em] text-stone-400 uppercase mb-4">
              EDITORIAL ARCHIVE
            </h3>
            <ul className="space-y-2.5 text-sm text-stone-300">
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

          <div className="border border-white/15 bg-white/[0.02] p-6">
            <div className="font-mono text-[10px] tracking-[0.22em] text-amber-300 uppercase">
              OFFICIAL EXPEDITION PARTNER
            </div>
            <h4 className="mt-2 font-serif text-lg text-white">
              WildInKyrgyzstan.com
            </h4>
            <p className="mt-2 text-xs text-stone-400 leading-relaxed">
              Curated high-altitude horse treks, nomadic yurt camps, and
              custom overland expeditions across the Tian Shan and Pamirs.
            </p>
            <a
              href="https://www.wildinkyrgyzstan.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 border-b border-white pb-0.5 font-mono text-[11px] tracking-[0.16em] text-white hover:text-amber-300 hover:border-amber-300 transition-colors"
            >
              <span>EXPLORE TOURS</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6 font-mono text-[11px] tracking-[0.16em] text-stone-500">
          <div>© {new Date().getFullYear()} MYCENTRALASIA.COM. ALL RIGHTS RESERVED.</div>
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/mycentralasia.co"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-300 transition-colors"
            >
              INSTAGRAM
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-300 transition-colors"
            >
              LINKEDIN
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
