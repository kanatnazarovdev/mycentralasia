import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Compass,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  Users,
  Car,
  ShieldAlert,
  ArrowRight,
  Phone,
  Mail,
  Instagram,
} from "lucide-react";

// ── 1. METADATA GENERATOR (EN & DE) ──
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || "en";

  const isDe = lang === "de";

  return {
    title: isDe
      ? "Kyrgyzstan Grand Expedition: 7-Tage 4x4 Tour | Wild Kyrgyzstan"
      : "Kyrgyzstan Grand Expedition: 7-Day Private 4x4 Tour | Wild Kyrgyzstan",
    description: isDe
      ? "Erleben Sie Kirgistan in einer 7-tägigen privaten 4x4-Slow-Travel-Expedition: Song-Kul-See, Kel-Suu, Skazka-Canyon und heiße Quellen in Altyn-Araschan."
      : "Experience Kyrgyzstan in a 7-day private 4x4 slow-travel expedition: Song-Kul Lake, Kel-Suu, Skazka Canyon, and Altyn-Arashan hot springs.",
  };
}

// ── 2. TRANSLATION DICTIONARIES ──
const CONTENT = {
  en: {
    badge: "Private 4x4 Expedition • 7 Days",
    title: "Kyrgyzstan: Tian Shan Grand Expedition",
    subtitle:
      "A private 4x4 slow travel journey across high-altitude alpine lakes, ancient Silk Road valleys, Martian canyons, and natural thermal springs.",
    priceTag: "$1,850 USD",
    priceSub: "per person (based on group of 2 travellers)",
    highlightsTitle: "Tour Highlights",
    highlights: [
      {
        icon: "🐎",
        title: "Song-Kul Lake (3,016 m)",
        desc: "Overnight stay in traditional heated yurts, horseback riding along the shore, and archery under starry night skies.",
      },
      {
        icon: "🚤",
        title: "Secret Kel-Suu Lake (3,500 m)",
        desc: "Journey into a lost border valley and motorboat deep inside a narrow fjord canyon with 300-meter sheer cliffs.",
      },
      {
        icon: "⛺",
        title: "Yurt Building Masterclass",
        desc: "Interactive immersion into nomadic craft with a master artisan family in Kyzyl-Tuu village.",
      },
      {
        icon: "🦅",
        title: "Golden Eagle Hunting Show",
        desc: "Demonstration of ancient nomadic falconry by a 3rd-generation Berkutchi eagle hunter in Bokonbaevo.",
      },
      {
        icon: "🌋",
        title: "Martian Canyons & Hot Springs",
        desc: "Explore Skazka and Ak-Say red clay labyrinths, Jeti-Oguz gorge, and soak in open-air thermal radon springs in Altyn-Arashan.",
      },
    ],
    itineraryTitle: "Detailed Day-by-Day Route",
    days: [
      {
        day: "Day 01",
        route: "Bishkek ➔ 33 Parrots Pass ➔ High Alpine Song-Kul Lake (3,016 m)",
        morning:
          "Morning pickup from your Bishkek hotel by your personal driver and guide. Depart towards the inner Tian Shan mountains through the dramatic Boom Gorge.",
        lunch: "National Kyrgyz cuisine in Kochkor village.",
        afternoon:
          "Ascend the winding '33 Parrots' mountain pass (3,133 m) with stops at mountain waterfalls and panoramic viewpoints.",
        evening:
          "Arrive at Lake Song-Kul. Check-in to cozy, heated nomadic yurts. Traditional dinner and sunset watching over the lake.",
        stay: "Private yurt camp at Song-Kul",
        meals: "Lunch, Dinner included",
      },
      {
        day: "Day 02",
        route: "Nomadic Life at Song-Kul ➔ Naryn ➔ At-Bashy Village",
        morning:
          "Leisurely morning overlooking alpine pastures. Activities: coastal horseback riding, traditional archery, and photo sessions.",
        lunch: "Full set lunch at the yurt camp.",
        afternoon:
          "Descend from Song-Kul via the scenic Ak-Tal pass offering sweeping views of the meandering Naryn River.",
        evening:
          "Dinner in Naryn town followed by a short drive to the peaceful rural village of At-Bashy.",
        stay: "Cozy guesthouse in At-Bashy",
        meals: "Breakfast, Lunch, Dinner included",
      },
      {
        day: "Day 03",
        route: "Wild High-Altitude: Secret Kel-Suu Lake (3,500 m)",
        morning:
          "Drive across the rugged, remote Ak-Say high-altitude valley (border zone permits included).",
        lunch: "Arrival at the mountain camp near Kel-Suu; hearty lunch.",
        afternoon:
          "Horseback ride or trek to the hidden couloir lake Kel-Suu. Take a motorboat tour inside the canyon between towering 300-meter cliffs.",
        evening:
          "Hot dinner in camp and stargazing under pristine, light-pollution-free high-altitude skies.",
        stay: "Mountain cabins / Yurts at Kel-Suu",
        meals: "Breakfast, Lunch, Dinner included",
      },
      {
        day: "Day 04",
        route: "Nomadic Crafts & Eagle Show ➔ South Shore of Issyk-Kul",
        morning: "Depart Ak-Say valley towards the southern shores of Lake Issyk-Kul.",
        afternoon:
          "Stop at Kyzyl-Tuu village for an interactive yurt-assembly masterclass with a master craftsman followed by home-cooked lunch. Continue to Bokonbaevo for an exclusive eagle hunting demonstration.",
        evening:
          "Arrive at your guesthouse along Issyk-Kul's southern shore; relax by the water.",
        stay: "Atmospheric guesthouse in Tamga or Kaji-Say",
        meals: "Breakfast, Lunch, Dinner included",
      },
      {
        day: "Day 05",
        route: "Martian Canyons ➔ 4x4 Mountain Transfer to Altyn-Arashan",
        morning:
          "Hike through the red clay labyrinths of Skazka (Fairy Tale) Canyon and view the Seven Bulls & Broken Heart rocks in Jeti-Oguz.",
        lunch: "Lunch at an ethno-restaurant in Karakol town.",
        afternoon:
          "Transfer into an all-terrain ZIL-131 or UAZ 4x4 vehicle for a thrill-filled ascent through the gorge up to the alpine valley of Altyn-Arashan (2,600 m).",
        evening:
          "Check-in and soak in outdoor hot thermal radon springs beneath mountain peaks.",
        stay: "Mountain lodge in Altyn-Arashan",
        meals: "Breakfast, Lunch, Dinner included",
      },
      {
        day: "Day 06",
        route: "Alpine Day in Altyn-Arashan & Horse Ascent to Ala-Kul Pass",
        morning:
          "Full mountain relaxation day. Guided horseback excursion through the alpine valley towards Ala-Kul Pass surrounded by glaciers and 4,000m peaks.",
        lunch: "Outdoor picnic box in the mountains.",
        afternoon:
          "Return to camp and soak again in the natural hot thermal baths to unwind.",
        evening: "Cozy dinner by the fireplace/campfire.",
        stay: "Mountain lodge in Altyn-Arashan",
        meals: "Breakfast, Lunch (Picnic Box), Dinner included",
      },
      {
        day: "Day 07",
        route: "Karakol City Tour ➔ Transfer to Bishkek",
        morning:
          "Descent from Altyn-Arashan. Cultural city tour of Karakol: visit the wooden Holy Trinity Russian Orthodox Cathedral and the unique wooden Dungan Mosque.",
        lunch: "Tasting of Karakol's famous culinary icon — Ashlan-Fu.",
        afternoon:
          "Transfer to Bishkek along the scenic northern shore of Lake Issyk-Kul.",
        evening: "Arrival in Bishkek (drop-off at hotel or airport).",
        stay: "End of Service",
        meals: "Breakfast, Lunch included",
      },
    ],
    inclusionsTitle: "Price & What's Included",
    includedHeading: "All-Inclusive Features",
    included: [
      "Private Transport: Comfortable 4x4 Crossover (Subaru Forester) for the entire route",
      "Team: Dedicated experienced driver + professional guide",
      "Accommodation: All 6 nights (ethnic yurt camps, rural guesthouses, and mountain lodges)",
      "Full Board Meals: All breakfasts, lunches, and dinners as specified in program",
      "Cultural Activities: Yurt building workshop, eagle show, archery, and photo shoots",
      "Active Experiences: Horse riding at Song-Kul & Ala-Kul pass, Kel-Suu motorboat ride, thermal baths",
      "Special Mountain Transfers: 4x4 ZIL/UAZ mountain transfer to/from Altyn-Arashan",
      "Permits & Fees: Border permits for Kel-Suu, national park entries, and canyon passes",
      "Bottled drinking water provided in vehicle throughout trip",
    ],
    excludedHeading: "Not Included",
    excluded: [
      "International flights to/from Bishkek",
      "Personal travel and medical insurance",
      "Personal expenses, souvenirs, alcoholic beverages",
    ],
    bookingTitle: "Reserve Your Expedition",
    bookingSubtitle: "Get in touch with our expedition team to secure your private dates.",
  },
  de: {
    badge: "Private 4x4 Expedition • 7 Tage",
    title: "Kirgistan: Große Tien-Schan-Expedition",
    subtitle: "Eine private 4x4 Slow-Travel-Reise zu hochalpinen Seen, uralten Seidenstraßen-Tälern, Mars-Canyons und heißen Thermalquellen.",
    priceTag: "1.850 $ USD",
    priceSub: "pro Person (bei einer Gruppe von 2 Reisenden)",
    highlightsTitle: "Höhepunkte der Tour",
    highlights: [
      {
        icon: "🐎",
        title: "Song-Kul-See (3.016 m)",
        desc: "Übernachtung in beheizten traditionellen Jurten, Reitausflüge entlang der Küste und Bogenschießen unter dem Sternenzelt.",
      },
      {
        icon: "🚤",
        title: "Geheimer Kel-Suu-See (3.500 m)",
        desc: "Reise in ein abgelegenes Grenzgebiet und Motorbootfahrt im Canyon zwischen 300 Meter hohen Steilwänden.",
      },
      {
        icon: "⛺",
        title: "Jurtenbau-Masterclass",
        desc: "Interaktives Eintauchen in das alte Handwerk bei einer Meisterfamilie im Dorf Kyzyl-Tuu.",
      },
      {
        icon: "🦅",
        title: "Steinadler-Jagdshow",
        desc: "Demonstration der traditionellen Falknerei durch einen Adlerjäger in 3. Generation in Bokonbaewo.",
      },
      {
        icon: "🌋",
        title: "Mars-Canyons & Heiße Quellen",
        desc: "Erkundung der roten Ton-Labyrinthe im Skazka-Canyon, der Dscheti-Ögüz-Schlucht und Baden in den Radon-Thermalquellen von Altyn-Araschan.",
      },
    ],
    itineraryTitle: "Detaillierter Reiseverlauf",
    days: [
      {
        day: "Tag 01",
        route: "Bischkek ➔ 33-Papageien-Pass ➔ Hochalpiner Song-Kul-See (3.016 m)",
        morning:
          "Morgendliche Abholung vom Hotel in Bischkek durch Fahrer und Guide. Fahrt in Richtung des inneren Tien-Schan durch die Boom-Schlucht.",
        lunch: "Nationale kirgisische Küche im Dorf Kotschkor.",
        afternoon:
          "Auffahrt auf den Pass '33 Papageien' (3.133 m) mit Stopps an Gebirgswasserfällen.",
        evening:
          "Ankunft am Song-Kul-See. Check-in in gemütlichen, beheizten Jurten. Abendessen und Sonnenuntergang über dem See.",
        stay: "Privates Jurtencamp am Song-Kul",
        meals: "Mittagessen, Abendessen inklusive",
      },
      {
        day: "Tag 02",
        route: "Nomadenleben am Song-Kul ➔ Naryn ➔ Dorf At-Baschy",
        morning:
          "Entspannter Morgen mit Blick auf die Berge. Aktivitäten: Ausritt am Seeufer, traditionelles Bogenschießen und Fotosession.",
        lunch: "Umfangreiches Mittagessen im Jurtenlager.",
        afternoon:
          "Abfahrt vom Song-Kul über den Ak-Tal-Pass mit Panoramablick auf die Biegungen des Naryn-Flusses.",
        evening: "Abendessen in Naryn und kurze Weiterfahrt ins ruhige Dorf At-Baschy.",
        stay: "Gemütliches Gästehaus in At-Baschy",
        meals: "Frühstück, Mittagessen, Abendessen inklusive",
      },
      {
        day: "Tag 03",
        route: "Wilde Hochgebirge: Geheimer Kel-Suu-See (3.500 m)",
        morning:
          "Fahrt durch das raue Ak-Say-Hochtal (Grenzpermiets inklusive).",
        lunch: "Ankunft im Berglager nahe dem Kel-Suu; Mittagessen.",
        afternoon:
          "Ausritt oder Trekking zum versteckten Kel-Suu-See. Motorbootfahrt in der Schlucht zwischen 300 m hohen Felswänden.",
        evening:
          "Warmes Abendessen im Camp und Beobachtung des klaren Sternenhimmels im Hochgebirge.",
        stay: "Berghütten / Jurten am Kel-Suu",
        meals: "Frühstück, Mittagessen, Abendessen inklusive",
      },
      {
        day: "Tag 04",
        route: "Nomadenhandwerk & Adler-Show ➔ Südufer des Issyk-Kul",
        morning: "Fahrt aus dem Ak-Say-Tal an das Südufer des Issyk-Kul-Sees.",
        afternoon:
          "Stopp im Dorf Kyzyl-Tuu für eine interaktive Jurtenbau-Masterclass mit anschließendem Mittagessen. Weiterfahrt nach Bokonbaewo für eine exklusive Adlerjagd-Vorführung.",
        evening:
          "Ankunft im Gästehaus am Südufer des Issyk-Kul; Erholung am Wasser.",
        stay: "Stimmungsvolles Gästehaus in Tamga oder Kadschi-Sai",
        meals: "Frühstück, Mittagessen, Abendessen inklusive",
      },
      {
        day: "Tag 05",
        route: "Mars-Canyons ➔ 4x4-Gipfeltransfer nach Altyn-Araschan",
        morning:
          "Wanderung durch die roten Tonlabyrinthe des Skazka-Canyons (Märchen-Canyon) und Besichtigung der 'Sieben Bullen' in Dscheti-Ögüz.",
        lunch: "Mittagessen in einem Ethno-Restaurant in Karakol.",
        afternoon:
          "Umstieg in ein ZIL-131- oder UAZ-Geländefahrzeug für den spektakulären Aufstieg durch die Schlucht ins Altyn-Araschan-Tal (2.600 m).",
        evening:
          "Check-in und Baden in den heißen Thermal-Radonquellen unter freiem Himmel.",
        stay: "Berghütte in Altyn-Araschan",
        meals: "Frühstück, Mittagessen, Abendessen inklusive",
      },
      {
        day: "Tag 06",
        route: "Alpiner Tag in Altyn-Araschan & Ausritt zum Ala-Kul-Pass",
        morning:
          "Tag zur vollkommenen Entspannung. Geführter Ausritt durch das Tal in Richtung Ala-Kul-Pass, umgeben von Gletschergipfeln.",
        lunch: "Picknick-Box in den Bergen.",
        afternoon:
          "Rückkehr ins Lager und erneuter Besuch der heißen Thermalbäder.",
        evening: "Gemütliches Abendessen am Kamin/Lagerfeuer.",
        stay: "Berghütte in Altyn-Araschan",
        meals: "Frühstück, Mittagessen (Picknick), Abendessen inklusive",
      },
      {
        day: "Tag 07",
        route: "Stadtführung Karakol ➔ Transfer nach Bischkek",
        morning:
          "Abstieg aus Altyn-Araschan. Kulturführung in Karakol: Russische Holzkirche und einzigartige dunganische Moschee.",
        lunch: "Verkostung der kulinarischen Spezialität Karakols — Aschlan-Fu.",
        afternoon:
          "Fahrt nach Bischkek entlang des Nordufers des Issyk-Kul-Sees.",
        evening: "Ankunft in Bischkek (Transfer zum Hotel oder Flughafen).",
        stay: "Ende der Expedition",
        meals: "Frühstück, Mittagessen inklusive",
      },
    ],
    inclusionsTitle: "Preise & Leistungen",
    includedHeading: "Inbegriffene Leistungen",
    included: [
      "Privater Transport: Komfortabler 4x4-SUV (Subaru Forester) für die gesamte Route",
      "Team: Erfahrener persönlicher Fahrer + professioneller Guide",
      "Unterkunft: Alle 6 Nächte (Ethno-Jurtenlager, Gästehäuser und Berghütten)",
      "Vollpension: Alle Frühstück, Mittag- und Abendessen wie angegeben",
      "Kulturaktivitäten: Jurtenbau-Workshop, Adler-Show, Bogenschießen, Fotosessions",
      "Aktivitäten: Reiten am Song-Kul & Ala-Kul-Pass, Bootfahrt am Kel-Suu, Thermalbäder",
      "Spezial-Transfers: 4x4 ZIL/UAZ Gebirgstransfer nach/von Altyn-Araschan",
      "Permits & Gebühren: Grenzgenehmigungen für Kel-Suu, Nationalpark-Eintritte",
      "Trinkwasser im Fahrzeug während der gesamten Fahrt",
    ],
    excludedHeading: "Nicht Inbegriffen",
    excluded: [
      "Internationaler Flug nach/von Bischkek",
      "Reise- und Krankenversicherung",
      "Persönliche Ausgaben, Souvenirs, alkoholische Getränke",
    ],
    bookingTitle: "Expedition Buchen",
    bookingSubtitle: "Kommen Sie mit uns in Kontakt, um Ihren Wunschtermin zu sichern.",
  },
};

