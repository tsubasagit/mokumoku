"use client";

import type { WorkSession } from "@/types";

interface WorkHistoryProps {
  sessions: WorkSession[];
}

export function WorkHistory({ sessions }: WorkHistoryProps) {
  if (sessions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400 text-sm">
        まだ作業記録がありません
      </div>
    );
  }

  // Group by date
  const grouped = sessions.reduce<Record<string, WorkSession[]>>((acc, s) => {
    const date = s.date || "不明";
    if (!acc[date]) acc[date] = [];
    acc[date].push(s);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      {Object.entries(grouped).map(([date, dateSessions]) => (
        <div key={date}>
          <h4 className="text-xs font-bold text-gray-500 mb-2 sticky top-0 bg-white/90 py-1">
            📅 {date}
          </h4>
          <div className="space-y-2">
            {dateSessions.map((s) => (
              <div
                key={s.id}
                className="bg-gray-50 rounded-xl p-3 border border-gray-100"
              >
                <div className="flex items-start gap-2 mb-1">
                  <span className="text-xs">📋</span>
                  <p className="text-sm text-gray-700">{s.declaration}</p>
                </div>
                {s.reflection && (
                  <div className="flex items-start gap-2 mt-2 pt-2 border-t border-gray-100">
                    <span className="text-xs">✅</span>
                    <p className="text-sm text-gray-600">{s.reflection}</p>
                  </div>
                )}
                {!s.reflection && !s.endedAt && (
                  <p className="text-xs text-[#FFB6C1] mt-1">🔄 作業中...</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
