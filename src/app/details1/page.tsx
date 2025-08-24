"use client";
import { useState } from "react";
import { detailsSchema2 } from "@/lib/validators";
import { useRouter } from "next/navigation";

export default function Details2() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("23");
  const [gender, setGender] = useState("male");
  const [error, setError] = useState("");
  const router = useRouter();

  function next() {
    setError("");
    try {
      detailsSchema2.parse({ name, age, gender });
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("age", age);
      sessionStorage.setItem("gender", gender);
      router.push("/details2");
    } catch (e: any) {
      setError(e.message);
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
        <img src="/2d logo.png" alt="#mybirthdaysong" className="h-8" />
        <button>
          <img src="/Hamburger.png" alt="Menu" className="h-8" />
        </button>
      </header>

      {/* Progress icons */}
      <div className="flex items-center justify-center space-x-2 mt-6">
        {[1, 2, 3, 4, 5].map((step, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full ${
              step === 2 ? "bg-yellow-400" : "border border-white"
            }`}
          ></span>
        ))}
      </div>

      {/* Title */}
      <div className="text-center mt-6">
        <h2 className="text-xl md:text-2xl font-bold text-white">
          Tell us about your loved one…
        </h2>
      </div>

      {/* Illustration */}
      <div className="mt-6">
        <img
          src="/Cap-Gift.png"
          alt="Gift & Party Hat"
          className="w-40 md:w-56 drop-shadow-lg"
        />
      </div>

      {/* Form */}
      <div className="mt-8 w-full max-w-md space-y-6">
        {/* Name */}
        <div className="space-y-2 text-center">
          <label className="text-sm font-medium text-white text-center">
            Their name
          </label>
          <input
            className="w-full p-3 rounded-full bg-white text-black outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter their name"
          />
        </div>

        {/* Age */}
        <div className="space-y-2 text-center">
          <label className="text-sm font-medium text-white text-center">
            How old they'll be this birthday
          </label>
          <select
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-3 rounded-full bg-white text-black outline-none"
          >
            {Array.from({ length: 100 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} Years
              </option>
            ))}
          </select>
        </div>

        {/* Gender */}
        <div className="space-y-2 text-center">
          <label className="text-sm font-medium text-white text-center">
            Gender
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-3 rounded-full bg-white text-black outline-none"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-400 text-center mt-3">{error}</p>
      )}

      {/* Proceed Button */}
      <button
        onClick={next}
        className="mt-8 w-full max-w-md bg-yellow-400 text-purple-900 font-bold py-3 rounded-full hover:bg-yellow-300 transition"
      >
        Proceed
      </button>
    </section>
  );
}
