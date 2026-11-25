cat << 'SCRIPT_EOF' > build-full-platform.sh
#!/usr/bin/env bash
set -e

echo "🚀 Building complete MyCentralAsia.com platform..."

if [ -d "src/app" ]; then
  BASE="src"
else
  BASE="."
fi

# Detect if [lang] dynamic segment exists
LANG_DIR=""
if [ -d "$BASE/app/[lang]" ]; then
  LANG_DIR="$BASE/app/[lang]"
  echo "🌐 Detected [lang] routing at: $LANG_DIR"
fi

TARGETS=("$BASE/app")
if [ -n "$LANG_DIR" ]; then
  TARGETS+=("$LANG_DIR")
fi

mkdir -p "$BASE/data"
mkdir -p "$BASE/components/layout"
mkdir -p "$BASE/components/home"
mkdir -p "$BASE/components/seo"

for T in "${TARGETS[@]}"; do
  mkdir -p "$T/news/[slug]"
  mkdir -p "$T/history"
  mkdir -p "$T/cuisine"
  mkdir -p "$T/destinations/[country]"
  mkdir -p "$T/expeditions"
done

# ==============================================================================
# 1. DATA REPOSITORY
# ==============================================================================
cat << 'EOF' > "$BASE/data/centralAsiaData.ts"
export type CountryCode = "UZ" | "KZ" | "KG" | "TJ" | "TM";

export interface CountryProfile {
  slug: string;
  code: CountryCode;
  name: string;
  tagline: string;
  capital: string;
  coords: string;
  bestSeason: string;
  visaSummary: string;
  accentHex: string;
  heroPlate: string;
  summary: string;
  highlights: string[];
  signatureDish: {
    name: string;
    origin: string;
    description: string;
  };
}

export interface ArticleItem {
  slug: string;
  title: string;
  subtitle: string;
  category: "HISTORY" | "CUISINE" | "CULTURE" | "DISPATCH" | "EXPEDITIONS";
  country: string;
  countryCode: CountryCode;
  publishedAt: string;
  readTime: string;
  author: string;
  excerpt: string;
  content: string[];
  seoKeywords: string[];
}

export interface HistoryEra {
  period: string;
  yearRange: string;
  title: string;
  region: string;
  summary: string;
  keyArtifact: string;
}

export interface ExpeditionPackage {
  id: string;
  title: string;
  countries: string[];
  duration: string;
  difficulty: "Moderate" | "Challenging" | "Cultural";
  season: string;
  priceFrom: string;
  summary: string;
  bookingUrl: string;
}

export const COUNTRIES: CountryProfile[] = [
  {
    slug: "kyrgyzstan",
    code: "KG",
    name: "Kyrgyzstan",
    tagline: "The Celestial Tian Shan & Nomadic Heartland",
    capital: "Bishkek",
    coords: "41°50'29\"N 75°07'43\"E",
    bestSeason: "June – September (High Alpine Passes)",
    visaSummary: "Visa-free up to 60 days for 60+ nationalities including US, UK, EU.",
    accentHex: "#E8112D",
    heroPlate: "PLATE I — SONG-KUL ALPINE BASIN",
    summary:
      "Over 90% mountainous, Kyrgyzstan preserves living nomadic pastoralism across high-altitude jailoo pastures, glacial lakes like Song-Kul and Kel-Suu, and ancient Silk Road caravanserais.",
    highlights: [
      "Song-Kul Lake High-Altitude Yurt Camps (3,016m)",
      "Karakol Dungan & Uyghur Culinary Corridor",
      "Tash Rabat 15th-Century Stone Caravanserai",
      "Altyn-Arashan & Ala-Kul Glacial Trekking",
    ],
    signatureDish: {
      name: "Karakol Ashlyan-Fu & Beshbarmak",
      origin: "Issyk-Kul & Naryn",
      description:
        "Cold spicy starch-noodle soup brought by Dungan migrants alongside slow-simmered nomadic lamb served over hand-rolled pasta sheets.",
    },
  },
  {
    slug: "uzbekistan",
    code: "UZ",
    name: "Uzbekistan",
    tagline: "Timurid Geometry & The Oasis Cities of the Silk Road",
    capital: "Tashkent",
    coords: "39°39'15\"N 66°57'35\"E",
    bestSeason: "March – May & September – November",
    visaSummary: "Visa-free or streamlined e-Visa for most global travelers.",
    accentHex: "#0099B5",
    heroPlate: "PLATE II — REGISTAN, SAMARKAND",
    summary:
      "Home to Samarkand, Bukhara, and Khiva—the monumental intellectual and architectural crossroads where astronomers, poets, and merchants connected East Asia to the Mediterranean.",
    highlights: [
      "Registan Square & Shah-i-Zinda Necropolis (Samarkand)",
      "Historic Walled City of Itchan Kala (Khiva)",
      "Lyabi-Hauz & Trading Domes of Bukhara",
      "High-Speed Afrosiyob Silk Road Rail Corridor",
    ],
    signatureDish: {
      name: "Samarkand Zighir Plov",
      origin: "Samarkand & Fergana Valley",
      description:
        "Layered heirloom rice cooked in copper kazans with flaxseed oil, yellow carrots, chickpeas, cumin, and tender lamb.",
    },
  },
  {
    slug: "kazakhstan",
    code: "KZ",
    name: "Kazakhstan",
    tagline: "Infinite Steppe, Red Canyons & Modern Eurasian Hub",
    capital: "Astana",
    coords: "43°21'08\"N 79°04'44\"E",
    bestSeason: "April – October",
    visaSummary: "Visa-free up to 30 days for US, EU, UK, UAE, and ASEAN citizens.",
    accentHex: "#FEC50C",
    heroPlate: "PLATE III — CHARYN CANYON",
    summary:
      "The world's ninth-largest nation spans dramatic red-rock canyons, alpine lakes outside Almaty, subterranean mosques in Mangystau, and a rapidly growing tech and creative capital.",
    highlights: [
      "Charyn Canyon Valley of Castles",
      "Kolsai & Kaindy Submerged Forest Lakes",
      "Bozjyra Chalk Formations (Mangystau)",
      "Almaty Specialty Coffee & Neo-Nomadic Gastronomy",
    ],
    signatureDish: {
      name: "Qazy & Baursak",
      origin: "Great Steppe",
      description:
        "Artisanal cured horse-meat delicacy served with golden pillowy fried dough and fermented mare's milk (Kymyz).",
    },
  },
  {
    slug: "tajikistan",
    code: "TJ",
    name: "Tajikistan",
    tagline: "The Roof of the World & Wakhan Corridor",
    capital: "Dushanbe",
    coords: "37°29'23\"N 71°33'11\"E",
    bestSeason: "June – September",
    visaSummary: "E-Visa + GBAO Pamir Permit easily obtainable online.",
    accentHex: "#1EB53A",
    heroPlate: "PLATE IV — PAMIR HIGHWAY (M41)",
    summary:
      "Anchored by the Pamir Mountains—known for millennia as Bam-i-Dunya (Roof of the World)—Tajikistan offers ancient Sogdian ruins, Wakhi hospitality, and passes exceeding 4,600 meters.",
    highlights: [
      "M41 Pamir Highway & Ak-Baital Pass (4,655m)",
      "Wakhan Valley Fortresses overlooking the Hindu Kush",
      "Fann Mountains & Seven Lakes (Haft Kul)",
      "Ancient Sogdian Murals of Penjikent",
    ],
    signatureDish: {
      name: "Qurutob",
      origin: "Dushanbe & Khatlon",
      description:
        "Flaky layered flatbread soaked in tangy melted qurut cheese sauce, topped with caramelized onions, fresh herbs, and flax oil.",
    },
  },
  {
    slug: "turkmenistan",
    code: "TM",
    name: "Turkmenistan",
    tagline: "Karakum Desert & Ancient Parthian Capitals",
    capital: "Ashgabat",
    coords: "40°15'09\"N 58°26'22\"E",
    bestSeason: "March – May & October – November",
    visaSummary: "Requires Letter of Invitation (LOI) via licensed regional operator.",
    accentHex: "#2DD4BF",
    heroPlate: "PLATE V — DARVAZA, KARAKUM",
    summary:
      "From the Bronze Age oasis of Merv to the marble avenues of Ashgabat and the burning Darvaza gas crater in the Karakum Desert, Turkmenistan remains Central Asia's most enigmatic frontier.",
    highlights: [
      "Ancient Merv UNESCO Archaeological Park",
      "Darvaza Desert Crater Overnight Camp",
      "Yangykala Canyon Crimson Cliffs",
      "Akhal-Teke Golden Horse Heritage",
    ],
    signatureDish: {
      name: "Ichlekli & Chorek",
      origin: "Karakum Oasis",
      description:
        "Desert meat-and-onion pie traditionally baked beneath hot sand and embers alongside tamdyr flatbread.",
    },
  },
];

