#!/usr/bin/env bash
set -e

# 1. SELF-CONTAINED CUISINE PAGE WITH FULL EDITORIAL CONTENT & SEO
cat << 'EOF' > src/app/cuisine/page.tsx
import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Central Asian Cuisine, Silk Road Gastronomy & Heirloom Recipes",
  description:
    "Discover authentic Central Asian cuisine: Samarkand and Bukhara plov, hand-pulled lagman noodles, Kyrgyz beshbarmak, flaky samsa from clay tandoors, and fermented mare's milk (kymyz).",
  alternates: {
    canonical: "https://mycentralasia.com/cuisine",
  },
  openGraph: {
    title: "Central Asian Cuisine & Silk Road Gastronomy | My Central Asia",
    description:
      "Culinary archive documenting nomadic pasture cooking, oasis kazan rice pilafs, tandoor breads, and spice trade traditions across Central Asia.",
    url: "https://mycentralasia.com/cuisine",
    type: "website",
  },
};

const SIGNATURE_DISHES = [
  {
    code: "01 / UZBEKISTAN & TAJIKISTAN",
    name: "Plov (Osh)",
    vessels: "Cast-Iron Kazan • Fruitwood Embers",
    description:
      "The ceremonial centerpiece of oasis hospitality. Red devzira rice from the Fergana Valley is steamed atop a slow-braised zirvak of lamb, yellow carrots, chickpeas, whole garlic heads, and wild cumin.",
    regionalNote:
      "In Samarkand, plov is layered rather than stirred so each stratum retains distinct texture; in Bukhara, osh-i sofi incorporates raisins and barberries.",
  },
  {
    code: "02 / KYRGYZSTAN & KAZAKHSTAN",
    name: "Beshbarmak",
    vessels: "Simmered Pasture Broth • Hand-Cut Pasta",
    description:
      "Literally 'five fingers,' this foundational nomadic dish pairs slow-boiled lamb or horsemeat with broad, diamond-cut wheat noodles steeped in rich chyk onion broth.",
    regionalNote:
      "Served on a communal platter according to strict seniority etiquette, accompanied by bowls of hot sorpo bouillon and tangy kurt cheese.",
  },
  {
    code: "03 / FERGANA & CHU VALLEYS",
    name: "Hand-Pulled Lagman",
    vessels: "Hand-Stretched Wheat Dough • Wok",
    description:
      "Brought along Silk Road trade corridors by Dungan and Uyghur artisans, elastic hand-spun noodles are tossed with seared beef, bell peppers, radishes, garlic chives, and Sichuan-cumin aromatics.",
    regionalNote:
      "Karakol and Bishkek remain renowned across Central Asia for family-run lagman houses stretching dough to order.",
  },
  {
    code: "04 / ALL FIVE REPUBLICS",
    name: "Tandoor Samsa & Obi Non",
    vessels: "Vertical Clay Tandoor Oven",
    description:
      "Stamped sourdough flatbreads (non) and hand-laminated pastries stuffed with diced lamb, tail fat, and cumin are slapped directly onto blistering clay oven walls.",
    regionalNote:
      "Bread holds sacred status across Central Asia—always broken by hand at the table and never placed face down.",
  },
  {
    code: "05 / HIGH-ALTITUDE JAILOO PASTURES",
    name: "Kymyz, Boorsok & Kaymak",
    vessels: "Smoked Leather Sacks • Alpine Dairies",
    description:
      "Summer transhumance to alpine pastures above 2,500 meters produces fermented mare's milk (kymyz), pillowy fried boorsok dough, and thick cultured clotted cream (kaymak).",
    regionalNote:
      "Served fresh inside felt yurts across Song-Kul, Karkyra, and the Kazakh Altai alongside mountain wildflower honey.",
  },
  {
    code: "06 / PAMIRS & TURKMENISTAN",
    name: "Qurutob & Dograma",
    vessels: "Carved Wooden Chanak Bowl • Tandoor",
    description:
      "In Tajikistan, flaky fatir flatbread is torn into melted qurut cheese sauce topped with caramelized onions and flaxseed oil; in Turkmenistan, torn bread and boiled lamb soak in rich mutton broth.",
    regionalNote:
      "Designed for communal sharing around low wooden tables after long mountain or desert journeys.",
  },
];

