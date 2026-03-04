import type { Presence, ChatMessage, WorkSession, User } from "@/types";
import { Timestamp } from "firebase/firestore";

const now = Timestamp.now();

export const MOCK_USER: User = {
  uid: "mock-user-1",
  displayName: "つばさ",
  avatarColor: "#7EB8DA",
  isAnonymous: false,
};

export const MOCK_ONLINE_USERS: Presence[] = [
  {
    uid: "mock-user-1",
    displayName: "つばさ",
    avatarColor: "#7EB8DA",
    online: true,
    x: 35,
    y: 40,
    currentWork: "React Hooksの勉強",
    updatedAt: now,
  },
  {
    uid: "mock-user-2",
    displayName: "あゆみ",
    avatarColor: "#FFB6C1",
    online: true,
    x: 60,
    y: 55,
    currentWork: "ポートフォリオ作成",
    updatedAt: now,
  },
  {
    uid: "mock-user-3",
    displayName: "けんた",
    avatarColor: "#A8D8A8",
    online: true,
    x: 45,
    y: 30,
    currentWork: "TypeScript入門",
    updatedAt: now,
  },
  {
    uid: "mock-user-4",
    displayName: "ゆい",
    avatarColor: "#FFD93D",
    online: true,
    x: 70,
    y: 65,
    currentWork: "",
    updatedAt: now,
  },
];

export const MOCK_MESSAGES: ChatMessage[] = [
  {
    id: "msg-1",
    uid: "mock-user-2",
    displayName: "あゆみ",
    avatarColor: "#FFB6C1",
    text: "React Hooksの勉強",
    type: "declaration",
    createdAt: now,
  },
  {
    id: "msg-2",
    uid: "mock-user-1",
    displayName: "つばさ",
    avatarColor: "#7EB8DA",
    text: "こんばんは〜！今日もよろしくお願いします",
    type: "message",
    createdAt: now,
  },
  {
    id: "msg-3",
    uid: "mock-user-3",
    displayName: "けんた",
    avatarColor: "#A8D8A8",
    text: "よろしくです！TypeScriptやっていきます",
    type: "message",
    createdAt: now,
  },
  {
    id: "msg-4",
    uid: "mock-user-2",
    displayName: "あゆみ",
    avatarColor: "#FFB6C1",
    text: "がんばりましょう〜",
    type: "message",
    createdAt: now,
  },
  {
    id: "msg-5",
    uid: "mock-user-1",
    displayName: "つばさ",
    avatarColor: "#7EB8DA",
    text: "useEffectのクリーンアップ関数、やっと理解できた気がする",
    type: "message",
    createdAt: now,
  },
  {
    id: "msg-6",
    uid: "mock-user-4",
    displayName: "ゆい",
    avatarColor: "#FFD93D",
    text: "ポートフォリオ作成",
    type: "declaration",
    createdAt: now,
  },
  {
    id: "msg-7",
    uid: "mock-user-3",
    displayName: "けんた",
    avatarColor: "#A8D8A8",
    text: "型推論すごく便利ですね。any使わなくて済む！",
    type: "message",
    createdAt: now,
  },
];

export const MOCK_WORK_SESSIONS: WorkSession[] = [
  {
    id: "ws-1",
    uid: "mock-user-1",
    displayName: "つばさ",
    declaration: "React Hooksの勉強 - useEffectを理解する",
    reflection: "useEffectのクリーンアップ関数を理解できた。依存配列の使い方も整理できた。",
    date: "2026-02-26",
    startedAt: now,
    endedAt: now,
  },
  {
    id: "ws-2",
    uid: "mock-user-1",
    displayName: "つばさ",
    declaration: "Next.js App Routerのチュートリアル",
    reflection: "Server ComponentsとClient Componentsの違いを整理。layoutの使い方が分かった。",
    date: "2026-02-19",
    startedAt: now,
    endedAt: now,
  },
  {
    id: "ws-3",
    uid: "mock-user-1",
    displayName: "つばさ",
    declaration: "Tailwind CSSでランディングページ作成",
    reflection: "",
    date: "2026-03-05",
    startedAt: now,
    endedAt: null,
  },
];
