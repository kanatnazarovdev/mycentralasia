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

        <p className="mt-4 text-lg text-[#101D2E]/75 font-light leading-relaxed">
          {article.subtitle}
        </p>

        <div className="mt-6 flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-[#101D2E]/50">
          <span>BY {article.author.toUpperCase()}</span>
          <span>PUBLISHED {article.publishedAt}</span>
        </div>
      </header>

      <div className="mt-10 space-y-6 text-base sm:text-lg text-[#101D2E]/85 leading-relaxed font-light">
        {article.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-14 border border-[#101D2E]/20 bg-white/80 p-8">
        <div className="font-mono text-[10px] tracking-[0.22em] text-[#B84A27] uppercase">
          EXPERIENCE THIS REGION FIRSTHAND
        </div>
        <h2 className="mt-2 font-serif text-2xl text-[#101D2E]">
          Plan a Custom Silk Road & Mountain Expedition
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
          className="mt-5 inline-flex items-center gap-2 bg-[#101D2E] px-5 py-3 font-mono text-[11px] font-semibold tracking-[0.18em] text-[#F5F1E8] uppercase hover:bg-white transition-colors"
        >
          <span>EXPLORE EXPEDITIONS</span>
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}
