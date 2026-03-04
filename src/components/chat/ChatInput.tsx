"use client";

import { useState, KeyboardEvent } from "react";

interface ChatInputProps {
  onSend: (text: string) => void;
}

export function ChatInput({ onSend }: ChatInputProps) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-2 p-3 border-t border-gray-100">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="メッセージを入力..."
        className="flex-1 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-sm
          focus:outline-none focus:ring-2 focus:ring-[#7EB8DA]/30 focus:border-[#7EB8DA]
          placeholder:text-gray-400"
      />
      <button
        onClick={handleSend}
        disabled={!text.trim()}
        className="px-4 py-2 rounded-full bg-[#7EB8DA] text-white text-sm font-medium
          hover:bg-[#6AA8CA] disabled:opacity-40 disabled:cursor-not-allowed
          transition-colors cursor-pointer"
      >
        送信
      </button>
    </div>
  );
}
