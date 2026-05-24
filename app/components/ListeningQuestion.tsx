"use client";

import { useState, useEffect, useRef } from "react";
import {
  ChevronRight,
  Volume2,
  Turtle,
  Square,
  User,
  UserRound,
} from "lucide-react";
import type { ListeningQuestion as ListeningQuestionType } from "@/lib/data/listeningQuestions";
import type { DialogueLine } from "@/lib/data/listeningDialogues";

type Props = {
  question: ListeningQuestionType;
};

export function ListeningQuestion({ question }: Props) {
  const { number, topic, dialogue, question: prompt, options, correctLabel } =
    question;
  const correctOption = options.find((o) => o.label === correctLabel);

  const [supported, setSupported] = useState(true);
  const [playMode, setPlayMode] = useState<"idle" | "normal" | "slow">("idle");
  const cancelledRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSupported(false);
    }
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        cancelledRef.current = true;
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speakLine = (line: DialogueLine, rate: number) =>
    new Promise<void>((resolve) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        resolve();
        return;
      }
      const utter = new SpeechSynthesisUtterance(line.thai);
      utter.lang = "th-TH";
      utter.rate = rate;
      utter.pitch = line.speaker === "man" ? 0.85 : 1.25;
      utter.onend = () => resolve();
      utter.onerror = () => resolve();
      window.speechSynthesis.speak(utter);
    });

  const wait = (ms: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, ms));

  const playDialogue = async (rate: number, mode: "normal" | "slow") => {
    if (!supported) return;
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    cancelledRef.current = false;
    window.speechSynthesis.cancel();
    setPlayMode(mode);

    for (const line of dialogue) {
      if (cancelledRef.current) break;
      await speakLine(line, rate);
      if (cancelledRef.current) break;
      await wait(350);
    }

    setPlayMode("idle");
  };

  const stopPlayback = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    cancelledRef.current = true;
    window.speechSynthesis.cancel();
    setPlayMode("idle");
  };

  return (
    <article
      aria-labelledby={`l-${number}-heading`}
      className="border border-gray-200 bg-white"
    >
      <header className="border-b border-gray-200 px-4 sm:px-6 py-4 sm:py-5">
        <p className="text-xs uppercase tracking-wider text-gray-500">
          {topic}
        </p>
        <h3
          id={`l-${number}-heading`}
          className="mt-1 text-2xl sm:text-3xl font-semibold text-gray-900"
        >
          問題{number}
        </h3>
      </header>

      <div className="px-4 sm:px-6 py-5 sm:py-6">
        <div className="flex flex-col items-center gap-3 border border-gray-200 bg-gray-50 px-4 py-5 sm:py-6">
          <p className="text-sm text-gray-600">
            音声を聞いて、質問の答えを選んでください。
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => playDialogue(0.85, "normal")}
              disabled={!supported || playMode !== "idle"}
              aria-label="音声を通常速度で再生"
              className="inline-flex items-center justify-center gap-2 min-h-[56px] px-5 bg-gray-900 text-white text-base font-semibold whitespace-nowrap hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-colors"
            >
              <Volume2
                className={`h-5 w-5 ${
                  playMode === "normal" ? "animate-pulse" : ""
                }`}
                aria-hidden="true"
              />
              <span>音声を再生</span>
            </button>
            <button
              type="button"
              onClick={() => playDialogue(0.55, "slow")}
              disabled={!supported || playMode !== "idle"}
              aria-label="音声をゆっくり再生"
              className="inline-flex items-center justify-center gap-2 min-h-[56px] px-5 bg-white text-gray-900 border border-gray-300 text-base font-semibold whitespace-nowrap hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-colors"
            >
              <Turtle
                className={`h-5 w-5 ${
                  playMode === "slow" ? "animate-pulse" : ""
                }`}
                aria-hidden="true"
              />
              <span>ゆっくり</span>
            </button>
            <button
              type="button"
              onClick={stopPlayback}
              disabled={!supported || playMode === "idle"}
              aria-label="音声を停止"
              className="inline-flex items-center justify-center min-w-[56px] min-h-[56px] bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-colors"
            >
              <Square className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          {!supported ? (
            <p className="mt-1 text-xs text-red-700">
              お使いのブラウザは音声再生に対応していません。
            </p>
          ) : null}
        </div>

        <div className="mt-5 sm:mt-6 border border-gray-200 bg-white p-4">
          <p className="text-xs uppercase tracking-wider text-gray-500">
            質問
          </p>
          <p className="mt-1 text-lg sm:text-xl font-semibold text-gray-900 break-words leading-relaxed">
            {prompt.thai}
          </p>
        </div>

        <ul className="mt-4 sm:mt-5 space-y-2">
          {options.map((opt) => (
            <li
              key={opt.label}
              className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-base text-gray-900 break-words"
            >
              <span className="text-gray-700 shrink-0">({opt.label})</span>
              <span className="font-semibold">{opt.thai}</span>
            </li>
          ))}
        </ul>

        <details className="group mt-6">
          <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-3 border border-gray-200 bg-gray-100 px-4 sm:px-5 min-h-[52px] py-3 text-base text-gray-900 hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-colors">
            <span>問題{number}の解答（ここをクリック）</span>
            <ChevronRight
              className="h-5 w-5 shrink-0 transition-transform group-open:rotate-90"
              aria-hidden="true"
            />
          </summary>

          {correctOption ? (
            <div className="mt-3 border border-gray-200 bg-white p-4 sm:p-5">
              <p className="text-xs uppercase tracking-wider text-gray-500">
                Answer
              </p>
              <p className="mt-1 text-xl sm:text-2xl font-semibold text-gray-900 break-words">
                ({correctOption.label}) {correctOption.thai}
              </p>
              <p className="mt-0.5 text-sm text-gray-500 font-mono break-words">
                {correctOption.romanization}
              </p>
              <p className="mt-1 text-base text-gray-900 break-words">
                {correctOption.meaning}
              </p>

              <div className="mt-4 border-t border-gray-200 pt-3">
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Question
                </p>
                <p className="mt-1 text-base sm:text-lg text-gray-900 break-words">
                  {prompt.thai}
                </p>
                <p className="mt-0.5 text-sm text-gray-500 font-mono break-words">
                  {prompt.romanization}
                </p>
                <p className="mt-1 text-sm text-gray-700 break-words">
                  {prompt.meaning}
                </p>
              </div>

              <div className="mt-4 border-t border-gray-200 pt-3">
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Dialogue
                </p>
                <ul className="mt-2 grid gap-3 sm:gap-4">
                  {dialogue.map((line, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 border-l-2 border-gray-200 pl-3"
                    >
                      <span
                        className={`shrink-0 inline-flex h-7 w-7 items-center justify-center text-white ${
                          line.speaker === "man" ? "bg-gray-700" : "bg-gray-900"
                        }`}
                        aria-label={
                          line.speaker === "man" ? "男性" : "女性"
                        }
                      >
                        {line.speaker === "man" ? (
                          <User className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <UserRound className="h-4 w-4" aria-hidden="true" />
                        )}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs uppercase tracking-wider text-gray-400">
                          {line.speaker === "man" ? "ผู้ชาย" : "ผู้หญิง"}
                        </p>
                        <p className="mt-0.5 text-base text-gray-900 break-words leading-relaxed">
                          {line.thai}
                        </p>
                        <p className="text-sm text-gray-500 font-mono break-words">
                          {line.romanization}
                        </p>
                        <p className="mt-0.5 text-sm text-gray-700 break-words">
                          {line.meaning}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </details>
      </div>
    </article>
  );
}
