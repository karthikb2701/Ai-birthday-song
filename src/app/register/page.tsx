"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ZodError, z } from "zod";

// ✅ Zod Schema for validation
const registrationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
});

export default function Register() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [promotions, setPromotions] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Handle Submit
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!acceptTerms) {
      setError("You must accept Terms & Conditions to continue");
      return;
    }

    try {
      registrationSchema.parse({ name, email, phone });

      setLoading(true);

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Something went wrong");
      }

      const data = await res.json();
      sessionStorage.setItem("userId", data.userId);

      router.push("/otp");
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center text-white p-6 bg-cover bg-center"
      style={{ backgroundImage: "url('/BG.jpg')" }}
    >
      {/* ✅ Top Bar */}
      <header className="w-full flex items-center justify-between px-4 py-2">
        <img src="/Cadbury Logo.png" alt="Cadbury" className="h-8" />
        <img src="/2d logo.png" alt="#mybirthdaysong" className="h-16" />
        <button>
          <img src="/Hamburger.png" alt="Menu" className="h-8" />
        </button>
      </header>

      {/* ✅ Card */}
      <div className=" rounded-2xl p-6 space-y-4 mt-6">
        <div className="flex flex-col items-center space-y-4">
          <img
            src="/registerimage.png"
            alt="Cadbury Celebrations"
            className="w-72 drop-shadow-lg"
          />
          <h2 className="text-xl font-bold">Register to create</h2>
        </div>

        {/* ✅ Form */}
        <form onSubmit={onSubmit} className="mt-6 w-full max-w-md space-y-4">
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 rounded-full bg-white text-black placeholder-gray-500 outline-none"
          />

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 mt-3 rounded-full bg-white text-black placeholder-gray-500 outline-none"
          />

          <input
            type="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mt-3 rounded-full bg-white text-black placeholder-gray-500 outline-none"
          />

          {/* ✅ Checkboxes */}
          <div className="space-y-2 text-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="w-4 h-4 accent-yellow-400"
              />
              <span>
                I accept Terms & Conditions and Privacy Policy of Mondelez
                (Cadbury)
              </span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={promotions}
                onChange={(e) => setPromotions(e.target.checked)}
                className="w-4 h-4 accent-yellow-400"
              />
              <span>
                I would like to receive promotional communication from Mondelez
                (Cadbury) about its products and offers.
              </span>
            </label>
          </div>

          {/* ✅ Error */}
          {error && <p className="text-sm text-red-400 font-medium">{error}</p>}

          {/* ✅ Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-purple-900 font-bold py-3 rounded-full hover:bg-yellow-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
}
