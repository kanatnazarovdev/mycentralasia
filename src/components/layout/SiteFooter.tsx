import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { COUNTRIES } from "@/data/centralAsiaData";
import CountryFlag from "./CountryFlag";

export default function SiteFooter() {
  return (
    <footer className="border-t border-[#101D2E]/20 bg-[#101D2E] text-[#F5F1E8]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="inline-block">
           <Image
    src="/mycentralAsia.svg"
    alt="My Central Asia"
    width={260}
    height={70}
    className="h-12 w-56 object-cover object-center invert mix-blend-lighten brightness-110"
  />
            </Link>
            <p className="text-sm text-[#F5F1E8]/75 leading-relaxed font-light">
              An independent digital publication and cultural archive documenting
              the history, culinary traditions, and overland expedition routes of
              Central Asia.
            </p>
            <div className="pt-2 font-mono text-[11px] tracking-[0.16em] text-[#F5F1E8]/60">
           TASHKENT • BUKHARA • BISHKEK • SAMARKAND • ALMATY • DUSHANBE 
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
                <Link href="/culture" className="hover:text-white transition-colors">
                  Nomadic &amp; Silk Road Culture
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

          {/* <div className="border border-[#F5F1E8]/20 bg-[#F5F1E8]/[0.04] p-6">
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
          </div> */}
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