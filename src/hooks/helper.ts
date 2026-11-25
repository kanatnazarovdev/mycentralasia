// src/hooks/helper.ts

export const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://wildinkyrgyzstan.com";

/**
 * Generates canonical and hreflang alternate URL structures for SEO
 * Matches middleware & layout locale routing (en, es, de)
 */
export function getAlternates(lang: string, slug: string = "") {
  // Normalize slug to always start with a slash or remain empty
  const cleanSlug = slug ? (slug.startsWith("/") ? slug : `/${slug}`) : "";

  // Canonical path: default locale (en) uses clean root path without /en prefix
  const canonicalPath =
    lang === "en" || !lang ? cleanSlug || "/" : `/${lang}${cleanSlug}`;

  return {
    canonical: `${baseUrl}${canonicalPath}`,
    languages: {
      en: `${baseUrl}${cleanSlug || "/"}`,
      es: `${baseUrl}/es${cleanSlug}`,
      de: `${baseUrl}/de${cleanSlug}`,
      "x-default": `${baseUrl}${cleanSlug || "/"}`,
    },
  };
}

/**
 * Booking / Reservation Link or Anchor Target
 */
export const bookingUrl = `${baseUrl}/#leadForm`;