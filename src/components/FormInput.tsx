import { HTMLInputTypeAttribute } from "react";

type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  name?: string;
};

export default function FormInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  name,
}: Props) {
  return (
    <div className="space-y-1">
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        className="input"
      />
    </div>
  );
}
