/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MapPin, Pause, Play, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // <--- 1. IMPORT ROUTER
import KyrgyzstanMapSvg from "@/components/KyrgyzstanMapSvg";
import WildSearchInput from "./WildSearchInput";

export const REGION_CLIPS = [
  {
    id: "ala-kul",
    name: "Ala-Kul Pass",
    altitude: "3,860 m",
    type: "High Mountain Glacial Trek",
    videoSrc: "/videos/alakol.webm",
    href: "/destinations/ala-kul",
  },
  {
    id: "chon-kemin-valley",
    name: "Chon Kemin Valley",
    altitude: "2,016 m",
    type: "Nomadic Pastures & Yurt Camps",
    videoSrc: "/videos/chonkemin.webm",
    href: "/destinations/chon-kemin",
  },
];

const COPY = {
  en: {
    issue: "ISSUE NO. 01 — CENTRAL ASIA",
    subtitle: "A Field Journal & Expedition Archive",
    title: "WILD KYRGYZSTAN",
    description:
      "Documenting untamed landscapes, nomadic heritage, and high-altitude mountain travel. Our curated booking portal and dispatch archive launches shortly.",
    cta: "Explore Region",
    liveLocation: "Live Field Location",
  },
} as const;

const DEFAULT_FALLBACK_VIDEO = "/alakol.webm";
const POSTER_IMAGE = "/hero.jpg";

interface HeroProps {
  lang?: string;
}

