// components/Shell.tsx
"use client";

import { useParams, usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "./Header";

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const params = useParams();
  // Check if current path ends with or contains /chat
  const isChatPage = pathname?.includes("/chat");

  if (isChatPage) {
    // Dedicated Chat View: Full screen, no Header or Footer
    return <main className="min-h-screen bg-[#0F0E0D]">{children}</main>;
  }
  const lang = (params.lang as string) || "en";

  return (
    <SmoothScroll>
      <Header lang={lang} />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </SmoothScroll>
  );
}
