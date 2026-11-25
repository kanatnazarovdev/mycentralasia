import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Compass, MapPin, ArrowUpRight } from "lucide-react";
import songkul from "../../../../public/songkul.webp";
import alakul from "../../../../public/alakul.jpg";
// Вы можете импортировать изображение для новой карточки из папки public:
// import tianshan from "../../../../public/tianshan.jpg"; 

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || "en";

  return {
    title:
      lang === "de"
        ? "Reiseziele | Wild Kyrgyzstan"
        : lang === "es"
          ? "Destinos | Wild Kyrgyzstan"
          : "Destinations & Wilderness Regions | Wild Kyrgyzstan",
    description:
      "Explore the high-altitude alpine lakes, ancient Silk Road passes, and untamed mountain regions of Kyrgyzstan.",
  };
}

const DESTINATIONS = [
  {
    id: "tian-shan-grand-expedition",
    name: "Tian Shan Grand Expedition",
    altitude: "3,500 m",
    season: "May – Oct",
    type: "Private 4x4 Slow Travel Tour",
    tagline: "High-altitude alpine lakes, nomadic culture, and Martian canyons.",
    image: songkul, // Замените на ваше изображение (например, tianshan или kel-suu)
    href: "/destinations/tian-shan-grand-expedition",
  },
];

export default async function DestinationsPage({
  params,
}: {
  params: Promise<{ lang?: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || "en";

  return (
    <div className="bg-[#0F0E0D] text-[#FAF8F5] min-h-screen pt-32 pb-24 px-6 md:px-12 font-ddin">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Header */}
        <div className="border-b border-white/10 pb-10 mb-16">
          <div className="flex items-center gap-2 text-xs font-bold tracking-[0.3em] uppercase text-amber-400 mb-4">
            <Compass size={16} />
            <span>Archive Index • Field Destinations</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight text-white mb-6">
            {lang === "de"
              ? "Erkunden Sie Kirgistan"
              : lang === "es"
                ? "Explora Kirguistán"
                : "Wilderness Regions"}
          </h1>
          <p className="font-serif italic text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed">
            From glacial lakes hidden behind 3,800m passes to nomadic summer
            pasturelands untouched by time.
          </p>
        </div>

        {/* Region Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {DESTINATIONS.map((region) => (
            <div
              key={region.id}
              className="group border border-white/10 bg-white/[0.02] hover:border-amber-400/50 transition-all duration-500 flex flex-col justify-between overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative h-72 md:h-80 w-full overflow-hidden bg-neutral-900">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E0D] via-transparent to-transparent z-10 opacity-80" />
                <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 border border-white/10 text-[10px] font-bold tracking-widest uppercase text-amber-400">
                  {region.type}
                </div>

                {/* Next.js Image Component */}
                <Image
                  src={region.image}
                  alt={`${region.name} photography`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority={region.id === "tian-shan-grand-expedition"}
                />
              </div>

              {/* Card Body */}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs font-bold tracking-widest text-neutral-400 uppercase mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} className="text-amber-400" />
                      {region.altitude}
                    </span>
                    <span>•</span>
                    <span>{region.season}</span>
                  </div>

                  <h2 className="text-2xl font-bold uppercase tracking-wider text-white mb-3 group-hover:text-amber-400 transition-colors">
                    {region.name}
                  </h2>

                  <p className="font-serif text-sm text-neutral-400 italic mb-6 leading-relaxed">
                    "{region.tagline}"
                  </p>
                </div>

                <Link
                  href={`/${lang}${region.href}`}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white group-hover:text-amber-400 transition-colors pt-4 border-t border-white/10"
                >
                  <span>
                    {lang === "de" ? "Expedition Erkunden" : "Explore Expedition"}
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}