export const ARTICLES: ArticleItem[] = [
  {
    slug: "dungan-culinary-trail-karakol",
    title: "The Dungan Culinary Trail: How 19th-Century Silk Road Migrants Shaped Karakol's Kitchens",
    subtitle: "Tracing hand-pulled lagman, cold ashlyan-fu, and Sichuan-Tian Shan spice fusions along Issyk-Kul.",
    category: "CUISINE",
    country: "Kyrgyzstan",
    countryCode: "KG",
    publishedAt: "2026-11-24",
    readTime: "7 MIN READ",
    author: "Editorial Desk • Bishkek",
    excerpt:
      "At dawn in Karakol's Bugu Bazaar, bowls of chilled starch noodles doused in fiery garlic vinegar tell a story of migration across the Tian Shan passes.",
    content: [
      "Every morning before 7:00 AM in Karakol, on the eastern shore of Lake Issyk-Kul, steam rises from aluminum cauldrons while trays of translucent, hand-cut starch noodles cool on wooden counters. This is the epicenter of Ashlyan-Fu—a dish that exists nowhere else in the world in quite this form.",
      "Brought across the Bedel and Torugart mountain passes in the late 1870s by Dungan families migrating from Shaanxi and Gansu provinces, Dungan cuisine fused northwestern Chinese noodle craft with high-altitude Kyrgyz mountain produce, wild garlic, and coriander.",
      "For travelers crossing Central Asia, understanding Karakol's table is essential: it reveals that the Silk Road was never a single highway, but an intimate exchange of seeds, fermentation techniques, and hearth traditions that still define daily life today.",
    ],
    seoKeywords: [
      "Dungan cuisine Karakol",
      "Central Asian food guide",
      "Ashlyan-fu Kyrgyzstan recipe",
      "Silk Road culinary history",
    ],
  },
  {
    slug: "timurid-astronomy-samarkand-ulugh-beg",
    title: "Stone & Starlight: How Ulugh Beg Built the World's Most Accurate Observatory in 1420",
    subtitle: "Inside Samarkand's golden age of mathematics, turquoise tilework, and celestial cartography.",
    category: "HISTORY",
    country: "Uzbekistan",
    countryCode: "UZ",
    publishedAt: "2026-11-22",
    readTime: "9 MIN READ",
    author: "Archive Division • Samarkand",
    excerpt:
      "Decades before European telescopes, Timurid scholars in Samarkand calculated the length of the sidereal year to within 58 seconds.",
    content: [
      "While most visitors to Samarkand gaze upward at the soaring turquoise pishtaks of Registan Square, one of the city's greatest intellectual monuments plunges deep into the bedrock of Kuhak Hill.",
      "Constructed in the 1420s under the ruler-astronomer Ulugh Beg, the Samarkand Observatory housed a subterranean marble sextant with a radius of 40 meters. Working alongside mathematician Jamshid al-Kashi, Ulugh Beg cataloged 1,018 stars in the Zij-i Sultani—the most comprehensive astronomical table produced between Ptolemy and Tycho Brahe.",
      "The geometry seen on Samarkand's madrasahs is not merely decorative; it is applied mathematics rendered in glazed terracotta and lapis lazuli.",
    ],
    seoKeywords: [
      "Samarkand history",
      "Ulugh Beg observatory",
      "Silk Road architecture Uzbekistan",
      "Timurid renaissance",
    ],
  },
  {
    slug: "overland-border-guide-almaty-bishkek-tashkent",
    title: "2026 Overland Field Dispatch: Navigating the Almaty – Bishkek – Tashkent Corridor",
    subtitle: "Border crossings, high-speed rail connections, seasonal mountain passes, and SIM logistics.",
    category: "DISPATCH",
    country: "Kazakhstan",
    countryCode: "KZ",
    publishedAt: "2026-11-20",
    readTime: "6 MIN READ",
    author: "Field Operations",
    excerpt:
      "Planning a multi-country Silk Road itinerary requires timing mountain pass openings with lowland rail schedules. Here is our verified field protocol.",
    content: [
      "The classic Central Asian overland arc connects Kazakhstan's cultural capital Almaty, Kyrgyzstan's alpine basin around Bishkek and Song-Kul, and Uzbekistan's architectural triad of Tashkent, Samarkand, and Bukhara.",
      "The Korday land border between Almaty and Bishkek remains the fastest transit point (3.5 to 4.5 hours door-to-door), while overnight sleeper trains and regional flights bridge Bishkek to Tashkent in under 90 minutes.",
      "When combining high-altitude horse trekking in Kyrgyzstan with cultural exploration in Uzbekistan, schedule your alpine segments between mid-June and mid-September when passes above 3,000 meters are free of snowpack.",
    ],
    seoKeywords: [
      "Central Asia travel itinerary",
      "Almaty to Bishkek border crossing",
      "Silk Road overland route",
      "Best time to visit Central Asia",
    ],
  },
  {
    slug: "pamir-highway-wakhan-corridor-protocol",
    title: "Crossing the Roof of the World: Field Notes from the M41 Pamir Highway",
    subtitle: "Altitude acclimatization, GBAO permits, and homestay etiquette along the Panj River.",
    category: "EXPEDITIONS",
    country: "Tajikistan",
    countryCode: "TJ",
    publishedAt: "2026-11-18",
    readTime: "8 MIN READ",
    author: "High-Altitude Unit",
    excerpt:
      "Tracing the Panj River border with Afghanistan's Wakhan Corridor reveals ancient Kushan fortresses and unmatched Pamiri hospitality.",
    content: [
      "Stretching from Dushanbe through Khorog and Murghab to Osh in Kyrgyzstan, the M41 Pamir Highway climbs over Ak-Baital Pass at 4,655 meters—making it the second-highest international highway in the world.",
      "Traveling the southern Wakhan loop rewards slow pacing: staying in traditional Pamiri chid homes built around five symbolic wooden pillars representing Zoroastrian and Ismaili heritage.",
    ],
    seoKeywords: [
      "Pamir Highway guide",
      "Wakhan Corridor Tajikistan",
      "GBAO permit Tajikistan",
      "Central Asia expedition",
    ],
  },
];

