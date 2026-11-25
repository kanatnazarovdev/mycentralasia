import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jol AI | First AI Tourist Guide in Kyrgyzstan",
  description: "Meet Jol AI, Kyrgyzstan's first AI-powered travel guide. Get instant local insights on trekking routes, alpine lakes like Ala-Kul and Son-Kul, yurt camps, and cultural travel itineraries.",
  keywords: [
    "Kyrgyzstan tour guide",
    "Jol AI",
    "Kyrgyzstan travel assistant",
    "Trekking in Kyrgyzstan",
    "Son-Kul lake tours",
    "Ala-kul trek guide",
    "Visit Kyrgyzstan AI"
  ],
  openGraph: {
    title: "Jol AI | Kyrgyzstan's First AI Tourist Guide",
    description: "Plan your ultimate trek, explore nomadic culture, and discover hidden mountain paths with Jol AI.",
    type: "website",
    url: "https://wildinkyrgyzstan.com/chat",
    siteName: "Wild Kyrgyzstan",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jol AI | First AI Tourist Guide in Kyrgyzstan",
    description: "Explore Kyrgyzstan's mountains, valleys, and culture instantly with Jol AI.",
  },
};

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Jol AI",
    "applicationCategory": "TravelApplication",
    "operatingSystem": "All",
    "description": "Kyrgyzstan's first AI tourist guide offering real-time expedition advice, trekking routes, and cultural travel planning.",
    "url": "https://wildinkyrgyzstan.com/chat",
    "provider": {
      "@type": "Organization",
      "name": "Wild Kyrgyzstan",
      "url": "https://wildinkyrgyzstan.com"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}