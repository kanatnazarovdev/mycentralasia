import React from "react";
import type { Metadata } from "next";
import { COUNTRIES } from "@/data/centralAsiaData";
import CountryFlag from "@/components/layout/CountryFlag";

export const metadata: Metadata = {
  title: "Central Asian Cuisine, Recipes & Culinary Heritage",
  description:
    "Discover authentic Central Asian gastronomy: Samarkand Plov, Karakol Dungan Ashlyan-Fu, Kyrgyz Beshbarmak, Kazakh Qazy, and Tajik Qurutob.",
};

export default function CuisinePage() {
  return (
    <div className="mx-auto max-w-7xl px-6 sm:px-8 py-16">
      <div className="border-b border-white/15 pb-10">
        <div className="font-mono text-[11px] tracking-[0.24em] text-sky-400 uppercase">
          CULINARY ARCHIVE & RECIPES
        </div>
        <h1 className="mt-3 font-serif text-4xl sm:text-6xl font-normal text-[#F4F1EA]">
          Gastronomy of the Silk Road
        </h1>
        <p className="mt-4 max-w-2xl text-base text-stone-300 font-light">
          Where nomadic pastoral traditions meet oasis agriculture and Dungan
          noodle craftsmanship.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        {COUNTRIES.map((country) => (
          <div
            key={country.slug}
            className="border border-white/12 bg-white/[0.015] p-8"
          >
            <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.2em] text-stone-400">
              <CountryFlag code={country.code} />
              <span>
                {country.name.toUpperCase()} • {country.signatureDish.origin.toUpperCase()}
              </span>
            </div>
            <h2 className="mt-4 font-serif text-2xl sm:text-3xl text-white">
              {country.signatureDish.name}
            </h2>
            <p className="mt-3 text-sm text-stone-300 leading-relaxed font-light">
              {country.signatureDish.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
