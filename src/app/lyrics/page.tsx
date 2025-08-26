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
      <div className="rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-center">
          <img
            src="/progress bar4.png"
            alt="Cadbury Celebrations"
            className="w-50 drop-shadow-lg"
          />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-center text-white text-lg sm:text-xl font-extrabold mt-4">
        Your song&apos;s lyrics are ready!
      </h2>

      {/* Lyrics Box */}
      <div className="mt-4 flex-1 flex justify-center">
        <div className="w-full max-w-md rounded-3xl bg-white/95 shadow-xl p-4">
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
      <div className="w-full mx-auto mt-5 mb-6 space-y-3 flex flex-col items-center">
        <button
          onClick={isPlaying ? stop : play}
          className="mt-8 w-full max-w-md bg-yellow-400 text-purple-900 font-bold py-3 hover:bg-yellow-300 transition"
        >
          {isPlaying ? "STOP" : "PLAY SONG"}
        </button>
      </div>
    </section>
  );
}
