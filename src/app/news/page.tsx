import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ARTICLES } from "@/data/centralAsiaData";
import CountryFlag from "@/components/layout/CountryFlag";

export const metadata: Metadata = {
  title: "Journal, News & Field Dispatches",
  description:
    "Daily reporting and cultural essays covering Central Asian cuisine, Silk Road history, border logistics, and overland expeditions.",
};

export default function NewsIndexPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 sm:px-8 py-16">
      <div className="border-b border-white/15 pb-10">
        <div className="font-mono text-[11px] tracking-[0.24em] text-sky-400 uppercase">
          EDITORIAL ARCHIVE • ALL DISPATCHES
        </div>
        <h1 className="mt-3 font-serif text-4xl sm:text-6xl font-normal text-[#F4F1EA]">
          Journal & Regional News
        </h1>
        <p className="mt-4 max-w-2xl text-base text-stone-300 font-light">
          In-depth essays on culinary heritage, architectural preservation,
          high-altitude routes, and cross-border travel across the five Central
          Asian republics.
        </p>
      </div>

      <div className="mt-12 divide-y divide-white/12">
        {ARTICLES.map((article) => (
          <article
            key={article.slug}
            className="grid grid-cols-1 gap-6 py-10 lg:grid-cols-12 items-start"
          >
            <div className="lg:col-span-3 font-mono text-[11px] tracking-[0.18em] text-stone-400 space-y-2">
              <div className="flex items-center gap-2 text-stone-200">
                <CountryFlag code={article.countryCode} />
                <span>{article.country.toUpperCase()}</span>
              </div>
              <div>{article.category}</div>
              <div className="text-stone-500">
                {article.publishedAt} • {article.readTime}
              </div>
            </div>

            <div className="lg:col-span-7">
              <Link href={`/news/${article.slug}`} className="group">
                <h2 className="font-serif text-2xl sm:text-3xl text-[#F4F1EA] group-hover:text-white transition-colors">
                  {article.title}
                </h2>
                <p className="mt-3 text-sm sm:text-base text-stone-300/85 leading-relaxed font-light">
                  {article.excerpt}
                </p>
              </Link>
            </div>

            <div className="lg:col-span-2 lg:text-right">
              <Link
                href={`/news/${article.slug}`}
                className="inline-flex items-center gap-1.5 border border-white/25 px-4 py-2 font-mono text-[10px] tracking-[0.18em] text-white hover:bg-white hover:text-black transition-colors"
              >
                <span>READ</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
