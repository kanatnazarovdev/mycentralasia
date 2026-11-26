#!/usr/bin/env bash
set -e

mkdir -p src/app/culture src/app/news src/app/history src/app/cuisine

# 1. CREATE FULL CULTURE PAGE WITH RICH EDITORIAL CONTENT & SEO SCHEMA
cat << 'EOF' > src/app/culture/page.tsx
import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Central Asian Culture, Nomadic Heritage & Living Arts",
  description:
    "Explore the living cultural heritage of Central Asia: Kyrgyz nomadic yurt architecture, the Epic of Manas, Uzbek ikat and suzani textiles, Timurid mosaic craftsmanship, and Silk Road hospitality.",
  alternates: {
    canonical: "https://mycentralasia.com/culture",
  },
  openGraph: {
    title: "Central Asian Culture & Living Heritage | My Central Asia",
    description:
      "In-depth cultural archive covering nomadic traditions, oral epics, sacred architecture, and artisan guilds across Kazakhstan, Kyrgyzstan, Uzbekistan, Tajikistan, and Turkmenistan.",
    url: "https://mycentralasia.com/culture",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Central Asian Culture & Living Heritage | My Central Asia",
    description:
      "Nomadic yurt engineering, the Epic of Manas, Bukhara suzani embroidery, and Pamiri music documented in the My Central Asia cultural archive.",
  },
};

const CULTURAL_PILLARS = [
  {
    code: "01 / NOMADIC ARCHITECTURE",
    title: "The Boz Uy (Yurt) & The Sacred Tunduk",
    region: "Kyrgyzstan & Kazakhstan",
    summary:
      "Engineered over three millennia for high-altitude transhumance across the Tian Shan and Kazakh steppe, the collapsible willow lattice (kerege) and bent crown wheel (tunduk) balance aerodynamic resilience with cosmological symbolism.",
    detail:
      "Raising the tunduk during seasonal migration marks the establishment of hearth and kinship. Felt shyrdak carpets—stitched using mosaic positive-negative ibex horn motifs—insulate against sub-zero alpine nights while recording clan lineage.",
  },
  {
    code: "02 / ORAL LITERATURE & MUSIC",
    title: "The Epic of Manas & Maqam Traditions",
    region: "Kyrgyzstan, Tajikistan & Uzbekistan",
    summary:
      "Spanning over half a million lines of verse, the Epic of Manas is preserved by manaschi bards who recite battle cycles, genealogies, and moral codes entirely from memory without musical accompaniment.",
    detail:
      "In the sedentary oasis courts of Bukhara, Samarkand, and Khujand, the Shashmaqam classical repertoire weaves Sufi Persian and Chagatai poetry into modal suites accompanied by the tanbur, dutar, and dayra frame drum.",
  },
  {
    code: "03 / TEXTILE & CERAMIC GUILDS",
    title: "Abrbandi Ikat, Suzani & Rishtan Majolica",
    region: "Uzbekistan & Tajikistan",
    summary:
      "In the Fergana Valley city of Margilan, master weavers bind and resist-dye silk warps in clouds of cobalt, madder root, and pomegranate rind (abrbandi) before looming hypnotic ikat patterns.",
    detail:
      "Nearby in Rishtan, potters extract iron-rich red clay and glaze platters with ishkor—an alkaline ash derived from desert plants—producing luminous turquoise ceramics prized along Silk Road caravanserais.",
  },
  {
    code: "04 / HOSPITALITY & SOCIAL CODE",
    title: "Dastarkhan & The Ethics of the Guest",
    region: "All Five Republics",
    summary:
      "Across both nomadic encampments and mahalla courtyard neighborhoods, the dastarkhan (ceremonial tablecloth) embodies an inviolable duty of protection and generosity toward travelers.",
    detail:
      "No guest departs without breaking warm tandoor non bread—never placed upside down or cut with a knife—followed by green or black tea poured three times in small bowls (piyala) as a gesture of attentive respect.",
  },
];

