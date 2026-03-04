"use client";

import { useEffect, useState, useCallback } from "react";
import {
  doc, setDoc, deleteDoc, onSnapshot,
  collection, query, where, serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { useAuth } from "./useAuth";
import type { Presence } from "@/types";

const HEARTBEAT_INTERVAL = 60_000; // 60s
const STALE_THRESHOLD = 180_000;   // 3min

export function usePresence() {
  const { user } = useAuth();
  const [onlineUsers, setOnlineUsers] = useState<Presence[]>([]);

  // Go online
  useEffect(() => {
    if (!user) return;

    const presenceRef = doc(db, "presence", user.uid);

    const goOnline = async () => {
      await setDoc(presenceRef, {
        uid: user.uid,
        displayName: user.displayName,
        avatarColor: user.avatarColor,
        online: true,
        x: 30 + Math.random() * 40,
        y: 30 + Math.random() * 40,
        currentWork: "",
        updatedAt: serverTimestamp(),
      }, { merge: true });
    };

    goOnline();

    // Heartbeat
    const interval = setInterval(async () => {
      await setDoc(presenceRef, {
        updatedAt: serverTimestamp(),
        online: true,
      }, { merge: true });
    }, HEARTBEAT_INTERVAL);

    // Cleanup on unload
    const handleUnload = () => {
      // Use sendBeacon or just mark offline
      navigator.sendBeacon?.("/api/offline?uid=" + user.uid);
    };
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeunload", handleUnload);
      // Mark offline
      setDoc(presenceRef, { online: false, updatedAt: serverTimestamp() }, { merge: true });
    };
  }, [user]);

  // Listen to online users
  useEffect(() => {
    const q = query(collection(db, "presence"), where("online", "==", true));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const now = Date.now();
      const users: Presence[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data() as Presence;
        const updatedAt = data.updatedAt as Timestamp;
        // Filter stale users
        if (updatedAt && now - updatedAt.toMillis() < STALE_THRESHOLD) {
          users.push({ ...data, uid: doc.id } as Presence);
        }
      });

      setOnlineUsers(users);
    });

    return () => unsubscribe();
  }, []);

  const updateCurrentWork = useCallback(async (work: string) => {
    if (!user) return;
    await setDoc(doc(db, "presence", user.uid), {
      currentWork: work,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  }, [user]);

  return { onlineUsers, updateCurrentWork };
}
