"use client";

import { Avatar } from "@/components/ui/Avatar";
import type { Presence } from "@/types";

interface OnlineUsersProps {
  users: Presence[];
}

export function OnlineUsers({ users }: OnlineUsersProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-gray-100">
      <h3 className="text-sm font-bold text-gray-600 mb-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        オンライン ({users.length})
      </h3>
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {users.map((u) => (
          <div key={u.uid} className="flex items-center gap-2">
            <Avatar name={u.displayName} color={u.avatarColor} size={28} />
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-700 truncate">
                {u.displayName}
              </p>
              {u.currentWork && (
                <p className="text-xs text-gray-400 truncate">
                  📝 {u.currentWork}
                </p>
              )}
            </div>
          </div>
        ))}
        {users.length === 0 && (
          <p className="text-sm text-gray-400">まだ誰もいません</p>
        )}
      </div>
    </div>
  );
}