export default function CulturePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://mycentralasia.com/culture#webpage",
        url: "https://mycentralasia.com/culture",
        name: "Central Asian Culture, Nomadic Heritage & Living Arts",
        description:
          "Authoritative editorial archive on Central Asian nomadic traditions, oral epics, textiles, and architecture.",
        isPartOf: { "@id": "https://mycentralasia.com/#website" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://mycentralasia.com" },
          { "@type": "ListItem", position: 2, name: "Culture", item: "https://mycentralasia.com/culture" },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#F5F1E8] text-[#101D2E]">
      <JsonLd data={jsonLd} />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 pt-14 pb-20">
        {/* Header */}
        <div className="border-b border-[#101D2E]/20 pb-10">
          <div className="font-mono text-[11px] tracking-[0.24em] text-[#B84A27] uppercase">
            ETHNOGRAPHY & LIVING HERITAGE ARCHIVE
          </div>
          <h1 className="mt-3 font-serif text-4xl sm:text-6xl font-normal tracking-[-0.02em] text-[#101D2E]">
            Culture of Central Asia
          </h1>
          <p className="mt-5 max-w-3xl text-base sm:text-lg text-[#101D2E]/80 font-light leading-relaxed">
            Where high-altitude nomadic pastoralism meets the Persianate oasis
            civilizations of Transoxiana. Explore the living crafts, oral epics,
            sacred geometries, and hospitality codes that unite Kazakhstan,
            Kyrgyzstan, Uzbekistan, Tajikistan, and Turkmenistan.
          </p>
        </div>

        {/* 4 Editorial Pillars */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {CULTURAL_PILLARS.map((item) => (
            <article
              key={item.code}
              className="border border-[#101D2E]/15 bg-[#EBE4D5]/45 p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4 font-mono text-[10px] tracking-[0.2em] text-[#0F4C81] uppercase">
                  <span>{item.code}</span>
                  <span className="text-[#101D2E]/60">{item.region}</span>
                </div>
                <h2 className="mt-3 font-serif text-2xl sm:text-3xl font-normal text-[#101D2E]">
                  {item.title}
                </h2>
                <p className="mt-4 text-sm sm:text-base text-[#101D2E]/85 leading-relaxed">
                  {item.summary}
                </p>
                <p className="mt-3 text-sm text-[#101D2E]/70 leading-relaxed font-light">
                  {item.detail}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Field Immersion Banner */}
        <div className="mt-14 border border-[#101D2E]/20 bg-[#101D2E] text-[#F5F1E8] p-8 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="font-mono text-[10px] tracking-[0.22em] text-[#E68A6E] uppercase">
              FIELD IMMERSION • NOMADIC & ARTISAN ROUTES
            </div>
            <h3 className="mt-2 font-serif text-2xl sm:text-3xl font-normal text-white">
              Experience Living Heritage with Local Masters
            </h3>
            <p className="mt-2 text-sm text-[#F5F1E8]/80 font-light leading-relaxed">
              Travel alongside eagle hunters in Issyk-Kul, stay in family yurt
              camps at Song-Kul, and visit Fergana silk ateliers through our
              official expedition partner.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/history"
              className="border border-[#F5F1E8]/30 px-5 py-3 font-mono text-[11px] tracking-[0.18em] text-[#F5F1E8] uppercase hover:border-white transition-colors"
            >
              SILK ROAD TIMELINE
            </Link>
            <a
              href="https://www.wildinkyrgyzstan.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#F5F1E8] px-5 py-3 font-mono text-[11px] font-semibold tracking-[0.18em] text-[#101D2E] uppercase hover:bg-white transition-colors"
            >
              <span>FIELD EXPEDITIONS</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
EOF

# 2. UPGRADE HISTORY PAGE WITH FULL SEO METADATA, JSON-LD & INTRODUCTORY CHRONICLE
cat << 'EOF' > src/app/history/page.tsx
import React from "react";
import type { Metadata } from "next";
import HistorySection from "@/components/home/HistorySection";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Silk Road History & Central Asian Civilizations (Bronze Age to Present)",
  description:
    "Explore 4,000 years of Central Asian history: the Oxus civilization, Saka steppe nomads, Sogdian Silk Road merchants, the Timurid Renaissance in Samarkand, and modern independence.",
  alternates: {
    canonical: "https://mycentralasia.com/history",
  },
  openGraph: {
    title: "Silk Road History & Central Asian Civilizations | My Central Asia",
    description:
      "Chronological archive covering the Bactria-Margiana Archaeological Complex, Sogdian trade networks, Al-Khwarizmi and Ibn Sina, and the Timurid golden age.",
    url: "https://mycentralasia.com/history",
    type: "website",
  },
};

export default function HistoryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        url: "https://mycentralasia.com/history",
        name: "History of Central Asia & The Silk Road",
        description:
          "Comprehensive historical timeline of Central Asia from Bronze Age oasis kingdoms to the Timurid Renaissance and modern republics.",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://mycentralasia.com" },
          { "@type": "ListItem", position: 2, name: "History", item: "https://mycentralasia.com/history" },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#F5F1E8] text-[#101D2E]">
      <JsonLd data={jsonLd} />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 pt-14 pb-8 border-b border-[#101D2E]/15">
        <div className="font-mono text-[11px] tracking-[0.24em] text-[#B84A27] uppercase">
          HISTORICAL ARCHIVE • TRANSOXIANA & THE STEPPE
        </div>
        <h1 className="mt-3 font-serif text-4xl sm:text-6xl font-normal text-[#101D2E]">
          History of Central Asia
        </h1>
        <p className="mt-4 max-w-3xl text-base sm:text-lg text-[#101D2E]/80 font-light leading-relaxed">
          For millennia, the oases and mountain passes between the Caspian Sea
          and the Tian Shan served as Eurasia&apos;s primary conduit of science,
          architecture, religion, and overland trade—shaping algebra, astronomy,
          and global commerce.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#101D2E]/10 text-sm">
          <div>
            <div className="font-mono text-[10px] tracking-[0.2em] text-[#0F4C81] uppercase">
              2200 BCE – 500 BCE
            </div>
            <div className="mt-1 font-serif text-lg font-medium">Oxus & Saka Foundations</div>
            <p className="mt-1 text-xs text-[#101D2E]/70 leading-relaxed">
              Fortified Bronze Age oasis towns along the Amu Darya meet mounted
              Saka confederations across the Tian Shan and Kazakh steppe.
            </p>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[0.2em] text-[#0F4C81] uppercase">
              200 BCE – 1000 CE
            </div>
            <div className="mt-1 font-serif text-lg font-medium">Sogdian & Islamic Golden Age</div>
            <p className="mt-1 text-xs text-[#101D2E]/70 leading-relaxed">
              Panjikent and Samarkand anchor transcontinental trade while
              scholars like Al-Khwarizmi, Al-Biruni, and Ibn Sina transform global science.
            </p>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[0.2em] text-[#0F4C81] uppercase">
              1370 – PRESENT
            </div>
            <div className="mt-1 font-serif text-lg font-medium">Timurid Renaissance to Modernity</div>
            <p className="mt-1 text-xs text-[#101D2E]/70 leading-relaxed">
              Monumental turquoise domes and Ulugh Beg&apos;s observatory give way
              to the Silk Road khanates, 20th-century transformations, and five sovereign republics.
            </p>
          </div>
        </div>
      </div>

      <HistorySection compact={false} />
    </div>
  );
}
EOF

# 3. UPGRADE CUISINE PAGE WITH FULL SEO METADATA, JSON-LD & GASTRONOMIC ESSAY
cat << 'EOF' > src/app/cuisine/page.tsx
import React from "react";
import type { Metadata } from "next";
import CuisineSection from "@/components/home/CuisineSection";
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

      <div className="mx-auto max-w-7xl px-6 sm:px-8 pt-14 pb-8 border-b border-[#101D2E]/15">
        <div className="font-mono text-[11px] tracking-[0.24em] text-[#B84A27] uppercase">
          SILK ROAD GASTRONOMY & CULINARY ARCHIVE
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

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#101D2E]/10 text-sm">
          <div>
            <div className="font-mono text-[10px] tracking-[0.2em] text-[#0F4C81] uppercase">
              THE KAZAN TRADITION
            </div>
            <div className="mt-1 font-serif text-lg font-medium">Plov & Slow-Braised Zirvak</div>
            <p className="mt-1 text-xs text-[#101D2E]/70 leading-relaxed">
              Yellow carrots, devzira rice, chickpeas, and lamb simmered over
              fruitwood embers in heavy cast-iron cauldrons across Fergana, Samarkand, and Dushanbe.
            </p>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[0.2em] text-[#0F4C81] uppercase">
              HAND-PULLED DOUGH
            </div>
            <div className="mt-1 font-serif text-lg font-medium">Lagman, Manti & Beshbarmak</div>
            <p className="mt-1 text-xs text-[#101D2E]/70 leading-relaxed">
              Dungan and Uyghur hand-stretched lagman noodles meet nomadic
              beshbarmak—boiled pasture meats served over hand-cut pasta sheets.
            </p>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[0.2em] text-[#0F4C81] uppercase">
              SACRED HEARTH & PASTURE
            </div>
            <div className="mt-1 font-serif text-lg font-medium">Tandoor Non, Kurt & Kymyz</div>
            <p className="mt-1 text-xs text-[#101D2E]/70 leading-relaxed">
              Stamped sourdough flatbreads baked on vertical clay walls pair
              with sun-dried kurt cheese spheres and summer fermented mare&apos;s milk.
            </p>
          </div>
        </div>
      </div>

      <CuisineSection />
    </div>
  );
}
EOF

# 4. UPGRADE NEWS PAGE WITH FULL SEO METADATA, JSON-LD & DISPATCH DESK HEADER
cat << 'EOF' > src/app/news/page.tsx
import React from "react";
import type { Metadata } from "next";
import NewsFeedSection from "@/components/home/NewsFeedSection";
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

      <div className="mx-auto max-w-7xl px-6 sm:px-8 pt-14 pb-8 border-b border-[#101D2E]/15">
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] tracking-[0.24em] text-[#B84A27] uppercase">
          <span>REGIONAL INTELLIGENCE & FIELD DISPATCHES</span>
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

      <NewsFeedSection showAll />
    </div>
  );
}
EOF

# 5. ADD /culture TO SITEMAP, SITEHEADER & SITEFOOTER
python3 - << 'PYEOF'
# Update sitemap.ts if present
sitemap_path = "src/app/sitemap.ts"
try:
    with open(sitemap_path, "r") as f:
        sm = f.read()
    if '"/culture"' not in sm and '"/history"' in sm:
        sm = sm.replace('"/history"', '"/culture", "/history"')
        with open(sitemap_path, "w") as f:
            f.write(sm)
        print("✅ Added /culture to sitemap.ts")
except FileNotFoundError:
    pass

# Update SiteHeader.tsx navItems to include CULTURE
header_path = "src/components/layout/SiteHeader.tsx"
with open(header_path, "r") as f:
    h = f.read()
if '{ label: "CULTURE"' not in h:
    h = h.replace(
        '{ label: "SILK ROAD HISTORY", href: "/history" },',
        '{ label: "CULTURE", href: "/culture" },\n    { label: "SILK ROAD HISTORY", href: "/history" },'
    )
    with open(header_path, "w") as f:
        f.write(h)
    print("✅ Added CULTURE to SiteHeader.tsx")

# Update SiteFooter.tsx Editorial Archive links to include Culture
footer_path = "src/components/layout/SiteFooter.tsx"
with open(footer_path, "r") as f:
    ft = f.read()
if 'href="/culture"' not in ft:
    ft = ft.replace(
        '<li>\n                <Link href="/history"',
        '<li>\n                <Link href="/culture" className="hover:text-white transition-colors">\n                  Nomadic &amp; Silk Road Culture\n                </Link>\n              </li>\n              <li>\n                <Link href="/history"'
    )
    with open(footer_path, "w") as f:
        f.write(ft)
    print("✅ Added /culture to SiteFooter.tsx")
PYEOF

# 6. VERIFY PRODUCTION BUILD
rm -rf .next
npm run build

echo "🎉 Culture page created and News, History, Cuisine upgraded with full static editorial content + SEO metadata/JSON-LD!"
