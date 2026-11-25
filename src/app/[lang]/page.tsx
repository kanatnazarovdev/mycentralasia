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
