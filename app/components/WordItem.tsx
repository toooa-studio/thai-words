"use client";

import { useState, useEffect } from "react";
import { Volume2 } from "lucide-react";
import type { ThaiWord } from "@/lib/types/word";
import { getWordRelations } from "@/lib/data/manualWordRelations";
import { WordRelationsCallout } from "@/app/components/WordRelationsCallout";

type Props = {
  word: ThaiWord;
};

export function WordItem({ word }: Props) {
  const [supported, setSupported] = useState(true);
  const [speakingTarget, setSpeakingTarget] = useState<"word" | "example" | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSupported(false);
    }
  }, []);

  const speak = (text: string, target: "word" | "example") => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "th-TH";
    utter.rate = 0.85;
    utter.onend = () => setSpeakingTarget(null);
    utter.onerror = () => setSpeakingTarget(null);
    setSpeakingTarget(target);
    window.speechSynthesis.speak(utter);
  };

  return (
    <article className="border border-gray-200 bg-white p-4 sm:p-6">
      <div className="flex items-start justify-between gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
            <span className="text-xs sm:text-sm font-mono text-gray-400 tracking-wider">
              {String(word.id).padStart(3, "0")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 break-words">
              {word.thai}
            </h2>
          </div>
          <p className="mt-1 text-sm sm:text-base text-gray-500 font-mono break-words">
            {word.romanization}
          </p>
        </div>
        <button
          type="button"
          onClick={() => speak(word.thai, "word")}
          disabled={!supported}
          aria-label={`「${word.thai}」を再生`}
          className="shrink-0 inline-flex items-center justify-center min-w-[44px] min-h-[44px] bg-gray-900 text-white border border-gray-900 hover:bg-gray-700 disabled:bg-gray-300 disabled:border-gray-300 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-colors"
        >
          <Volume2
            className={`w-5 h-5 ${speakingTarget === "word" ? "animate-pulse" : ""}`}
            aria-hidden="true"
          />
        </button>
      </div>

      <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-900 break-words">
        {word.meaning}
      </p>

      <WordRelationsCallout notes={getWordRelations(word.id)} />

      <div className="mt-4 sm:mt-5 border-t border-gray-100 pt-3 sm:pt-4">
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          <div className="min-w-0 flex-1 space-y-1">
            <p className="text-xs uppercase tracking-wider text-gray-400">
              Example
            </p>
            <p className="text-base sm:text-lg text-gray-900 break-words">
              {word.example}
            </p>
            <p className="text-sm text-gray-500 font-mono break-words">
              {word.exampleRomanization}
            </p>
            <p className="text-sm sm:text-base text-gray-700 break-words">
              {word.exampleMeaning}
            </p>
          </div>
          <button
            type="button"
            onClick={() => speak(word.example, "example")}
            disabled={!supported}
            aria-label={`例文「${word.example}」を再生`}
            className="shrink-0 inline-flex items-center justify-center min-w-[44px] min-h-[44px] bg-gray-100 text-gray-900 border border-gray-300 hover:bg-gray-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-colors"
          >
            <Volume2
              className={`w-5 h-5 ${speakingTarget === "example" ? "animate-pulse" : ""}`}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      {!supported ? (
        <p className="mt-3 text-xs text-gray-400">
          ※ お使いのブラウザは音声合成に対応していません。
        </p>
      ) : null}
    </article>
  );
}
