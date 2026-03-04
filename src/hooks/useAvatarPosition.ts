"use client";

import { useCallback } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { useAuth } from "./useAuth";

export function useAvatarPosition() {
  const { user } = useAuth();

  const moveAvatar = useCallback(
    async (x: number, y: number) => {
      if (!user) return;
      await setDoc(
        doc(db, "presence", user.uid),
        { x, y, updatedAt: serverTimestamp() },
        { merge: true }
      );
    },
    [user]
  );

  return { moveAvatar };
}
