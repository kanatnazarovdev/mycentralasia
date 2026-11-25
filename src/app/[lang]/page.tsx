import { Metadata } from "next";
import { getAlternates } from "@/hooks/helper";
import ComingSoonHero from "@/components/ComingSoonHero";

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
        ? "MyCentralAsia | Kultur, Kulinarik & Expeditionen entlang der Seidenstraße"
        : isEs
          ? "MyCentralAsia | Cultura, Gastronomía y Expediciones en Asia Central"
          : "MyCentralAsia | Culture, Cuisine & Silk Road Expeditions",
    },
    description: isDe
      ? "Demnächst verfügbar: Ihr digitales Magazin für zentralasiatische Geschichte, Rezepte und authentische Reise-Guides."
      : isEs
        ? "Próximamente: Tu revista digital sobre historia, gastronomía y guías de viaje por Asia Central."
        : "Launching soon: An editorial journal uncovering the cuisine, nomadic heritage, history, and high-altitude expeditions of Central Asia.",
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
  const lang = (["es", "de"].includes(rawLang) ? rawLang : "en") as
    | "en"
    | "es"
    | "de";

  return (
    <div className="relative w-full">
      <ComingSoonHero lang={lang} />
    </div>
  );
}