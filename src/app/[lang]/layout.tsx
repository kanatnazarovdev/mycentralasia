/* eslint-disable @typescript-eslint/ban-ts-comment */
import "../globals.css";
import { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { brandonGrotesque, dDin } from "../fonts";
import Shell from "@/components/Shell";

export const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://mycentralasia.com";

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
        ? "My Central Asia | Geschichte, Kulinarik, Kultur & Seidenstraßen-Expeditionen"
        : isEs
          ? "My Central Asia | Historia, Gastronomía, Cultura y Expediciones en Asia Central"
          : "My Central Asia | History, Cuisine, Culture & Silk Road Expeditions",
      template: "%s | My Central Asia",
    },
    description: isDe
      ? "Die digitale Plattform für Zentralasien: Geschichte der Seidenstraße, kulinarisches Erbe, regionale Berichte und Expeditionen durch Kasachstan, Kirgisistan, Usbekistan, Tadschikistan und Turkmenistan."
      : isEs
        ? "La plataforma digital de referencia sobre Asia Central: historia de la Ruta de la Seda, gastronomía tradicional, crónicas regionales y expediciones por las 5 repúblicas."
        : "The authoritative digital platform for Central Asia—uniting Silk Road history, heirloom culinary archives, regional dispatches, and overland expeditions across Kazakhstan, Kyrgyzstan, Uzbekistan, Tajikistan, and Turkmenistan.",

    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
      shortcut: "/icon.svg",
      apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
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
      title: "My Central Asia | Culture, Cuisine & Silk Road Expeditions",
      description:
        "Uncovering the history, culinary heritage, and untamed high-altitude expedition routes across Central Asia.",
      url: `${baseUrl}/${lang}`,
      siteName: "My Central Asia",
      images: [
        {
          url: `${baseUrl}/og-mycentralasia.jpg`,
          width: 1200,
          height: 630,
          alt: "My Central Asia — Silk Road History, Cuisine & High-Altitude Expeditions",
        },
      ],
      locale: isDe ? "de_DE" : isEs ? "es_ES" : "en_US",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: "My Central Asia | Culture, Cuisine & Silk Road Expeditions",
      description:
        "The digital archive and travel intelligence platform for Kazakhstan, Kyrgyzstan, Uzbekistan, Tajikistan, and Turkmenistan.",
      images: [`${baseUrl}/og-mycentralasia.jpg`],
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

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: "My Central Asia",
    alternateName: "MyCentralAsia.com",
    "@id": `${baseUrl}/#organization`,
    url: baseUrl,
    logo: `${baseUrl}/icon.svg`,
    areaServed: [
      { "@type": "Country", name: "Kazakhstan" },
      { "@type": "Country", name: "Kyrgyzstan" },
      { "@type": "Country", name: "Uzbekistan" },
      { "@type": "Country", name: "Tajikistan" },
      { "@type": "Country", name: "Turkmenistan" },
    ],
    description:
      "My Central Asia is an independent digital publication and cultural archive documenting Silk Road history, heirloom Central Asian cuisine, regional news dispatches, and overland expeditions.",
    knowsAbout: [
      "Central Asian History & Silk Road Heritage",
      "Dungan & Nomadic Central Asian Gastronomy",
      "Uzbekistan Timurid Architecture",
      "Kyrgyzstan High-Altitude Horse & Yurt Expeditions",
      "Tajikistan Pamir Highway & Wakhan Corridor",
      "Kazakhstan Steppe & Canyon Overland Routes",
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
      "https://www.instagram.com/mycentralasia.co",
      "https://www.wildinkyrgyzstan.com",
    ],
  };

  const sitelinksJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "My Central Asia",
        description:
          "Digital Platform for Central Asian History, Cuisine, Culture & Expeditions",
        publisher: {
          "@id": `${baseUrl}/#organization`,
        },
      },
      {
        "@type": "SiteNavigationElement",
        "@id": `${baseUrl}/#navigation`,
        name: [
          "The 5 Stans Regional Guides",
          "Journal & Regional News Dispatches",
          "Silk Road Historical Chronicle",
          "Central Asian Cuisine & Recipes",
          "Overland Silk Road Expeditions",
        ],
        url: [
          `${baseUrl}/${lang}/destinations/kyrgyzstan`,
          `${baseUrl}/${lang}/news`,
          `${baseUrl}/${lang}/history`,
          `${baseUrl}/${lang}/cuisine`,
          `${baseUrl}/${lang}/expeditions`,
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
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(sitelinksJsonLd) }}
        />
      </head>
      <body className="bg-[#F5F1E8] text-[#101D2E] antialiased selection:bg-sky-400/30 selection:text-white">
        <NextTopLoader
          color="#0F4C81"
          initialPosition={0.08}
          crawlSpeed={200}
          height={2}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #F4F1EA,0 0 5px #F4F1EA"
        />

        <Shell>{children}</Shell>
      </body>
    </html>
  );
}