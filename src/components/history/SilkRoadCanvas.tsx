"use client";

import React, { useMemo, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import * as topojson from "topojson-client";
import worldData from "world-atlas/countries-110m.json";

const CENTRAL_ASIA_IDS = new Set(["398", "860", "417", "762", "795"]); // KZ, UZ, KG, TJ, TM
const NEIGHBOR_IDS = new Set(["643", "156", "004", "364", "031"]); // RU, CN, AF, IR, AZ

interface CityStop {
  id: string;
  name: string;
  country: string;
  coords: [number, number]; // [longitude, latitude]
  summary: string;
  labelOffset?: [number, number]; // [dx, dy]
  anchor?: "start" | "end" | "middle";
}

interface EraMap {
  id: string;
  period: string;
  title: string;
  overview: string;
  stops: CityStop[];
}

const ERAS: EraMap[] = [
  {
    id: "oxus",
    period: "2200 BCE – 500 BCE",
    title: "Oxus Oasis & Saka Steppe",
    overview:
      "Bronze Age oasis towns along the Amu Darya trade lapis lazuli and bronze with Saka mounted nomads of the Tian Shan.",
    stops: [
      {
        id: "gonur",
        name: "Gonur Depe (Merv)",
        country: "Turkmenistan",
        coords: [62.19, 37.66],
        summary: "Monumental Bronze Age citadel anchoring the Murghab river oasis.",
        labelOffset: [-10, -10],
        anchor: "end",
      },
      {
        id: "balkh",
        name: "Bactra (Balkh)",
        country: "Oxus Basin",
        coords: [66.89, 36.75],
        summary: "Gateway between Badakhshan lapis lazuli mines and Central Asian river towns.",
        labelOffset: [10, 14],
        anchor: "start",
      },
      {
        id: "fergana",
        name: "Fergana Valley",
        country: "Uzbekistan / Kyrgyzstan",
        coords: [71.78, 40.38],
        summary: "Fertile alpine basin famed across Eurasia for its prized warhorses.",
        labelOffset: [10, 6],
        anchor: "start",
      },
      {
        id: "issyk",
        name: "Issyk Kurgan",
        country: "Kazakhstan",
        coords: [77.46, 43.39],
        summary: "Royal Saka burial mound in the northern Tian Shan foothills.",
        labelOffset: [10, 4],
        anchor: "start",
      },
    ],
  },
  {
    id: "sogdian",
    period: "200 BCE – 800 CE",
    title: "The Sogdian Merchant Network",
    overview:
      "Sogdian traders connect Persia and Byzantium with Tang China through Bukhara, Samarkand, Panjikent, and the Pamir passes.",
    stops: [
      {
        id: "merv",
        name: "Merv",
        country: "Turkmenistan",
        coords: [62.19, 37.66],
        summary: "Western Silk Road gateway linking Iranian empires to Transoxiana.",
        labelOffset: [10, 5],
        anchor: "start",
      },
      {
        id: "bukhara",
        name: "Bukhara",
        country: "Uzbekistan",
        coords: [64.42, 39.77],
        summary: "Major oasis banking center and western anchor of Sogdian merchant guilds.",
        labelOffset: [-10, -8],
        anchor: "end",
      },
      {
        id: "samarkand",
        name: "Samarkand",
        country: "Uzbekistan",
        coords: [66.96, 39.65],
        summary: "Capital of Sogdiana (Afrasiab), renowned for rag paper and silverwork.",
        labelOffset: [0, -14],
        anchor: "middle",
      },
      {
        id: "panjikent",
        name: "Panjikent",
        country: "Tajikistan",
        coords: [67.60, 39.49],
        summary: "Zarafshan valley citadel famous for its painted merchant banquet halls.",
        labelOffset: [10, 15],
        anchor: "start",
      },
      {
        id: "balasagun",
        name: "Balasagun",
        country: "Kyrgyzstan",
        coords: [75.25, 42.74],
        summary: "Northern Silk Road crossroads in the Chu Valley linking steppes and oases.",
        labelOffset: [10, 4],
        anchor: "start",
      },
    ],
  },
  {
    id: "golden",
    period: "800 CE – 1220 CE",
    title: "Islamic Golden Age & Karakhanids",
    overview:
      "Khwarezm, Bukhara, and Balasagun become global centers of algebra, medicine, astronomy, and early Turkic literature.",
    stops: [
      {
        id: "urgench",
        name: "Urgench (Khwarezm)",
        country: "Turkmenistan / Uzbekistan",
        coords: [59.15, 42.31],
        summary: "Lower Amu Darya capital that nurtured mathematicians Al-Khwarizmi and Al-Biruni.",
        labelOffset: [-10, -8],
        anchor: "end",
      },
      {
        id: "bukhara-gold",
        name: "Bukhara",
        country: "Uzbekistan",
        coords: [64.42, 39.77],
        summary: "Samanid intellectual capital where Ibn Sina (Avicenna) studied royal libraries.",
        labelOffset: [-10, 12],
        anchor: "end",
      },
      {
        id: "otrar",
        name: "Otrar",
        country: "Kazakhstan",
        coords: [68.30, 42.85],
        summary: "Syr Darya fortress city famed for its medieval library and philosopher Al-Farabi.",
        labelOffset: [0, -12],
        anchor: "middle",
      },
      {
        id: "balasagun-gold",
        name: "Balasagun (Burana)",
        country: "Kyrgyzstan",
        coords: [75.25, 42.74],
        summary: "Karakhanid capital where Yusuf Balasaguni composed the Kutadgu Bilig.",
        labelOffset: [10, 4],
        anchor: "start",
      },
    ],
  },
  {
    id: "timurid",
    period: "1370 CE – 1507 CE",
    title: "The Timurid Renaissance",
    overview:
      "Samarkand and Bukhara rise as architectural capitals of Eurasia with turquoise domes, madrasahs, and Ulugh Beg's observatory.",
    stops: [
      {
        id: "herat",
        name: "Herat",
        country: "Timurid Khorasan",
        coords: [62.20, 34.35],
        summary: "Center of Persian miniature illumination under Shah Rukh and Bihzad.",
        labelOffset: [-10, 5],
        anchor: "end",
      },
      {
        id: "bukhara-tim",
        name: "Bukhara",
        country: "Uzbekistan",
        coords: [64.42, 39.77],
        summary: "Center of theological colleges and monumental glazed brick architecture.",
        labelOffset: [-10, -8],
        anchor: "end",
      },
      {
        id: "shahrisabz",
        name: "Shahrisabz",
        country: "Uzbekistan",
        coords: [66.83, 39.05],
        summary: "Birthplace of Timur, crowned by the monumental Ak-Saray Palace portal.",
        labelOffset: [10, 15],
        anchor: "start",
      },
      {
        id: "samarkand-tim",
        name: "Samarkand",
        country: "Uzbekistan",
        coords: [66.96, 39.65],
        summary: "Imperial capital housing the Registan, Gur-e-Amir, and Ulugh Beg's Observatory.",
        labelOffset: [10, -8],
        anchor: "start",
      },
      {
        id: "tashkent",
        name: "Tashkent",
        country: "Uzbekistan",
        coords: [69.24, 41.29],
        summary: "Key northern oasis guarding the caravan routes into Transoxiana.",
        labelOffset: [10, 4],
        anchor: "start",
      },
    ],
  },
];

export default function SilkRoadCanvas() {
  const [eraIdx, setEraIdx] = useState(1);
  const [selectedStop, setSelectedStop] = useState<CityStop | null>(null);

  const era = ERAS[eraIdx];
  const activeStop = selectedStop ?? era.stops[0];

  const { features, projection, pathGenerator } = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const topo = worldData as any;
    const allCountries = topojson.feature(topo, topo.objects.countries);

    const proj = geoMercator()
      .center([67.5, 42.5])
      .scale(1050)
      .translate([400, 225]);

    const pathGen = geoPath().projection(proj);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const list = (allCountries as any).features.filter(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (f: any) => CENTRAL_ASIA_IDS.has(String(f.id)) || NEIGHBOR_IDS.has(String(f.id))
    );

    return { features: list, projection: proj, pathGenerator: pathGen };
  }, []);

  const projectedStops = era.stops.map((stop) => {
    const pt = projection(stop.coords) || [0, 0];
    return { ...stop, x: pt[0], y: pt[1] };
  });

  const routeD = projectedStops
    .map((pt, i) => `${i === 0 ? "M" : "L"} ${pt.x.toFixed(1)},${pt.y.toFixed(1)}`)
    .join(" ");

  return (
    <section className="mx-auto max-w-7xl px-6 sm:px-8 py-12">
      <div className="border border-[#101D2E]/20 bg-[#F5F1E8]">
        {/* Era Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-[#101D2E]/15 bg-[#EBE4D5]/60">
          {ERAS.map((item, idx) => {
            const active = idx === eraIdx;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setEraIdx(idx);
                  setSelectedStop(null);
                }}
                className={`p-4 sm:p-5 text-left border-r border-[#101D2E]/15 last:border-r-0 transition-colors ${
                  active
                    ? "bg-[#101D2E] text-[#F5F1E8]"
                    : "hover:bg-[#EBE4D5] text-[#101D2E]"
                }`}
              >
                <div
                  className={`font-mono text-[10px] tracking-[0.2em] uppercase ${
                    active ? "text-[#E68A6E]" : "text-[#B84A27]"
                  }`}
                >
                  {item.period}
                </div>
                <div className="mt-1 font-serif text-base sm:text-lg leading-snug">
                  {item.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Map + Editorial Side Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-8 relative bg-[#DCE5EC] border-b lg:border-b-0 lg:border-r border-[#101D2E]/15 overflow-hidden">
            <svg
              viewBox="0 0 800 450"
              className="w-full h-auto block select-none"
              role="img"
              aria-label="Geographically accurate Silk Road map of Central Asia"
            >
              {/* Geographic Country Polygons */}
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {features.map((feat: any, i: number) => {
                const isCore = CENTRAL_ASIA_IDS.has(String(feat.id));
                return (
                  <path
                    key={feat.id || i}
                    d={pathGenerator(feat) || ""}
                    fill={isCore ? "#F5F1E8" : "#E8E1D3"}
                    stroke="#101D2E"
                    strokeOpacity={isCore ? 0.35 : 0.14}
                    strokeWidth={isCore ? 1.1 : 0.7}
                  />
                );
              })}

              {/* Silk Road Caravan Route */}
              <path
                d={routeD}
                fill="none"
                stroke="#B84A27"
                strokeWidth="2.4"
                strokeDasharray="6 5"
              />

              {/* Exact Lat/Lng City Pins */}
              {projectedStops.map((stop) => {
                const isSelected = activeStop.id === stop.id;
                const [dx, dy] = stop.labelOffset ?? [9, 4];
                return (
                  <g
                    key={stop.id}
                    onClick={() => setSelectedStop(stop)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={stop.x}
                      cy={stop.y}
                      r={isSelected ? 12 : 8}
                      fill={isSelected ? "#B84A27" : "#101D2E"}
                      fillOpacity={isSelected ? 0.22 : 0.12}
                    />
                    <circle
                      cx={stop.x}
                      cy={stop.y}
                      r={isSelected ? 5.5 : 4.2}
                      fill={isSelected ? "#B84A27" : "#101D2E"}
                      stroke="#F5F1E8"
                      strokeWidth="1.5"
                    />
                    <text
                      x={stop.x + dx}
                      y={stop.y + dy}
                      textAnchor={stop.anchor ?? "start"}
                      fill={isSelected ? "#B84A27" : "#101D2E"}
                      stroke="#F5F1E8"
                      strokeWidth="3.5"
                      strokeLinejoin="round"
                      style={{ paintOrder: "stroke" }}
                      fontSize="11.5"
                      fontWeight={isSelected ? "700" : "600"}
                      fontFamily="sans-serif"
                    >
                      {stop.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Right Editorial & City Inspector Column */}
          <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between bg-[#F5F1E8]">
            <div>
              <div className="font-mono text-[10px] tracking-[0.22em] text-[#B84A27] uppercase">
                ERA OVERVIEW • {era.period}
              </div>
              <h3 className="mt-2 font-serif text-2xl text-[#101D2E]">
                {era.title}
              </h3>
              <p className="mt-3 text-sm text-[#101D2E]/80 leading-relaxed font-light">
                {era.overview}
              </p>

              <div className="mt-6 border-t border-[#101D2E]/15 pt-5">
                <div className="font-mono text-[10px] tracking-[0.2em] text-[#0F4C81] uppercase">
                  SELECTED SITE • {activeStop.country}
                </div>
                <div className="mt-1 font-serif text-xl text-[#101D2E]">
                  {activeStop.name}
                </div>
                <p className="mt-2 text-xs sm:text-sm text-[#101D2E]/75 leading-relaxed">
                  {activeStop.summary}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#101D2E]/10">
              <div className="font-mono text-[9px] tracking-[0.2em] text-[#101D2E]/50 uppercase mb-2">
                SELECT A HISTORICAL HUB
              </div>
              <div className="flex flex-wrap gap-1.5">
                {era.stops.map((stop) => (
                  <button
                    key={stop.id}
                    type="button"
                    onClick={() => setSelectedStop(stop)}
                    className={`px-2.5 py-1 font-mono text-[10px] tracking-wider uppercase border transition-colors ${
                      activeStop.id === stop.id
                        ? "border-[#101D2E] bg-[#101D2E] text-[#F5F1E8]"
                        : "border-[#101D2E]/20 text-[#101D2E]/80 hover:border-[#101D2E]"
                    }`}
                  >
                    {stop.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}