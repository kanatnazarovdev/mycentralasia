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
