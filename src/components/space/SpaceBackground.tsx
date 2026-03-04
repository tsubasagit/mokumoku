"use client";

export function SpaceBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #7EB8DA 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Decorative elements */}
      <div className="absolute top-[8%] left-[12%] text-4xl opacity-30 select-none">☁️</div>
      <div className="absolute top-[15%] right-[18%] text-3xl opacity-25 select-none">⭐</div>
      <div className="absolute bottom-[20%] left-[8%] text-3xl opacity-20 select-none">🌿</div>
      <div className="absolute bottom-[12%] right-[15%] text-4xl opacity-25 select-none">☁️</div>
      <div className="absolute top-[45%] left-[5%] text-2xl opacity-20 select-none">✨</div>
      <div className="absolute top-[60%] right-[8%] text-2xl opacity-20 select-none">🌸</div>

      {/* Center table area */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-32 rounded-[50%] bg-[#A8D8A8]/15 border-2 border-[#A8D8A8]/20 flex items-center justify-center">
        <span className="text-sm text-[#A8D8A8]/60 font-medium">もくもく中...</span>
      </div>
    </div>
  );
}
