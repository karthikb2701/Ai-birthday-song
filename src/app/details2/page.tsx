"use client";
import { useState } from "react";
import { detailsSchema2 } from "@/lib/validators";
import { useRouter } from "next/navigation";

const MOODS = [
  { key: "happy", label: "Happy", icon: "😊" },
  { key: "romantic", label: "Romantic", icon: "🥰" },
  { key: "funny", label: "Funny", icon: "🤠" },
  { key: "motivational", label: "Motivational", icon: "🌟" },
  { key: "calm", label: "Calm", icon: "😌" },
] as const;

const GENRES = [
  { key: "rap", label: "Rap", icon: "📻" },
  { key: "rock", label: "Rock", icon: "🎸" },
  { key: "pop", label: "Pop", icon: "🎤" },
  { key: "desi", label: "Desi", icon: "🎶" },
  { key: "edm", label: "EDM", icon: "🎧" },
] as const;

type Mood = (typeof MOODS)[number]["key"];
type Genre = (typeof GENRES)[number]["key"];

export default function Details2() {
  const [mood, setMood] = useState<Mood>("happy");
  const [genre, setGenre] = useState<Genre>("pop");
  const [gender, setGender] = useState<"male" | "female">("male"); // ✅ renamed
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function generate() {
    setError("");
    try {
      // ✅ schema expects gender
      detailsSchema2.parse({ mood, genre, gender });

      const userId = sessionStorage.getItem("userId")!;
      const receiverName = sessionStorage.getItem("receiverName")!;

      setLoading(true);
      const res = await fetch("/api/generate-lyrics", {
        method: "POST",
        body: JSON.stringify({ userId, receiverName, mood, genre, gender }),
      });

      const data = await res.json();
      if (!data.ok) throw new Error(data.error);

      sessionStorage.setItem("lyrics", data.lyrics);
      router.push("/lyrics");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center text-white p-6 bg-cover bg-center"
      style={{ backgroundImage: "url('/BG.jpg')" }}
    >
      {/* Top bar */}
      <header className="w-full flex items-center justify-between px-4 py-2">
        <img src="/Cadbury Logo.png" alt="Cadbury" className="h-8" />
        <img src="/2d logo.png" alt="#mybirthdaysong" className="h-16" />
        <button>
          <img src="/Hamburger.png" alt="Menu" className="h-8" />
        </button>
      </header>

      {/* Title */}
      <div className="text-center mt-6">
        <h2 className="text-xl md:text-2xl font-bold text-white">
          What would you like their song’s vibe to be?
        </h2>
      </div>

      {/* Illustration */}
      <div className="mt-6">
        <img
          src="/Headphone.png"
          alt="Headphone"
          className="w-28 md:w-40 drop-shadow-lg"
        />
      </div>

      {/* Mood */}

      {/* <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {MOODS.map((m) => (
            <button
              key={m.key}
              onClick={() => setMood(m.key)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl transition ${
                mood === m.key
                  ? "bg-yellow-400 text-purple-900"
                  : "bg-white text-purple-900 hover:bg-gray-100"
              }`}
            >
              <span className="text-2xl">{m.icon}</span>
              <span className="text-sm mt-1">{m.label}</span>
            </button>
          ))}
        </div> */}
      {/* 
        <div className="flex justify-between gap-4">
          {MOODS.map((m) => (
            <div key={m.key} className="flex flex-col items-center">
              <button
                onClick={() => setMood(m.key)}
                className={`flex items-center justify-center w-16 h-16 rounded-full border-4 text-2xl transition
          ${
            mood === m.key
              ? "bg-yellow-400 border-yellow-500 text-purple-900"
              : "bg-purple-700 border-purple-600 text-white hover:bg-purple-600"
          }`}
              >
                {m.icon}
              </button>
              <span className="text-xs text-white mt-2">{m.label}</span>
            </div>
          ))}
        </div> */}

      <div className="w-full max-w-2xl mx-auto bg-purple-800 rounded-2xl shadow-lg overflow-hidden mt-8">
        {/* Header */}
        <div className="bg-yellow-400 text-purple-900 font-bold text-center py-2">
          Mood
        </div>

        {/* Mood options */}
        <div className="flex justify-around flex-wrap gap-4 p-4">
          {MOODS.map((m) => (
            <div key={m.key} className="flex flex-col items-center">
              <button
                key={m.key}
                onClick={() => setMood(m.key)}
                className={`flex flex-col items-center justify-center w-20 h-20 rounded-full border-4 transition
          ${
            mood === m.key
              ? "bg-yellow-400 border-yellow-500 text-purple-900"
              : "bg-white border-purple-200 text-purple-900 hover:bg-gray-100"
          }`}
              >
                <span className="text-2xl">{m.icon}</span>
              </button>
              <span className="text-xs text-white mt-2">{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Genre */}
      <div className="w-full max-w-2xl mx-auto bg-purple-800 rounded-2xl shadow-lg overflow-hidden mt-8">
        {/* Header */}
        <div className="bg-yellow-400 text-purple-900 font-bold text-center py-2">
          Genre
        </div>

        {/* Genre options */}
        <div className="flex justify-around flex-wrap gap-4 p-4">
          {GENRES.map((g) => (
            <div key={g.key} className="flex flex-col items-center">
              <button
                onClick={() => setGenre(g.key)}
                className={`flex flex-col items-center justify-center w-20 h-20 rounded-full border-4 transition
            ${
              genre === g.key
                ? "bg-yellow-400 border-yellow-500 text-purple-900"
                : "bg-white border-purple-300 text-purple-900 hover:bg-gray-100"
            }`}
              >
                {g.icon}
              </button>
              <span
                className={`text-xs text-white mt-2 ${
                  genre === g.key ? "text-yellow-400" : "text-white"
                }`}
              >
                {g.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Singer’s Voice */}
      <div className="w-full max-w-2xl mx-auto bg-purple-800 rounded-2xl shadow-lg overflow-hidden mt-8">
        {/* Header */}
        <div className="bg-yellow-400 text-purple-900 font-bold text-center py-2">
          Singer’s Voice
        </div>

        {/* Voice options */}
        <div className="flex justify-around flex-wrap gap-4 p-4">
          {["male", "female"].map((voice) => (
            <div key={voice} className="flex flex-col items-center">
              <button
                onClick={() => setGender(voice as "male" | "female")}
                className={`flex flex-col items-center justify-center w-20 h-20 rounded-full border-4 transition
            ${
              gender === voice
                ? "bg-yellow-400 border-yellow-500 text-purple-900"
                : "bg-white border-purple-300 text-purple-900 hover:bg-gray-100"
            }`}
              >
                <img
                  src={voice === "male" ? "/MAle.png" : "/Female.png"}
                  alt={voice}
                  className="w-10"
                />
              </button>
              <span
                className={`text-sm mt-2 capitalize ${
                  gender === voice
                    ? "text-yellow-400 font-semibold"
                    : "text-white"
                }`}
              >
                {voice}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-400 text-center mt-3">{error}</p>
      )}

      {/* Proceed Button */}
      <button
        disabled={loading}
        onClick={generate}
        className="mt-8 w-full max-w-lg bg-yellow-400 text-purple-900 font-bold py-3 rounded-full hover:bg-yellow-300 transition"
      >
        {loading ? "Generating..." : "Proceed"}
      </button>
    </section>
  );
}
