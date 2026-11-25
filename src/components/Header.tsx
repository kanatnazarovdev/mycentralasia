/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface HeaderProps {
  lang: string;
}

export default function Header({ lang }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname() || "";
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Normalize current path by removing trailing slashes
  const cleanCurrentPath = pathname.replace(/\/$/, "");

  const isInteriorRoute =
    pathname.includes(`/journal`) || pathname.includes(`/destinations`);

  const shouldBeActive = isScrolled || isOpen || isInteriorRoute;

  const toggleLanguage = (newLang: string) => {
    if (!pathname) return;

    const segments = pathname.split("/").filter(Boolean);
    const supportedPrefixes = ["es", "de"];
    if (supportedPrefixes.includes(segments[0])) {
      segments.shift();
    }

    const cleanPath = segments.join("/");
    let newPath = "";
    if (newLang === "en") {
      newPath = cleanPath ? `/${cleanPath}` : "/";
    } else {
      newPath = cleanPath ? `/${newLang}/${cleanPath}` : `/${newLang}`;
    }

    if (pathname.endsWith("/") && !newPath.endsWith("/")) {
      newPath += "/";
    }

    router.push(newPath);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide header inside Sanity Studio
  const isStudio =
    pathname.startsWith(`/${lang}/studio`) || pathname.startsWith("/studio");
  if (isStudio) return null;

  // The 2 Main Pages
  const navItems = [
     {
      id: "jol-ai",
      label:
        lang === "de"
          ? "Jol AI"
          : lang === "es"
            ? "Jol AI"
            : "Jol AI",
      href: `/chat`,
    },
    {
      id: "destinations",
      label:
        lang === "de"
          ? "Reiseziele"
          : lang === "es"
            ? "Destinos"
            : "Destinations",
      href: `/${lang}/destinations`,
    },
    {
      id: "journal",
      label:
        lang === "de"
          ? "Tagebuch & Archiv"
          : lang === "es"
            ? "Diario de Campo"
            : "Journal",
      href: `/${lang}/journal`,
    },
    {
      id: "about",
      label: lang === "de" ? "Über" : lang === "es" ? "Acerca de" : "About",
      href: `/${lang}/about`,
    },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-[60] transition-all duration-500 py-3 h-[90px] flex items-center
        ${
          shouldBeActive
            ? "bg-[#0F0E0D]/95 backdrop-blur-md border-b border-white/10 text-[#FAF8F5]"
            : "bg-transparent text-[#FAF8F5]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
          {/* Brand Logo with Tunduk Icon */}
          <Link href={`/${lang}`} className="z-[70] flex items-center gap-3">
            {/* Minimalist Kyrgyz Tunduk Crest */}
            <div className="w-8 h-8 rounded-full border border-amber-500/80 flex items-center justify-center relative">
              <div className="w-6 h-6 border border-white/40 rounded-full flex items-center justify-center">
                <div className="w-[1px] h-full bg-amber-500/80 rotate-45 absolute" />
                <div className="w-[1px] h-full bg-amber-500/80 -rotate-45 absolute" />
              </div>
            </div>
            <span className="font-ddin font-bold text-[18px] md:text-[20px] tracking-[0.2em] uppercase text-white">
              WILD KYRGYZSTAN
            </span>
          </Link>

          {/* Desktop Navigation (2 Items Only) */}
          <div className="hidden md:flex items-center gap-10 font-ddin font-bold">
            {navItems.map((item) => {
              const itemCleanHref = item.href.replace(/\/$/, "");
              const isNavActive =
                cleanCurrentPath === itemCleanHref ||
                pathname.includes(`/${item.id}`);

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`uppercase tracking-[0.2em] text-[12px] transition-colors relative py-2 ${
                    isNavActive
                      ? "text-amber-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-amber-400"
                      : "text-[#FAF8F5]/80 hover:text-amber-400"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right Actions: Language Switcher & Request Invitation CTA */}
          <div className="flex items-center gap-5">
            <div className="hidden md:flex items-center gap-2 mr-2 border-r border-white/10 pr-4 font-ddin">
              <button
                onClick={() => toggleLanguage("en")}
                className={`text-[11px] font-bold tracking-widest transition-colors ${
                  lang === "en"
                    ? "text-amber-400"
                    : "text-white/40 hover:text-white"
                }`}
              >
                EN
              </button>
              <span className="text-white/20">|</span>
              <button
                onClick={() => toggleLanguage("es")}
                className={`text-[11px] font-bold tracking-widest transition-colors ${
                  lang === "es"
                    ? "text-amber-400"
                    : "text-white/40 hover:text-white"
                }`}
              >
                ES
              </button>
              <span className="text-white/20">|</span>
              <button
                onClick={() => toggleLanguage("de")}
                className={`text-[11px] font-bold tracking-widest transition-colors ${
                  lang === "de"
                    ? "text-amber-400"
                    : "text-white/40 hover:text-white"
                }`}
              >
                DE
              </button>
            </div>

            {/* Mobile Trigger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 z-[70] text-white"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-[#0F0E0D] z-[55] flex flex-col justify-start pt-28 pb-12 px-8 overflow-y-auto font-ddin text-[#FAF8F5]"
          >
            {/* Language Switcher */}
            <div className="flex gap-6 mb-8 border-b border-white/10 pb-6">
              <button
                onClick={() => toggleLanguage("en")}
                className={`text-lg font-bold tracking-widest ${
                  lang === "en" ? "text-amber-400" : "text-white/40"
                }`}
              >
                English
              </button>
              <button
                onClick={() => toggleLanguage("es")}
                className={`text-lg font-bold tracking-widest ${
                  lang === "es" ? "text-amber-400" : "text-white/40"
                }`}
              >
                Español
              </button>
              <button
                onClick={() => toggleLanguage("de")}
                className={`text-lg font-bold tracking-widest ${
                  lang === "de" ? "text-amber-400" : "text-white/40"
                }`}
              >
                Deutsch
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-3xl font-bold uppercase tracking-wider ${
                    pathname.includes(`/${item.id}`)
                      ? "text-amber-400"
                      : "text-white hover:text-amber-400"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