export default function CuisinePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        url: "https://mycentralasia.com/cuisine",
        name: "Central Asian Gastronomy & Silk Road Recipes",
        description:
          "Editorial archive of traditional dishes, cooking vessels, and regional culinary traditions across Kazakhstan, Kyrgyzstan, Uzbekistan, Tajikistan, and Turkmenistan.",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://mycentralasia.com" },
          { "@type": "ListItem", position: 2, name: "Cuisine", item: "https://mycentralasia.com/cuisine" },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#F5F1E8] text-[#101D2E]">
      <JsonLd data={jsonLd} />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 pt-14 pb-20">
        <div className="border-b border-[#101D2E]/20 pb-10">
          <div className="font-mono text-[11px] tracking-[0.24em] text-[#B84A27] uppercase">
            SILK ROAD GASTRONOMY &amp; CULINARY ARCHIVE
          </div>
          <h1 className="mt-3 font-serif text-4xl sm:text-6xl font-normal text-[#101D2E]">
            Central Asian Cuisine
          </h1>
          <p className="mt-4 max-w-3xl text-base sm:text-lg text-[#101D2E]/80 font-light leading-relaxed">
            Born from the dialogue between nomadic pastoralism and oasis
            agriculture, Central Asian cooking centers on cast-iron{" "}
            <em className="italic">kazan</em> cauldrons, wood-fired clay{" "}
            <em className="italic">tandoor</em> ovens, hand-stretched wheat
            noodles, and wild mountain aromatics like barberry and cumin.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {SIGNATURE_DISHES.map((dish) => (
            <article
              key={dish.code}
              className="border border-[#101D2E]/15 bg-[#EBE4D5]/45 p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] tracking-[0.2em] text-[#0F4C81] uppercase">
                  <span>{dish.code}</span>
                  <span className="text-[#101D2E]/60">{dish.vessels}</span>
                </div>
                <h2 className="mt-3 font-serif text-2xl sm:text-3xl font-normal text-[#101D2E]">
                  {dish.name}
                </h2>
                <p className="mt-4 text-sm sm:text-base text-[#101D2E]/85 leading-relaxed">
                  {dish.description}
                </p>
                <p className="mt-3 text-sm text-[#101D2E]/70 leading-relaxed font-light">
                  {dish.regionalNote}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 border border-[#101D2E]/20 bg-[#101D2E] text-[#F5F1E8] p-8 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="font-mono text-[10px] tracking-[0.22em] text-[#E68A6E] uppercase">
              CULINARY FIELD EXPEDITIONS
            </div>
            <h3 className="mt-2 font-serif text-2xl sm:text-3xl font-normal text-white">
              Dine Inside Alpine Yurts &amp; Historic Bazaar Kitchens
            </h3>
            <p className="mt-2 text-sm text-[#F5F1E8]/80 font-light leading-relaxed">
              Experience wood-fired kazan feasts, pasture dairy tastings, and
              overland routes across Kyrgyzstan and the Silk Road with our
              official expedition partner.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/culture"
              className="border border-[#F5F1E8]/30 px-5 py-3 font-mono text-[11px] tracking-[0.18em] text-[#F5F1E8] uppercase hover:border-white transition-colors"
            >
              EXPLORE CULTURE
            </Link>
            <a
              href="https://www.wildinkyrgyzstan.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#F5F1E8] px-5 py-3 font-mono text-[11px] font-semibold tracking-[0.18em] text-[#101D2E] uppercase hover:bg-white transition-colors"
            >
              <span>PLAN A JOURNEY</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
EOF

# 2. SELF-CONTAINED NEWS & DISPATCHES PAGE WITH FULL EDITORIAL CONTENT & SEO
cat << 'EOF' > src/app/news/page.tsx
import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Central Asia News, Regional Dispatches & Cultural Journalism",
  description:
    "Latest editorial dispatches, archaeological discoveries, Silk Road infrastructure updates, visa policy changes, and cultural reporting across Kazakhstan, Kyrgyzstan, Uzbekistan, Tajikistan, and Turkmenistan.",
  alternates: {
    canonical: "https://mycentralasia.com/news",
  },
  openGraph: {
    title: "Central Asia News & Regional Dispatches | My Central Asia",
    description:
      "Independent regional intelligence and cultural journalism from Bishkek, Samarkand, Almaty, Dushanbe, and Ashgabat.",
    url: "https://mycentralasia.com/news",
    type: "website",
  },
};

const DISPATCHES = [
  {
    dateline: "SAMARKAND & TASHKENT • INFRASTRUCTURE",
    date: "AUTUMN 2026",
    title: "High-Speed Rail Expansion Connects Historic Silk Road Oases",
    excerpt:
      "New Afrosiyob rail extensions shorten overland transit between Tashkent, Samarkand, Bukhara, and Khiva—opening remote caravanserai corridors to independent researchers and travelers.",
    regionHref: "/destinations/uzbekistan",
    regionLabel: "UZBEKISTAN DOSSIER",
  },
  {
    dateline: "TIAN SHAN & ISSYK-KUL • CONSERVATION",
    date: "AUTUMN 2026",
    title: "Community-Led Snow Leopard Corridors Expand Across High Altitude Pastures",
    excerpt:
      "Kyrgyz herders and alpine biologists partner to protect transboundary wildlife corridors linking Sarychat-Ertash with the central Tian Shan range.",
    regionHref: "/destinations/kyrgyzstan",
    regionLabel: "KYRGYZSTAN DOSSIER",
  },
  {
    dateline: "ZARAFSHAN VALLEY • ARCHAEOLOGY",
    date: "LATE 2026",
    title: "New Sogdian Mural Excavations Reveal Merchant Networks at Panjikent",
    excerpt:
      "Stratigraphic surveys along the upper Zarafshan River uncover preserved pigments and trade ledgers detailing eighth-century exchanges between Sogdiana and Tang China.",
    regionHref: "/destinations/tajikistan",
    regionLabel: "TAJIKISTAN DOSSIER",
  },
  {
    dateline: "MANGYSTAU & ALMATY • HERITAGE",
    date: "LATE 2026",
    title: "Subterranean Sufi Mosques of Mangystau Nominated for Expanded Protection",
    excerpt:
      "Architectural documentation teams map Beket-Ata and Shakpak-Ata rock-cut sanctuaries carved into the limestone cliffs of western Kazakhstan.",
    regionHref: "/destinations/kazakhstan",
    regionLabel: "KAZAKHSTAN DOSSIER",
  },
  {
    dateline: "REGIONAL POLICY • OVERLAND BORDER CORRIDORS",
    date: "CURRENT BRIEFING",
    title: "Visa-Free Regimes & Cross-Border Overland Logistics Across the Five Republics",
    excerpt:
      "An updated field briefing on 30-to-60-day visa-free entry policies, Pamir Highway GBAO permit procedures, and seasonal mountain pass openings.",
    regionHref: "/expeditions",
    regionLabel: "EXPEDITION BRIEFINGS",
  },
];

export default function NewsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        url: "https://mycentralasia.com/news",
        name: "Central Asia Journal & Regional Dispatches",
        description:
          "Curated journalism, archaeological reports, environmental conservation updates, and overland travel intelligence across Central Asia.",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://mycentralasia.com" },
          { "@type": "ListItem", position: 2, name: "Journal & News", item: "https://mycentralasia.com/news" },
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
            <span>REGIONAL INTELLIGENCE &amp; FIELD DISPATCHES</span>
            <span className="text-[#101D2E]/60">
              BISHKEK • SAMARKAND • ALMATY • DUSHANBE • ASHGABAT
            </span>
          </div>
          <h1 className="mt-3 font-serif text-4xl sm:text-6xl font-normal text-[#101D2E]">
            Journal &amp; Dispatches
          </h1>
          <p className="mt-4 max-w-3xl text-base sm:text-lg text-[#101D2E]/80 font-light leading-relaxed">
            Independent reporting on Silk Road archaeology, high-altitude
            conservation in the Tian Shan and Pamirs, cross-border rail and
            overland corridors, and contemporary cultural preservation across the
            five republics.
          </p>
        </div>

        <div className="mt-10 divide-y divide-[#101D2E]/15 border-b border-[#101D2E]/15">
          {DISPATCHES.map((item) => (
            <article
              key={item.title}
              className="py-8 flex flex-col lg:flex-row lg:items-start justify-between gap-6"
            >
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] tracking-[0.2em] text-[#0F4C81] uppercase">
                  <span>{item.dateline}</span>
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
EOF

# 3. RUN PRODUCTION BUILD
rm -rf .next
npm run build
echo "✅ Build succeeded cleanly! Run 'git add -A && git commit -m \"Add Culture page and static SEO content\" && git push' to deploy."
