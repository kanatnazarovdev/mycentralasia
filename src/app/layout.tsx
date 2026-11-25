import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL("https://mycentralasia.com"),
  title: {
    default: "MyCentralAsia | History, Cuisine, Culture & Silk Road Expeditions",
    template: "%s | MyCentralAsia.com",
  },
  description:
    "The authoritative digital platform for Central Asia—covering Silk Road history, Dungan and nomadic cuisine, regional news dispatches, and overland tours across Kyrgyzstan, Uzbekistan, Kazakhstan, Tajikistan, and Turkmenistan.",
  keywords: [
    "Central Asia travel",
    "Silk Road history",
    "Central Asian food and recipes",
    "Kyrgyzstan tours",
    "Uzbekistan Samarkand guide",
    "Pamir Highway Tajikistan",
    "Kazakhstan travel guide",
  ],
  openGraph: {
    type: "website",
    siteName: "MyCentralAsia.com",
    title: "MyCentralAsia | Digital Platform for Central Asian Culture & Travel",
    description:
      "Explore Central Asian history, traditional recipes, regional dispatches, and high-altitude expeditions.",
    url: "https://mycentralasia.com",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MyCentralAsia",
    url: "https://mycentralasia.com",
    sameAs: [
      "https://instagram.com/mycentralasia.co",
      "https://www.wildinkyrgyzstan.com",
    ],
    description:
      "Digital publication and cultural archive covering Central Asian history, cuisine, culture, and overland expeditions.",
  };

  return (
    <html lang="en" className="dark bg-[#08090B]">
      <body className="min-h-screen flex flex-col bg-[#F5F1E8] text-[#101D2E] antialiased">
        <JsonLd data={orgSchema} />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
