"use client";

import { Avatar } from "@/components/ui/Avatar";
import type { Presence } from "@/types";

interface UserAvatarProps {
  presence: Presence;
  isMe: boolean;
}

export function UserAvatar({ presence, isMe }: UserAvatarProps) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out group"
      style={{
        left: `${presence.x}%`,
        top: `${presence.y}%`,
      }}
    >
      {/* Name label */}
      <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <span
          className={`text-xs px-2 py-0.5 rounded-full ${
            isMe
              ? "bg-[#7EB8DA] text-white font-bold"
              : "bg-white/80 text-gray-600"
          } shadow-sm`}
        >
          {presence.displayName}
        </span>
      </div>

      {/* Avatar */}
      <div className={`${isMe ? "ring-2 ring-[#7EB8DA] ring-offset-2" : ""} rounded-full`}>
        <Avatar
          name={presence.displayName}
          color={presence.avatarColor}
          size={44}
        />
      </div>

      {/* Work tooltip */}
      {presence.currentWork && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs px-2 py-1 rounded-lg bg-gray-800/80 text-white shadow-sm">
            📝 {presence.currentWork}
          </span>
        </div>
      )}
    </div>
  );
}