export default async function ExpeditionPage({
  params,
}: {
  params: Promise<{ lang?: string }>;
}) {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang === "de" ? "de" : "en") as "en" | "de";
  const t = CONTENT[lang];

  return (
    <div className="bg-[#0F0E0D] text-[#FAF8F5] min-h-screen pt-28 pb-24 font-ddin select-none">
      {/* ── HERO SECTION ── */}
      <div className="relative border-b border-white/10 bg-gradient-to-b from-black/80 via-[#0F0E0D] to-[#0F0E0D] py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-bold tracking-[0.3em] uppercase text-amber-400 mb-4">
            <Compass size={16} />
            <span>{t.badge}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-6 leading-[0.95]">
            {t.title}
          </h1>

          <p className="font-serif italic text-lg md:text-xl text-neutral-300 max-w-3xl leading-relaxed mb-8">
            "{t.subtitle}"
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/10">
            <div className="flex items-center gap-2 text-sm font-mono uppercase text-amber-400">
              <span className="text-2xl font-bold">{t.priceTag}</span>
              <span className="text-xs text-neutral-400 font-sans">
                {t.priceSub}
              </span>
            </div>
            <a
              href="#booking"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 text-black font-bold uppercase tracking-[0.2em] text-xs hover:bg-amber-300 transition-colors ml-auto"
            >
              <span>{lang === "de" ? "Jetzt Anfragen" : "Book Expedition"}</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 mt-16 space-y-20">
        {/* ── HIGHLIGHTS GRID ── */}
        <section>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-8 border-b border-white/10 pb-4">
            {t.highlightsTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.highlights.map((h, idx) => (
              <div
                key={idx}
                className="p-6 border border-white/10 bg-white/[0.02] hover:border-amber-400/40 transition-colors"
              >
                <div className="text-3xl mb-3">{h.icon}</div>
                <h3 className="text-lg font-bold uppercase text-amber-400 mb-2">
                  {h.title}
                </h3>
                <p className="font-serif italic text-sm text-neutral-400 leading-relaxed">
                  {h.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── ITINERARY SECTION ── */}
        <section>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-8 border-b border-white/10 pb-4">
            {t.itineraryTitle}
          </h2>

          <div className="space-y-6">
            {t.days.map((d, idx) => (
              <div
                key={idx}
                className="border border-white/10 bg-white/[0.02] p-6 md:p-8 hover:border-amber-400/30 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4 border-b border-white/10 pb-4">
                  <span className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-amber-400">
                    {d.day}
                  </span>
                  <h3 className="text-xl font-extrabold uppercase text-white">
                    {d.route}
                  </h3>
                </div>

                <div className="space-y-3 font-serif text-sm md:text-base text-neutral-300 leading-relaxed">
                  <p>
                    <strong className="font-sans font-bold uppercase text-xs text-amber-400 tracking-wider">
                      {lang === "de" ? "Morgen:" : "Morning:"}
                    </strong>{" "}
                    {d.morning}
                  </p>
                  <p>
                    <strong className="font-sans font-bold uppercase text-xs text-amber-400 tracking-wider">
                      {lang === "de" ? "Mittagessen:" : "Lunch:"}
                    </strong>{" "}
                    {d.lunch}
                  </p>
                  {d.afternoon && (
                    <p>
                      <strong className="font-sans font-bold uppercase text-xs text-amber-400 tracking-wider">
                        {lang === "de" ? "Nachmittag:" : "Afternoon:"}
                      </strong>{" "}
                      {d.afternoon}
                    </p>
                  )}
                  <p>
                    <strong className="font-sans font-bold uppercase text-xs text-amber-400 tracking-wider">
                      {lang === "de" ? "Abend:" : "Evening:"}
                    </strong>{" "}
                    {d.evening}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-4 text-xs font-mono uppercase text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-amber-400" />
                    {d.stay}
                  </span>
                  <span>•</span>
                  <span>{d.meals}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PRICING & INCLUSIONS ── */}
        <section>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-8 border-b border-white/10 pb-4">
            {t.inclusionsTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Included */}
            <div className="p-8 border border-amber-400/30 bg-amber-400/[0.02]">
              <h3 className="text-lg font-bold uppercase text-amber-400 mb-6 flex items-center gap-2">
                <CheckCircle2 size={18} />
                <span>{t.includedHeading}</span>
              </h3>
              <ul className="space-y-3 font-serif text-sm text-neutral-300">
                {t.included.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-amber-400 font-sans">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Excluded */}
            <div className="p-8 border border-white/10 bg-white/[0.01]">
              <h3 className="text-lg font-bold uppercase text-neutral-400 mb-6 flex items-center gap-2">
                <XCircle size={18} />
                <span>{t.excludedHeading}</span>
              </h3>
              <ul className="space-y-3 font-serif text-sm text-neutral-400">
                {t.excluded.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-neutral-500 font-sans">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── BOOKING CONTACT SECTION ── */}
        <section
          id="booking"
          className="p-8 md:p-12 border border-amber-400/40 bg-gradient-to-r from-amber-400/10 via-transparent to-transparent"
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-2">
              {t.bookingTitle}
            </h2>
            <p className="font-serif italic text-neutral-300 text-sm md:text-base mb-8">
              {t.bookingSubtitle}
            </p>

            <div className="space-y-4 font-mono text-sm uppercase">
              <a
                href="https://wa.me/996XXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-amber-400 hover:text-amber-300 transition-colors"
              >
                <Phone size={16} />
                <span>WhatsApp: +996 505 583 958
</span>
              </a>
              <a
                href="mailto:your.email@domain.com"
                className="flex items-center gap-3 text-amber-400 hover:text-amber-300 transition-colors"
              >
                <Mail size={16} />
                <span>Email: expeditions@wildinkyrgyzstan.com</span>
              </a>
              <a
                href="https://instagram.com/your_account"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-amber-400 hover:text-amber-300 transition-colors"
              >
                <Instagram size={16} />
                <span>Instagram: @wildinkyrgyzstan</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}