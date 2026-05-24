import type { Metadata } from "next";
import { QuizSettingsForm } from "@/app/components/QuizSettingsForm";

export const metadata: Metadata = {
  title: "単語クイズ",
  description:
    "タイ語の単語をクイズ形式でアウトプット練習。意味選択、タイ語選択、例文穴埋め、音声選択の4モード。",
};

export default function QuizPage() {
  return (
    <div className="w-full">
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-screen-md px-4 py-10 sm:py-14 text-center">
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-gray-500">
            Quiz
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
            単語クイズ
          </h1>
          <p className="mx-auto mt-4 max-w-prose text-base sm:text-lg text-gray-700">
            覚えた単語をクイズ形式でアウトプット。
            モード・出題範囲・問題数を選んで開始しましょう。
          </p>
        </div>
      </section>

      <section
        aria-labelledby="quiz-settings-heading"
        className="mx-auto max-w-screen-md px-4 py-8 sm:py-10"
      >
        <h2 id="quiz-settings-heading" className="sr-only">
          クイズ設定
        </h2>
        <QuizSettingsForm />
      </section>
    </div>
  );
}
