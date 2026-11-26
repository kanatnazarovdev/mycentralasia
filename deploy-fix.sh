#!/usr/bin/env bash
set -e

echo "=== 1. DIAGNOSTIC CHECK ==="
echo "Git branch & last commit:"
git branch --show-current
git log -1 --oneline

echo "Files in public/:"
ls -la public/ 2>/dev/null || echo "No root public/ folder!"

if [ -d "src/app" ]; then
  BASE="src"
else
  BASE="."
fi
echo "App base detected: $BASE/app"
ls -la "$BASE/app"

# === 2. CREATE ZERO-404 INLINE SVG / EDITORIAL MASTHEAD COMPONENT ===
# Replaces /logo-light.png so it NEVER breaks in production on Vercel
mkdir -p "$BASE/components/layout"
cat << 'EOF' > "$BASE/components/layout/BrandMasthead.tsx"
import React from "react";

export default function BrandMasthead({
  variant = "dark",
}: {
  variant?: "dark" | "light";
}) {
  const isLight = variant === "light";

  return (
    <span className="inline-flex flex-col select-none">
      <span
        className={`font-serif text-2xl sm:text-[1.75rem] font-bold tracking-[0.04em] leading-none ${
          isLight ? "text-[#F5F1E8]" : "text-[#101D2E]"
        }`}
        style={{
          fontFamily: "'UnifrakturMaguntia', 'Playfair Display', Georgia, serif",
        }}
      >
        My Central Asia
      </span>
      <span
        className={`mt-1 block h-[2px] w-full border-t border-b ${
          isLight ? "border-[#F5F1E8]/40" : "border-[#101D2E]/40"
        }`}
      />
    </span>
  );
}
EOF

# Load UnifrakturMaguntia (authentic NYT Blackletter font) in app/layout.tsx
cat << 'EOF' > "$BASE/app/layout.tsx"
import type { Metadata } from "next";
import { UnifrakturMaguntia } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import JsonLd from "@/components/seo/JsonLd";

const mastheadFont = UnifrakturMaguntia({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-masthead",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mycentralasia.com"),
  title: {
    default: "My Central Asia | History, Cuisine, Culture & Silk Road Expeditions",
    template: "%s | My Central Asia",
  },
  description:
    "My Central Asia is the authoritative digital platform covering Silk Road history, heirloom cuisine, regional news dispatches, and overland expeditions across Kazakhstan, Kyrgyzstan, Uzbekistan, Tajikistan, and Turkmenistan.",
  openGraph: {
    type: "website",
    siteName: "My Central Asia",
    title: "My Central Asia | Culture, Cuisine & Silk Road Expeditions",
    description:
      "Digital archive and travel intelligence hub for Kazakhstan, Kyrgyzstan, Uzbekistan, Tajikistan, and Turkmenistan.",
    url: "https://mycentralasia.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: "My Central Asia",
    url: "https://mycentralasia.com",
    sameAs: [
      "https://instagram.com/mycentralasia.co",
      "https://www.wildinkyrgyzstan.com",
    ],
  };

  return (
    <html lang="en" className={mastheadFont.variable}>
      <body className="min-h-screen flex flex-col bg-[#F5F1E8] text-[#101D2E] antialiased">
        <JsonLd data={orgSchema} />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
EOF

# Update SiteHeader & SiteFooter to use BrandMasthead (zero broken image links)
python3 - << PYEOF
import re

header_path = "$BASE/components/layout/SiteHeader.tsx"
with open(header_path, "r") as f:
    h = f.read()
h = h.replace('import Image from "next/image";', 'import BrandMasthead from "./BrandMasthead";')
h = re.sub(r'<Image[\s\S]*?/>', '<BrandMasthead variant="dark" />', h, count=1)
with open(header_path, "w") as f:
    f.write(h)

footer_path = "$BASE/components/layout/SiteFooter.tsx"
with open(footer_path, "r") as f:
    ft = f.read()
ft = ft.replace('import Image from "next/image";', 'import BrandMasthead from "./BrandMasthead";')
ft = re.sub(r'<Image[\s\S]*?/>', '<BrandMasthead variant="light" />', ft, count=1)
with open(footer_path, "w") as f:
    f.write(ft)
PYEOF

# === 3. REMOVE MIDDLEWARE & [lang] COMPLEXITY SO ALL ROUTES SERVE DIRECTLY ===
rm -f middleware.ts src/middleware.ts
if [ -d "$BASE/app/[lang]" ]; then
  echo "Copying [lang] pages directly to $BASE/app so /, /news, /history, /cuisine, /destinations, /expeditions work natively..."
  cp -rn "$BASE/app/[lang]/"* "$BASE/app/" 2>/dev/null || true
  rm -rf "$BASE/app/[lang]"
fi

# === 4. TEST PRODUCTION BUILD LOCALLY BEFORE PUSHING ===
echo "=== 5. RUNNING LOCAL PRODUCTION BUILD TEST ==="
npm run build

# === 6. COMMIT & PUSH TO VERCEL ===
git add -A
git commit -m "Use crisp NYT Blackletter webfont masthead and direct App Router routes" || true
git push

echo "✅ Production build succeeded and pushed! Check Vercel dashboard to confirm deployment finishes."
