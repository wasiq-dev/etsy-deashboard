"use client";

import { useState, type ReactNode } from "react";
import { EyeIcon, EyeOffIcon } from "./icons";

export default function TextField({
  id,
  label,
  type = "text",
  value,
  onChange,
  icon,
  placeholder,
  autoComplete,
  error,
}: {
  id: string;
  label: string;
  type?: "text" | "email" | "password";
  value: string;
  onChange: (value: string) => void;
  icon?: ReactNode;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
}) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";
  const resolvedType = isPassword ? (visible ? "text" : "password") : type;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[14px] font-medium text-[#222]"
      >
        {label}
      </label>
      <div
        className={`flex items-center gap-2 rounded-lg border bg-white px-3 py-2.5 focus-within:border-[#222] ${
          error ? "border-[#c0392b]" : "border-[#d9d7cf]"
        }`}
      >
        {icon && <span className="shrink-0 text-[#8a8a8a]">{icon}</span>}
        <input
          id={id}
          name={id}
          type={resolvedType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="w-full min-w-0 border-0 bg-transparent text-[15px] text-[#222] outline-none placeholder:text-[#a8a8a8]"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Hide password" : "Show password"}
            className="shrink-0 text-[#8a8a8a] hover:text-[#222]"
          >
            {visible ? <EyeOffIcon width={18} height={18} /> : <EyeIcon width={18} height={18} />}
          </button>
        )}
      </div>
      {error && <p className="mt-1.5 text-[13px] text-[#c0392b]">{error}</p>}
    </div>
  );
}
