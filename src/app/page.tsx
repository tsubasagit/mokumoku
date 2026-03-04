"use client";

import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/auth/LoginForm";

function getNextWednesday(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = (3 - day + 7) % 7 || 7;
  const next = new Date(now);
  next.setDate(now.getDate() + diff);
  return `${next.getMonth() + 1}/${next.getDate()}（水）20:00`;
}

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col items-center justify-center p-4">
      {/* Hero */}
      <div className="text-center mb-8 animate-[fadeIn_0.5s_ease-out]">
        <div className="text-7xl mb-4 animate-[float_3s_ease-in-out_infinite]">
          ☁️
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          もくもく会
        </h1>
        <p className="text-lg text-gray-500 mb-1">
          バーチャルスペース
        </p>
        <p className="text-sm text-[#7EB8DA] font-medium">
          毎週水曜 20:00〜
        </p>
      </div>

      {/* Login Form (demo mode) */}
      <div className="animate-[fadeIn_0.5s_ease-out_0.2s_both]">
        <LoginForm onDemoEnter={() => router.push("/room")} />
      </div>

      {/* Next session info */}
      <div className="mt-8 text-center animate-[fadeIn_0.5s_ease-out_0.4s_both]">
        <div className="bg-white/60 backdrop-blur-sm rounded-xl px-6 py-3 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">
            次回開催: <span className="font-bold text-[#7EB8DA]">{getNextWednesday()}</span>
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full animate-[fadeIn_0.5s_ease-out_0.6s_both]">
        {[
          { icon: "🏠", title: "バーチャル空間", desc: "oVice風2Dスペースで集合" },
          { icon: "💬", title: "リアルタイムチャット", desc: "みんなとゆるく交流" },
          { icon: "📝", title: "作業記録", desc: "宣言&振り返りで成長" },
        ].map((f) => (
          <div
            key={f.title}
            className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm border border-gray-100"
          >
            <div className="text-2xl mb-2">{f.icon}</div>
            <h3 className="text-sm font-bold text-gray-700">{f.title}</h3>
            <p className="text-xs text-gray-400 mt-1">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
