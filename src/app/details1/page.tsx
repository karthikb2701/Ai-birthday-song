"use client";
import { useState } from "react";
import { detailsSchema1 } from "@/lib/validators";
import { ZodError } from "zod";
import { useRouter } from "next/navigation";

export default function Details1() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("23");
  const [gender, setGender] = useState("male");

  const [errors, setErrors] = useState<{
    name?: string;
    age?: string;
    gender?: string;
  }>({});
  const router = useRouter();

  function next() {
    setErrors({});
    try {
      // validate with schema
      detailsSchema1.parse({ name, age, gender });

      // save to session
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("age", age);
      sessionStorage.setItem("gender", gender);

      router.push("/details2");
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((e) => {
          if (e.path[0]) {
            fieldErrors[e.path[0].toString()] = e.message;
          }
        });
        setErrors(fieldErrors);
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
        className="min-h-screen flex flex-col items-center justify-center text-white p-6 bg-cover bg-center"
        style={{ backgroundImage: "url('/BG.jpg')" }}
      >
        {/* Top bar 


      {/* Title */}
        <div className="rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-center">
            <img
              src="/progress bar2.png"
              alt="Cadbury Celebrations"
              className="w-50 drop-shadow-lg"
            />
          </div>
        </div>
        <div className="text-center mt-6">
          <h2 className="text-xl md:text-2xl font-bold text-white">
            Tell us about your loved one…
          </h2>
        </div>

        {/* Illustration */}
        <div className="flex items-center justify-center space-x-4">
          {/* 🎉 Left Confetti */}
          <img
            src="/glow.png"
            alt="Confetti"
            className="w-12 h-12 object-contain"
          />

          {/* 🎁 Gift + Hat */}
          <img
            src="/Cap-Gift.png"
            alt="Gift and Party Hat"
            className="w-50 md:w-70 object-contain"
          />

          {/* 🎈 Balloon */}
          <img
            src="/Balloon.png"
            alt="Balloon"
            className="w-12 h-20 object-contain"
          />
        </div>

        {/* Form */}
        <div className="mt-8 w-full max-w-md space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Their name</label>
            <input
              className="w-full p-3 rounded-full bg-white text-black outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter their name"
              style={{ paddingLeft: "25px" }}
            />
            {errors.name && (
              <p className="text-sm text-red-400">{errors.name}</p>
            )}
          </div>

          {/* Age */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">
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
            {errors.age && <p className="text-sm text-red-400">{errors.age}</p>}
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-3 rounded-full bg-white text-black outline-none"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-sm text-red-400">{errors.gender}</p>
            )}
          </div>
        </div>

        {/* Proceed Button */}
        <button
          onClick={next}
          className="mt-8 w-full max-w-md bg-yellow-400 text-purple-900 font-bold py-3 rounded-full hover:bg-yellow-300 transition"
        >
          Proceed
        </button>
      </section>
    </>
  );
}
