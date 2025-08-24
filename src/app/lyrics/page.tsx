"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function LyricsPage() {
  const [lyrics, setLyrics] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const router = useRouter();
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setLyrics(sessionStorage.getItem("lyrics") || "");
    return () => {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    };
  }, []);

  const chosenVoice = useMemo(() => {
    if (typeof window === "undefined") return null;
    const preferred =
      sessionStorage.getItem("gender") ||
      sessionStorage.getItem("singer") ||
      "male";

    const pick = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices || voices.length === 0) return null;
      const enVoices = voices.filter((v) => /^en[-_]/i.test(v.lang));
      return enVoices[0] || voices[0] || null;
    };

    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = () => pick();
    }
    return pick();
  }, []);

  const play = () => {
    if (!lyrics) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(lyrics);
      if (chosenVoice) u.voice = chosenVoice;
      u.rate = 0.95;
      u.onend = () => setIsPlaying(false);
      u.onerror = () => setIsPlaying(false);
      utteranceRef.current = u;
      window.speechSynthesis.speak(u);
      setIsPlaying(true);
    } catch {}
  };

  const stop = () => {
    try {
      window.speechSynthesis.cancel();
    } catch {}
    setIsPlaying(false);
  };

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center text-white p-6 bg-cover bg-center"
      style={{ backgroundImage: "url('/BG.jpg')" }}
    >
      {/* Header */}
      <header className="w-full flex items-center justify-between px-2 sm:px-4 py-2">
        <img src="/Cadbury Logo.png" alt="Cadbury" className="h-8" />
        <img
          src="/2d logo.png"
          alt="#mybirthdaysong"
          className="h-14 sm:h-16"
        />
        <button aria-label="Menu">
          <img src="/Hamburger.png" alt="Menu" className="h-8" />
        </button>
      </header>

      {/* Progress dots */}
      <div className="flex justify-center gap-3 mt-4">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={`w-2.5 h-2.5 rounded-full ${
              i === 3 ? "bg-yellow-400" : "bg-purple-600"
            }`}
          />
        ))}
      </div>

      {/* Title */}
      <h2 className="text-center text-white text-lg sm:text-xl font-extrabold mt-4">
        Your song&apos;s lyrics are ready!
      </h2>

      {/* Lyrics Box */}
      <div className="mt-4 flex-1 flex justify-center">
        <div className="w-full rounded-3xl bg-white/95 shadow-xl p-4">
          <div
            className="h-[58vh] sm:h-[50vh] overflow-y-auto rounded-2xl px-2 scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-transparent"
            role="region"
            aria-label="Song lyrics"
          >
            <p className="text-purple-900 whitespace-pre-line leading-relaxed text-center">
              {lyrics || "No lyrics yet."}
            </p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="w-full mx-auto mt-5 mb-6 space-y-3">
        <button
          onClick={isPlaying ? stop : play}
          className="w-full rounded-md bg-yellow-400 text-purple-900 font-extrabold tracking-wide py-3 sm:py-3.5 shadow hover:bg-yellow-300 active:translate-y-[1px] transition"
        >
          {isPlaying ? "STOP" : "PLAY SONG"}
        </button>
      </div>
    </section>
  );
}
