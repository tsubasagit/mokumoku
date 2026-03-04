"use client";

import { useEffect, useState, useCallback } from "react";
import {
  collection, addDoc, query, where, orderBy,
  getDocs, updateDoc, doc, serverTimestamp, Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { useAuth } from "./useAuth";
import type { WorkSession } from "@/types";

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

export function useWorkSession() {
  const { user } = useAuth();
  const [currentSession, setCurrentSession] = useState<WorkSession | null>(null);
  const [history, setHistory] = useState<WorkSession[]>([]);
  const [needsReflection, setNeedsReflection] = useState(false);

  // Check for unfinished session on load
  useEffect(() => {
    if (!user) return;

    const checkUnfinished = async () => {
      const q = query(
        collection(db, "workSessions"),
        where("uid", "==", user.uid),
        where("endedAt", "==", null),
        orderBy("startedAt", "desc")
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const sessionDoc = snapshot.docs[0];
        const session = { id: sessionDoc.id, ...sessionDoc.data() } as WorkSession;
        setCurrentSession(session);
        // If from a previous day, prompt reflection
        if (session.date !== todayStr()) {
          setNeedsReflection(true);
        }
      }
    };

    checkUnfinished();
  }, [user]);

  // Load history
  useEffect(() => {
    if (!user) return;

    const loadHistory = async () => {
      const q = query(
        collection(db, "workSessions"),
        where("uid", "==", user.uid),
        orderBy("startedAt", "desc")
      );
      const snapshot = await getDocs(q);
      const sessions: WorkSession[] = [];
      snapshot.forEach((doc) => {
        sessions.push({ id: doc.id, ...doc.data() } as WorkSession);
      });
      setHistory(sessions);
    };

    loadHistory();
  }, [user]);

  const startSession = useCallback(
    async (declaration: string) => {
      if (!user) return;
      const docRef = await addDoc(collection(db, "workSessions"), {
        uid: user.uid,
        displayName: user.displayName,
        declaration,
        reflection: "",
        date: todayStr(),
        startedAt: serverTimestamp(),
        endedAt: null,
      });
      const session: WorkSession = {
        id: docRef.id,
        uid: user.uid,
        displayName: user.displayName,
        declaration,
        reflection: "",
        date: todayStr(),
        startedAt: Timestamp.now(),
        endedAt: null,
      };
      setCurrentSession(session);
      setNeedsReflection(false);
      return session;
    },
    [user]
  );

  const endSession = useCallback(
    async (reflection: string) => {
      if (!user || !currentSession) return;
      await updateDoc(doc(db, "workSessions", currentSession.id), {
        reflection,
        endedAt: serverTimestamp(),
      });
      setCurrentSession(null);
      setNeedsReflection(false);
      // Refresh history
      const q = query(
        collection(db, "workSessions"),
        where("uid", "==", user.uid),
        orderBy("startedAt", "desc")
      );
      const snapshot = await getDocs(q);
      const sessions: WorkSession[] = [];
      snapshot.forEach((d) => {
        sessions.push({ id: d.id, ...d.data() } as WorkSession);
      });
      setHistory(sessions);
    },
    [user, currentSession]
  );

  return {
    currentSession,
    history,
    needsReflection,
    startSession,
    endSession,
  };
}
