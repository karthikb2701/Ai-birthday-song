"use client";
import { useState } from "react";
import { detailsSchema2 } from "@/lib/validators";
import { useRouter } from "next/navigation";
import { ZodError } from "zod";

const MOODS = [
  { key: "happy", label: "Happy", icon: "/Icons/Happy.png" },
  { key: "romantic", label: "Romantic", icon: "/Icons/Romantic.png" },
  { key: "funny", label: "Funny", icon: "/Icons/Funny.png" },
  {
    key: "motivational",
    label: "Motivational",
    icon: "/Icons/Motivational.png",
  },
  { key: "calm", label: "Calm", icon: "/Icons/Calm.png" },
] as const;

const GENRES = [
  { key: "rap", label: "Rap", icon: "/Icons/Rap.png" },
  { key: "rock", label: "Rock", icon: "/Icons/Rock.png" },
  { key: "pop", label: "Pop", icon: "/Icons/Pop.png" },
  { key: "desi", label: "Desi", icon: "/Icons/Desi.png" },
  { key: "edm", label: "EDM", icon: "/Icons/EDM.png" },
] as const;

export default function Details2() {
  const [mood, setMood] = useState("happy");
  const [genre, setGenre] = useState("pop");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function generate() {
    setError("");
    try {
      detailsSchema2.parse({ mood, genre, gender });

      const userId = sessionStorage.getItem("userId")!;
      const receiverName = sessionStorage.getItem("receiverName")!;

      setLoading(true);
      const res = await fetch("/api/generate-lyrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, receiverName, mood, genre, gender }),
      });

      const data = await res.json();
      if (!data.ok) throw new Error(data.error);

      sessionStorage.setItem("lyrics", data.lyrics);
      router.push("/lyrics");
    } catch (e: any) {
      if (e instanceof ZodError) {
        setError(e.errors[0].message); // show first field error
      } else {
        setError(e.message);
      }
    }
  }

  return (
    <>
      <header className="w-full flex items-center justify-between px-4 py-1 bg-[#4B0082]">
        <img src="/Cadbury Logo.png" alt="Cadbury" className="h-8" />
        <img src="/2d logo.png" alt="#mybirthdaysong" className="w-40" />
        <button>
          <img src="/Hamburger.png" alt="Menu" className="h-5 md:h-8" />
        </button>
      </header>

      <section
        className="min-h-screen flex flex-col items-center text-white bg-cover bg-center p-6"
        style={{ backgroundImage: "url('/BG.jpg')" }}
      >
        <div className="rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-center">
            <img
              src="/progress bar3.png"
              alt="Cadbury Celebrations"
              className="w-50 drop-shadow-lg"
            />
          </div>
        </div>
        {/* Title */}
        <h2 className="text-xl md:text-2xl font-bold text-center mt-6">
          What would you like their song’s<br></br> vibe to be?
        </h2>

        {/* Illustration */}
        <div className="flex items-center justify-center space-x-4">
          {/* 🎉 Left Confetti */}
          <img
            src="/PMT.png"
            alt="Confetti"
            className="w-12 h-12 object-contain"
          />

          {/* 🎁 Gift + Hat */}
          <img
            src="/Headphone.png"
            alt="Gift and Party Hat"
            className="w-50 md:w-70 object-contain"
          />

          {/* 🎈 Balloon */}
          <img
            src="/Balloon2.png"
            alt="Balloon"
            className="w-12 h-20 object-contain"
          />
        </div>

        {/* Mood */}
        <div className="w-full max-w-md bg-purple-900/80 rounded-2xl mt-8">
          <div className="bg-yellow-400 text-purple-900 font-bold text-center py-2 rounded-t-2xl">
            Mood
          </div>
          <div className="flex justify-around p-4">
            {MOODS.map((m) => (
              <button
                key={m.key}
                onClick={() => setMood(m.key)}
                className={`flex flex-col items-center w-16`}
              >
                <div
                  className={`w-14 h-14 flex items-center justify-center rounded-full border-2 text-2xl ${
                    mood === m.key
                      ? "bg-yellow-400 border-yellow-500 text-purple-900"
                      : "bg-white border-purple-200 text-purple-900"
                  }`}
                >
                  <img src={m.icon} alt={m.label} className="w-8" />
                </div>
                <span
                  className={`mt-2 text-xs ${
                    mood === m.key
                      ? "text-yellow-400 font-semibold"
                      : "text-white"
                  }`}
                >
                  {m.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Genre */}
        <div className="w-full max-w-md bg-purple-900/80 rounded-2xl mt-8">
          <div className="bg-yellow-400 text-purple-900 font-bold text-center py-2 rounded-t-2xl">
            Genre
          </div>
          <div className="flex justify-around p-4">
            {GENRES.map((g) => (
              <button
                key={g.key}
                onClick={() => setGenre(g.key)}
                className="flex flex-col items-center w-16"
              >
                <div
                  className={`w-14 h-14 flex items-center justify-center rounded-full border-2 ${
                    genre === g.key
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-white border-purple-200"
                  }`}
                >
                  <img src={g.icon} alt={g.label} className="h-8" />
                </div>
                <span
                  className={`mt-2 text-xs ${
                    genre === g.key
                      ? "text-yellow-400 font-semibold"
                      : "text-white"
                  }`}
                >
                  {g.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Singer’s Voice */}
        <div className="w-full max-w-md bg-purple-900/80 rounded-2xl mt-8">
          <div className="bg-yellow-400 text-purple-900 font-bold text-center py-2 rounded-t-2xl">
            Singer’s Voice
          </div>
          <div className="flex justify-around p-4">
            {["male", "female"].map((voice) => (
              <button
                key={voice}
                onClick={() => setGender(voice as "male" | "female")}
                className="flex flex-col items-center w-16"
              >
                <div
                  className={`w-14 h-14 flex items-center justify-center rounded-full border-2 ${
                    gender === voice
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-white border-purple-200"
                  }`}
                >
                  <img
                    src={voice === "male" ? "/MAle.png" : "/Female.png"}
                    alt={voice}
                    className="w-8"
                  />
                </div>
                <span
                  className={`mt-2 text-xs capitalize ${
                    gender === voice
                      ? "text-yellow-400 font-semibold"
                      : "text-white"
                  }`}
                >
                  {voice}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-400 text-center mt-3">{error}</p>
        )}

        {/* Proceed */}
        <button
          disabled={loading}
          onClick={generate}
          className="mt-8 w-full max-w-md bg-yellow-400 text-purple-900 font-bold py-3 rounded-full hover:bg-yellow-300 transition"
        >
          {loading ? "Generating..." : "Proceed"}
        </button>
      </section>
    </>
  );
}
