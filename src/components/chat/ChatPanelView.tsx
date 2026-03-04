"use client";

import { useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import type { ChatMessage as ChatMessageType } from "@/types";

interface ChatPanelViewProps {
  messages: ChatMessageType[];
  currentUid: string;
  onSend: (text: string) => void;
}

export function ChatPanelView({ messages, currentUid, onSend }: ChatPanelViewProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="flex flex-col h-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100">
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="text-sm font-bold text-gray-600">💬 チャット</h3>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            isMe={msg.uid === currentUid}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={onSend} />
    </div>
  );
}
