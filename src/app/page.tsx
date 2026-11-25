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
    <div className="bg-[#08090B] text-[#F4F1EA]">
      {/* 1. Cinema Multi-Country Video Hero */}
      <CinemaHero />

      {/* 2. About MyCentralAsia: Platform Mission & Core Pillars */}
      <AboutPlatformSection />

      {/* 3. The 5 Stans Regional Directory */}
      <section className="border-b border-white/12 py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/15 pb-8">
            <div>
              <div className="font-mono text-[11px] tracking-[0.24em] text-stone-400 uppercase">
                REGIONAL DIRECTORY • THE FIVE STANS
              </div>
              <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-normal">
                Explore by Nation
              </h2>
            </div>
            <p className="max-w-md text-sm text-stone-400 font-light">
              Visa protocols, seasonal climate windows, signature culinary traditions,
              and field routes across every republic.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-px bg-white/12 sm:grid-cols-2 lg:grid-cols-5 border border-white/12">
            {COUNTRIES.map((country) => (
              <Link
                key={country.slug}
                href={`/destinations/${country.slug}`}
                className="group flex flex-col justify-between bg-[#08090B] p-6 hover:bg-[#0D1015] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <CountryFlag code={country.code} />
                    <ArrowUpRight className="h-4 w-4 text-stone-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="mt-5 font-serif text-2xl text-white">
                    {country.name}
                  </h3>
                  <div className="mt-1 font-mono text-[10px] tracking-[0.16em] text-stone-400 uppercase">
                    CAPITAL: {country.capital}
                  </div>
                  <p className="mt-4 text-xs text-stone-300/85 leading-relaxed line-clamp-3">
                    {country.summary}
                  </p>
                </div>

                <div className="mt-6 border-t border-white/10 pt-3 font-mono text-[10px] tracking-[0.14em] text-stone-400">
                  BEST: {country.bestSeason.split("(")[0]}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Latest Dispatches, Food & Culture Feed */}
      <section className="border-b border-white/12 py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/15 pb-8">
            <div>
              <div className="font-mono text-[11px] tracking-[0.24em] text-sky-400 uppercase">
                DAILY EDITORIAL & FIELD REPORTS
              </div>
              <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-normal">
                Culture, Cuisine & Dispatches
              </h2>
            </div>
            <Link
              href="/news"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.18em] text-stone-300 hover:text-white border-b border-white/30 pb-1 self-start md:self-auto"
            >
              <span>ALL ARTICLES & NEWS</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            {ARTICLES.map((article) => (
              <article
                key={article.slug}
                className="group flex flex-col justify-between border border-white/12 bg-white/[0.015] p-7 hover:border-white/30 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-stone-400">
                    <span className="flex items-center gap-2 text-stone-200">
                      <CountryFlag code={article.countryCode} className="h-2.5 w-4" />
                      <span>
                        {article.category} • {article.country.toUpperCase()}
                      </span>
                    </span>
                    <span>{article.readTime}</span>
                  </div>

                  <Link href={`/news/${article.slug}`}>
                    <h3 className="mt-4 font-serif text-2xl sm:text-3xl text-[#F4F1EA] group-hover:text-white leading-snug">
                      {article.title}
                    </h3>
                  </Link>

                  <p className="mt-3 text-sm text-stone-300/85 leading-relaxed font-light">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[10px] tracking-[0.18em] text-stone-400">
                  <span>{article.publishedAt}</span>
                  <Link
                    href={`/news/${article.slug}`}
                    className="inline-flex items-center gap-1 text-white hover:underline"
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
      <section className="py-20 bg-[#050608]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/15 pb-8">
            <div>
              <div className="font-mono text-[11px] tracking-[0.24em] text-amber-300 uppercase">
                OVERLAND OPERATIONS • WILD KYRGYZSTAN
              </div>
              <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-normal">
                Signature Silk Road Expeditions
              </h2>
            </div>
            <Link
              href="/expeditions"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.18em] text-stone-300 hover:text-white border-b border-white/30 pb-1 self-start md:self-auto"
            >
              <span>VIEW ALL EXPEDITIONS</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {EXPEDITIONS.map((tour) => (
              <div
                key={tour.id}
                className="flex flex-col justify-between border border-white/12 bg-[#08090B] p-7"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-stone-400">
                    <span>{tour.countries.join(" + ").toUpperCase()}</span>
                    <span className="text-amber-300">{tour.duration}</span>
                  </div>
                  <h3 className="mt-4 font-serif text-2xl text-white">
                    {tour.title}
                  </h3>
                  <p className="mt-3 text-sm text-stone-300/85 leading-relaxed font-light">
                    {tour.summary}
                  </p>
                </div>

                <div className="mt-8 border-t border-white/10 pt-4 flex items-center justify-between">
                  <div>
                    <div className="font-mono text-[9px] tracking-[0.18em] text-stone-500">
                      STARTING FROM
                    </div>
                    <div className="font-mono text-base font-semibold text-white">
                      {tour.priceFrom}
                    </div>
                  </div>
                  <a
                    href={tour.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#F4F1EA] px-4 py-2.5 font-mono text-[10px] font-semibold tracking-[0.18em] text-[#08090B] uppercase hover:bg-white transition-colors"
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
