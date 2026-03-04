"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface WorkDeclarationModalProps {
  open: boolean;
  onSubmit: (declaration: string) => void;
  onSkip: () => void;
}

export function WorkDeclarationModal({ open, onSubmit, onSkip }: WorkDeclarationModalProps) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text.trim());
      setText("");
    }
  };

  return (
    <Modal open={open} title="📋 今日やること">
      <p className="text-sm text-gray-500 mb-4">
        今日の作業内容を宣言しましょう！みんなに共有されます。
      </p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="例：React Hooksのチュートリアルを進める"
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white resize-none
          focus:outline-none focus:ring-2 focus:ring-[#7EB8DA]/50 focus:border-[#7EB8DA]
          placeholder:text-gray-400 text-sm"
        rows={3}
      />
      <div className="flex gap-3 mt-4">
        <Button onClick={onSkip} variant="ghost" className="flex-1">
          スキップ
        </Button>
        <Button onClick={handleSubmit} disabled={!text.trim()} className="flex-1">
          宣言する！
        </Button>
      </div>
    </Modal>
  );
}
