"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Volume2,
  Check,
  X,
  ArrowRight,
  RotateCcw,
  Settings,
  Trophy,
} from "lucide-react";
import { generateQuiz, getModeLabel, getRangeLabel } from "@/lib/quiz/quizUtils";
import type { QuizQuestion, QuizSettings } from "@/lib/types/quiz";

type Props = {
  settings: QuizSettings;
};

type LoadState = "loading" | "ready" | "empty";

export function QuizPlayer({ settings }: Props) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [resultShown, setResultShown] = useState(false);

  const startNewQuiz = () => {
    const generated = generateQuiz(settings);
    setQuestions(generated);
    setLoadState(generated.length === 0 ? "empty" : "ready");
    setCurrentIndex(0);
    setSelectedIndex(null);
    setAnswers([]);
    setResultShown(false);
  };

  useEffect(() => {
    startNewQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.mode, settings.range, settings.count]);

  if (loadState === "loading") {
    return (
      <div className="mx-auto w-full max-w-screen-md px-4 py-10 text-center text-sm text-gray-600">
        準備中...
      </div>
    );
  }

  if (loadState === "empty") {
    return (
      <div className="mx-auto w-full max-w-screen-md px-4 py-10">
        <div className="border border-gray-200 bg-white p-6 text-center">
          <p className="text-base text-gray-900">
            この設定では問題を生成できませんでした。
          </p>
          <p className="mt-2 text-sm text-gray-600">
            別のモードや範囲を選び直してください。
          </p>
          <Link
            href="/quiz"
            className="mt-5 inline-flex items-center justify-center gap-2 min-h-[44px] px-4 bg-gray-900 text-white text-sm font-medium whitespace-nowrap hover:bg-gray-700 transition-colors"
          >
            <Settings className="h-4 w-4" aria-hidden="true" />
            <span>設定に戻る</span>
          </Link>
        </div>
      </div>
    );
  }

  const total = questions.length;

  if (resultShown) {
    return (
      <QuizResult
        questions={questions}
        answers={answers}
        settings={settings}
        onRetry={startNewQuiz}
      />
    );
  }

  const current = questions[currentIndex];
  const isAnswered = selectedIndex !== null;
  const progress = ((currentIndex + (isAnswered ? 1 : 0)) / total) * 100;

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedIndex(idx);
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    const nextAnswers = [...answers, selectedIndex];
    setAnswers(nextAnswers);

    if (currentIndex + 1 >= total) {
      setResultShown(true);
      return;
    }

    setCurrentIndex(currentIndex + 1);
    setSelectedIndex(null);
  };

  return (
    <div className="mx-auto w-full max-w-screen-md px-4 py-6 sm:py-8">
      <div className="border border-gray-200 bg-white">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs uppercase tracking-wider text-gray-500">
              {getModeLabel(settings.mode)} / {getRangeLabel(settings.range)}
            </p>
            <p className="text-sm font-medium text-gray-900 whitespace-nowrap">
              {currentIndex + 1} / {total}
            </p>
          </div>
          <div
            className="mt-2 h-1 w-full bg-gray-100"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full bg-gray-900 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <QuestionPrompt question={current} />

          <ul className="mt-5 sm:mt-6 grid gap-2 sm:gap-3">
            {current.options.map((option, idx) => {
              const isSelected = selectedIndex === idx;
              const isCorrect = idx === current.correctIndex;

              let stateClass =
                "bg-white border-gray-300 text-gray-900 hover:bg-gray-100";
              let icon: React.ReactNode = null;

              if (isAnswered) {
                if (isCorrect) {
                  stateClass = "bg-green-50 border-green-600 text-green-900";
                  icon = (
                    <Check
                      className="h-5 w-5 text-green-700"
                      aria-hidden="true"
                    />
                  );
                } else if (isSelected) {
                  stateClass = "bg-red-50 border-red-600 text-red-900";
                  icon = (
                    <X className="h-5 w-5 text-red-700" aria-hidden="true" />
                  );
                } else {
                  stateClass =
                    "bg-white border-gray-200 text-gray-500";
                }
              }

              return (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={() => handleSelect(idx)}
                    disabled={isAnswered}
                    aria-pressed={isSelected}
                    className={`flex w-full items-center justify-between gap-3 border min-h-[56px] px-4 py-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 ${stateClass} ${
                      isAnswered ? "cursor-default" : "cursor-pointer"
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-base font-medium break-words">
                        {option.text}
                      </p>
                      {option.detail ? (
                        <p className="mt-0.5 text-xs text-gray-500 font-mono break-words">
                          {option.detail}
                        </p>
                      ) : null}
                    </div>
                    {icon ? <span className="shrink-0">{icon}</span> : null}
                  </button>
                </li>
              );
            })}
          </ul>

          {isAnswered ? (
            <AnswerExplanation
              question={current}
              isCorrect={selectedIndex === current.correctIndex}
            />
          ) : null}

          <div className="mt-5 sm:mt-6 flex items-center justify-end">
            <button
              type="button"
              onClick={handleNext}
              disabled={!isAnswered}
              className="inline-flex items-center justify-center gap-1 min-h-[48px] px-5 bg-gray-900 text-white text-base font-medium whitespace-nowrap hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-colors"
            >
              <span>
                {currentIndex + 1 >= total ? "結果を見る" : "次の問題へ"}
              </span>
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuestionPrompt({ question }: { question: QuizQuestion }) {
  const [supported, setSupported] = useState(true);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSupported(false);
    }
  }, []);

  useEffect(() => {
    if (
      question.mode === "audio" &&
      question.prompt.speakText &&
      typeof window !== "undefined" &&
      "speechSynthesis" in window
    ) {
      const t = setTimeout(() => speak(question.prompt.speakText as string), 200);
      return () => clearTimeout(t);
    }
  }, [question.id, question.mode, question.prompt.speakText]);

  const speak = (text: string) => {
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

  return (
    <div>
      {question.prompt.description ? (
        <p className="text-xs uppercase tracking-wider text-gray-500">
          {question.prompt.description}
        </p>
      ) : null}

      {question.mode === "audio" ? (
        <div className="mt-3 flex flex-col items-center gap-3 border border-gray-200 bg-gray-50 p-5 text-center">
          <button
            type="button"
            onClick={() => speak(question.prompt.speakText as string)}
            disabled={!supported}
            aria-label="音声を再生"
            className="inline-flex items-center justify-center min-w-[64px] min-h-[64px] bg-gray-900 text-white border border-gray-900 hover:bg-gray-700 disabled:bg-gray-300 disabled:border-gray-300 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-colors"
          >
            <Volume2
              className={`h-7 w-7 ${speaking ? "animate-pulse" : ""}`}
              aria-hidden="true"
            />
          </button>
          <p className="text-sm text-gray-600">
            タップで音声をもう一度再生できます
          </p>
        </div>
      ) : (
        <div className="mt-3">
          <p className="text-2xl sm:text-3xl font-semibold text-gray-900 break-words leading-snug">
            {question.prompt.text}
          </p>
          {question.prompt.romanization ? (
            <p className="mt-1 text-sm sm:text-base text-gray-500 font-mono break-words">
              {question.prompt.romanization}
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
}

function AnswerExplanation({
  question,
  isCorrect,
}: {
  question: QuizQuestion;
  isCorrect: boolean;
}) {
  const word = question.word;
  const [supported, setSupported] = useState(true);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSupported(false);
    }
  }, []);

  const speak = (text: string) => {
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

  return (
    <div
      className={`mt-4 sm:mt-5 border p-4 sm:p-5 ${
        isCorrect
          ? "border-green-600 bg-green-50"
          : "border-red-600 bg-red-50"
      }`}
    >
      <p
        className={`text-sm font-semibold ${
          isCorrect ? "text-green-800" : "text-red-800"
        }`}
      >
        {isCorrect ? "正解" : "不正解"}
      </p>

      <div className="mt-3 border-t border-gray-200 pt-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xl sm:text-2xl font-semibold text-gray-900 break-words">
              {word.thai}
            </p>
            <p className="mt-0.5 text-sm text-gray-500 font-mono break-words">
              {word.romanization}
            </p>
            <p className="mt-1 text-base text-gray-900 break-words">
              {word.meaning}
            </p>
          </div>
          <button
            type="button"
            onClick={() => speak(word.thai)}
            disabled={!supported}
            aria-label={`「${word.thai}」を再生`}
            className="shrink-0 inline-flex items-center justify-center min-w-[44px] min-h-[44px] bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-colors"
          >
            <Volume2
              className={`h-5 w-5 ${speaking ? "animate-pulse" : ""}`}
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="mt-3 border-t border-gray-200 pt-3">
          <p className="text-xs uppercase tracking-wider text-gray-400">
            Example
          </p>
          <p className="mt-1 text-base text-gray-900 break-words">
            {word.example}
          </p>
          <p className="mt-0.5 text-sm text-gray-500 font-mono break-words">
            {word.exampleRomanization}
          </p>
          <p className="mt-1 text-sm text-gray-700 break-words">
            {word.exampleMeaning}
          </p>
        </div>
      </div>
    </div>
  );
}

function QuizResult({
  questions,
  answers,
  settings,
  onRetry,
}: {
  questions: QuizQuestion[];
  answers: (number | null)[];
  settings: QuizSettings;
  onRetry: () => void;
}) {
  const total = questions.length;
  const correct = questions.reduce((acc, q, i) => {
    return answers[i] === q.correctIndex ? acc + 1 : acc;
  }, 0);
  const percentage = Math.round((correct / total) * 100);

  let comment = "";
  if (percentage === 100) comment = "完璧です!";
  else if (percentage >= 80) comment = "とても良いです!";
  else if (percentage >= 60) comment = "もう少し!";
  else comment = "復習しましょう。";

  const wrongs = questions
    .map((q, i) => ({ q, ans: answers[i] }))
    .filter((x) => x.ans !== x.q.correctIndex);

  return (
    <div className="mx-auto w-full max-w-screen-md px-4 py-6 sm:py-8">
      <section className="border border-gray-200 bg-white p-5 sm:p-8 text-center">
        <div className="inline-flex h-14 w-14 items-center justify-center bg-gray-900 text-white">
          <Trophy className="h-7 w-7" aria-hidden="true" />
        </div>
        <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-gray-900">
          結果
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {getModeLabel(settings.mode)} / {getRangeLabel(settings.range)}
        </p>

        <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-4 border-t border-gray-200 pt-6">
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500">
              Correct
            </p>
            <p className="mt-1 text-2xl sm:text-3xl font-semibold text-gray-900">
              {correct}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500">
              Total
            </p>
            <p className="mt-1 text-2xl sm:text-3xl font-semibold text-gray-900">
              {total}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500">
              Score
            </p>
            <p className="mt-1 text-2xl sm:text-3xl font-semibold text-gray-900">
              {percentage}%
            </p>
          </div>
        </div>

        <p className="mt-5 text-base text-gray-700">{comment}</p>

        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 bg-gray-900 text-white text-base font-medium whitespace-nowrap hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-colors"
          >
            <RotateCcw className="h-5 w-5" aria-hidden="true" />
            <span>もう一度挑戦</span>
          </button>
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 bg-white text-gray-900 border border-gray-300 text-base font-medium whitespace-nowrap hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-colors"
          >
            <Settings className="h-5 w-5" aria-hidden="true" />
            <span>設定を変える</span>
          </Link>
        </div>
      </section>

      {wrongs.length > 0 ? (
        <section
          aria-labelledby="wrong-heading"
          className="mt-6 sm:mt-8 border border-gray-200 bg-white"
        >
          <header className="border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
            <h2
              id="wrong-heading"
              className="text-lg font-semibold text-gray-900"
            >
              間違えた問題 ({wrongs.length}問)
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              復習しておきましょう。
            </p>
          </header>
          <ul className="divide-y divide-gray-100">
            {wrongs.map(({ q }) => (
              <li key={q.id} className="p-4 sm:p-6">
                <p className="text-xs uppercase tracking-wider text-gray-400">
                  Word #{String(q.word.id).padStart(3, "0")}
                </p>
                <p className="mt-1 text-xl font-semibold text-gray-900 break-words">
                  {q.word.thai}
                </p>
                <p className="mt-0.5 text-sm text-gray-500 font-mono break-words">
                  {q.word.romanization}
                </p>
                <p className="mt-1 text-base text-gray-900 break-words">
                  {q.word.meaning}
                </p>
                <p className="mt-2 text-sm text-gray-700 break-words">
                  例文: {q.word.example}
                </p>
                <p className="text-xs text-gray-500 break-words">
                  {q.word.exampleMeaning}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