export const HISTORY_TIMELINE: HistoryEra[] = [
  {
    period: "BRONZE AGE & OXUS CIVILIZATION",
    yearRange: "2200 – 1700 BCE",
    title: "The Bactria–Margiana Archaeological Complex (BMAC)",
    region: "Turkmenistan • Uzbekistan • Tajikistan",
    summary:
      "Fortified mud-brick oasis settlements in the Karakum and Amu Darya basin pioneer sophisticated irrigation, bronze metallurgy, and early trans-Eurasian trade.",
    keyArtifact: "Gonur Depe Royal Necropolis & Altyndepe Seals",
  },
  {
    period: "SOGDIAN MERCHANT NETWORKS",
    yearRange: "4th – 8th Century CE",
    title: "Masters of the Silk Road",
    region: "Samarkand • Penjikent • Bukhara",
    summary:
      "Sogdian city-states establish the lingua franca of Silk Road commerce from Constantinople to Chang'an, patronizing vibrant fresco art and religious pluralism.",
    keyArtifact: "Afrasiab Royal Ambassadors Murals, Samarkand",
  },
  {
    period: "ISLAMIC GOLDEN AGE & KARAKHANIDS",
    yearRange: "9th – 12th Century CE",
    title: "The Transoxiana Enlightenment",
    region: "Bukhara • Balasagun • Uzgen",
    summary:
      "Polymaths Ibn Sina (Avicenna), Al-Khwarizmi, and Al-Biruni revolutionize medicine, algebra, and astronomy while Karakhanid minarets rise across the Tian Shan foothills.",
    keyArtifact: "Burana Tower & Kalyan Minaret",
  },
  {
    period: "THE TIMURID RENAISSANCE",
    yearRange: "1370 – 1507 CE",
    title: "Architecture of Cobalt & Gold",
    region: "Samarkand • Shakhrisabz • Herat",
    summary:
      "Artisans from across Asia converge on Samarkand to construct monumental ribbed domes, glazed muqarnas vaults, and Ulugh Beg's astronomical observatory.",
    keyArtifact: "Registan Ensemble & Gur-e-Amir Mausoleum",
  },
  {
    period: "NOMADIC CONFEDERATIONS & MODERN SOVEREIGNTY",
    yearRange: "18th Century – Present",
    title: "Steppe, Mountain & Modern Eurasia",
    region: "Kazakhstan • Kyrgyzstan • Uzbekistan • Tajikistan • Turkmenistan",
    summary:
      "Preservation of oral epics like the Trilogy of Manas, nomadic horsemanship, and the emergence of five independent nations shaping modern Eurasian connectivity.",
    keyArtifact: "Epic of Manas & World Nomad Games Heritage",
  },
];

export const EXPEDITIONS: ExpeditionPackage[] = [
  {
    id: "kg-nomad-traverse",
    title: "Tian Shan High-Altitude Horse & Yurt Traverse",
    countries: ["Kyrgyzstan"],
    duration: "10 Days",
    difficulty: "Moderate",
    season: "June – September",
    priceFrom: "$1,850",
    summary:
      "Ride across alpine jailoo pastures to Song-Kul Lake (3,016m), cross glaciated passes into Kel-Suu Canyon, and dine with Dungan families in Karakol.",
    bookingUrl: "https://www.wildinkyrgyzstan.com",
  },
  {
    id: "silk-road-dual",
    title: "Nomads & Oases: Kyrgyzstan to Samarkand Overland",
    countries: ["Kyrgyzstan", "Uzbekistan"],
    duration: "14 Days",
    difficulty: "Cultural",
    season: "May – October",
    priceFrom: "$2,690",
    summary:
      "Combine wild alpine yurt camps in the Tian Shan with the Fergana Valley craft corridor and Samarkand's Timurid architectural masterpieces.",
    bookingUrl: "https://www.wildinkyrgyzstan.com",
  },
  {
    id: "pamir-sky-road",
    title: "Pamir Highway & Alay Valley Expedition",
    countries: ["Kyrgyzstan", "Tajikistan"],
    duration: "12 Days",
    difficulty: "Challenging",
    season: "July – September",
    priceFrom: "$2,450",
    summary:
      "From Osh through the 4,655m Ak-Baital Pass into the Wakhan Valley—experiencing Tajik Pamiri hospitality and dramatic 7,000m peaks.",
    bookingUrl: "https://www.wildinkyrgyzstan.com",
  },
];
EOF

# ==============================================================================
# 2. VECTOR COUNTRY FLAGS
# ==============================================================================
cat << 'EOF' > "$BASE/components/layout/CountryFlag.tsx"
import React from "react";
import { CountryCode } from "@/data/centralAsiaData";

