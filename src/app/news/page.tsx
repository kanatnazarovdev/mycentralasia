import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Central Asia News, Travel Updates & Cultural Stories",
  description:
    "The latest news, archaeological discoveries, rail updates, visa changes, and cultural stories from Kazakhstan, Kyrgyzstan, Uzbekistan, Tajikistan, and Turkmenistan.",
  alternates: {
    canonical: "https://mycentralasia.com/news",
  },
  openGraph: {
    title: "Central Asia News & Cultural Stories | My Central Asia",
    description:
      "Regional news, travel updates, and cultural stories from Bishkek, Samarkand, Almaty, Dushanbe, and Ashgabat.",
    url: "https://mycentralasia.com/news",
    type: "website",
  },
};

const ARTICLES = [
  {
    category: "UZBEKISTAN • RAIL & TRAVEL",
    date: "AUTUMN 2026",
    title: "High-Speed Rail Expansion Connects Historic Silk Road Cities",
    excerpt:
      "New Afrosiyob train routes shorten travel times between Tashkent, Samarkand, Bukhara, and Khiva, making historic desert towns easier to reach.",
    regionHref: "/destinations/uzbekistan",
    regionLabel: "EXPLORE UZBEKISTAN",
  },
  {
    category: "KYRGYZSTAN • CONSERVATION",
    date: "AUTUMN 2026",
    title: "Community-Led Snow Leopard Corridors Expand in the Tian Shan",
    excerpt:
      "Local herders and wildlife biologists are working together to protect high-altitude habitats connecting Sarychat-Ertash with the central Tian Shan mountains.",
    regionHref: "/destinations/kyrgyzstan",
    regionLabel: "EXPLORE KYRGYZSTAN",
  },
  {
    category: "TAJIKISTAN • ARCHAEOLOGY",
    date: "LATE 2026",
    title: "New Sogdian Mural Excavations Uncover Trade History at Panjikent",
    excerpt:
      "Archaeologists working along the Zarafshan River have uncovered preserved wall paintings and trade records detailing eighth-century Silk Road commerce.",
    regionHref: "/destinations/tajikistan",
    regionLabel: "EXPLORE TAJIKISTAN",
  },
  {
    category: "KAZAKHSTAN • HERITAGE",
    date: "LATE 2026",
    title: "Underground Mosques of Mangystau Nominated for Heritage Protection",
    excerpt:
      "Architectural teams are documenting Beket-Ata and Shakpak-Ata, centuries-old sanctuaries carved directly into the limestone cliffs of western Kazakhstan.",
    regionHref: "/destinations/kazakhstan",
    regionLabel: "EXPLORE KAZAKHSTAN",
  },
  {
    category: "REGIONAL • BORDER & VISA GUIDE",
    date: "CURRENT UPDATE",
    title: "Visa-Free Entry & Overland Border Rules Across Central Asia",
    excerpt:
      "A clear overview of current 30-to-60-day visa-free rules, Pamir Highway permit requirements, and seasonal mountain pass openings.",
    regionHref: "/expeditions",
    regionLabel: "VIEW EXPEDITIONS",
  },
];

export default function NewsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        url: "https://mycentralasia.com/news",
        name: "Central Asia Journal & Updates",
        description:
          "News, archaeological updates, conservation stories, and travel information across Central Asia.",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://mycentralasia.com" },
          { "@type": "ListItem", position: 2, name: "Journal & Updates", item: "https://mycentralasia.com/news" },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#F5F1E8] text-[#101D2E]">
      <JsonLd data={jsonLd} />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 pt-14 pb-20">
        <div className="border-b border-[#101D2E]/20 pb-10">
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] tracking-[0.24em] text-[#B84A27] uppercase">
            <span>REGIONAL NEWS &amp; STORIES</span>
            <span className="text-[#101D2E]/60">
              BISHKEK • SAMARKAND • ALMATY • DUSHANBE • ASHGABAT
            </span>
          </div>
          <h1 className="mt-3 font-serif text-4xl sm:text-6xl font-normal text-[#101D2E]">
            Journal &amp; Updates
          </h1>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-[#101D2E]/80 font-light leading-relaxed">
            Stories on Silk Road archaeology, wildlife conservation, new rail
            routes, and cultural preservation across Central Asia.
          </p>
        </div>

        <div className="mt-10 divide-y divide-[#101D2E]/15 border-b border-[#101D2E]/15">
          {ARTICLES.map((item) => (
            <article
              key={item.title}
              className="py-8 flex flex-col lg:flex-row lg:items-start justify-between gap-6"
            >
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] tracking-[0.2em] text-[#0F4C81] uppercase">
                  <span>{item.category}</span>
                  <span className="text-[#101D2E]/30">•</span>
                  <span className="text-[#101D2E]/60">{item.date}</span>
                </div>
                <h2 className="mt-2.5 font-serif text-2xl sm:text-3xl font-normal text-[#101D2E]">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm sm:text-base text-[#101D2E]/80 leading-relaxed font-light">
                  {item.excerpt}
                </p>
              </div>

              <div className="shrink-0 pt-1">
                <Link
                  href={item.regionHref}
                  className="inline-flex items-center gap-1.5 border border-[#101D2E]/25 px-4 py-2.5 font-mono text-[10px] tracking-[0.18em] text-[#101D2E] uppercase hover:bg-[#101D2E] hover:text-[#F5F1E8] transition-colors"
                >
                  <span>{item.regionLabel}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}