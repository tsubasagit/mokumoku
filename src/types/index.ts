import { Timestamp } from "firebase/firestore";

export interface User {
  uid: string;
  displayName: string;
  avatarColor: string;
  isAnonymous: boolean;
  photoURL?: string;
}

export interface Presence {
  uid: string;
  displayName: string;
  avatarColor: string;
  online: boolean;
  x: number; // 0-100 (%)
  y: number; // 0-100 (%)
  currentWork: string;
  updatedAt: Timestamp;
}

export interface ChatMessage {
  id: string;
  uid: string;
  displayName: string;
  avatarColor: string;
  text: string;
  type: "message" | "join" | "leave" | "declaration" | "reflection";
  createdAt: Timestamp;
}

export interface WorkSession {
  id: string;
  uid: string;
  displayName: string;
  declaration: string;
  reflection: string;
  date: string; // YYYY-MM-DD
  startedAt: Timestamp;
  endedAt: Timestamp | null;
}
