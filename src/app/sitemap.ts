import type { MetadataRoute } from "next";
import { ARTICLES, COUNTRIES } from "@/data/centralAsiaData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mycentralasia.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/news`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/history`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/cuisine`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/expeditions`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  ];

  const countryRoutes: MetadataRoute.Sitemap = COUNTRIES.map((country) => ({
    url: `${baseUrl}/destinations/${country.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const articleRoutes: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
    url: `${baseUrl}/news/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...countryRoutes, ...articleRoutes];
}
