"use client";

import { useRef, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { usePresence } from "@/hooks/usePresence";
import { useAvatarPosition } from "@/hooks/useAvatarPosition";
import { SpaceBackground } from "./SpaceBackground";
import { UserAvatar } from "./UserAvatar";

export function VirtualSpace() {
  const { user } = useAuth();
  const { onlineUsers } = usePresence();
  const { moveAvatar } = useAvatarPosition();
  const spaceRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!spaceRef.current) return;
      const rect = spaceRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      // Clamp to 5-95% to keep avatars within bounds
      const clampedX = Math.max(5, Math.min(95, x));
      const clampedY = Math.max(5, Math.min(95, y));
      moveAvatar(clampedX, clampedY);
    },
    [moveAvatar]
  );

  return (
    <div
      ref={spaceRef}
      onClick={handleClick}
      className="relative w-full h-full bg-[#FFF8F0] rounded-2xl border border-[#7EB8DA]/20 cursor-crosshair overflow-hidden shadow-inner"
    >
      <SpaceBackground />
      {onlineUsers.map((presence) => (
        <UserAvatar
          key={presence.uid}
          presence={presence}
          isMe={presence.uid === user?.uid}
        />
      ))}
    </div>
  );
}
