"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";

interface ComingSoonHeroProps {
  lang: "en" | "es" | "de";
}

function CountryFlag({ code }: { code: "UZ" | "KZ" | "KG" | "TJ" }) {
  switch (code) {
    case "UZ":
      return (
        <svg viewBox="0 0 24 16" className="h-3 w-4.5 rounded-[1px] opacity-90 shrink-0" aria-hidden="true">
          <rect width="24" height="5" y="0" fill="#0099B5" />
          <rect width="24" height="0.6" y="5" fill="#CE1126" />
          <rect width="24" height="4.8" y="5.6" fill="#FFFFFF" />
          <rect width="24" height="0.6" y="10.4" fill="#CE1126" />
          <rect width="24" height="5" y="11" fill="#1EB53A" />
          <circle cx="4.5" cy="2.5" r="1.4" fill="#FFFFFF" />
          <circle cx="5.1" cy="2.5" r="1.15" fill="#0099B5" />
        </svg>
      );
    case "KZ":
      return (
        <svg viewBox="0 0 24 16" className="h-3 w-4.5 rounded-[1px] opacity-90 shrink-0" aria-hidden="true">
          <rect width="24" height="16" fill="#00AFCA" />
          <rect width="1.6" height="16" x="1.5" fill="#FEC50C" opacity="0.85" />
          <circle cx="12.5" cy="7.5" r="2.8" fill="#FEC50C" />
          <path d="M9.5 11.2 Q12.5 13 15.5 11.2" stroke="#FEC50C" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "KG":
      return (
        <svg viewBox="0 0 24 16" className="h-3 w-4.5 rounded-[1px] opacity-90 shrink-0" aria-hidden="true">
          <rect width="24" height="16" fill="#E8112D" />
          <circle cx="12" cy="8" r="3.4" fill="#FFEF00" />
          <circle cx="12" cy="8" r="2.1" fill="#E8112D" />
          <path d="M10.4 6.8 Q12 8.2 13.6 6.8 M10.4 9.2 Q12 7.8 13.6 9.2" stroke="#FFEF00" strokeWidth="0.7" fill="none" />
        </svg>
      );
    case "TJ":
      return (
        <svg viewBox="0 0 24 16" className="h-3 w-4.5 rounded-[1px] opacity-90 shrink-0" aria-hidden="true">
          <rect width="24" height="4.6" y="0" fill="#CC0000" />
          <rect width="24" height="6.8" y="4.6" fill="#FFFFFF" />
          <rect width="24" height="4.6" y="11.4" fill="#006600" />
          <path d="M10.2 8.6 Q12 7.2 13.8 8.6" stroke="#F8C300" strokeWidth="1.1" fill="none" strokeLinecap="round" />
          <circle cx="12" cy="6.6" r="0.6" fill="#F8C300" />
        </svg>
      );
  }
}

const REGIONS = [
  {
    id: "uz",
    code: "UZ" as const,
    name: "Uzbekistan",
    plate: "PLATE I — SAMARKAND",
    coords: "39°39'15\"N 66°57'35\"E",
    video: "/videos/uzbekistan.mp4",
    accentHex: "#38BDF8",
    barClass: "bg-[#0099B5]",
  },
  {
    id: "kz",
    code: "KZ" as const,
    name: "Kazakhstan",
    plate: "PLATE II — CHARYN CANYON",
    coords: "43°21'08\"N 79°04'44\"E",
    video: "/videos/kazakhstan.mp4",
    accentHex: "#FEC50C",
    barClass: "bg-[#FEC50C]",
  },
  {
    id: "kg",
    code: "KG" as const,
    name: "Kyrgyzstan",
    plate: "PLATE III — SONG-KUL",
    coords: "41°50'29\"N 75°07'43\"E",
    video: "/videos/kyrgyzstan.mp4",
    accentHex: "#E8112D",
    barClass: "bg-[#E8112D]",
  },
  {
    id: "tj",
    code: "TJ" as const,
    name: "Tajikistan",
    plate: "PLATE IV — PAMIR HIGHWAY",
    coords: "37°29'23\"N 71°33'11\"E",
    video: "/videos/tajikistan.mp4",
    accentHex: "#4ADE80",
    barClass: "bg-[#1EB53A]",
  },
];

const content = {
  en: {
    issue: "VOL. 01 — INAUGURAL DISPATCH • AUTUMN / WINTER",
    headlineTop: "THE HEARTLAND OF",
    headlineItalic: "the Silk Road.",
    subheadline:
      "An independent journal documenting the culinary lineage, architectural history, and high-altitude expedition routes across Central Asia.",
    pillars: [
      {
        num: "I",
        title: "CULINARY ARCHIVE",
        desc: "Heirloom Dungan recipes, hearth-baked breads, and regional spice routes.",
      },
      {
        num: "II",
        title: "CULTURAL LINEAGE",
        desc: "Timurid geometry, nomadic oral epics, and living mountain traditions.",
      },
      {
        num: "III",
        title: "FIELD EXPEDITIONS",
        desc: "Overland border dispatches, alpine passes, and seasonal trail logs.",
      },
    ],
    placeholder: "Email address for first-issue dispatch",
    cta: "SUBSCRIBE",
    success: "Confirmed. You will receive the inaugural dispatch.",
    partnerLabel: "FIELD OPERATIONS PARTNER",
    partnerLink: "WildInKyrgyzstan.com",
  },
  es: {
    issue: "VOL. 01 — EDICIÓN INAUGURAL • OTOÑO / INVIERNO",
    headlineTop: "EL CORAZÓN DE",
    headlineItalic: "la Ruta de la Seda.",
    subheadline:
      "Una publicación independiente que documenta el linaje culinario, la historia arquitectónica y las rutas de alta montaña de Asia Central.",
    pillars: [
      {
        num: "I",
        title: "ARCHIVO CULINARIO",
        desc: "Recetas ancestrales Dungan, panes al horno de barro y rutas de especias.",
      },
      {
        num: "II",
        title: "LINAJE CULTURAL",
        desc: "Geometría timúrida, épica oral nómada y tradiciones vivas de montaña.",
      },
      {
        num: "III",
        title: "EXPEDICIONES DE CAMPO",
        desc: "Crónicas transfronterizas, pasos alpinos y bitácoras de ruta.",
      },
    ],
    placeholder: "Correo electrónico para la primera edición",
    cta: "SUSCRIBIRSE",
    success: "Confirmado. Recibirás la edición inaugural.",
    partnerLabel: "OPERADOR DE EXPEDICIONES",
    partnerLink: "WildInKyrgyzstan.com",
  },
  de: {
    issue: "AUSGABE 01 — ERSTVERÖFFENTLICHUNG • HERBST / WINTER",
    headlineTop: "DAS HERZLAND",
    headlineItalic: "der Seidenstraße.",
    subheadline:
      "Ein unabhängiges Journal über kulinarisches Erbe, Architekturgeschichte und hochalpine Expeditionsrouten in Zentralasien.",
    pillars: [
      {
        num: "I",
        title: "KULINARISCHES ARCHIV",
        desc: "Überlieferte Dungan-Rezepte, Lehmofenbrote und Gewürzrouten.",
      },
      {
        num: "II",
        title: "KULTURELLES ERBE",
        desc: "Timuridische Geometrie, nomadische Epen und lebendige Bergtraditionen.",
      },
      {
        num: "III",
        title: "FELDEXPEDITIONEN",
        desc: "Grenzüberschreitende Berichte, Hochgebirgspässe und Routenprotokolle.",
      },
    ],
    placeholder: "E-Mail-Adresse für die Erstausgabe",
    cta: "ABONNIEREN",
    success: "Bestätigt. Sie erhalten die Erstausgabe.",
    partnerLabel: "EXPEDITIONSPARTNER",
    partnerLink: "WildInKyrgyzstan.com",
  },
};

export default function ComingSoonHero({ lang }: ComingSoonHeroProps) {
  const t = content[lang] || content.en;
  const [activeIndex, setActiveIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % REGIONS.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  const activeRegion = REGIONS[activeIndex];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#08090B] text-[#F4F1EA] selection:bg-white/20 selection:text-white flex flex-col justify-between">
      {/* Full-Bleed Cinema Video Layer (Higher clarity so footage actually shines) */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.video
            key={activeRegion.id}
            src={activeRegion.video}
            autoPlay
            loop
            muted
            playsInline
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 0.72, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full object-cover contrast-[1.05] saturate-[0.95]"
          />
        </AnimatePresence>

        {/* Subtle Film Grain Texture */}
        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Editorial Vignette (Clear center for video, rich dark edges for typography) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090B]/75 via-[#08090B]/35 to-[#08090B]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08090B]/80 via-[#08090B]/25 to-[#08090B]/65" />
      </div>

      {/* Top Editorial Masthead */}
      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 sm:px-10 py-6 border-b border-white/12">
        <div className="flex items-center gap-4">
          <span className="font-serif text-lg sm:text-xl tracking-[0.18em] uppercase text-[#F4F1EA]">
            MYCENTRALASIA
          </span>
          <span className="hidden sm:inline-block h-3.5 w-[1px] bg-white/20" />
          <span className="hidden sm:inline-block font-mono text-[10px] tracking-[0.22em] text-stone-400 uppercase">
            EST. 2026 • JOURNAL & ARCHIVE
          </span>
        </div>

        <div className="flex items-center gap-6 font-mono text-[11px] tracking-[0.18em] text-stone-300">
          <span className="hidden md:inline-block text-stone-300">
            {activeRegion.plate}
          </span>
          <a
            href="https://instagram.com/mycentralasia.co"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-transparent pb-0.5 hover:border-white hover:text-white transition-colors"
          >
            @MYCENTRALASIA.CO
          </a>
        </div>
      </header>

      {/* Main Left-Aligned Editorial Composition (More authoritative than centered SaaS layout) */}
      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center px-6 sm:px-10 py-14">
        <div className="max-w-3xl">
          {/* Volume / Issue Tag */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6 flex items-center gap-3 font-mono text-[11px] tracking-[0.24em] text-stone-300 uppercase"
          >
            <span
              className="inline-block h-[1px] w-8 transition-colors duration-700"
              style={{ backgroundColor: activeRegion.accentHex }}
            />
            <span>{t.issue}</span>
          </motion.div>

          {/* Authoritative Editorial Headline (Mix of Crisp Sans + High-Contrast Editorial Serif) */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-normal tracking-[-0.02em] text-[#F4F1EA] leading-[0.98]"
          >
            <span className="block font-sans font-medium tracking-[-0.03em]">
              {t.headlineTop}
            </span>
            <span className="block font-serif italic font-normal text-[#F4F1EA]/95 mt-1">
              {t.headlineItalic}
            </span>
          </motion.h1>

          {/* Journalistic Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-7 max-w-xl text-base sm:text-lg text-stone-200/90 leading-relaxed font-light"
          >
            {t.subheadline}
          </motion.p>

          {/* Minimalist Architectural Dispatch Form (Sharp corners, no bubbly pill buttons) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-9 max-w-md"
          >
            {submitted ? (
              <div className="flex items-center gap-2.5 border-l-2 border-emerald-400 bg-black/50 px-4 py-3 font-mono text-xs tracking-wider text-stone-200 backdrop-blur-md">
                <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{t.success}</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex items-stretch border-b border-white/35 bg-black/30 backdrop-blur-md transition-colors focus-within:border-white"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.placeholder}
                  className="w-full bg-transparent px-3.5 py-3.5 text-sm text-[#F4F1EA] placeholder:text-stone-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 bg-[#F4F1EA] px-6 py-3.5 font-mono text-[11px] font-semibold tracking-[0.2em] text-[#08090B] uppercase transition-colors hover:bg-white"
                >
                  {t.cta}
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Bottom Architectural Index Columns (Replaces generic SaaS rounded cards) */}
        <div className="mt-20 grid w-full grid-cols-1 gap-8 border-t border-white/15 pt-8 sm:grid-cols-3">
          {t.pillars.map((pillar, idx) => (
            <div key={idx} className="group">
              <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.2em] text-stone-400">
                <span style={{ color: activeRegion.accentHex }}>{pillar.num}.</span>
                <span className="text-[#F4F1EA]">{pillar.title}</span>
              </div>
              <p className="mt-2 text-sm text-stone-300/85 leading-relaxed font-light">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Cinema Reel Chapter Switcher & Expedition Partner Footer */}
      <footer className="relative z-10 mx-auto w-full max-w-7xl border-t border-white/12 px-6 sm:px-10 py-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Interactive Film Chapter Strip with Flag Color Indicator */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
            {REGIONS.map((region, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={region.id}
                  onClick={() => setActiveIndex(idx)}
                  className="group text-left transition-opacity"
                >
                  {/* Top Flag Accent Bar */}
                  <div className="mb-2 h-[2px] w-full bg-white/15 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isActive ? `w-full ${region.barClass}` : "w-0 group-hover:w-1/3 bg-white/40"
                      }`}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <CountryFlag code={region.code} />
                    <span
                      className={`font-mono text-[11px] tracking-[0.16em] uppercase transition-colors ${
                        isActive ? "text-[#F4F1EA] font-semibold" : "text-stone-400 group-hover:text-stone-200"
                      }`}
                    >
                      {region.name}
                    </span>
                  </div>
                  <div className="mt-0.5 font-mono text-[9px] tracking-wider text-stone-500">
                    {region.coords}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Subtle Editorial Partner Link */}
          <a
            href="https://www.wildinkyrgyzstan.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 self-start lg:self-center font-mono text-[11px] tracking-[0.16em] text-stone-300 hover:text-white transition-colors"
          >
            <span className="text-stone-500">{t.partnerLabel}:</span>
            <span className="border-b border-white/30 pb-0.5 group-hover:border-white">
              {t.partnerLink}
            </span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </footer>
    </section>
  );
}