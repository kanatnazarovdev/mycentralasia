import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { groq } from "next-sanity";

export interface JournalPost {
  _id: string;
  slug: string;
  issue: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  featured?: boolean;
  coverImage?: any;
}

interface Props {
  params: Promise<{ lang?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || "en";

  return {
    title:
      lang === "de"
        ? "Tagebuch & Archiv | Wild Kyrgyzstan"
        : lang === "es"
        ? "Diario de Campo | Wild Kyrgyzstan"
        : "Field Journal & Cultural Archive | Wild Kyrgyzstan",
    description:
      "Dispatches on Kyrgyz nomadic heritage, mountain lore, Silk Road history, and high-altitude expedition logistics.",
  };
}

// ── 1. GROQ QUERY WITH COMPREHENSIVE IMAGE FIELD DEREFERENCING ──
const journalQuery = groq`
  *[_type in ["post", "journal"] && !(_id in path("drafts.**")) && (language == $lang || !defined(language))] | order(publishedAt desc) {
    _id,
    "slug": slug.current,
    "issue": coalesce(issue, issueNumber, "FIELD DISPATCH"),
    title,
    excerpt,
    "date": coalesce(publishedAt, _createdAt),
    "readTime": coalesce(readTime, readingTime, "5 MIN READ"),
    category,
    featured,
    "coverImage": coalesce(
      coverImage.asset,
      mainImage.asset,
      image.asset,
      heroImage.asset,
      coverImage,
      mainImage,
      image,
      heroImage
    )
  }
`;

async function getJournalDispatches(lang: string): Promise<JournalPost[]> {
  try {
    const posts = await client.fetch<JournalPost[]>(
      journalQuery,
      { lang },
      { next: { revalidate: 60 } }
    );
    return posts || [];
  } catch (error) {
    console.error("Error fetching dispatches from Sanity:", error);
    return [];
  }
}

// Robust helper to safely extract and resolve image URLs from Sanity image objects
function getImageUrl(imageAsset: any): string | null {
  if (!imageAsset) return null;
  try {
    // If it's a direct reference string or object, urlFor resolves it cleanly
    const imageBuilder = urlFor(imageAsset);
    if (!imageBuilder) return null;
    return imageBuilder.width(1200).height(800).fit("crop").url();
  } catch (err) {
    console.error("Error building Sanity image URL:", err);
    return null;
  }
}

// ── 2. MAIN JOURNAL PAGE COMPONENT ──
export default async function JournalPage({ params }: Props) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || "en";

  const dispatches = await getJournalDispatches(lang);

  const featuredDispatch = dispatches.find((d) => d.featured) || dispatches[0];
  const regularDispatches = dispatches.filter(
    (d) => d?._id !== featuredDispatch?._id
  );

  const featuredImageUrl = getImageUrl(featuredDispatch?.coverImage);

