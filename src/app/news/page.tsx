import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { createClient } from "next-sanity";
import CountryFlag from "@/components/layout/CountryFlag";
import JsonLd from "@/components/seo/JsonLd";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Central Asia Journal, Field Stories & Regional Updates",
  description:
    "Editorial stories, expedition guides, archaeological discoveries, rail updates, and cultural reporting from Kazakhstan, Kyrgyzstan, Uzbekistan, Tajikistan, and Turkmenistan.",
  alternates: {
    canonical: "https://mycentralasia.com/news",
  },
  openGraph: {
    title: "Central Asia Journal & Updates | My Central Asia",
    description:
      "Regional stories, travel guides, and cultural reporting from Bishkek, Samarkand, Almaty, Dushanbe, and Ashgabat.",
    url: "https://mycentralasia.com/news",
    type: "website",
  },
};

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "rgsy2l30",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-03-24",
  useCdn: false,
  perspective: "published",
});

interface SanityPost {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  countryCode?: "KG" | "UZ" | "KZ" | "TJ" | "TM";
  publishedAt?: string;
  readTime?: string;
  excerpt?: string;
}

const GROQ_QUERY = `
  *[_type in ["post", "article", "journal"] && defined(slug.current)]
  | order(coalesce(publishedAt, _createdAt) desc) {
    _id,
    title,
    "slug": slug.current,
    "category": coalesce(category, categories[0]->title, "CENTRAL ASIA • JOURNAL"),
    countryCode,
    "publishedAt": coalesce(publishedAt, _createdAt),
    readTime,
    "excerpt": coalesce(excerpt, description, subtitle, pt::text(body)[0..220])
  }
`;

function inferCountryCode(category?: string): "KG" | "UZ" | "KZ" | "TJ" | "TM" {
  const upper = (category || "").toUpperCase();
  if (upper.includes("UZBEK")) return "UZ";
  if (upper.includes("KAZAKH")) return "KZ";
  if (upper.includes("TAJIK")) return "TJ";
  if (upper.includes("TURKMEN")) return "TM";
  return "KG";
}

function formatEditorialDate(isoDate?: string) {
  if (!isoDate) return "RECENT DISPATCH";
  return new Date(isoDate)
    .toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    .toUpperCase();
}

export default async function NewsPage() {
  const posts = await sanityClient.fetch<SanityPost[]>(GROQ_QUERY);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        url: "https://mycentralasia.com/news",
        name: "Central Asia Journal & Updates",
        description:
          "Journal essays, archaeological updates, conservation stories, and travel information across Central Asia.",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://mycentralasia.com" },
          { "@type": "ListItem", position: 2, name: "Journal & Updates", item: "https://mycentralasia.com/news" },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#F5F1E8] text-[#101D2E]">
      <JsonLd data={jsonLd} />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 pt-14 pb-20">
        {/* Editorial Header */}
        <div className="border-b border-[#101D2E]/20 pb-10">
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] tracking-[0.24em] text-[#B84A27] uppercase">
            <span>FIELD JOURNAL &amp; REGIONAL UPDATES</span>
            <span className="text-[#101D2E]/60">
              BISHKEK • SAMARKAND • ALMATY • DUSHANBE • ASHGABAT
            </span>
          </div>
          <h1 className="mt-3 font-serif text-4xl sm:text-6xl font-normal text-[#101D2E]">
            Journal &amp; Updates
          </h1>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-[#101D2E]/80 font-light leading-relaxed">
            In-depth field guides, Silk Road archaeology, wildlife conservation,
            and overland travel reporting across Central Asia.
          </p>
        </div>

        {/* Live GROQ Posts Feed */}
        {posts.length === 0 ? (
          <div className="mt-12 border border-[#101D2E]/15 bg-[#EBE4D5]/50 p-10 text-center">
            <div className="font-mono text-[11px] tracking-[0.22em] text-[#B84A27] uppercase">
              ARCHIVE INITIALIZING
            </div>
            <p className="mt-2 font-serif text-2xl text-[#101D2E]">
              No published dispatches found yet.
            </p>
            <p className="mt-2 text-sm text-[#101D2E]/70">
              Publish a post in{" "}
              <Link href="/studio" className="underline text-[#0F4C81]">
                Sanity Studio
              </Link>{" "}
              to display it live here.
            </p>
          </div>
        ) : (
          <div className="mt-8 divide-y divide-[#101D2E]/15 border-b border-[#101D2E]/15">
            {posts.map((post) => {
              const flagCode = post.countryCode || inferCountryCode(post.category);
              return (
                <article
                  key={post._id}
                  className="py-8 flex flex-col lg:flex-row lg:items-start justify-between gap-6"
                >
                  <div className="max-w-3xl">
                    <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] tracking-[0.2em] text-[#0F4C81] uppercase">
                      <CountryFlag code={flagCode} />
                      <span>{post.category}</span>
                      <span className="text-[#101D2E]/30">•</span>
                      <span className="text-[#101D2E]/60">
                        {formatEditorialDate(post.publishedAt)}
                      </span>
                      {post.readTime && (
                        <>
                          <span className="text-[#101D2E]/30">•</span>
                          <span className="text-[#101D2E]/60">{post.readTime}</span>
                        </>
                      )}
                    </div>

                    <h2 className="mt-2.5 font-serif text-2xl sm:text-3xl font-normal text-[#101D2E]">
                      <Link
                        href={`/news/${post.slug}`}
                        className="hover:text-[#B84A27] transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h2>

                    {post.excerpt && (
                      <p className="mt-3 text-sm sm:text-base text-[#101D2E]/80 leading-relaxed font-light">
                        {post.excerpt}
                      </p>
                    )}
                  </div>

                  <div className="shrink-0 pt-1">
                    <Link
                      href={`/news/${post.slug}`}
                      className="inline-flex items-center gap-1.5 bg-[#101D2E] text-[#F5F1E8] px-4 py-2.5 font-mono text-[10px] tracking-[0.18em] uppercase hover:bg-[#B84A27] transition-colors"
                    >
                      <span>READ STORY</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}