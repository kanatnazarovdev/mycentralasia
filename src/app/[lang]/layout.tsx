/* eslint-disable @typescript-eslint/ban-ts-comment */
import "../globals.css";
import { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { brandonGrotesque, dDin } from "../fonts";
import Shell from "@/components/Shell";

export const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://wildinkyrgyzstan.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const rawLang = resolvedParams?.lang || "en";
  const lang = rawLang === "es" ? "es" : rawLang === "de" ? "de" : "en";
  const isEs = lang === "es";
  const isDe = lang === "de";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: isDe
        ? "Wild Kyrgyzstan | Geführte Touren & Bergexpeditionen"
        : isEs
          ? "Wild Kyrgyzstan | Tours Guiados y Expediciones de Montaña"
          : "Wild Kyrgyzstan | Guided Adventure Tours & Mountain Expeditions",
      template: "%s | Wild Kyrgyzstan",
    },
    description: isDe
      ? "Entdecken Sie unberührte Natur, nomadische Kultur und spektakuläre Trekkingtouren in Kirgistan mit lokalen Experten."
      : isEs
        ? "Descubre la naturaleza virgen, la cultura nómada y excursiones épicas en Kirguistán con expertos locales."
        : "Discover untamed nature, nomadic culture, high-altitude alpine treks, and authentic yurt stays in Central Asia with Wild Kyrgyzstan.",

    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/icon.png", type: "image/png", sizes: "32x32" },
        { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      ],
      shortcut: "/favicon.ico",
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },

    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: {
        en: `${baseUrl}/en`,
        es: `${baseUrl}/es`,
        de: `${baseUrl}/de`,
      },
    },

    openGraph: {
      title: "Wild Kyrgyzstan | Expedition & Adventure Tours",
      description:
        "Experience the untamed heart of Central Asia. Guided trekking, horseback expeditions, and nomadic culture.",
      url: `${baseUrl}/${lang}`,
      siteName: "Wild Kyrgyzstan",
      images: [
        {
          url: `${baseUrl}/yurta.jpg`,
          width: 1200,
          height: 630,
          alt: "Wild Kyrgyzstan — Nomadic Yurt Camp and Tian Shan Mountains",
        },
      ],
      locale: isDe ? "de_DE" : isEs ? "es_ES" : "en_US",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: "Wild Kyrgyzstan | Untamed Adventure Tours",
      description:
        "Experience the untamed heart of Central Asia. Guided trekking, horseback expeditions, and nomadic culture.",
      images: [`${baseUrl}/songkul.jpg`],
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

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ lang?: string }>;
}) {
  const resolvedParams = await props.params;
  const { children } = props;
  const lang = resolvedParams?.lang || "en";

  const travelAgencyJsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Wild Kyrgyzstan",
    alternateName: "Wild Kyrgyzstan Digital Platform",
    image: `${baseUrl}/yurta.jpg`,
    "@id": baseUrl,
    url: baseUrl,
    telephone: "+996-505-583-958",
    email: "wildinkyrgyzstan@gmail.com",
    priceRange: "$$",
    currenciesAccepted: "USD, EUR, CHF, KGS",
    paymentAccepted: "Credit Card, Debit Card, Wire Transfer",
    areaServed: {
      "@type": "Country",
      name: "Kyrgyzstan",
    },
    description:
      "Wild Kyrgyzstan is building the first digital tourism platform in Kyrgyzstan, connecting international travelers directly with mountain trekking, nomadic yurt stays, and verified local guides.",
    knowsAbout: [
      "Digital Tourism Platform",
      "Trekking in Tian Shan Mountains",
      "Horseback Expeditions in Son-Kul",
      "Nomadic Yurt Stay Experiences",
      "Overland 4x4 Mountain Tours",
      "Song-Kul Lake Trekking",
      "Ala-Kul Pass Hikes",
      "Central Asia Travel Logistics",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bishkek",
      addressRegion: "Chuy",
      addressCountry: "KG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 42.8746,
      longitude: 74.5698,
    },
    sameAs: [
      "https://www.instagram.com/wildinkyrgyzstan",
      "https://www.facebook.com/wildinkyrgyzstan",
      "https://www.youtube.com/@wildinkyrgyzstan",
    ],
  };

  const sitelinksJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "Wild Kyrgyzstan",
        description: "The First Digital Tourism Platform in Kyrgyzstan",
        publisher: {
          "@type": "Organization",
          name: "Wild Kyrgyzstan",
          url: baseUrl,
          logo: `${baseUrl}/icon-192.png`,
        },
      },
      {
        "@type": "SiteNavigationElement",
        "@id": `${baseUrl}/#navigation`,
        name: [
          "Destinations & Wilderness Regions",
          "Jol AI - Kyrgyzstan's First AI Tour Guide",
          "About Kyrgyzstan's First Digital Tourism Platform",
          "Field Journal & Cultural Archive",
        ],
        url: [
          `${baseUrl}/${lang}/destinations`,
          `${baseUrl}/${lang}/chat`,
          `${baseUrl}/${lang}/about`,
          `${baseUrl}/${lang}/journal`,
        ],
      },
    ],
  };

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${brandonGrotesque.variable} ${dDin.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(travelAgencyJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(sitelinksJsonLd) }}
        />
      </head>
      <body className="bg-[#0F0E0D] text-[#FAF8F5] antialiased selection:bg-amber-500 selection:text-black">
        <NextTopLoader
          color="#FAF8F5"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #FAF8F5,0 0 5px #FAF8F5"
        />

        {/* ── SHELL DYNAMICALLY EXCLUDES FOOTER & SMOOTH SCROLL ON /CHAT ── */}
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
