"use client";

import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className = "", ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-600 mb-1">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white
          focus:outline-none focus:ring-2 focus:ring-[#7EB8DA]/50 focus:border-[#7EB8DA]
          placeholder:text-gray-400 transition-all ${className}`}
        {...props}
      />
    </div>
  );
}
