"use client";
import { useRef } from "react";

type Props = {
  value: string;
  onChange: (val: string) => void;
  length?: number;
};

export default function OTPInput({ value, onChange, length = 4 }: Props) {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (val: string, idx: number) => {
    const otpArr = value.split("");
    otpArr[idx] = val.replace(/[^0-9]/g, ""); // allow only numbers
    const newOtp = otpArr.join("").slice(0, length);
    onChange(newOtp);

    // Move focus to next input
    if (val && idx < length - 1) {
      inputs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace" && !value[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-3">
      {Array.from({ length }).map((_, idx) => (
        <input
          key={idx}
          ref={(el) => {
            inputs.current[idx] = el;
          }}
          type="text"
          maxLength={1}
          inputMode="numeric"
          value={value[idx] || ""}
          onChange={(e) => handleChange(e.target.value, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          className="w-12 h-12 text-center text-xl font-bold text-white bg-purple-950 border-2 border-purple-700 rounded-md focus:outline-none"
        />
      ))}
    </div>
  );
}
