"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import OTPInput from "@/components/OTPInput";

export default function OTP() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function verify() {
    setError("");
    const userId = sessionStorage.getItem("userId");
    if (!userId) return setError("⚠️ Session expired, please register again.");

    try {
      setLoading(true);
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        body: JSON.stringify({ userId, otp }),
      });
      const data = await res.json();

      if (!data.ok) throw new Error(data.error || "Invalid OTP");
      router.push("/details1");
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
      {/* ✅ Top Bar */}
      <header className="w-full flex items-center justify-between px-4 py-2">
        <img
          src="/Cadbury Logo.png"
          alt="Cadbury Celebrations"
          className="h-8"
        />

        <img src="/2d logo.png" alt="#mybirthdaysong" className="h-8" />
        <button>
          <img src="/Hamburger.png" alt="Menu" className="h-8" />
        </button>
      </header>

      {/* OTP Card */}
      <div className="bg-purple-800 bg-opacity-70 rounded-2xl p-6 space-y-6 shadow-2xl w-full max-w-md mt-8">
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-xl font-bold text-white">Verify OTP</h2>
          <p className="text-sm text-gray-200 text-center">
            Enter the 6-digit OTP sent to your registered mobile number.
          </p>
        </div>

        {/* OTP Input */}
        <OTPInput value={otp} onChange={setOtp} />

        {/* Error Message */}
        {error && <p className="text-sm text-red-400 text-center">{error}</p>}

        {/* Verify Button */}
        <button
          disabled={loading}
          onClick={verify}
          className="w-full bg-yellow-400 text-purple-900 font-bold py-3 rounded-full hover:bg-yellow-300 transition"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </div>
    </section>
  );
}
