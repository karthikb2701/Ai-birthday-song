"use client";
import { useState } from "react";
import OTPInput from "./OTPInput";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onVerified: () => void;
  onResend?: () => void;
};

export default function OTPModal({
  isOpen,
  onClose,
  userId,
  onVerified,
  onResend,
}: Props) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  async function verify() {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, otp }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Invalid OTP");
      onVerified();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-lg text-right">
        {/* Title */}
        <h2 className="text-xl font-bold text-purple-900 mb-4 text-center">
          Enter OTP
        </h2>

        {/* OTP Input */}
        <OTPInput value={otp} onChange={setOtp} />

        {/* Error */}
        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}

        {/* Resend */}
        <button
          type="button"
          onClick={onResend}
          className="text-sm text-purple-800 underline mt-3"
        >
          Resend OTP
        </button>

        {/* Submit Button */}
        <button
          disabled={loading}
          onClick={verify}
          className="mt-4 w-full bg-yellow-400 text-purple-900 font-bold py-2 rounded-lg hover:bg-yellow-300 transition disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
