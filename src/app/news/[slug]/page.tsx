import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { createClient } from "next-sanity";
import { PortableText } from "@portabletext/react";
import { ARTICLES } from "@/data/centralAsiaData";
import CountryFlag from "@/components/layout/CountryFlag";
import JsonLd from "@/components/seo/JsonLd";

export const revalidate = 60;

export const dynamicParams = true;

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "rgsy2l30",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-03-24",
  useCdn: false,
  perspective: "published",
});

interface SanityArticle {
  _id: string;
  title: string;
  subtitle?: string;
  slug: string;
  country?: string;
  countryCode?: "KG" | "UZ" | "KZ" | "TJ" | "TM";
  category?: string;
  readTime?: string;
  author?: string;
  publishedAt?: string;
  excerpt?: string;
  seoKeywords?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[];
}

const ALL_SLUGS_QUERY = `
  *[_type in ["post", "article", "journal"] && defined(slug.current)] {
    "slug": slug.current
  }
`;

const SINGLE_ARTICLE_QUERY = `
  *[_type in ["post", "article", "journal"] && slug.current == $slug][0] {
    _id,
    title,
    subtitle,
    "slug": slug.current,
    country,
    countryCode,
    category,
    readTime,
    "author": coalesce(author->name, author, "MyCentralAsia Editorial"),
    "publishedAt": coalesce(publishedAt, _createdAt),
    excerpt,
    seoKeywords,
    "body": coalesce(body, content)
  }
`;

function inferCountry(category?: string): {
  country: string;
  countryCode: "KG" | "UZ" | "KZ" | "TJ" | "TM";
} {
  const upper = (category || "").toUpperCase();
  if (upper.includes("UZBEK")) return { country: "Uzbekistan", countryCode: "UZ" };
  if (upper.includes("KAZAKH")) return { country: "Kazakhstan", countryCode: "KZ" };
  if (upper.includes("TAJIK")) return { country: "Tajikistan", countryCode: "TJ" };
  if (upper.includes("TURKMEN")) return { country: "Turkmenistan", countryCode: "TM" };
  return { country: "Kyrgyzstan", countryCode: "KG" };
}

async function getArticleBySlug(slug: string) {
  try {
    const sanityPost = await sanityClient.fetch<SanityArticle | null>(
      SINGLE_ARTICLE_QUERY,
      { slug }
    );
    if (sanityPost) {
      const inferred = inferCountry(sanityPost.category);
      return {
        source: "sanity" as const,
        title: sanityPost.title,
        subtitle: sanityPost.subtitle || sanityPost.excerpt || "",
        slug: sanityPost.slug,
        country: sanityPost.country || inferred.country,
        countryCode: sanityPost.countryCode || inferred.countryCode,
        category: sanityPost.category || "FIELD JOURNAL",
        readTime: sanityPost.readTime || "6 MIN READ",
        author: sanityPost.author || "MyCentralAsia Editorial",
        publishedAt: sanityPost.publishedAt
          ? new Date(sanityPost.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "RECENT DISPATCH",
        isoDate: sanityPost.publishedAt,
        excerpt: sanityPost.excerpt || "",
        seoKeywords: sanityPost.seoKeywords,
        body: sanityPost.body,
        content: [] as string[],
      };
    }
  } catch (err) {
    console.error("Sanity article fetch failed, checking local fallback:", err);
  }

  const local = ARTICLES.find((a) => a.slug === slug);
  if (!local) return null;

  return {
    source: "local" as const,
    ...local,
    isoDate: local.publishedAt,
    body: undefined,
  };
}

export async function generateStaticParams() {
  let sanitySlugs: { slug: string }[] = [];
  try {
    sanitySlugs = await sanityClient.fetch<{ slug: string }[]>(ALL_SLUGS_QUERY);
  } catch {
    sanitySlugs = [];
  }

  const combined = new Set([
    ...sanitySlugs.map((item) => item.slug),
    ...ARTICLES.map((article) => article.slug),
  ]);

  return Array.from(combined).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found | My Central Asia" };

  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.seoKeywords,
    alternates: {
      canonical: `https://mycentralasia.com/news/${article.slug}`,
    },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url: `https://mycentralasia.com/news/${article.slug}`,
      publishedTime: article.isoDate,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.isoDate,
    mainEntityOfPage: `https://mycentralasia.com/news/${article.slug}`,
    author: {
      "@type": "Organization",
      name: article.author || "MyCentralAsia Editorial",
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
        className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-[#101D2E]/60 hover:text-[#101D2E] mb-10"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>BACK TO ALL DISPATCHES</span>
      </Link>

      <header className="border-b border-[#101D2E]/15 pb-8">
        <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-[#101D2E]/75">
          <CountryFlag code={article.countryCode} />
          <span>{article.country.toUpperCase()}</span>
          <span>•</span>
          <span>{article.category}</span>
          <span>•</span>
          <span className="text-[#101D2E]/60">{article.readTime}</span>
        </div>

        <h1 className="mt-5 font-serif text-3xl sm:text-5xl text-[#101D2E] leading-tight">
          {article.title}
        </h1>

        {article.subtitle && (
          <p className="mt-4 text-lg text-[#101D2E]/75 font-light leading-relaxed">
            {article.subtitle}
          </p>
        )}

        <div className="mt-6 flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-[#101D2E]/50">
          <span>BY {article.author.toUpperCase()}</span>
          <span>PUBLISHED {article.publishedAt.toUpperCase()}</span>
        </div>
      </header>

      <div className="mt-10 space-y-6 text-base sm:text-lg text-[#101D2E]/85 leading-relaxed font-light">
        {article.source === "sanity" && article.body ? (
          <PortableText
            value={article.body}
            components={{
              block: {
                h2: ({ children }) => (
                  <h2 className="pt-6 font-serif text-2xl sm:text-3xl font-normal text-[#101D2E] border-b border-[#101D2E]/15 pb-2">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="pt-4 font-serif text-xl sm:text-2xl font-normal text-[#101D2E]">
                    {children}
                  </h3>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="my-8 border-l-2 border-[#B84A27] bg-white/70 p-6 font-serif text-lg text-[#101D2E]">
                    {children}
                  </blockquote>
                ),
                normal: ({ children }) => <p>{children}</p>,
              },
            }}
          />
        ) : (
          article.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))
        )}
      </div>

      <div className="mt-14 border border-[#101D2E]/20 bg-white/80 p-8">
        <div className="font-mono text-[10px] tracking-[0.22em] text-[#B84A27] uppercase">
          EXPERIENCE THIS REGION FIRSTHAND
        </div>
        <h2 className="mt-2 font-serif text-2xl text-[#101D2E]">
          Plan a Custom Silk Road &amp; Mountain Expedition
        </h2>
        <p className="mt-2 text-sm text-[#101D2E]/75 font-light leading-relaxed">
          Our field operations partner, WildInKyrgyzstan.com, organizes private
          high-altitude horse treks, culinary journeys, and cross-border
          Central Asian itineraries.
        </p>
        <a
          href="https://www.wildinkyrgyzstan.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 bg-[#101D2E] px-5 py-3 font-mono text-[11px] font-semibold tracking-[0.18em] text-[#F5F1E8] uppercase hover:bg-[#B84A27] hover:text-white transition-colors"
        >
          <span>EXPLORE EXPEDITIONS</span>
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}