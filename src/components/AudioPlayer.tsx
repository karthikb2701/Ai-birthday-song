"use client";
import { useRef, useState } from "react";

export default function AudioPlayer({ text }: { text: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [error, setError] = useState("");

  async function play() {
    try {
      setError("");
      const res = await fetch("/api/tts", {
        method: "POST",
        body: JSON.stringify({ text }),
      });
      if (res.headers.get("content-type")?.includes("audio")) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        if (audioRef.current) {
          audioRef.current.src = url;
          audioRef.current.play();
        }
        return;
      }
      const data = await res.json();
      if (data.error === "NO_TTS_API") {
        if ("speechSynthesis" in window) {
          const utter = new SpeechSynthesisUtterance(text);
          speechSynthesis.speak(utter);
        } else {
          setError("TTS not available in this browser.");
        }
      } else {
        setError(data.error || "TTS error");
      }
    } catch (e: any) {
      setError(e.message);
    }
  }

  return (
    <div className="space-y-2">
      <audio ref={audioRef} controls className="w-full" />
      <button onClick={play} className="btn bg-black text-white w-full">
        Play Song
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
