"use client";

import { useEffect, useState, useCallback } from "react";
import {
  collection, addDoc, query, orderBy, limit,
  onSnapshot, serverTimestamp, startAfter,
  getDocs, Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { useAuth } from "./useAuth";
import type { ChatMessage } from "@/types";

const MESSAGES_LIMIT = 100;

export function useChat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [oldestTimestamp, setOldestTimestamp] = useState<Timestamp | null>(null);
  const [hasMore, setHasMore] = useState(true);

  // Real-time subscription to latest messages
  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(MESSAGES_LIMIT)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: ChatMessage[] = [];
      snapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() } as ChatMessage);
      });
      const sorted = msgs.reverse();
      setMessages(sorted);
      if (sorted.length > 0 && sorted[0].createdAt) {
        setOldestTimestamp(sorted[0].createdAt);
      }
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = useCallback(
    async (text: string, type: ChatMessage["type"] = "message") => {
      if (!user || !text.trim()) return;
      await addDoc(collection(db, "messages"), {
        uid: user.uid,
        displayName: user.displayName,
        avatarColor: user.avatarColor,
        text: text.trim(),
        type,
        createdAt: serverTimestamp(),
      });
    },
    [user]
  );

  const loadMore = useCallback(async () => {
    if (!oldestTimestamp || !hasMore) return;
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      startAfter(oldestTimestamp),
      limit(MESSAGES_LIMIT)
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      setHasMore(false);
      return;
    }
    const older: ChatMessage[] = [];
    snapshot.forEach((doc) => {
      older.push({ id: doc.id, ...doc.data() } as ChatMessage);
    });
    const sorted = older.reverse();
    setMessages((prev) => [...sorted, ...prev]);
    if (sorted.length > 0 && sorted[0].createdAt) {
      setOldestTimestamp(sorted[0].createdAt);
    }
    if (snapshot.size < MESSAGES_LIMIT) {
      setHasMore(false);
    }
  }, [oldestTimestamp, hasMore]);

  return { messages, sendMessage, loadMore, hasMore };
}