export default function CountryFlag({
  code,
  className = "h-3.5 w-5",
}: {
  code: CountryCode;
  className?: string;
}) {
  switch (code) {
    case "UZ":
      return (
        <svg viewBox="0 0 24 16" className={`${className} rounded-[1.5px] shrink-0`} aria-hidden="true">
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
        <svg viewBox="0 0 24 16" className={`${className} rounded-[1.5px] shrink-0`} aria-hidden="true">
          <rect width="24" height="16" fill="#00AFCA" />
          <rect width="1.6" height="16" x="1.5" fill="#FEC50C" opacity="0.85" />
          <circle cx="12.5" cy="7.5" r="2.8" fill="#FEC50C" />
          <path d="M9.5 11.2 Q12.5 13 15.5 11.2" stroke="#FEC50C" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "KG":
      return (
        <svg viewBox="0 0 24 16" className={`${className} rounded-[1.5px] shrink-0`} aria-hidden="true">
          <rect width="24" height="16" fill="#E8112D" />
          <circle cx="12" cy="8" r="3.4" fill="#FFEF00" />
          <circle cx="12" cy="8" r="2.1" fill="#E8112D" />
          <path d="M10.4 6.8 Q12 8.2 13.6 6.8 M10.4 9.2 Q12 7.8 13.6 9.2" stroke="#FFEF00" strokeWidth="0.7" fill="none" />
        </svg>
      );
    case "TJ":
      return (
        <svg viewBox="0 0 24 16" className={`${className} rounded-[1.5px] shrink-0`} aria-hidden="true">
          <rect width="24" height="4.6" y="0" fill="#CC0000" />
          <rect width="24" height="6.8" y="4.6" fill="#FFFFFF" />
          <rect width="24" height="4.6" y="11.4" fill="#006600" />
          <path d="M10.2 8.6 Q12 7.2 13.8 8.6" stroke="#F8C300" strokeWidth="1.1" fill="none" strokeLinecap="round" />
          <circle cx="12" cy="6.6" r="0.6" fill="#F8C300" />
        </svg>
      );
    case "TM":
      return (
        <svg viewBox="0 0 24 16" className={`${className} rounded-[1.5px] shrink-0`} aria-hidden="true">
          <rect width="24" height="16" fill="#00843D" />
          <rect width="3.5" height="16" x="3.2" fill="#D22630" />
          <circle cx="10.5" cy="5.5" r="2" fill="#FFFFFF" />
          <circle cx="11.3" cy="5.1" r="1.7" fill="#00843D" />
        </svg>
      );
  }
}
EOF

# ==============================================================================
# 3. GLOBAL HEADER & FOOTER
# ==============================================================================
cat << 'EOF' > "$BASE/components/layout/SiteHeader.tsx"
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import { COUNTRIES } from "@/data/centralAsiaData";
import CountryFlag from "./CountryFlag";

export default function SiteHeader() {
  const pathname = usePathname();
  const [destinationsOpen, setDestinationsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "JOURNAL & NEWS", href: "/news" },
    { label: "SILK ROAD HISTORY", href: "/history" },
    { label: "CUISINE", href: "/cuisine" },
    { label: "EXPEDITIONS", href: "/expeditions" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/12 bg-[#08090B]/90 backdrop-blur-xl text-[#F4F1EA]">
      <div className="hidden lg:block border-b border-white/[0.06] bg-[#050608]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-2 font-mono text-[10px] tracking-[0.2em] text-stone-400">
          <div className="flex items-center gap-5">
            <span>CENTRAL ASIA DIGITAL ARCHIVE & TRAVEL PORTAL</span>
            <span className="text-stone-600">|</span>
            <div className="flex items-center gap-3">
              {COUNTRIES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/destinations/${c.slug}`}
                  className="flex items-center gap-1.5 hover:text-[#F4F1EA] transition-colors"
                >
                  <CountryFlag code={c.code} className="h-2.5 w-3.5" />
                  <span>{c.code}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="https://instagram.com/mycentralasia.co"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              @MYCENTRALASIA.CO
            </a>
            <a
              href="https://www.wildinkyrgyzstan.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-amber-300/90 hover:text-amber-200 transition-colors"
            >
              <span>FIELD OPERATOR: WILD KYRGYZSTAN</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="font-serif text-xl sm:text-2xl tracking-[0.16em] uppercase text-[#F4F1EA]">
            MYCENTRALASIA
          </span>
          <span className="hidden sm:inline-block border border-white/15 px-1.5 py-0.5 font-mono text-[9px] tracking-[0.2em] text-stone-400">
            .COM
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 font-mono text-[11px] tracking-[0.18em]">
          <div
            className="relative"
            onMouseEnter={() => setDestinationsOpen(true)}
            onMouseLeave={() => setDestinationsOpen(false)}
          >
            <button
              type="button"
              onClick={() => setDestinationsOpen(!destinationsOpen)}
              className={`flex items-center gap-1.5 py-2 transition-colors ${
                pathname?.includes("/destinations")
                  ? "text-white font-semibold"
                  : "text-stone-300 hover:text-white"
              }`}
            >
              <span>THE 5 STANS</span>
              <ChevronDown className="h-3.5 w-3.5 opacity-70" />
            </button>

            {destinationsOpen && (
              <div className="absolute left-0 top-full w-80 border border-white/15 bg-[#0B0D11] p-2 shadow-2xl">
                {COUNTRIES.map((country) => (
                  <Link
                    key={country.slug}
                    href={`/destinations/${country.slug}`}
                    onClick={() => setDestinationsOpen(false)}
                    className="flex items-start gap-3 p-3 hover:bg-white/[0.05] transition-colors"
                  >
                    <CountryFlag code={country.code} className="h-3.5 w-5 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold tracking-wider text-[#F4F1EA] uppercase">
                        {country.name}
                      </div>
                      <div className="mt-0.5 font-sans text-[11px] tracking-normal text-stone-400 line-clamp-1">
                        {country.tagline}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navItems.map((item) => {
            const active = pathname?.endsWith(item.href) || pathname?.includes(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`py-2 transition-colors ${
                  active
                    ? "border-b border-[#F4F1EA] text-white font-semibold"
                    : "text-stone-300 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://www.wildinkyrgyzstan.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#F4F1EA] px-4 py-2 font-mono text-[10px] font-semibold tracking-[0.18em] text-[#08090B] uppercase hover:bg-white transition-colors"
          >
            <span>BOOK EXPEDITION</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-stone-300 hover:text-white"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#08090B] px-6 py-6 space-y-6">
          <div className="space-y-3">
            <div className="font-mono text-[10px] tracking-[0.2em] text-stone-500">
              REGIONAL GUIDES
            </div>
            <div className="grid grid-cols-2 gap-2">
              {COUNTRIES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/destinations/${c.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 border border-white/10 px-3 py-2 font-mono text-xs text-stone-200"
                >
                  <CountryFlag code={c.code} />
                  <span>{c.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-3 border-t border-white/10 pt-4 font-mono text-xs tracking-[0.18em]">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 text-stone-200 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
EOF

cat << 'EOF' > "$BASE/components/layout/SiteFooter.tsx"
import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { COUNTRIES } from "@/data/centralAsiaData";
import CountryFlag from "./CountryFlag";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/15 bg-[#050608] text-[#F4F1EA]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="font-serif text-xl tracking-[0.18em] uppercase">
              MYCENTRALASIA.COM
            </div>
            <p className="text-sm text-stone-400 leading-relaxed font-light">
              An independent digital publication and cultural archive documenting
              the history, culinary traditions, and overland expedition routes of
              Central Asia.
            </p>
            <div className="pt-2 font-mono text-[11px] tracking-[0.16em] text-stone-400">
              BISHKEK • SAMARKAND • ALMATY • DUSHANBE
            </div>
          </div>

          <div>
            <h3 className="font-mono text-[11px] tracking-[0.22em] text-stone-400 uppercase mb-4">
              DESTINATIONS
            </h3>
            <ul className="space-y-2.5 text-sm">
              {COUNTRIES.map((country) => (
                <li key={country.slug}>
                  <Link
                    href={`/destinations/${country.slug}`}
                    className="inline-flex items-center gap-2.5 text-stone-300 hover:text-white transition-colors"
                  >
                    <CountryFlag code={country.code} className="h-3 w-4.5" />
                    <span>{country.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[11px] tracking-[0.22em] text-stone-400 uppercase mb-4">
              EDITORIAL ARCHIVE
            </h3>
            <ul className="space-y-2.5 text-sm text-stone-300">
              <li>
                <Link href="/news" className="hover:text-white transition-colors">
                  Latest Dispatches & News
                </Link>
              </li>
              <li>
                <Link href="/history" className="hover:text-white transition-colors">
                  Silk Road Historical Timeline
                </Link>
              </li>
              <li>
                <Link href="/cuisine" className="hover:text-white transition-colors">
                  Central Asian Gastronomy & Recipes
                </Link>
              </li>
              <li>
                <Link href="/expeditions" className="hover:text-white transition-colors">
                  Overland Routes & Guided Tours
                </Link>
              </li>
            </ul>
          </div>

          <div className="border border-white/15 bg-white/[0.02] p-6">
            <div className="font-mono text-[10px] tracking-[0.22em] text-amber-300 uppercase">
              OFFICIAL EXPEDITION PARTNER
            </div>
            <h4 className="mt-2 font-serif text-lg text-white">
              WildInKyrgyzstan.com
            </h4>
            <p className="mt-2 text-xs text-stone-400 leading-relaxed">
              Curated high-altitude horse treks, nomadic yurt camps, and
              custom overland expeditions across the Tian Shan and Pamirs.
            </p>
            <a
              href="https://www.wildinkyrgyzstan.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 border-b border-white pb-0.5 font-mono text-[11px] tracking-[0.16em] text-white hover:text-amber-300 hover:border-amber-300 transition-colors"
            >
              <span>EXPLORE TOURS</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6 font-mono text-[11px] tracking-[0.16em] text-stone-500">
          <div>© {new Date().getFullYear()} MYCENTRALASIA.COM. ALL RIGHTS RESERVED.</div>
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/mycentralasia.co"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-300 transition-colors"
            >
              INSTAGRAM
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-300 transition-colors"
            >
              LINKEDIN
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
EOF

# ==============================================================================
# 4. HOME SECTIONS: HERO, ABOUT MANIFESTO, HISTORY CHRONICLE
# ==============================================================================
cat << 'EOF' > "$BASE/components/home/CinemaHero.tsx"
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import CountryFlag from "@/components/layout/CountryFlag";

const HERO_CHAPTERS = [
  {
    id: "kg",
    code: "KG" as const,
    name: "Kyrgyzstan",
    slug: "kyrgyzstan",
    plate: "PLATE I — SONG-KUL ALPINE BASIN",
    coords: "41°50'29\"N 75°07'43\"E",
    video: "/videos/kyrgyzstan.mp4",
    accentHex: "#E8112D",
    barClass: "bg-[#E8112D]",
  },
  {
    id: "uz",
    code: "UZ" as const,
    name: "Uzbekistan",
    slug: "uzbekistan",
    plate: "PLATE II — REGISTAN, SAMARKAND",
    coords: "39°39'15\"N 66°57'35\"E",
    video: "/videos/uzbekistan.mp4",
    accentHex: "#38BDF8",
    barClass: "bg-[#0099B5]",
  },
  {
    id: "kz",
    code: "KZ" as const,
    name: "Kazakhstan",
    slug: "kazakhstan",
    plate: "PLATE III — CHARYN CANYON",
    coords: "43°21'08\"N 79°04'44\"E",
    video: "/videos/kazakhstan.mp4",
    accentHex: "#FEC50C",
    barClass: "bg-[#FEC50C]",
  },
  {
    id: "tj",
    code: "TJ" as const,
    name: "Tajikistan",
    slug: "tajikistan",
    plate: "PLATE IV — PAMIR HIGHWAY",
    coords: "37°29'23\"N 71°33'11\"E",
    video: "/videos/tajikistan.mp4",
    accentHex: "#4ADE80",
    barClass: "bg-[#1EB53A]",
  },
];

export default function CinemaHero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_CHAPTERS.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  const current = HERO_CHAPTERS[activeIndex];

  return (
    <section className="relative min-h-[86vh] w-full overflow-hidden bg-[#08090B] text-[#F4F1EA] flex flex-col justify-between border-b border-white/12">
      <div className="pointer-events-none absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.video
            key={current.id}
            src={current.video}
            autoPlay
            loop
            muted
            playsInline
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 0.72, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full object-cover contrast-[1.06]"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-b from-[#08090B]/70 via-[#08090B]/35 to-[#08090B]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08090B]/85 via-[#08090B]/30 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8 pt-20 pb-12 my-auto">
        <div className="max-w-3xl">
          <div className="mb-6 flex items-center gap-3 font-mono text-[11px] tracking-[0.24em] text-stone-300 uppercase">
            <span
              className="inline-block h-[1px] w-8 transition-colors duration-700"
              style={{ backgroundColor: current.accentHex }}
            />
            <span>{current.plate}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-normal tracking-[-0.02em] text-[#F4F1EA] leading-[0.98]">
            <span className="block font-sans font-medium tracking-[-0.03em]">
              THE HEARTLAND OF
            </span>
            <span className="block font-serif italic font-normal text-[#F4F1EA]/95 mt-1">
              the Silk Road.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base sm:text-lg text-stone-200/90 leading-relaxed font-light">
            The authoritative digital platform for Central Asia—uniting Silk Road
            history, heirloom culinary archives, regional dispatches, and
            high-altitude overland expeditions.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/news"
              className="bg-[#F4F1EA] px-6 py-3.5 font-mono text-[11px] font-semibold tracking-[0.2em] text-[#08090B] uppercase hover:bg-white transition-colors"
            >
              READ LATEST DISPATCHES
            </Link>
            <Link
              href="/history"
              className="border border-white/30 bg-black/35 px-6 py-3.5 font-mono text-[11px] tracking-[0.2em] text-[#F4F1EA] uppercase backdrop-blur-md hover:border-white transition-colors"
            >
              EXPLORE HISTORY ARCHIVE
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8 py-6 border-t border-white/12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {HERO_CHAPTERS.map((chapter, idx) => {
            const active = idx === activeIndex;
            return (
              <div key={chapter.id} className="text-left">
                <button
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className="w-full text-left group"
                >
                  <div className="mb-2 h-[2px] w-full bg-white/15 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        active
                          ? `w-full ${chapter.barClass}`
                          : "w-0 group-hover:w-1/3 bg-white/40"
                      }`}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CountryFlag code={chapter.code} />
                      <span
                        className={`font-mono text-[11px] tracking-[0.16em] uppercase ${
                          active
                            ? "text-[#F4F1EA] font-semibold"
                            : "text-stone-400 group-hover:text-stone-200"
                        }`}
                      >
                        {chapter.name}
                      </span>
                    </div>
                    <Link
                      href={`/destinations/${chapter.slug}`}
                      className="text-stone-400 hover:text-white"
                      title={`Explore ${chapter.name}`}
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                  <div className="mt-0.5 font-mono text-[9px] tracking-wider text-stone-500">
                    {chapter.coords}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
EOF

cat << 'EOF' > "$BASE/components/home/AboutPlatformSection.tsx"
import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function AboutPlatformSection() {
  const pillars = [
    {
      num: "01",
      title: "Historical & Architectural Archive",
      detail:
        "From Bronze Age Oxus settlements and Sogdian merchant networks to Timurid observatories in Samarkand and Karakhanid towers in the Tian Shan.",
      linkText: "EXPLORE CHRONICLE",
      href: "/history",
    },
    {
      num: "02",
      title: "Living Gastronomy & Heirloom Recipes",
      detail:
        "Documenting regional foodways—Karakol Dungan ashlyan-fu, Samarkand zighir plov, nomadic hearth cooking, and fermented steppe traditions.",
      linkText: "ENTER CULINARY ARCHIVE",
      href: "/cuisine",
    },
    {
      num: "03",
      title: "Overland Field Intelligence & Expeditions",
      detail:
        "Verified border crossing protocols, seasonal mountain pass windows, and direct expedition operations across Kyrgyzstan, Uzbekistan, and the Pamirs.",
      linkText: "VIEW FIELD EXPEDITIONS",
      href: "/expeditions",
    },
  ];

  return (
    <section className="border-b border-white/12 bg-[#08090B] py-24 text-[#F4F1EA]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
          {/* Left Editorial Statement */}
          <div className="lg:col-span-6 space-y-6">
            <div className="font-mono text-[11px] tracking-[0.24em] text-amber-300 uppercase">
              ABOUT THE PLATFORM • WHAT WE DOCUMENT
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-[1.08] text-[#F4F1EA]">
              A Modern Digital Record of Eurasia’s Most Storied Crossroads.
            </h2>
            <p className="text-base sm:text-lg text-stone-300/90 leading-relaxed font-light">
              For centuries, Central Asia stood at the center of global
              exchange—where scholars, artisans, and nomadic confederations
              shaped science, cuisine, and overland trade. Yet in the modern
              digital era, the region’s cultural depth has remained fragmented
              across outdated guidebooks.
            </p>
            <p className="text-sm sm:text-base text-stone-400 leading-relaxed font-light">
              <strong className="font-medium text-stone-200">MyCentralAsia.com</strong>{" "}
              was built to serve as the definitive English-language reference
              and travel intelligence hub for Kazakhstan, Kyrgyzstan,
              Uzbekistan, Tajikistan, and Turkmenistan—connecting curious
              readers directly to real expeditions on the ground.
            </p>

            {/* Key Regional Metrics */}
            <div className="grid grid-cols-3 gap-4 border-t border-white/15 pt-6">
              <div>
                <div className="font-serif text-2xl sm:text-3xl text-white">5</div>
                <div className="mt-1 font-mono text-[10px] tracking-[0.18em] text-stone-400">
                  SOVEREIGN REPUBLICS
                </div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl text-white">4,000+</div>
                <div className="mt-1 font-mono text-[10px] tracking-[0.18em] text-stone-400">
                  YEARS OF ARCHIVE
                </div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl text-white">7,495m</div>
                <div className="mt-1 font-mono text-[10px] tracking-[0.18em] text-stone-400">
                  PAMIR & TIAN SHAN PEAKS
                </div>
              </div>
            </div>
          </div>

          {/* Right Editorial Pillars */}
          <div className="lg:col-span-6 divide-y divide-white/12 border-t border-b border-white/12">
            {pillars.map((item) => (
              <div key={item.num} className="py-7 first:pt-2 last:pb-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-[0.2em] text-amber-300">
                    {item.num} / PILLAR
                  </span>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.18em] text-stone-300 hover:text-white"
                  >
                    <span>{item.linkText}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
                <h3 className="mt-2 font-serif text-xl sm:text-2xl text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-stone-300/85 leading-relaxed font-light">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
EOF

cat << 'EOF' > "$BASE/components/home/HistorySection.tsx"
import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HISTORY_TIMELINE } from "@/data/centralAsiaData";

export default function HistorySection({ compact = false }: { compact?: boolean }) {
  const items = compact ? HISTORY_TIMELINE.slice(0, 3) : HISTORY_TIMELINE;

  return (
    <section className="border-b border-white/12 bg-[#08090B] py-20 text-[#F4F1EA]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/15 pb-8">
          <div>
            <div className="font-mono text-[11px] tracking-[0.24em] text-amber-300/90 uppercase">
              HISTORICAL CHRONICLE • 2200 BCE – PRESENT
            </div>
            <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-normal text-[#F4F1EA]">
              Civilizations of the Crossroads
            </h2>
          </div>

          {compact && (
            <Link
              href="/history"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.18em] text-stone-300 hover:text-white border-b border-white/30 pb-1 self-start md:self-auto"
            >
              <span>FULL HISTORICAL TIMELINE</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>

        <div className="divide-y divide-white/10">
          {items.map((era, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 gap-4 py-8 lg:grid-cols-12 lg:gap-8 items-start"
            >
              <div className="lg:col-span-3">
                <div className="font-mono text-xs tracking-[0.2em] text-amber-300">
                  {era.yearRange}
                </div>
                <div className="mt-1 font-mono text-[10px] tracking-[0.18em] text-stone-500 uppercase">
                  {era.period}
                </div>
              </div>

              <div className="lg:col-span-6">
                <h3 className="font-serif text-xl sm:text-2xl text-white">
                  {era.title}
                </h3>
                <p className="mt-2.5 text-sm text-stone-300/85 leading-relaxed font-light">
                  {era.summary}
                </p>
              </div>

              <div className="lg:col-span-3 lg:text-right">
                <div className="font-mono text-[10px] tracking-[0.18em] text-stone-400 uppercase">
                  {era.region}
                </div>
                <div className="mt-1.5 inline-block border border-white/15 bg-white/[0.02] px-2.5 py-1 font-mono text-[10px] text-stone-300">
                  {era.keyArtifact}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
EOF

cat << 'EOF' > "$BASE/components/seo/JsonLd.tsx"
import React from "react";

export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
EOF

# ==============================================================================
# 5. WRITE PAGES TO ALL DETECTED APP ROOTS (app/ AND app/[lang]/)
# ==============================================================================
for T in "${TARGETS[@]}"; do
  echo "✍️  Writing pages into $T ..."

  # MAIN PAGE
  cat << 'EOF' > "$T/page.tsx"
import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import CinemaHero from "@/components/home/CinemaHero";
import AboutPlatformSection from "@/components/home/AboutPlatformSection";
import HistorySection from "@/components/home/HistorySection";
import CountryFlag from "@/components/layout/CountryFlag";
import { ARTICLES, COUNTRIES, EXPEDITIONS } from "@/data/centralAsiaData";

export default function HomePage() {
  return (
    <div className="bg-[#08090B] text-[#F4F1EA]">
      {/* 1. Cinema Multi-Country Video Hero */}
      <CinemaHero />

      {/* 2. About MyCentralAsia: Platform Mission & Core Pillars */}
      <AboutPlatformSection />

      {/* 3. The 5 Stans Regional Directory */}
      <section className="border-b border-white/12 py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/15 pb-8">
            <div>
              <div className="font-mono text-[11px] tracking-[0.24em] text-stone-400 uppercase">
                REGIONAL DIRECTORY • THE FIVE STANS
              </div>
              <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-normal">
                Explore by Nation
              </h2>
            </div>
            <p className="max-w-md text-sm text-stone-400 font-light">
              Visa protocols, seasonal climate windows, signature culinary traditions,
              and field routes across every republic.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-px bg-white/12 sm:grid-cols-2 lg:grid-cols-5 border border-white/12">
            {COUNTRIES.map((country) => (
              <Link
                key={country.slug}
                href={`/destinations/${country.slug}`}
                className="group flex flex-col justify-between bg-[#08090B] p-6 hover:bg-[#0D1015] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <CountryFlag code={country.code} />
                    <ArrowUpRight className="h-4 w-4 text-stone-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="mt-5 font-serif text-2xl text-white">
                    {country.name}
                  </h3>
                  <div className="mt-1 font-mono text-[10px] tracking-[0.16em] text-stone-400 uppercase">
                    CAPITAL: {country.capital}
                  </div>
                  <p className="mt-4 text-xs text-stone-300/85 leading-relaxed line-clamp-3">
                    {country.summary}
                  </p>
                </div>

                <div className="mt-6 border-t border-white/10 pt-3 font-mono text-[10px] tracking-[0.14em] text-stone-400">
                  BEST: {country.bestSeason.split("(")[0]}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Latest Dispatches, Food & Culture Feed */}
      <section className="border-b border-white/12 py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/15 pb-8">
            <div>
              <div className="font-mono text-[11px] tracking-[0.24em] text-sky-400 uppercase">
                DAILY EDITORIAL & FIELD REPORTS
              </div>
              <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-normal">
                Culture, Cuisine & Dispatches
              </h2>
            </div>
            <Link
              href="/news"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.18em] text-stone-300 hover:text-white border-b border-white/30 pb-1 self-start md:self-auto"
            >
              <span>ALL ARTICLES & NEWS</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            {ARTICLES.map((article) => (
              <article
                key={article.slug}
                className="group flex flex-col justify-between border border-white/12 bg-white/[0.015] p-7 hover:border-white/30 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-stone-400">
                    <span className="flex items-center gap-2 text-stone-200">
                      <CountryFlag code={article.countryCode} className="h-2.5 w-4" />
                      <span>
                        {article.category} • {article.country.toUpperCase()}
                      </span>
                    </span>
                    <span>{article.readTime}</span>
                  </div>

                  <Link href={`/news/${article.slug}`}>
                    <h3 className="mt-4 font-serif text-2xl sm:text-3xl text-[#F4F1EA] group-hover:text-white leading-snug">
                      {article.title}
                    </h3>
                  </Link>

                  <p className="mt-3 text-sm text-stone-300/85 leading-relaxed font-light">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[10px] tracking-[0.18em] text-stone-400">
                  <span>{article.publishedAt}</span>
                  <Link
                    href={`/news/${article.slug}`}
                    className="inline-flex items-center gap-1 text-white hover:underline"
                  >
                    <span>READ DISPATCH</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Silk Road Historical Chronicle */}
      <HistorySection compact />

      {/* 6. Curated Expeditions & Wild Kyrgyzstan Conversion */}
      <section className="py-20 bg-[#050608]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/15 pb-8">
            <div>
              <div className="font-mono text-[11px] tracking-[0.24em] text-amber-300 uppercase">
                OVERLAND OPERATIONS • WILD KYRGYZSTAN
              </div>
              <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-normal">
                Signature Silk Road Expeditions
              </h2>
            </div>
            <Link
              href="/expeditions"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.18em] text-stone-300 hover:text-white border-b border-white/30 pb-1 self-start md:self-auto"
            >
              <span>VIEW ALL EXPEDITIONS</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {EXPEDITIONS.map((tour) => (
              <div
                key={tour.id}
                className="flex flex-col justify-between border border-white/12 bg-[#08090B] p-7"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-stone-400">
                    <span>{tour.countries.join(" + ").toUpperCase()}</span>
                    <span className="text-amber-300">{tour.duration}</span>
                  </div>
                  <h3 className="mt-4 font-serif text-2xl text-white">
                    {tour.title}
                  </h3>
                  <p className="mt-3 text-sm text-stone-300/85 leading-relaxed font-light">
                    {tour.summary}
                  </p>
                </div>

                <div className="mt-8 border-t border-white/10 pt-4 flex items-center justify-between">
                  <div>
                    <div className="font-mono text-[9px] tracking-[0.18em] text-stone-500">
                      STARTING FROM
                    </div>
                    <div className="font-mono text-base font-semibold text-white">
                      {tour.priceFrom}
                    </div>
                  </div>
                  <a
                    href={tour.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#F4F1EA] px-4 py-2.5 font-mono text-[10px] font-semibold tracking-[0.18em] text-[#08090B] uppercase hover:bg-white transition-colors"
                  >
                    <span>INQUIRE</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
EOF

  # NEWS INDEX PAGE
  cat << 'EOF' > "$T/news/page.tsx"
import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ARTICLES } from "@/data/centralAsiaData";
import CountryFlag from "@/components/layout/CountryFlag";

export const metadata: Metadata = {
  title: "Journal, News & Field Dispatches",
  description:
    "Daily reporting and cultural essays covering Central Asian cuisine, Silk Road history, border logistics, and overland expeditions.",
};

export default function NewsIndexPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 sm:px-8 py-16">
      <div className="border-b border-white/15 pb-10">
        <div className="font-mono text-[11px] tracking-[0.24em] text-sky-400 uppercase">
          EDITORIAL ARCHIVE • ALL DISPATCHES
        </div>
        <h1 className="mt-3 font-serif text-4xl sm:text-6xl font-normal text-[#F4F1EA]">
          Journal & Regional News
        </h1>
        <p className="mt-4 max-w-2xl text-base text-stone-300 font-light">
          In-depth essays on culinary heritage, architectural preservation,
          high-altitude routes, and cross-border travel across the five Central
          Asian republics.
        </p>
      </div>

      <div className="mt-12 divide-y divide-white/12">
        {ARTICLES.map((article) => (
          <article
            key={article.slug}
            className="grid grid-cols-1 gap-6 py-10 lg:grid-cols-12 items-start"
          >
            <div className="lg:col-span-3 font-mono text-[11px] tracking-[0.18em] text-stone-400 space-y-2">
              <div className="flex items-center gap-2 text-stone-200">
                <CountryFlag code={article.countryCode} />
                <span>{article.country.toUpperCase()}</span>
              </div>
              <div>{article.category}</div>
              <div className="text-stone-500">
                {article.publishedAt} • {article.readTime}
              </div>
            </div>

            <div className="lg:col-span-7">
              <Link href={`/news/${article.slug}`} className="group">
                <h2 className="font-serif text-2xl sm:text-3xl text-[#F4F1EA] group-hover:text-white transition-colors">
                  {article.title}
                </h2>
                <p className="mt-3 text-sm sm:text-base text-stone-300/85 leading-relaxed font-light">
                  {article.excerpt}
                </p>
              </Link>
            </div>

            <div className="lg:col-span-2 lg:text-right">
              <Link
                href={`/news/${article.slug}`}
                className="inline-flex items-center gap-1.5 border border-white/25 px-4 py-2 font-mono text-[10px] tracking-[0.18em] text-white hover:bg-white hover:text-black transition-colors"
              >
                <span>READ</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
EOF

  # NEWS ARTICLE DETAIL PAGE
  cat << 'EOF' > "$T/news/[slug]/page.tsx"
import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ARTICLES } from "@/data/centralAsiaData";
import CountryFlag from "@/components/layout/CountryFlag";
import JsonLd from "@/components/seo/JsonLd";

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return { title: "Article Not Found" };

  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.seoKeywords,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.publishedAt,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: {
      "@type": "Organization",
      name: "MyCentralAsia Editorial",
    },
    publisher: {
      "@type": "Organization",
      name: "MyCentralAsia.com",
    },
  };

  return (
    <article className="mx-auto max-w-4xl px-6 sm:px-8 py-16">
      <JsonLd data={articleSchema} />

      <Link
        href="/news"
        className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-stone-400 hover:text-white mb-10"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>BACK TO ALL DISPATCHES</span>
      </Link>

      <header className="border-b border-white/15 pb-8">
        <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-stone-300">
          <CountryFlag code={article.countryCode} />
          <span>{article.country.toUpperCase()}</span>
          <span>•</span>
          <span>{article.category}</span>
          <span>•</span>
          <span className="text-stone-400">{article.readTime}</span>
        </div>

        <h1 className="mt-5 font-serif text-3xl sm:text-5xl text-[#F4F1EA] leading-tight">
          {article.title}
        </h1>

        <p className="mt-4 text-lg text-stone-300 font-light leading-relaxed">
          {article.subtitle}
        </p>

        <div className="mt-6 flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-stone-500">
          <span>BY {article.author.toUpperCase()}</span>
          <span>PUBLISHED {article.publishedAt}</span>
        </div>
      </header>

      <div className="mt-10 space-y-6 text-base sm:text-lg text-stone-200 leading-relaxed font-light">
        {article.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-14 border border-white/20 bg-white/[0.03] p-8">
        <div className="font-mono text-[10px] tracking-[0.22em] text-amber-300 uppercase">
          EXPERIENCE THIS REGION FIRSTHAND
        </div>
        <h2 className="mt-2 font-serif text-2xl text-white">
          Plan a Custom Silk Road & Mountain Expedition
        </h2>
        <p className="mt-2 text-sm text-stone-300 font-light leading-relaxed">
          Our field operations partner, WildInKyrgyzstan.com, organizes private
          high-altitude horse treks, culinary journeys, and cross-border
          Central Asian itineraries.
        </p>
        <a
          href="https://www.wildinkyrgyzstan.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 bg-[#F4F1EA] px-5 py-3 font-mono text-[11px] font-semibold tracking-[0.18em] text-[#08090B] uppercase hover:bg-white transition-colors"
        >
          <span>EXPLORE EXPEDITIONS</span>
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}
EOF

  # HISTORY PAGE
  cat << 'EOF' > "$T/history/page.tsx"
import React from "react";
import type { Metadata } from "next";
import HistorySection from "@/components/home/HistorySection";

export const metadata: Metadata = {
  title: "Silk Road History & Central Asian Civilizations",
  description:
    "Explore 4,000 years of Central Asian history: Bronze Age Oxus oasis cities, Sogdian Silk Road merchants, the Timurid Renaissance, and nomadic steppe empires.",
};

export default function HistoryPage() {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 sm:px-8 pt-16 pb-6">
        <div className="font-mono text-[11px] tracking-[0.24em] text-amber-300 uppercase">
          HISTORICAL ARCHIVE
        </div>
        <h1 className="mt-3 font-serif text-4xl sm:text-6xl font-normal text-[#F4F1EA]">
          History of Central Asia
        </h1>
        <p className="mt-4 max-w-2xl text-base text-stone-300 font-light leading-relaxed">
          For millennia, the oases and mountain passes between the Caspian Sea
          and the Tian Shan served as Eurasia’s primary conduit of science,
          architecture, religion, and trade.
        </p>
      </div>
      <HistorySection compact={false} />
    </div>
  );
}
EOF

  # CUISINE PAGE
  cat << 'EOF' > "$T/cuisine/page.tsx"
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
EOF

  # DESTINATIONS COUNTRY PAGE
  cat << 'EOF' > "$T/destinations/[country]/page.tsx"
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
      <div className="border-b border-white/15 pb-10">
        <div className="flex items-center gap-3 font-mono text-xs tracking-[0.22em] text-stone-300">
          <CountryFlag code={country.code} className="h-4 w-6" />
          <span>{country.heroPlate}</span>
          <span>•</span>
          <span className="text-stone-400">{country.coords}</span>
        </div>

        <h1 className="mt-4 font-serif text-4xl sm:text-6xl text-[#F4F1EA]">
          {country.name}
        </h1>
        <p className="mt-2 font-mono text-xs tracking-[0.18em] text-stone-400 uppercase">
          {country.tagline}
        </p>
        <p className="mt-6 max-w-3xl text-base sm:text-lg text-stone-200 leading-relaxed font-light">
          {country.summary}
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 border-b border-white/15 pb-10">
        <div className="border border-white/12 p-6">
          <div className="font-mono text-[10px] tracking-[0.2em] text-stone-400">
            CAPITAL CITY
          </div>
          <div className="mt-2 font-serif text-2xl text-white">
            {country.capital}
          </div>
        </div>
        <div className="border border-white/12 p-6">
          <div className="font-mono text-[10px] tracking-[0.2em] text-stone-400">
            OPTIMAL TRAVEL WINDOW
          </div>
          <div className="mt-2 text-sm text-white">{country.bestSeason}</div>
        </div>
        <div className="border border-white/12 p-6">
          <div className="font-mono text-[10px] tracking-[0.2em] text-stone-400">
            ENTRY & VISA PROTOCOL
          </div>
          <div className="mt-2 text-sm text-white">{country.visaSummary}</div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-mono text-xs tracking-[0.22em] text-stone-400 uppercase">
            ESSENTIAL REGIONS & LANDMARKS
          </h2>
          <ul className="mt-4 divide-y divide-white/10 border-t border-b border-white/10">
            {country.highlights.map((item, i) => (
              <li key={i} className="py-3.5 text-sm text-stone-200">
                0{i + 1}. {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-white/15 bg-white/[0.02] p-8 flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] tracking-[0.22em] text-amber-300 uppercase">
              SIGNATURE CULINARY HERITAGE
            </div>
            <h3 className="mt-2 font-serif text-2xl text-white">
              {country.signatureDish.name}
            </h3>
            <p className="mt-3 text-sm text-stone-300 leading-relaxed font-light">
              {country.signatureDish.description}
            </p>
          </div>

          <a
            href="https://www.wildinkyrgyzstan.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-2 bg-[#F4F1EA] px-5 py-3 font-mono text-[11px] font-semibold tracking-[0.18em] text-[#08090B] uppercase hover:bg-white transition-colors"
          >
            <span>REQUEST CUSTOM {country.name.toUpperCase()} ITINERARY</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
EOF

  # EXPEDITIONS PAGE
  cat << 'EOF' > "$T/expeditions/page.tsx"
import React from "react";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { EXPEDITIONS } from "@/data/centralAsiaData";

export const metadata: Metadata = {
  title: "Central Asia Expeditions & Guided Silk Road Tours",
  description:
    "Curated overland expeditions, high-altitude horse treks, and cultural tours across Kyrgyzstan, Uzbekistan, and Tajikistan operated with WildInKyrgyzstan.com.",
};

export default function ExpeditionsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 sm:px-8 py-16">
      <div className="border-b border-white/15 pb-10">
        <div className="font-mono text-[11px] tracking-[0.24em] text-amber-300 uppercase">
          FIELD OPERATIONS • WILD KYRGYZSTAN
        </div>
        <h1 className="mt-3 font-serif text-4xl sm:text-6xl font-normal text-[#F4F1EA]">
          Silk Road & Alpine Expeditions
        </h1>
        <p className="mt-4 max-w-2xl text-base text-stone-300 font-light">
          Small-group and private overland expeditions linking nomadic high-mountain
          camps in Kyrgyzstan with the ancient oasis cities of Uzbekistan and the
          Pamir Highway.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {EXPEDITIONS.map((tour) => (
          <div
            key={tour.id}
            className="flex flex-col justify-between border border-white/15 bg-white/[0.015] p-8"
          >
            <div>
              <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-stone-400">
                <span>{tour.countries.join(" • ").toUpperCase()}</span>
                <span className="text-amber-300">{tour.duration}</span>
              </div>
              <h2 className="mt-4 font-serif text-2xl text-white">
                {tour.title}
              </h2>
              <p className="mt-3 text-sm text-stone-300 leading-relaxed font-light">
                {tour.summary}
              </p>
              <div className="mt-6 space-y-1.5 border-t border-white/10 pt-4 font-mono text-[10px] tracking-[0.16em] text-stone-400">
                <div>SEASON: {tour.season.toUpperCase()}</div>
                <div>GRADE: {tour.difficulty.toUpperCase()}</div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4">
              <div>
                <div className="font-mono text-[9px] text-stone-500">FROM</div>
                <div className="font-mono text-lg font-semibold text-white">
                  {tour.priceFrom}
                </div>
              </div>
              <a
                href={tour.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#F4F1EA] px-5 py-2.5 font-mono text-[10px] font-semibold tracking-[0.18em] text-[#08090B] uppercase hover:bg-white"
              >
                <span>BOOK VIA WILD KYRGYZSTAN</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
EOF
done

echo "✅ Full MyCentralAsia.com platform generated! Restart 'npm run dev' if needed."
SCRIPT_EOF
bash build-full-platform.sh