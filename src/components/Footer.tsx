/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams, usePathname } from "next/navigation";
import Container from "./Container";
import Link from "next/link";
import {
  Compass,
  MapPin,
  Mail,
  Phone,
  Instagram,
  ArrowUpRight,
} from "lucide-react";

export default function Footer() {
  const params = useParams();
  const pathname = usePathname() || "";
  const lang = (params.lang as string) || "en";

  const isEs = lang === "es";
  const isDe = lang === "de";

  // Hide footer inside Sanity Studio
  const isStudio =
    pathname.startsWith(`/${lang}/studio`) || pathname.startsWith("/studio");
  if (isStudio) return null;

  return (
    <footer
      id="contact"
      className="bg-[#0F0E0D] text-[#FAF8F5] border-t border-white/10 pt-24 pb-12 font-ddin"
    >
      <Container>
        {/* Main Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-20">
          {/* Left: Interactive Google Maps Embed (Bishkek Field HQ) */}
          <div className="relative h-[420px] w-full bg-neutral-900 overflow-hidden border border-white/10 group">
            <div className="absolute top-4 left-4 z-20 bg-[#0F0E0D]/90 backdrop-blur-md px-3 py-1.5 border border-white/10 text-[10px] font-bold tracking-[0.25em] uppercase text-amber-400 flex items-center gap-2">
              <Compass size={14} />
              <span>
                {isDe
                  ? "Hauptquartier Bischkek"
                  : isEs
                    ? "Sede Operativa Biskek"
                    : "Field HQ • Bishkek"}
              </span>
            </div>
            {/* Embed Map centered on Bishkek, Kyrgyzstan */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d187128.52840924765!2d74.45524360341793!3d42.874621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb7dc91b3a855%3A0x5e5073e1c9441113!2sBishkek%2C%20Kyrgyzstan!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              className="absolute inset-0 w-full h-full grayscale contrast-125 opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Right: Expedition Base Details */}
          <div className="flex flex-col justify-between py-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Location Column */}
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.4em] text-amber-400 font-bold block flex items-center gap-1.5">
                  <MapPin size={12} />
                  {isDe ? "Standort" : isEs ? "Ubicación" : "Expedition Base"}
                </span>
                <h3 className="text-2xl font-bold uppercase tracking-wider text-white">
                  Wild Kyrgyzstan <br />
                  <span className="font-serif italic font-light text-neutral-400 text-lg">
                    Field Operations
                  </span>
                </h3>
                <p className="text-[13px] text-neutral-400 font-serif italic leading-relaxed">
                  Bishkek & High Altitude Field Camps
                  <br />
                  Chuy Region, Kyrgyz Republic
                </p>
              </div>

              {/* Contact Inquiries Column */}
              <div className="space-y-6">
                <span className="text-[10px] uppercase tracking-[0.4em] text-amber-400 font-bold block">
                  {isDe ? "Anfragen" : isEs ? "Consultas" : "Direct Inquiries"}
                </span>

                <div className="space-y-5">
                  {/* WhatsApp / Phone */}
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-1">
                      {isDe
                        ? "WhatsApp & Mobil"
                        : isEs
                          ? "Atención Directa"
                          : "Field Direct Line"}
                    </p>
                    <a
                      href="https://wa.me/996505583958"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-bold text-white hover:text-amber-400 transition-colors flex items-center gap-2"
                    >
                      <Phone size={14} className="text-amber-400" />
                      +996 505 583 958
                    </a>
                  </div>

                  {/* Email Line */}
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-1">
                      {isDe
                        ? "E-Mail Dispatch"
                        : isEs
                          ? "Correo Electrónico"
                          : "Dispatch Email"}
                    </p>
                    <a
                      href="mailto:wildinkyrgyzstan@gmail.com"
                      className="text-sm font-medium text-white hover:text-amber-400 transition-colors flex items-center gap-2"
                    >
                      <Mail size={14} className="text-amber-400" />
                      expeditions@wildinkyrgyzstan.com{" "}
                    </a>
                  </div>

                  {/* Instagram Social Handle */}
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-1">
                      {isDe
                        ? "Visuals & Social"
                        : isEs
                          ? "Archivo Visual"
                          : "Visual Dispatch"}
                    </p>
                    <a
                      href="https://www.instagram.com/wildinkyrgyzstan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-white hover:text-amber-400 transition-colors flex items-center gap-2 group"
                    >
                      <Instagram
                        size={14}
                        className="text-amber-400 group-hover:scale-110 transition-transform"
                      />
                      @wildinkyrgyzstan
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Season / Availability Banner */}
            <div className="mt-10 pt-8 border-t border-white/10">
              <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 block mb-3 font-bold">
                {isDe
                  ? "Saison & Verfügbarkeit"
                  : isEs
                    ? "Temporada Operativa"
                    : "Seasonal Operations"}
              </span>
              <div className="flex flex-wrap gap-x-8 gap-y-2 text-[12px] text-neutral-300 font-serif italic">
                <span>
                  {isDe
                    ? "Pass-Trekking: Juni – September"
                    : isEs
                      ? "Rutas de Montaña: Junio – Septiembre"
                      : "High Altitude Passes: June – September"}
                </span>
                <span>•</span>
                <span>
                  {isDe
                    ? "Kultur & 4x4: Mai – Oktober"
                    : isEs
                      ? "Cultura y 4x4: Mayo – Octubre"
                      : "Culture & 4x4: May – October"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Attribution Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-neutral-400 text-center md:text-left leading-relaxed">
            © 2026 Wild Kyrgyzstan.{" "}
            {isDe
              ? "Alle Rechte vorbehalten."
              : isEs
                ? "Todos los derechos reservados."
                : "All Rights Reserved."}
            <br />
            <a
              href="https://kanatnazarov.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors inline-block mt-1 text-neutral-400"
            >
              <i className="text-[11px] font-serif lowercase tracking-normal">
                Design & Engineering by Kanat Nazarov
              </i>
            </a>
          </p>

          <div className="flex items-center gap-8">
            <Link
              href={`/${lang}/destinations`}
              className="text-[9px] uppercase tracking-[0.3em] text-neutral-400 hover:text-amber-400 transition-colors"
            >
              {isDe ? "Reiseziele" : isEs ? "Destinos" : "Destinations"}
            </Link>
            <Link
              href={`/${lang}/journal`}
              className="text-[9px] uppercase tracking-[0.3em] text-neutral-400 hover:text-amber-400 transition-colors"
            >
              {isDe ? "Tagebuch" : isEs ? "Diario" : "Journal"}
            </Link>
            <a
              href="#contact"
              className="text-[9px] uppercase tracking-[0.3em] text-neutral-400 hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <span>{isDe ? "Kontakt" : isEs ? "Contacto" : "Contact"}</span>
              <ArrowUpRight size={10} />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
