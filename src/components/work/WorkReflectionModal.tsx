"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface WorkReflectionModalProps {
  open: boolean;
  declaration: string;
  onSubmit: (reflection: string) => void;
  onSkip: () => void;
}

export function WorkReflectionModal({ open, declaration, onSubmit, onSkip }: WorkReflectionModalProps) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text.trim());
      setText("");
    }
  };

  return (
    <Modal open={open} title="✅ 振り返り">
      {declaration && (
        <div className="bg-[#FFD93D]/10 rounded-xl p-3 mb-4 border border-[#FFD93D]/20">
          <p className="text-xs text-[#B8960A] font-medium mb-1">今日の宣言</p>
          <p className="text-sm text-gray-700">{declaration}</p>
        </div>
      )}
      <p className="text-sm text-gray-500 mb-4">
        今日やったことを振り返りましょう！
      </p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="例：チュートリアルのChapter 3まで完了。useEffectの理解が深まった。"
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white resize-none
          focus:outline-none focus:ring-2 focus:ring-[#A8D8A8]/50 focus:border-[#A8D8A8]
          placeholder:text-gray-400 text-sm"
        rows={3}
      />
      <div className="flex gap-3 mt-4">
        <Button onClick={onSkip} variant="ghost" className="flex-1">
          スキップ
        </Button>
        <Button onClick={handleSubmit} disabled={!text.trim()} variant="secondary" className="flex-1">
          記録する！
        </Button>
      </div>
    </Modal>
  );
}
