/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, RefreshCw } from "lucide-react";

interface WildSearchInputProps {
  onSearch?: (query: string) => void;
}

const PRESET_QUERIES = [
  "Chon Kemin Valley trekking & yurt stays",
  "Arslanbob walnut forests & waterfalls",
];

export default function WildSearchInput({ onSearch }: WildSearchInputProps) {
  const router = useRouter();

  const [stage, setStage] = useState<"greeting" | "input">("greeting");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (stage !== "greeting") return;

    const morphTimer = setTimeout(() => {
      setStage("input");
    }, 3000);

    return () => clearTimeout(morphTimer);
  }, [stage]);

  const dispatchSearch = (searchQuery: string) => {
    const cleanQuery = searchQuery.trim();
    if (!cleanQuery) return;

    onSearch?.(cleanQuery);

    const encoded = encodeURIComponent(cleanQuery);
    router.push(`/chat?q=${encoded}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatchSearch(query);
  };

  const handleSelectPreset = (presetText: string) => {
    setQuery(presetText);
    dispatchSearch(presetText);
  };

  return (
    <div className="w-full max-w-3xl mx-auto select-none min-h-[220px] flex flex-col justify-center px-4">
      <AnimatePresence mode="wait">
        {stage === "greeting" ? (
          <motion.div
            key="greeting-stage"
            initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            onClick={() => setStage("input")}
            className="flex flex-col items-center text-center cursor-pointer group"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles size={14} className="animate-pulse" />
              <span>Expedition Guide</span>
            </div>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
              Get into the Wild Kyrgyzstan
            </h3>

            <span className="mt-4 text-xs text-amber-400 opacity-80">
              Click anywhere to start
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="input-stage"
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="w-full"
          >
            <div className="flex items-center justify-center mb-6 relative">
              <span className="text-3xl md:text-5xl font-medium tracking-tight ">
                Where do you want to explore?
              </span>
            </div>

            {/* Premium Gemini-style Input Bar with AI Sign on Left */}
            <form
              onSubmit={handleSubmit}
              className="relative flex items-center bg-[#F0F4F9] hover:bg-[#E8EAED] transition-colors duration-300 rounded-full overflow-hidden p-1.5 pl-4 focus-within:bg-white focus-within:shadow-[0_2px_8px_rgba(0,0,0,0.08)] focus-within:border-gray-200 border border-transparent"
            >
              {/* AI Badge / Icon on Left */}
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/10 text-amber-600 flex-shrink-0 mr-1">
                <Sparkles size={16} />
              </div>

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about Chon Kemin Valley or Arslanbob..."
                className="w-full bg-transparent px-2 py-3.5 text-[15px] md:text-base text-[#1F1F1F] placeholder-[#444746] focus:outline-none"
              />

              <button
                type="submit"
                disabled={!query.trim()}
                className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-[#1F1F1F] hover:bg-amber-400  cursor-pointer disabled:bg-[#E3E3E3] disabled:text-[#A0A0A0] text-white transition-all duration-200"
              >
                <ArrowRight size={18} />
              </button>
            </form>

            {/* Quick Suggestion Chips */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {PRESET_QUERIES.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className="text-[13px] text-[#444746] hover:text-[#1F1F1F] bg-white hover:bg-gray-50 border border-gray-200 px-4 py-2 rounded-full transition-all duration-200"
                >
                  {preset}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
