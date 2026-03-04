"use client";

import { Avatar } from "@/components/ui/Avatar";
import type { ChatMessage as ChatMessageType } from "@/types";

interface ChatMessageProps {
  message: ChatMessageType;
  isMe: boolean;
}

export function ChatMessage({ message, isMe }: ChatMessageProps) {
  if (message.type === "join" || message.type === "leave") {
    return (
      <div className="text-center py-1">
        <span className="text-xs text-gray-400">
          {message.type === "join" ? "🚪" : "👋"} {message.displayName}さんが
          {message.type === "join" ? "入室しました" : "退室しました"}
        </span>
      </div>
    );
  }

  if (message.type === "declaration") {
    return (
      <div className="bg-[#FFD93D]/10 rounded-xl p-3 my-1 border border-[#FFD93D]/20">
        <p className="text-xs text-[#B8960A] font-medium mb-1">
          📋 {message.displayName}さんの作業宣言
        </p>
        <p className="text-sm text-gray-700">{message.text}</p>
      </div>
    );
  }

  if (message.type === "reflection") {
    return (
      <div className="bg-[#A8D8A8]/10 rounded-xl p-3 my-1 border border-[#A8D8A8]/20">
        <p className="text-xs text-[#5A8A5A] font-medium mb-1">
          ✅ {message.displayName}さんの振り返り
        </p>
        <p className="text-sm text-gray-700">{message.text}</p>
      </div>
    );
  }

  return (
    <div className={`flex gap-2 my-1.5 ${isMe ? "flex-row-reverse" : ""}`}>
      <Avatar name={message.displayName} color={message.avatarColor} size={28} />
      <div
        className={`max-w-[75%] rounded-2xl px-3 py-2 ${
          isMe
            ? "bg-[#7EB8DA] text-white rounded-br-sm"
            : "bg-white text-gray-700 rounded-bl-sm shadow-sm"
        }`}
      >
        {!isMe && (
          <p className="text-xs font-medium text-gray-400 mb-0.5">
            {message.displayName}
          </p>
        )}
        <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
      </div>
    </div>
  );
}
