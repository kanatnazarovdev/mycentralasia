/* eslint-disable @typescript-eslint/no-explicit-any */
import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://wildinkyrgyzstan.com";
  const languages = ["en", "es", "de"];
  
  const staticPages = [
    "tours",
    "destinations",
    "about",
    "journal",
    "faq",
    "contact",
  ];

  const currentCrawlDate = new Date();

  const staticRoutes: MetadataRoute.Sitemap = languages.flatMap((lang) => {
    const routes: MetadataRoute.Sitemap = [
      {
        url: `${baseUrl}/${lang}`,
        lastModified: currentCrawlDate,
        changeFrequency: "daily",
        priority: 1.0,
      },
    ];

    staticPages.forEach((page) => {
      routes.push({
        url: `${baseUrl}/${lang}/${page}`,
        lastModified: currentCrawlDate,
        changeFrequency: page === "journal" || page === "tours" ? "daily" : "weekly",
        priority: page === "tours" || page === "destinations" ? 0.9 : 0.8,
      });
    });
    return routes;
  });

  // 2. Dynamic Tour Routes from Sanity
  const tours = await client.fetch(
    groq`*[_type == "tour" && defined(slug.current)]{
      "slug": slug.current,
      "_updatedAt": _updatedAt
    }`
  );

  const dynamicTourRoutes: MetadataRoute.Sitemap = languages.flatMap((lang) =>
    tours.map((tour: any) => ({
      url: `${baseUrl}/${lang}/tours/${tour.slug}`,
      lastModified: tour._updatedAt ? new Date(tour._updatedAt) : currentCrawlDate,
      changeFrequency: "weekly",
      priority: 0.9, // High priority for bookable tours
    }))
  );

  // 3. Dynamic Journal/Blog Routes from Sanity
  const posts = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)]{
      "slug": slug.current,
      "_updatedAt": _updatedAt
    }`
  );

  const dynamicBlogRoutes: MetadataRoute.Sitemap = languages.flatMap((lang) =>
    posts.map((post: any) => ({
      url: `${baseUrl}/${lang}/journal/${post.slug}`,
      lastModified: post._updatedAt ? new Date(post._updatedAt) : currentCrawlDate,
      changeFrequency: "monthly",
      priority: 0.7,
    }))
  );

  // 4. Dynamic Destination Hubs from Sanity (e.g. /destinations/son-kul)
  const destinations = await client.fetch(
    groq`*[_type == "destination" && defined(slug.current)]{
      "slug": slug.current,
      "_updatedAt": _updatedAt
    }`
  );

  const dynamicDestinationRoutes: MetadataRoute.Sitemap = languages.flatMap((lang) =>
    destinations.map((dest: any) => ({
      url: `${baseUrl}/${lang}/destinations/${dest.slug}`,
      lastModified: dest._updatedAt ? new Date(dest._updatedAt) : currentCrawlDate,
      changeFrequency: "weekly",
      priority: 0.8,
    }))
  );

  return [
    ...staticRoutes,
    ...dynamicTourRoutes,
    ...dynamicDestinationRoutes,
    ...dynamicBlogRoutes,
  ];
}