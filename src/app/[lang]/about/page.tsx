/* eslint-disable react/jsx-no-comment-textnodes */
import { Metadata } from "next";
import { ABOUT_CONTENT } from "@/lib/aboutData";
import { Compass, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ lang?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = (resolvedParams.lang as keyof typeof ABOUT_CONTENT) || "en";
  const content = ABOUT_CONTENT[lang] || ABOUT_CONTENT.en;

  return {
    title: `${content.headline} | Wild Kyrgyzstan`,
    description: content.description,
    openGraph: {
      title: `${content.headline} | Wild Kyrgyzstan`,
      description: content.description,
      type: "website",
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const resolvedParams = await params;
  const lang = (resolvedParams.lang as keyof typeof ABOUT_CONTENT) || "en";
  const content = ABOUT_CONTENT[lang] || ABOUT_CONTENT.en;

  // JSON-LD Structured Data for AEO / SEO entity verification
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Wild Kyrgyzstan",
    "url": "https://wildkyrgyzstan.com",
    "logo": "https://wildkyrgyzstan.com/logo.jpg",
    "description": content.schemaDescription,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bishkek",
      "addressCountry": "KG",
    },
    "areaServed": {
      "@type": "Country",
      "name": "Kyrgyzstan",
    },
    "knowsAbout": [
      "Digital Tourism Platform",
      "High Mountain Expeditions",
      "Nomadic Tourism",
      "Ala-Kul Trekking",
      "Chon Kemin Valley",
    ],
  };

  return (
    <main className="min-h-screen w-full bg-[#0F0E0D] text-[#FAF8F5] px-6 pt-32 pb-20 md:px-12 lg:px-20 font-ddin select-none overflow-hidden">
      {/* ── Google JSON-LD Entity Injection ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto">
        {/* ── 1. HEADER BADGE & TITLE ── */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-400 text-[11px] font-bold tracking-[0.25em] uppercase mb-4 backdrop-blur-md">
            <Sparkles size={13} className="animate-pulse" />
            <span>{content.subtitle}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white drop-shadow-2xl mb-6">
            {content.headline}
          </h1>

          <p className="font-serif italic text-base sm:text-lg md:text-xl font-light leading-relaxed text-[#E5E0D8]/90">
            {content.description}
          </p>
        </div>

        {/* ── 2. CORE INNOVATION PILLARS GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-16">
          {content.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-[#161513]/80 backdrop-blur-xl border border-white/10 hover:border-amber-400/50 p-6 md:p-8 rounded-sm transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-amber-400 mb-2 block">
                  0{idx + 1} // {pillar.tag}
                </span>
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-white mb-3 group-hover:text-amber-400 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs md:text-sm text-[#C5C0B8] leading-relaxed font-sans">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-neutral-500 group-hover:text-amber-400 transition-colors">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em]">
                  Verified Standard
                </span>
                <ShieldCheck size={16} />
              </div>
            </div>
          ))}
        </div>

        {/* ── 3. CINEMATIC JOURNAL INSERT SECTION (#FAFAF4 ACCENT) ── */}
        <div className="bg-[#FAFAF4] text-[#0F0E0D] p-8 md:p-14 rounded-sm shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 my-20 relative overflow-hidden border-l-4 border-amber-500">
          {/* Subtle background field journal stamp pattern */}
          <div className="absolute -right-8 -bottom-8 opacity-5 text-black pointer-events-none font-mono text-9xl font-black select-none">
            KG
          </div>

          <div className="max-w-xl relative z-10">
            <div className="flex items-center gap-2 text-xs font-bold tracking-[0.3em] uppercase text-amber-600 mb-3">
              <Compass size={14} />
              <span>Field Dispatch Note</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-[#0F0E0D] mb-4">
              Direct Access to Untamed Kyrgyzstan
            </h2>
            <p className="text-xs md:text-sm text-[#3A3835] font-serif italic leading-relaxed">
              From the 3,860m pass at Ala-Kul to the ancient walnut canopies of Arslanbob, Wild Kyrgyzstan establishes digital dispatch channels that empower local guides while delivering seamless booking pipelines for high-altitude expeditions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 w-full md:w-auto relative z-10">
            <div className="border-l-2 border-[#0F0E0D]/30 pl-4 py-1">
              <span className="block text-3xl md:text-4xl font-extrabold text-[#0F0E0D]">
                100%
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#5A5752]">
                Direct Guide Payout
              </span>
            </div>
            <div className="border-l-2 border-[#0F0E0D]/30 pl-4 py-1">
              <span className="block text-3xl md:text-4xl font-extrabold text-[#0F0E0D]">
                0%
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#5A5752]">
                OTA Commission Fee
              </span>
            </div>
          </div>
        </div>

        {/* ── 4. CTA DISPATCH PORTAL LINK ── */}
        <div className="text-center mt-16">
          <Link
            href={`/${lang}/destinations`}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase tracking-[0.2em] rounded-xs transition-all duration-200"
          >
            <span>Explore Expedition Archives</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </main>
  );
}