"use client";

import { useRef, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useChat } from "@/hooks/useChat";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";

export function ChatPanel() {
  const { user } = useAuth();
  const { messages, sendMessage, loadMore, hasMore } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const handleScroll = () => {
    if (!scrollRef.current || !hasMore) return;
    if (scrollRef.current.scrollTop === 0) {
      loadMore();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100">
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="text-sm font-bold text-gray-600">💬 チャット</h3>
      </div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-3 py-2"
      >
        {hasMore && (
          <button
            onClick={loadMore}
            className="w-full text-center text-xs text-[#7EB8DA] py-2 hover:underline cursor-pointer"
          >
            もっと読み込む
          </button>
        )}
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            isMe={msg.uid === user?.uid}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={(text) => sendMessage(text)} />
    </div>
  );
}