export default function Hero({ lang = "en" }: HeroProps) {
  const router = useRouter(); // <--- 2. INITIALIZE ROUTER
  const t =
    COPY[
      (lang as keyof typeof COPY) in COPY ? (lang as keyof typeof COPY) : "en"
    ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Array of video DOM refs
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const handleSearchDispatch = (userQuery: string) => {
    if (!userQuery.trim()) return;
    const encodedQuery = encodeURIComponent(userQuery.trim());
    // Redirects to /[lang]/chat with the prompt attached as a URL parameter
    router.push(`/${lang}/chat?q=${encodedQuery}`);
  };
  // ── 1. TILT / GYROSCOPE MOTION LOGIC ──
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  const springX = useSpring(tiltX, { stiffness: 20, damping: 20 });
  const springY = useSpring(tiltY, { stiffness: 20, damping: 20 });

  const videoPanX = useTransform(springX, [-1, 1], [30, -30]);
  const videoPanY = useTransform(springY, [-1, 1], [20, -20]);

  const activeRegion = REGION_CLIPS[activeIndex] || REGION_CLIPS[0];

  // ── 2. SINGLE ACTIVE VIDEO PLAYBACK MANAGER ──
  useEffect(() => {
    videoRefs.current.forEach((vid, idx) => {
      if (!vid) return;

      if (idx === activeIndex) {
        vid.currentTime = 0;
        const playPromise = vid.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn("Autoplay prevented or interrupted:", err);
          });
        }
      } else {
        vid.pause();
      }
    });
  }, [activeIndex]);

  // ── 3. DESKTOP MOUSE HANDLER ──
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    tiltX.set((clientX / innerWidth - 0.5) * 2);
    tiltY.set((clientY / innerHeight - 0.5) * 2);
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  // ── 4. MOBILE GYROSCOPE / DEVICE TILT HANDLER ──
  useEffect(() => {
    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (event.gamma !== null && event.beta !== null) {
        const normalizedX = Math.max(-1, Math.min(1, event.gamma / 30));
        const normalizedY = Math.max(-1, Math.min(1, (event.beta - 45) / 30));

        tiltX.set(normalizedX);
        tiltY.set(normalizedY);
      }
    };

    if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
      if (
        typeof (DeviceOrientationEvent as any).requestPermission === "function"
      ) {
        const requestPermission = async () => {
          try {
            const response = await (
              DeviceOrientationEvent as any
            ).requestPermission();
            if (response === "granted") {
              window.addEventListener(
                "deviceorientation",
                handleDeviceOrientation,
              );
            }
          } catch (e) {
            console.warn("Device orientation permission denied", e);
          }
        };
        window.addEventListener("click", requestPermission, { once: true });
      } else {
        window.addEventListener("deviceorientation", handleDeviceOrientation);
      }
    }

    return () => {
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
    };
  }, [tiltX, tiltY]);

  // ── 5. AUTO ROTATION TIMER ──
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % REGION_CLIPS.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full bg-[#0F0E0D] text-[#FAF8F5] flex flex-col justify-between px-6 pt-32 pb-12 md:px-12 md:pb-14 lg:px-20 overflow-hidden select-none font-ddin"
    >
      {/* ── BACKGROUND VIDEO CONTAINER ── */}
      <motion.div
        style={{
          x: videoPanX,
          y: videoPanY,
        }}
        className="absolute -inset-8 z-0 h-[calc(100%+64px)] w-[calc(100%+64px)] overflow-hidden bg-[#0F0E0D] transform-gpu will-change-transform scale-105"
      >
        {REGION_CLIPS.map((region, idx) => {
          const isActive = idx === activeIndex;
          return (
            <motion.div
              key={region.id}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
              }}
              transition={{
                opacity: { duration: 1.2, ease: "easeInOut" },
              }}
              className="absolute inset-0 h-full w-full pointer-events-none transform-gpu"
              style={{ zIndex: isActive ? 2 : 1 }}
            >
              <video
                ref={(el) => {
                  videoRefs.current[idx] = el;
                }}
                muted
                playsInline
                loop
                preload="auto"
                poster={POSTER_IMAGE}
                className="h-full w-full object-cover"
              >
                <source src={region.videoSrc} type="video/webm" />
                <source src={DEFAULT_FALLBACK_VIDEO} type="video/webm" />
              </video>
            </motion.div>
          );
        })}

        {/* Static Overlay Gradients */}
        <div className="absolute inset-0 z-10 bg-black/25 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-radial from-transparent via-[#0F0E0D]/40 to-[#0F0E0D] pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0F0E0D] via-transparent to-black/60 pointer-events-none" />
      </motion.div>

      {/* ── CENTERED HERO CONTENT ── */}
      <div className="relative z-20 max-w-4xl mx-auto my-auto py-8 flex flex-col items-center text-center">
        <div className="w-full mt-4 pointer-events-auto">
          {/* 3. REDIRECT USER TO /chat?q=query ON SEARCH SUBMIT */}
          <WildSearchInput onSearch={handleSearchDispatch} />
        </div>
      </div>

      {/* ── BOTTOM INTERACTIVE MAP & REGION HUD BAR ── */}
      <div className="relative md:relative z-20 w-full max-w-7xl mx-auto border-t border-white/15 pt-3 pb-4 md:pt-6 md:pb-0 flex flex-col md:flex-row items-stretch md:items-end justify-between gap-3 md:gap-6 bg-[#0F0E0D]/90 md:bg-transparent backdrop-blur-md md:backdrop-blur-none px-4 md:px-0">
        <div className="flex items-center justify-between md:justify-start gap-4">
          <div>
            <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-bold tracking-[0.3em] uppercase text-amber-400 mb-0.5">
              <MapPin size={11} />
              <span>
                {activeRegion.altitude} • {activeRegion.type}
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold uppercase tracking-wider text-white">
              {activeRegion.name}
            </h2>
          </div>

          <Link
            href={`/${lang}${activeRegion.href}`}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 border border-white/20 hover:border-amber-400 text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:text-amber-400 transition-colors"
          >
            <span>{t.cta}</span>
            <ArrowUpRight size={12} />
          </Link>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-3 sm:gap-5 bg-[#0F0E0D]/80 md:backdrop-blur-md px-3 py-2 sm:px-4 sm:py-3 border border-white/10 rounded-sm">
          <KyrgyzstanMapSvg
            className="w-20 sm:w-40 md:w-52 h-auto opacity-80 hover:opacity-100 transition-opacity"
            activeIndex={activeIndex}
            autoRotateInterval={10000}
            onSelectRegion={(idx) => setActiveIndex(idx % REGION_CLIPS.length)}
          />

          <div className="flex flex-col justify-between gap-1 border-l border-white/15 pl-3 py-0.5 h-full">
            <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400">
              {t.liveLocation}
            </span>

            <div className="flex items-center gap-1.5 sm:gap-2">
              {REGION_CLIPS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1 transition-all duration-500 rounded-full ${
                    idx === activeIndex
                      ? "w-4 sm:w-6 bg-amber-400"
                      : "w-1.5 sm:w-2 bg-white/30 hover:bg-white/60"
                  }`}
                  aria-label={`Select region ${idx + 1}`}
                />
              ))}

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="ml-1 text-neutral-400 hover:text-amber-400 transition-colors"
              >
                {isPlaying ? <Pause size={10} /> : <Play size={10} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
