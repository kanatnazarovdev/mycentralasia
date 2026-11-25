


import { Metadata } from "next";
import Hero from "@/components/Hero";
import { getAlternates } from "@/hooks/helper";
import About from "@/components/About";

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
    title: {
      absolute: isDe
        ? "Wild Kyrgyzstan | Abenteuer & Geführte Expeditionen"
        : isEs
          ? "Wild Kyrgyzstan | Aventuras y Expediciones Guiadas"
          : "Wild Kyrgyzstan | Untamed Adventure & Guided Expeditions",
    },
    description: isDe
      ? "Entdecken Sie unberührte Natur, nomadische Kultur und spektakuläre Trekkingtouren in Kirgistan mit lokalen Experten."
      : isEs
        ? "Descubre la naturaleza virgen, la cultura nómada y expediciones en la alta montaña de Kirguistán con expertos locales."
        : "Discover untamed landscapes, nomadic heritage, high-altitude mountain travel, and authentic yurt stays with Wild Kyrgyzstan.",
    alternates: getAlternates(lang, ""),
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang?: string }>;
}) {
  const resolvedParams = await params;
  const rawLang = resolvedParams?.lang || "en";
  const lang = ["es", "de"].includes(rawLang) ? rawLang : "en";

  return (
    <div className="relative w-full">
      {/* Centered Cinematic Hero */}
      <Hero lang={lang} />
      <About lang={lang}/>
    </div>
  );
}