  return (
    <div className="bg-[#0F0E0D] text-[#FAF8F5] min-h-screen pt-32 pb-24 px-6 md:px-12 font-ddin select-none">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="border-b border-white/10 pb-10 mb-16">
          <div className="flex items-center gap-2 text-xs font-bold tracking-[0.3em] uppercase text-amber-400 mb-4">
            <BookOpen size={16} />
            <span>
              {lang === "de"
                ? "Publikation • Feldberichte"
                : lang === "es"
                ? "Publicación • Informes de Campo"
                : "Publication • Field Dispatches"}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight text-white mb-6">
            {lang === "de"
              ? "Tagebuch & Archiv"
              : lang === "es"
              ? "Diario de Campo"
              : "The Field Journal"}
          </h1>
          <p className="font-serif italic text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed">
            {lang === "de"
              ? "Essays, Geschichte, nomadische Traditionen und Expeditionsnotizen direkt von den Hochgebirgspfaden Kirgisistans."
              : lang === "es"
              ? "Ensayos, historia, tradiciones nómadas y notas de expedición registradas directamente desde las rutas de alta montaña de Kirguistán."
              : "Essays, history, nomadic traditions, and expedition notes recorded directly from the high mountain trails of Kyrgyzstan."}
          </p>
        </div>

        {/* Empty State */}
        {dispatches.length === 0 && (
          <div className="py-20 text-center border border-white/10 bg-white/[0.01]">
            <p className="text-lg font-serif italic text-neutral-400">
              No dispatches published in Sanity CMS yet.
            </p>
          </div>
        )}

        {/* Featured Dispatch Banner */}
        {featuredDispatch && (
          <div className="mb-20 border border-white/10 bg-white/[0.01] hover:border-amber-400/40 transition-all duration-300 overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Featured Image */}
              {featuredImageUrl && (
                <div className="lg:col-span-7 relative min-h-[320px] lg:min-h-[480px] overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
                  <Image
                    src={featuredImageUrl}
                    alt={featuredDispatch.title || "Featured Dispatch Cover"}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E0D] via-transparent to-transparent lg:hidden opacity-80" />
                </div>
              )}

              {/* Featured Details */}
              <div
                className={`${
                  featuredImageUrl ? "lg:col-span-5" : "lg:col-span-12"
                } p-8 md:p-12 flex flex-col justify-between`}
              >
                <div>
                  <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-amber-400 mb-3">
                    {featuredDispatch.issue}
                  </div>

                  <Link href={`/${lang}/journal/${featuredDispatch.slug}`}>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white mb-6 group-hover:text-amber-400 transition-colors">
                      {featuredDispatch.title}
                    </h2>
                  </Link>

                  <p className="font-serif italic text-neutral-300 text-base md:text-lg mb-8 leading-relaxed line-clamp-4">
                    {featuredDispatch.excerpt}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10 text-xs font-bold uppercase tracking-widest text-neutral-400">
                  <div className="flex items-center gap-6">
                    <span className="flex items-center gap-2">
                      <Calendar size={14} className="text-amber-400" />
                      {new Date(featuredDispatch.date).toLocaleDateString(
                        lang === "de" ? "de-DE" : lang === "es" ? "es-ES" : "en-US",
                        { month: "short", year: "numeric" }
                      )}
                    </span>
                    {featuredDispatch.readTime && (
                      <span className="flex items-center gap-2">
                        <Clock size={14} className="text-amber-400" />
                        {featuredDispatch.readTime}
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/${lang}/journal/${featuredDispatch.slug}`}
                    className="inline-flex items-center gap-2 text-white hover:text-amber-400 transition-colors"
                  >
                    <span>
                      {lang === "de"
                        ? "Vollständigen Bericht Lesen"
                        : lang === "es"
                        ? "Leer Informe Completo"
                        : "Read Full Dispatch"}
                    </span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Dispatches Grid */}
        {regularDispatches.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {regularDispatches.map((dispatch) => {
              const dispatchImgUrl = getImageUrl(dispatch.coverImage);

              return (
                <div
                  key={dispatch._id}
                  className="border border-white/10 bg-white/[0.02] overflow-hidden flex flex-col justify-between hover:border-amber-400/40 transition-all duration-300 group"
                >
                  <div>
                    {/* Card Cover Image */}
                    {dispatchImgUrl && (
                      <Link
                        href={`/${lang}/journal/${dispatch.slug}`}
                        className="block relative w-full h-56 overflow-hidden border-b border-white/10"
                      >
                        <Image
                          src={dispatchImgUrl}
                          alt={dispatch.title || "Dispatch Cover"}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                      </Link>
                    )}

                    <div className="p-8">
                      <div className="text-[10px] font-bold tracking-[0.25em] uppercase text-amber-400 mb-2">
                        {dispatch.issue}
                      </div>

                      <Link href={`/${lang}/journal/${dispatch.slug}`}>
                        <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-white mb-4 group-hover:text-amber-400 transition-colors">
                          {dispatch.title}
                        </h3>
                      </Link>

                      <p className="font-serif text-sm text-neutral-400 italic mb-6 leading-relaxed line-clamp-3">
                        {dispatch.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-8 pt-0">
                    <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-bold tracking-widest text-neutral-400 uppercase">
                      <span className="flex items-center gap-2">
                        <Clock size={12} className="text-amber-400" />
                        {dispatch.readTime}
                      </span>

                      <Link
                        href={`/${lang}/journal/${dispatch.slug}`}
                        className="text-white hover:text-amber-400 transition-colors inline-flex items-center gap-1"
                      >
                        <span>
                          {lang === "de"
                            ? "Lesen"
                            : lang === "es"
                            ? "Leer"
                            : "Read"}
                        </span>
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}