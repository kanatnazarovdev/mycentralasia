/* eslint-disable react-hooks/purity */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import { baseUrl } from "@/hooks/helper";
import { ArrowLeft, Calendar, MapPin, Compass } from "lucide-react";

// ── 1. PORTABLE TEXT RENDERER (Supports Text Blocks & Inline Images) ──
export const portableTextComponents: any = {
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#0F0E0D] mt-12 mb-6 pt-6 border-t border-[#0F0E0D]/10 font-ddin">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-bold uppercase tracking-wider text-[#0F0E0D] mt-8 mb-4 font-ddin">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="mb-8 leading-relaxed text-[#2C2A28] font-serif text-base sm:text-lg md:text-xl font-light">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="my-10 p-8 bg-[#F0EFE8] border-l-4 border-amber-600 shadow-sm font-serif italic text-lg sm:text-2xl text-[#0F0E0D]">
        {children}
      </blockquote>
    ),
  },
  image: ({ value }: any) => {
    if (!value?.asset?._ref) return null;

    // Extract original dimensions from Sanity Asset _ref string
    // Ref format example: "image-a3b2c1...-1920x1080-jpg"
    const refParts = value.asset._ref.split("-");
    const dimensions = refParts[2]?.split("x");
    const width = dimensions?.[0] ? parseInt(dimensions[0], 10) : 1200;
    const height = dimensions?.[1] ? parseInt(dimensions[1], 10) : 800;

    const imageUrl = urlFor(value).url();

    return (
      <figure className="my-10 w-full flex flex-col items-center">
        <div className="w-full max-w-full overflow-hidden rounded-xs border border-[#0F0E0D]/15 shadow-md">
          <Image
            src={imageUrl}
            alt={value.alt || "Article Image"}
            width={width}
            height={height}
            sizes="(max-width: 768px) 100vw, 800px"
            className="w-full h-auto object-contain"
          />
        </div>
        {value.caption && (
          <figcaption className="mt-3 text-center text-xs font-mono uppercase tracking-widest text-neutral-500">
            {value.caption}
          </figcaption>
        )}
      </figure>
    );
  },

  marks: {
    link: ({ children, value }: any) => {
      const isExternal = !value?.href?.startsWith("/");
      return (
        <Link
          href={value?.href || "#"}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-amber-600 underline decoration-[#0F0E0D]/20 underline-offset-4 hover:text-[#0F0E0D] transition-colors font-medium"
        >
          {children}
        </Link>
      );
    },
    strong: ({ children }: any) => (
      <strong className="font-bold text-[#0F0E0D] not-italic">
        {children}
      </strong>
    ),
  },
};

