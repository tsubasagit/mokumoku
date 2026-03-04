"use client";

interface WorkBadgeProps {
  currentWork: string;
}

export function WorkBadge({ currentWork }: WorkBadgeProps) {
  if (!currentWork) return null;

  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFD93D]/15 border border-[#FFD93D]/30">
      <span className="text-xs">📝</span>
      <span className="text-xs text-gray-700 font-medium truncate max-w-[200px]">
        {currentWork}
      </span>
    </div>
  );
}
