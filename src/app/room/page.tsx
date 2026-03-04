"use client";

import { useState, useCallback, useRef } from "react";
import { MOCK_USER, MOCK_ONLINE_USERS, MOCK_MESSAGES, MOCK_WORK_SESSIONS } from "@/lib/mock";
import { VirtualSpaceView } from "@/components/space/VirtualSpaceView";
import { OnlineUsers } from "@/components/space/OnlineUsers";
import { ChatPanelView } from "@/components/chat/ChatPanelView";
import { WorkDeclarationModal } from "@/components/work/WorkDeclarationModal";
import { WorkReflectionModal } from "@/components/work/WorkReflectionModal";
import { WorkHistory } from "@/components/work/WorkHistory";
import { WorkBadge } from "@/components/work/WorkBadge";
import { Button } from "@/components/ui/Button";
import type { Presence, ChatMessage } from "@/types";
import { Timestamp } from "firebase/firestore";

export default function RoomPage() {
  const [onlineUsers, setOnlineUsers] = useState<Presence[]>(MOCK_ONLINE_USERS);
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES);
  const [showDeclaration, setShowDeclaration] = useState(false);
  const [showReflection, setShowReflection] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [currentWork, setCurrentWork] = useState("React Hooksの勉強");
  const user = MOCK_USER;
  const msgCounter = useRef(100);

  const handleMoveAvatar = useCallback((x: number, y: number) => {
    setOnlineUsers((prev) =>
      prev.map((u) =>
        u.uid === user.uid ? { ...u, x, y } : u
      )
    );
  }, [user.uid]);

  const handleSendMessage = useCallback((text: string) => {
    const newMsg: ChatMessage = {
      id: `msg-${msgCounter.current++}`,
      uid: user.uid,
      displayName: user.displayName,
      avatarColor: user.avatarColor,
      text,
      type: "message",
      createdAt: Timestamp.now(),
    };
    setMessages((prev) => [...prev, newMsg]);
  }, [user]);

  const handleDeclare = (declaration: string) => {
    setCurrentWork(declaration);
    const newMsg: ChatMessage = {
      id: `msg-${msgCounter.current++}`,
      uid: user.uid,
      displayName: user.displayName,
      avatarColor: user.avatarColor,
      text: declaration,
      type: "declaration",
      createdAt: Timestamp.now(),
    };
    setMessages((prev) => [...prev, newMsg]);
    setShowDeclaration(false);
  };

  const handleReflect = (reflection: string) => {
    setCurrentWork("");
    const newMsg: ChatMessage = {
      id: `msg-${msgCounter.current++}`,
      uid: user.uid,
      displayName: user.displayName,
      avatarColor: user.avatarColor,
      text: reflection,
      type: "reflection",
      createdAt: Timestamp.now(),
    };
    setMessages((prev) => [...prev, newMsg]);
    setShowReflection(false);
  };

  return (
    <div className="h-screen flex flex-col bg-[#FFF8F0] overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2 bg-white/70 backdrop-blur-sm border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-2xl">☁️</span>
          <h1 className="text-lg font-bold text-gray-800">もくもく会</h1>
          {currentWork && <WorkBadge currentWork={currentWork} />}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowHistory(!showHistory)}
          >
            📊 履歴
          </Button>
          {!currentWork ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDeclaration(true)}
            >
              📋 作業宣言
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowReflection(true)}
            >
              ✅ 振り返り
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={() => window.location.href = "/"}>
            退室
          </Button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex min-h-0">
        {/* Left sidebar - Online users */}
        <aside className="w-56 p-3 hidden lg:block shrink-0">
          <OnlineUsers users={onlineUsers} />
        </aside>

        {/* Center - Virtual Space */}
        <main className="flex-1 p-3 min-w-0">
          <VirtualSpaceView
            onlineUsers={onlineUsers}
            currentUid={user.uid}
            onMove={handleMoveAvatar}
          />
        </main>

        {/* Right sidebar - Chat or History */}
        <aside className="w-80 p-3 hidden md:flex flex-col shrink-0">
          {showHistory ? (
            <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-600">📊 作業履歴</h3>
                <button
                  onClick={() => setShowHistory(false)}
                  className="text-gray-400 hover:text-gray-600 text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-3">
                <WorkHistory sessions={MOCK_WORK_SESSIONS} />
              </div>
            </div>
          ) : (
            <ChatPanelView
              messages={messages}
              currentUid={user.uid}
              onSend={handleSendMessage}
            />
          )}
        </aside>
      </div>

      {/* Modals */}
      <WorkDeclarationModal
        open={showDeclaration}
        onSubmit={handleDeclare}
        onSkip={() => setShowDeclaration(false)}
      />
      <WorkReflectionModal
        open={showReflection}
        declaration={currentWork}
        onSubmit={handleReflect}
        onSkip={() => setShowReflection(false)}
      />
    </div>
  );
}