// ── 2. METADATA GENERATOR (FULL SEO & HREFLANG OPTIMIZATION) ──
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}): Promise<Metadata> {
  const { slug, lang } = await params;
  const post = await getPost(slug, lang);

  if (!post) return {};

  const articleImageUrl = post.coverImage
    ? urlFor(post.coverImage).url()
    : `${baseUrl}/og-image.jpg`;

  const languagesMap: Record<string, string> = {
    [lang]: `${baseUrl}/${lang}/journal/${slug}/`,
  };

  post.translations?.forEach((t: { language: string; slug: string }) => {
    if (t.language && t.slug) {
      languagesMap[t.language] = `${baseUrl}/${t.language}/journal/${t.slug}/`;
    }
  });

  const explicitEnglishSlug = post.translations?.find(
    (t: any) => t.language === "en",
  )?.slug;

  if (explicitEnglishSlug) {
    languagesMap["x-default"] = `${baseUrl}/en/journal/${explicitEnglishSlug}/`;
  } else if (lang === "en") {
    languagesMap["x-default"] = `${baseUrl}/en/journal/${slug}/`;
  } else {
    languagesMap["x-default"] = `${baseUrl}/${lang}/journal/${slug}/`;
  }

  return {
    metadataBase: new URL(baseUrl),
    title: `${post.title} | Wild Kyrgyzstan Journal`,
    description: post.excerpt || post.subtitle || post.title,
    alternates: {
      canonical: `${baseUrl}/${lang}/journal/${slug}/`,
      languages: languagesMap,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || post.subtitle || post.title,
      url: `${baseUrl}/${lang}/journal/${slug}/`,
      siteName: "Wild Kyrgyzstan",
      locale: lang === "de" ? "de_DE" : lang === "es" ? "es_ES" : "en_US",
      type: "article",
      publishedTime: post.publishedAt || post._createdAt,
      authors: ["Wild Kyrgyzstan"],
      images: [
        {
          url: articleImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || post.subtitle || post.title,
      images: [articleImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },

    },
  };
}
async function getPost(slug: string, lang: string) {
  try {
    const data = await client.fetch(
      groq`*[_type in ["post", "journal"] && !(_id in path("drafts.**")) && slug.current == $slug && (language == $lang || !defined(language))][0]{
        _id,
        _type,
        _updatedAt,
        _createdAt,
        publishedAt,
        title,
        seoTitle,
        subtitle,
        issueNumber,
        contentType,
        region,
        readingTime,

        // Correctly maps 'coverImage' from Sanity schema
        "coverImage": coalesce(coverImage, mainImage, image, heroImage),

        // Prioritize 'body' array sent by Make.com, fallback to 'content'
        "body": coalesce(body, content, text),

        "excerpt": coalesce(excerpt, array::join(string::split((pt::text(coalesce(body, content, text))), "")[0..160], "")),

        "translations": coalesce(
          *[_type in ["post", "journal"] && !(_id in path("drafts.**")) && (translationOf._ref == ^._id || _id == ^.translationOf._ref || (translationOf._ref == ^.translationOf._ref && defined(translationOf._ref)))],
          *[_type in ["post", "journal"] && !(_id in path("drafts.**")) && _id == ^._id]
        ){
          language,
          "slug": slug.current
        },

        "previous": *[_type in ["post", "journal"] && !(_id in path("drafts.**")) && (language == $lang || !defined(language)) && publishedAt < ^.publishedAt] | order(publishedAt desc)[0]{ 
          "slug": slug.current, 
          title 
        },

        "next": *[_type in ["post", "journal"] && !(_id in path("drafts.**")) && (language == $lang || !defined(language)) && publishedAt > ^.publishedAt] | order(publishedAt asc)[0]{ 
          "slug": slug.current, 
          title 
        }
      }`,
      { slug, lang },
    );

    return data;
  } catch (error) {
    console.error("GROQ Query Failed:", error);
    return null;
  }
}

// ── 4. PAGE COMPONENT ──
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}) {
  const { slug, lang } = await params;
  const post = await getPost(slug, lang);

  // 404 Guard if post slug isn't found
  if (!post) {
    return (
      <div className="min-h-screen bg-[#0F0E0D] text-[#FAF8F5] flex flex-col items-center justify-center py-32 px-6 font-ddin">
        <div className="max-w-md text-center border border-white/10 bg-white/[0.02] p-8 rounded-xs">
          <p className="text-amber-400 text-xs font-mono uppercase tracking-[0.2em] mb-2 font-bold">
            404 // NOT FOUND
          </p>
          <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-3">
            Field Dispatch Not Found
          </h2>
          <Link
            href={`/${lang}/journal`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 text-black font-bold uppercase tracking-[0.2em] text-xs hover:bg-amber-300 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Return to Field Archive</span>
          </Link>
        </div>
      </div>
    );
  }

  // Safe Cover Image URL Resolution
  let coverImageUrl: string | null = null;
  if (post.coverImage) {
    try {
      coverImageUrl = urlFor(post.coverImage).url();
    } catch {
      coverImageUrl = null;
    }
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || post.subtitle || post.title,
    image: coverImageUrl ? [coverImageUrl] : [`${baseUrl}/yurta.jpg`],
    datePublished: post.publishedAt || post._createdAt,
    dateModified: post._updatedAt || post.publishedAt || post._createdAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/${lang}/journal/${slug}/`,
    },
    author: {
      "@type": "Organization",
      name: "Wild Kyrgyzstan",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Wild Kyrgyzstan",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/icon-192.png`,
      },
    },
    articleSection: post.issueNumber || "Field Notes",
    inLanguage: lang,
  };

  return (
    <article className="bg-[#FAFAF4] text-[#0F0E0D] min-h-screen pt-24 pb-32 font-ddin select-none">
      {/* Article Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Back Link Header Bar */}
      <nav
        aria-label="Breadcrumb navigation"
        className="max-w-5xl mx-auto px-6 pt-6"
      >
        <Link
          href={`/${lang}/journal`}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#0F0E0D]/60 hover:text-amber-600 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Field Archive</span>
        </Link>
      </nav>

      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-6 text-center my-10">
        <div className="flex items-center justify-center gap-2 text-xs font-bold tracking-[0.3em] uppercase text-amber-600 mb-4">
          <Compass size={14} />
          <span>{post.issueNumber || "FIELD NOTE"}</span>
          {post.region && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#0F0E0D]/70">
                <MapPin size={12} className="text-amber-600" />
                {post.region}
              </span>
            </>
          )}
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase text-[#0F0E0D] leading-[0.95] mb-6">
          {post.title}
        </h1>

        {post.subtitle && (
          <p className="font-serif italic text-lg md:text-xl text-[#3A3835] font-light max-w-2xl mx-auto mb-6">
            {post.subtitle}
          </p>
        )}

        <div className="flex items-center justify-center gap-4 text-xs font-mono uppercase tracking-widest text-[#0F0E0D]/60 pt-4 border-t border-[#0F0E0D]/10 max-w-xs mx-auto">
          <time
            dateTime={new Date(
              post.publishedAt || post._createdAt || Date.now(),
            ).toISOString()}
            className="flex items-center gap-1.5"
          >
            <Calendar size={13} />
            {new Date(
              post.publishedAt || post._createdAt || Date.now(),
            ).toLocaleDateString(
              lang === "de" ? "de-DE" : lang === "es" ? "es-ES" : "en-US",
              { month: "short", day: "numeric", year: "numeric" },
            )}
          </time>
          {post.readingTime && <span>• {post.readingTime}</span>}
        </div>
      </header>

      {coverImageUrl && (
        <div className="max-w-5xl mx-auto px-6 mb-16 flex justify-center">
          <div className="w-full overflow-hidden border border-[#0F0E0D]/15 shadow-md rounded-xs">
            <img
              src={coverImageUrl}
              alt={post.title || "Dispatch Cover Image"}
              className="w-full h-auto object-contain block"
            />
          </div>
        </div>
      )}

      {/* Main Content Body (PortableText with image support) */}
      <main className="max-w-3xl mx-auto px-6">
        {post.body && Array.isArray(post.body) && post.body.length > 0 ? (
          <div className="prose prose-zinc lg:prose-xl max-w-none mb-20">
            <PortableText
              value={post.body}
              components={portableTextComponents}
            />
          </div>
        ) : (
          <div className="p-8 border border-amber-600/30 bg-amber-500/5 text-center my-12 rounded-xs">
            <p className="font-serif italic text-neutral-600 text-sm">
              No content body found for this document in Sanity. Please check
              that the PortableText field in Sanity Studio is filled out and
              published.
            </p>
          </div>
        )}

        {/* Previous / Next Article Footer Navigation */}
        <nav
          aria-label="Article pagination"
          className="pt-12 mt-20 border-t border-[#0F0E0D]/15"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Previous */}
            <div className="text-left">
              {post.previous ? (
                <Link
                  href={`/${lang}/journal/${post.previous.slug}`}
                  className="group block"
                >
                  <span className="text-[#0F0E0D]/50 text-[10px] font-mono uppercase tracking-[0.3em] block mb-1">
                    ←{" "}
                    {lang === "de"
                      ? "VORHERIGER BERICHT"
                      : lang === "es"
                        ? "ANTERIOR"
                        : "PREVIOUS DISPATCH"}
                  </span>
                  <span className="text-[#0F0E0D] text-sm font-bold uppercase tracking-wider group-hover:text-amber-600 transition-colors line-clamp-1">
                    {post.previous.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>

            {/* Archive Center */}
            <div className="flex justify-center order-first md:order-none">
              <Link
                href={`/${lang}/journal`}
                className="group flex flex-col items-center gap-1.5"
              >
                <div className="w-10 h-10 border border-[#0F0E0D]/20 rounded-full flex items-center justify-center group-hover:border-amber-600 transition-colors">
                  <span className="text-[#0F0E0D]/60 group-hover:text-amber-600 font-mono text-sm">
                    ▦
                  </span>
                </div>
                <span className="text-[#0F0E0D]/60 text-[10px] font-mono uppercase tracking-[0.3em]">
                  Archive
                </span>
              </Link>
            </div>

            {/* Next */}
            <div className="text-right">
              {post.next ? (
                <Link
                  href={`/${lang}/journal/${post.next.slug}`}
                  className="group block"
                >
                  <span className="text-[#0F0E0D]/50 text-[10px] font-mono uppercase tracking-[0.3em] block mb-1">
                    {lang === "de"
                      ? "NÄCHSTER BERICHT"
                      : lang === "es"
                        ? "SIGUIENTE"
                        : "NEXT DISPATCH"}{" "}
                    →
                  </span>
                  <span className="text-[#0F0E0D] text-sm font-bold uppercase tracking-wider group-hover:text-amber-600 transition-colors line-clamp-1">
                    {post.next.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </nav>
      </main>
    </article>
  );
}
