/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef } from "react";
import Container from "./Container";
import Link from "next/link";
import { Compass, ArrowRight, MapPin } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About({ lang }: { lang: string }) {
  const isEs = lang === "es";
  const isDe = lang === "de";

  const sectionRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance animation for the compact manifesto text
      if (heroTextRef.current) {
        gsap.fromTo(
          heroTextRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: heroTextRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 2. Entrance for Chapter Cards in the #FAFAF4 block
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.18,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0F0E0D] text-[#FAF8F5] w-full font-ddin select-none"
      id="about"
    >
      {/* ── 1. COMPACT EDITORIAL MANIFESTO BANNER (35-40VH HEIGHT) ── */}
      <div className="relative h-[40vh] min-h-[320px] max-h-[480px] w-full flex items-center justify-center px-6 overflow-hidden border-b border-white/10">
        {/* Dark Video Background in Fixed Panoramic Ratio */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover filter brightness-[0.45] contrast-125"
          >
            <source src="/videos/peaks.webm" type="video/webm" />
          </video>
          {/* Subtle Vignette Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E0D] via-transparent to-[#0F0E0D] opacity-10" />
        </div>

        {/* Compressed Center Content */}
        <div
          ref={heroTextRef}
          className="relative z-20 max-w-5xl mx-auto text-center flex flex-col items-center justify-center py-6"
        >
          {/* Small Category Tag */}
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-[0.35em] uppercase text-amber-400 mb-3">
            <Compass size={14} />
            <span>
              {isDe
                ? "UNSERE PHILOSOPHIE"
                : isEs
                ? "NUESTRA FILOSOFÍA"
                : "THE EXPEDITION MANIFESTO"}
            </span>
          </div>

          {/* Scaled-down Title (3xl on mobile, 5xl on desktop) */}
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-wider text-white leading-tight mb-3 drop-shadow-md">
            {isDe
              ? "UNBERÜHRTE GIPFEL, URALTE TRADITIONEN"
              : isEs
              ? "CUMBRES INDÓMITAS, TRADICIONES ANCESTRALES"
              : "UNTAMED PEAKS, ANCIENT LORE"}
          </h2>

          {/* Short Narrative Line */}
          <p className="max-w-xl text-xs sm:text-sm md:text-base font-serif text-[#E5E0D8]/90 font-light leading-relaxed mb-4 text-center line-clamp-2 sm:line-clamp-none">
            {isDe
              ? "Wir führen Reisende jenseits ausgetretener Pfade in die majestätische Tian Shan Wildnis."
              : isEs
              ? "Guiamos a viajeros más allá de las rutas comerciales hacia las profundidades de Tian Shan."
              : "We lead discerning explorers beyond commercial tourist routes into the heart of the Tian Shan range."}
          </p>

          {/* Underlined Action Link */}
          <div>
            <Link
              href={`/${lang}/about`}
              className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-white hover:text-amber-400 border-b border-amber-400 pb-1 transition-all duration-300 group"
            >
              <span>
                {isDe
                  ? "MEHR ERFAHREN"
                  : isEs
                  ? "EXPLORAR MÁS"
                  : "READ FULL MANIFESTO"}
              </span>
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>

        {/* Small Location Badge Indicator */}
        <div className="absolute bottom-4 left-6 z-20 hidden md:flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400 bg-black/60 backdrop-blur-md px-3 py-1 border border-white/10 rounded-xs">
          <MapPin size={10} className="text-amber-400" />
          <span>Song-Kul Highlands • 3,016M</span>
        </div>
      </div>

      {/* ── 2. EDITORIAL FIELD ARCHIVE GRID (#FAFAF4 COLOR BLOCK) ── */}
      <div className="bg-[#FAFAF4] text-[#0F0E0D] py-20 border-b border-[#0F0E0D]/10">
        <Container>
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                num: "01",
                title: isDe
                  ? "PIONIER-TREKKING"
                  : isEs
                  ? "TREKKING DE ALTURA"
                  : "HIGH-ALTITUDE ROUTES",
                desc: isDe
                  ? "Erkunden Sie unberührte Gletscherpässe und versteckte Bergseen im Tian Shan."
                  : isEs
                  ? "Atraviesa pasos glaciares y lagos ocultos en las profundidades de Tian Shan."
                  : "Traverse high-altitude glacial passes and emerald alpine lakes untouched by crowd tourism.",
              },
              {
                num: "02",
                title: isDe
                  ? "ECHTE NOMADENKULTUR"
                  : isEs
                  ? "INMERSIÓN NÓMADA"
                  : "NOMADIC HERITAGE",
                desc: isDe
                  ? "Übernachten Sie in traditionellen Jurten-Camps auf den Sommerweiden von Song-Kul."
                  : isEs
                  ? "Pernocta en yurtas tradicionales junto a familias pastoras en las praderas de Song-Kul."
                  : "Stay in family-run yurt camps across summer pastures and experience centuries-old equestrian traditions.",
              },
              {
                num: "03",
                title: isDe
                  ? "SICHERHEIT & EXPERTISE"
                  : isEs
                  ? "SEGURIDAD Y RIGOR"
                  : "FIELD OPERATIONS",
                desc: isDe
                  ? "Professionelle Satelliten-Kommunikation und erfahrene einheimische Bergführer."
                  : isEs
                  ? "Comunicaciones por satélite y guías expertos nativos para cada expedición."
                  : "Equipped with satellite tracking, field communications, and veteran Kyrgyz mountain leaders.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 bg-[#F0EFE8] border border-[#0F0E0D]/15 hover:border-amber-600 transition-all duration-300 group rounded-xs shadow-sm"
              >
                <span className="text-xs font-mono tracking-[0.25em] text-amber-600 mb-2 block font-bold">
                  CHAPTER // {item.num}
                </span>
                <h4 className="text-lg sm:text-xl font-black uppercase tracking-wider text-[#0F0E0D] group-hover:text-amber-600 transition-colors mb-2">
                  {item.title}
                </h4>
                <p className="font-serif italic text-xs sm:text-sm text-[#3A3835] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}