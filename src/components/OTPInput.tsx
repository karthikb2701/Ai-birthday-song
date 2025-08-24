export default function OTPInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1">
      <label className="label">Enter OTP (1234)</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        inputMode="numeric"
        maxLength={4}
        className="w-full p-3 rounded-full bg-white text-black placeholder-gray-500 outline-none"
      />
    </div>
  );
}
