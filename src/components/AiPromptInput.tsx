// components/AiPromptInput.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight } from "lucide-react";

export default function AiPromptInput({ lang }: { lang: string }) {
  const [prompt, setPrompt] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    // Encode query and redirect to dedicated chat page
    const encodedPrompt = encodeURIComponent(prompt.trim());
    router.push(`/${lang}/chat?q=${encodedPrompt}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-2xl mx-auto flex items-center bg-[#161513] border border-white/15 focus-within:border-amber-400/80 transition-all rounded-xs shadow-xl p-2"
    >
      <div className="flex items-center gap-2 pl-3 text-amber-400">
        <Sparkles size={18} />
      </div>

      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask Wild AI (e.g., What should I pack for Song-Kul in July?)..."
        className="w-full bg-transparent px-4 py-3 text-sm text-[#FAF8F5] placeholder-neutral-500 focus:outline-none font-ddin"
      />

      <button
        type="submit"
        className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-colors rounded-xs flex-shrink-0"
      >
        <span>Ask</span>
        <ArrowRight size={14} />
      </button>
    </form>
  );
}