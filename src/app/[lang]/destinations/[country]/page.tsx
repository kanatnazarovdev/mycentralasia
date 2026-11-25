import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { COUNTRIES } from "@/data/centralAsiaData";
import CountryFlag from "@/components/layout/CountryFlag";

export async function generateStaticParams() {
  return COUNTRIES.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const { country: slug } = await params;
  const country = COUNTRIES.find((c) => c.slug === slug);
  if (!country) return { title: "Destination Not Found" };

  return {
    title: `${country.name} Travel Guide, Culture & History`,
    description: country.summary,
  };
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country: slug } = await params;
  const country = COUNTRIES.find((c) => c.slug === slug);
  if (!country) notFound();

  return (
    <div className="mx-auto max-w-7xl px-6 sm:px-8 py-16">
      <div className="border-b border-[#101D2E]/15 pb-10">
        <div className="flex items-center gap-3 font-mono text-xs tracking-[0.22em] text-[#101D2E]/75">
          <CountryFlag code={country.code} className="h-4 w-6" />
          <span>{country.heroPlate}</span>
          <span>•</span>
          <span className="text-[#101D2E]/60">{country.coords}</span>
        </div>

        <h1 className="mt-4 font-serif text-4xl sm:text-6xl text-[#101D2E]">
          {country.name}
        </h1>
        <p className="mt-2 font-mono text-xs tracking-[0.18em] text-[#101D2E]/60 uppercase">
          {country.tagline}
        </p>
        <p className="mt-6 max-w-3xl text-base sm:text-lg text-[#101D2E]/85 leading-relaxed font-light">
          {country.summary}
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 border-b border-[#101D2E]/15 pb-10">
        <div className="border border-[#101D2E]/15 p-6">
          <div className="font-mono text-[10px] tracking-[0.2em] text-[#101D2E]/60">
            CAPITAL CITY
          </div>
          <div className="mt-2 font-serif text-2xl text-[#101D2E]">
            {country.capital}
          </div>
        </div>
        <div className="border border-[#101D2E]/15 p-6">
          <div className="font-mono text-[10px] tracking-[0.2em] text-[#101D2E]/60">
            OPTIMAL TRAVEL WINDOW
          </div>
          <div className="mt-2 text-sm text-[#101D2E]">{country.bestSeason}</div>
        </div>
        <div className="border border-[#101D2E]/15 p-6">
          <div className="font-mono text-[10px] tracking-[0.2em] text-[#101D2E]/60">
            ENTRY & VISA PROTOCOL
          </div>
          <div className="mt-2 text-sm text-[#101D2E]">{country.visaSummary}</div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-mono text-xs tracking-[0.22em] text-[#101D2E]/60 uppercase">
            ESSENTIAL REGIONS & LANDMARKS
          </h2>
          <ul className="mt-4 divide-y divide-[#101D2E]/10 border-t border-b border-[#101D2E]/10">
            {country.highlights.map((item, i) => (
              <li key={i} className="py-3.5 text-sm text-[#101D2E]/85">
                0{i + 1}. {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-[#101D2E]/15 bg-white/75 p-8 flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] tracking-[0.22em] text-[#B84A27] uppercase">
              SIGNATURE CULINARY HERITAGE
            </div>
            <h3 className="mt-2 font-serif text-2xl text-[#101D2E]">
              {country.signatureDish.name}
            </h3>
            <p className="mt-3 text-sm text-[#101D2E]/75 leading-relaxed font-light">
              {country.signatureDish.description}
            </p>
          </div>

          <a
            href="https://www.wildinkyrgyzstan.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-2 bg-[#101D2E] px-5 py-3 font-mono text-[11px] font-semibold tracking-[0.18em] text-[#F5F1E8] uppercase hover:bg-white transition-colors"
          >
            <span>REQUEST CUSTOM {country.name.toUpperCase()} ITINERARY</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
