"use client";

import { useState, useEffect } from "react";
import { Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  ariaLabel?: string;
  size?: "sm" | "md" | "lg";
  /** 単語クイズの Enter で「次へ」と競合しないようマークする */
  markEnterSecondary?: boolean;
  /** 音声クイズ用の大きな主ボタン */
  variant?: "default" | "primary";
  className?: string;
};

export function SpeakButton({
  text,
  ariaLabel,
  size = "md",
  markEnterSecondary,
  variant = "default",
  className,
}: Props) {
  const [supported, setSupported] = useState(true);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSupported(false);
    }
  }, []);

  const speak = () => {
    if (!supported) return;
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "th-TH";
    utter.rate = 0.85;
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utter);
  };

  const sizeClass =
    size === "sm"
      ? "min-w-[44px] min-h-[44px]"
      : size === "lg"
        ? "min-w-[64px] min-h-[64px]"
        : "min-w-[48px] min-h-[48px]";
  const iconClass =
    size === "sm" ? "h-4 w-4" : size === "lg" ? "h-7 w-7" : "h-5 w-5";

  const variantClass =
    variant === "primary"
      ? "bg-gray-900 text-white border border-gray-900 hover:bg-gray-700 disabled:bg-gray-300 disabled:border-gray-300 disabled:text-gray-400"
      : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400";

  return (
    <button
      type="button"
      onClick={speak}
      disabled={!supported}
      aria-label={ariaLabel ?? `「${text}」を再生`}
      data-quiz-enter-secondary={markEnterSecondary ? "" : undefined}
      className={cn(
        "inline-flex shrink-0 items-center justify-center disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-colors",
        sizeClass,
        variantClass,
        className
      )}
    >
      <Volume2
        className={`${iconClass} ${speaking ? "animate-pulse" : ""}`}
        aria-hidden="true"
      />
    </button>
  );
}
