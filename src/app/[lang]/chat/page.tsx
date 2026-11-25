/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Sparkles, ArrowUp, Compass, ArrowLeft, MapPin } from "lucide-react";
import Link from "next/link";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

function ChatInterface() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q");
  const hasInitialized = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // 📳 Haptic feedback helper for mobile devices supporting the Vibration API
  const triggerHapticFeedback = () => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate([40, 60, 40]); // Subtle double pulse
      } catch (e) {
        // Ignored if blocked by browser permission policy
      }
    }
  };

  const sendMessageToApi = async (userPrompt: string, currentHistory: Message[]) => {
    if (!userPrompt.trim() || isLoading) return;

    setIsLoading(true);

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userPrompt.trim(),
    };

    const updatedMessages = [...currentHistory, userMsg];
    setMessages(updatedMessages);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) throw new Error(`Server returned status ${response.status}`);

      const assistantMsgId = (Date.now() + 1).toString();

      setMessages((prev) => [
        ...prev,
        { id: assistantMsgId, role: "assistant", content: "" },
      ]);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let done = false;
        let accumulatedText = "";

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          if (value) {
            const chunk = decoder.decode(value, { stream: true });
            accumulatedText += chunk;

            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMsgId ? { ...msg, content: accumulatedText } : msg
              )
            );
          }
        }

        // Trigger phone vibration when the AI finishes responding
        triggerHapticFeedback();
      }
    } catch (err: any) {
      console.error("Chat streaming error:", err);
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: "assistant", content: "I'm having trouble connecting to the archives right now. Please try again." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery && !hasInitialized.current) {
      hasInitialized.current = true;
      sendMessageToApi(initialQuery, []);
    }
  }, [initialQuery]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const currentInput = input;
    setInput("");
    sendMessageToApi(currentInput, messages);
  };

  return (
    <div className="bg-white text-[#1F1F1F] h-screen w-full flex flex-col antialiased overflow-hidden">
      
      {/* Sleek Light Header */}
      <header className="border-b border-gray-100 px-6 py-4 flex items-center justify-between bg-white/90 backdrop-blur-md flex-shrink-0 z-10">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
            title="Return Home"
          >
            <ArrowLeft size={18} />
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
              <Compass size={16} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm font-semibold text-gray-900 m-0">Jol AI</h1>
                <span className="text-[11px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-medium">
                  Жол • Path
                </span>
              </div>
              <p className="text-[11px] text-gray-500">Kyrgyzstan&apos;s First AI Tourist Guide</p>
            </div>
          </div>
        </div>
      </header>

      {/* Messages Stream */}
      <main className="flex-1 overflow-y-auto px-4 py-8 md:px-12 space-y-8 max-w-4xl mx-auto w-full">
        {messages.length === 0 && !isLoading && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 my-auto pt-10">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shadow-sm">
              <MapPin size={24} />
            </div>
            <div className="space-y-2 max-w-md">
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">Meet Jol AI — Kyrgyzstan&lsquo;s First AI Tourist Guide</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                &ldquo;Jol&rdquo; means <em>road</em> or <em>journey</em> in Kyrgyz. Ask me anything about alpine trekking routes, Son-Kul yurt stays, local culture, or custom tour itineraries across Kyrgyzstan.
              </p>
            </div>
          </div>
        )}

        {messages.map((m) => {
          if (!m.content && m.role === "assistant" && !isLoading) return null;

          return m.role === "user" ? (
            <div key={m.id} className="flex justify-end w-full">
              <div className="bg-[#F0F4F9] text-[#1F1F1F] px-5 py-3.5 rounded-3xl rounded-tr-sm max-w-[85%] md:max-w-[75%] text-[17px] leading-relaxed">
                {m.content}
              </div>
            </div>
          ) : (
            <div key={m.id} className="flex gap-4 max-w-[95%] md:max-w-[85%] w-full">
              <div className="flex-shrink-0 mt-1 w-8 h-8 rounded-full flex items-center justify-center bg-amber-500 text-white shadow-sm">
                <Sparkles size={14} />
              </div>
              <div className="pt-1.5 flex-1 min-w-0">
                <p className="leading-relaxed text-[17px] text-[#1F1F1F] whitespace-pre-wrap break-words">
                  {m.content}
                </p>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-3 text-gray-400 p-2">
            <Sparkles size={16} className="animate-pulse text-amber-500" />
            <span className="text-sm">Jol is mapping the route...</span>
          </div>
        )}

        <div ref={messagesEndRef} className="h-4" />
      </main>

      {/* Input Bar (Gemini Pill Style with AI Sign on Left) */}
      <footer className="px-4 pb-6 pt-2 bg-white flex-shrink-0">
        <form onSubmit={handleFormSubmit} className="max-w-3xl mx-auto w-full">
          <div className="relative flex items-center bg-[#F0F4F9] transition-all duration-300 rounded-full p-1.5 pl-4 border border-transparent focus-within:bg-white focus-within:shadow-[0_2px_10px_rgba(0,0,0,0.08)] focus-within:border-gray-200">
            
            {/* AI Badge on Left */}
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/10 text-amber-600 flex-shrink-0 mr-1">
              <Sparkles size={16} />
            </div>

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Jol about treks, weather, or routes..."
              className="w-full bg-transparent px-2 py-3.5 text-[17px] text-[#1F1F1F] placeholder-[#444746] focus:outline-none"
            />
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-[#1F1F1F] hover:bg-amber-600 disabled:bg-[#E3E3E3] disabled:text-[#A0A0A0] text-white transition-colors flex-shrink-0"
            >
              <ArrowUp size={18} />
            </button>
          </div>
          <div className="text-center mt-3">
             <span className="text-[11px] text-gray-400">Jol AI is Kyrgyzstan&apos;s first AI tour guide. Verify critical mountain safety info.</span>
          </div>
        </form>
      </footer>
    </div>
  );
}

export default function DedicatedChatPage() {
  return (
    <Suspense 
      fallback={
        <div className="h-screen w-full bg-white flex items-center justify-center">
          <Sparkles className="text-amber-500 animate-pulse" size={32} />
        </div>
      }
    >
      <ChatInterface />
    </Suspense>
  );
}