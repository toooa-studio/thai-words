"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Check,
  X,
  ArrowRight,
  RotateCcw,
  Settings,
  Trophy,
  Target,
} from "lucide-react";
import { generateQuiz, getModeLabel, getQuizSourceLabel } from "@/lib/quiz/quizUtils";
import type { QuizQuestion, QuizSettings } from "@/lib/types/quiz";
import { SpeakButton } from "@/app/components/SpeakButton";
import { WordRelationsCallout } from "@/app/components/WordRelationsCallout";
import { getWordRelations } from "@/lib/data/manualWordRelations";
import { saveWrongWordIdsForRetry } from "@/lib/quiz/wrongRetryStorage";

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
  }, [settings.mode, settings.range, settings.count, settings.restrictWordIds?.join(",") ?? ""]);

  const loadStateRef = useRef(loadState);
  const resultShownRef = useRef(resultShown);
  const selectedIndexRef = useRef(selectedIndex);
  const currentIndexRef = useRef(currentIndex);
  const questionsRef = useRef(questions);

  loadStateRef.current = loadState;
  resultShownRef.current = resultShown;
  selectedIndexRef.current = selectedIndex;
  currentIndexRef.current = currentIndex;
  questionsRef.current = questions;

  const handleNext = useCallback(() => {
    if (loadStateRef.current !== "ready" || resultShownRef.current) return;
    const sel = selectedIndexRef.current;
    if (sel === null) return;
    const ci = currentIndexRef.current;
    const qs = questionsRef.current;
    const total = qs.length;
    setAnswers((prev) => [...prev, sel]);
    if (ci + 1 >= total) {
      setResultShown(true);
    } else {
      setCurrentIndex(ci + 1);
      setSelectedIndex(null);
    }
  }, []);

  useEffect(() => {
    const digitToIndex = (key: string): number | undefined => {
      const map: Record<string, number> = {
        "1": 0,
        "2": 1,
        "3": 2,
        "4": 3,
        Numpad1: 0,
        Numpad2: 1,
        Numpad3: 2,
        Numpad4: 3,
      };
      return map[key];
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const choiceIndex = digitToIndex(e.key);
      if (choiceIndex !== undefined) {
        if (e.repeat) return;
        if (loadStateRef.current !== "ready" || resultShownRef.current) return;
        if (selectedIndexRef.current !== null) return;
        if (e.ctrlKey || e.metaKey || e.altKey) return;

        const target = e.target;
        if (
          target instanceof HTMLInputElement ||
          target instanceof HTMLTextAreaElement ||
          target instanceof HTMLSelectElement
        ) {
          return;
        }

        const q = questionsRef.current[currentIndexRef.current];
        if (!q || choiceIndex >= q.options.length) return;

        e.preventDefault();
        setSelectedIndex(choiceIndex);
        return;
      }

      if (e.key !== "Enter" || e.repeat) return;
      if (loadStateRef.current !== "ready" || resultShownRef.current) return;
      if (selectedIndexRef.current === null) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const target = e.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement
      ) {
        return;
      }
      if (target instanceof Element && target.closest("[data-quiz-enter-secondary]")) {
        return;
      }

      e.preventDefault();
      handleNext();
    };

    window.addEventListener("keydown", onKeyDown, true);
    return () => window.removeEventListener("keydown", onKeyDown, true);
  }, [handleNext]);

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

  return (
    <div className="mx-auto w-full max-w-screen-md px-4 py-6 sm:py-8">
      <div className="border border-gray-200 bg-white">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs uppercase tracking-wider text-gray-500">
              {getModeLabel(settings.mode)} / {getQuizSourceLabel(settings)}
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

          <p className="mt-4 text-xs text-gray-500">
            キーボードの <span className="font-mono">1</span>〜
            <span className="font-mono">4</span>（テンキー可）で選択。解答後は{" "}
            <span className="font-mono">Enter</span> で次へ進みます。
          </p>

          <ul
            className="mt-3 sm:mt-4 grid gap-2 sm:gap-3"
            aria-label="選択肢（キー1〜4で回答）"
          >
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
                <li key={idx} className="flex gap-2 items-stretch">
                  <button
                    type="button"
                    onClick={() => handleSelect(idx)}
                    disabled={isAnswered}
                    aria-pressed={isSelected}
                    className={`flex min-w-0 flex-1 items-center justify-between gap-3 border min-h-[56px] px-3 py-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 ${stateClass} ${
                      isAnswered ? "cursor-default" : "cursor-pointer"
                    }`}
                  >
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center border border-gray-200 bg-gray-50 text-sm font-semibold text-gray-800"
                      aria-hidden
                    >
                      {idx + 1}
                    </span>
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
                  {current.mode === "thai" || current.mode === "fill" ? (
                    <SpeakButton
                      text={option.text}
                      size="sm"
                      markEnterSecondary
                      ariaLabel={`「${option.text}」を再生`}
                      className="self-center"
                    />
                  ) : null}
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
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    type AutoSpec = { text: string; lang: string; rate: number };
    let spec: AutoSpec | null = null;

    switch (question.mode) {
      case "audio": {
        const t = question.prompt.speakText;
        if (t) spec = { text: t, lang: "th-TH", rate: 0.85 };
        break;
      }
      case "meaning":
        spec = { text: question.word.thai, lang: "th-TH", rate: 0.85 };
        break;
      case "fill":
        spec = { text: question.word.example, lang: "th-TH", rate: 0.85 };
        break;
      case "thai":
        spec = { text: question.prompt.text, lang: "ja-JP", rate: 0.95 };
        break;
      default:
        break;
    }

    if (!spec || !spec.text.trim()) return;

    const { text, lang, rate } = spec;

    const timer = window.setTimeout(() => {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = lang;
      utter.rate = rate;
      utter.onerror = () => {};
      window.speechSynthesis.speak(utter);
    }, 0);

    return () => {
      window.clearTimeout(timer);
      window.speechSynthesis.cancel();
    };
  }, [
    question.id,
    question.mode,
    question.prompt.speakText,
    question.prompt.text,
    question.word.thai,
    question.word.example,
  ]);

  return (
    <div>
      {question.prompt.description ? (
        <p className="text-xs uppercase tracking-wider text-gray-500">
          {question.prompt.description}
        </p>
      ) : null}

      {question.mode === "audio" ? (
        <div className="mt-3 flex flex-col items-center gap-3 border border-gray-200 bg-gray-50 p-5 text-center">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <SpeakButton
              text={question.prompt.speakText as string}
              variant="primary"
              size="lg"
              markEnterSecondary
              ariaLabel="タイ語の音声を再生"
            />
            <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
              タイ語を再生
            </span>
          </div>
          <p className="text-sm text-gray-600">
            表示と同時にタイ語を読み上げます。聞き取りにくい場合はボタンでもう一度再生できます。
          </p>
        </div>
      ) : (
        <div className="mt-3">
          {question.mode === "thai" ? (
            <p className="mb-3 text-sm text-gray-600">
              各選択肢の右のボタンで、タイ語の発音を聞けます。
            </p>
          ) : null}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-2xl sm:text-3xl font-semibold text-gray-900 break-words leading-snug">
                {question.prompt.text}
              </p>
              {question.prompt.romanization ? (
                <p className="mt-1 text-sm sm:text-base text-gray-500 font-mono break-words">
                  {question.prompt.romanization}
                </p>
              ) : null}
            </div>
            {question.mode === "meaning" || question.mode === "fill" ? (
              <SpeakButton
                text={question.word.thai}
                size="md"
                markEnterSecondary
                ariaLabel={`「${question.word.thai}」の発音を再生`}
              />
            ) : null}
          </div>
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
          <SpeakButton
            text={word.thai}
            markEnterSecondary
            ariaLabel={`「${word.thai}」を再生`}
            className="self-start"
          />
        </div>

        <WordRelationsCallout notes={getWordRelations(word.id)} className="mt-3" />

        <div className="mt-3 border-t border-gray-200 pt-3">
          <p className="text-xs uppercase tracking-wider text-gray-400">
            Example
          </p>
          <div className="mt-1 flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-base text-gray-900 break-words">
                {word.example}
              </p>
              <p className="mt-0.5 text-sm text-gray-500 font-mono break-words">
                {word.exampleRomanization}
              </p>
              <p className="mt-1 text-sm text-gray-700 break-words">
                {word.exampleMeaning}
              </p>
            </div>
            <SpeakButton
              text={word.example}
              size="sm"
              markEnterSecondary
              ariaLabel={`例文「${word.example}」を再生`}
              className="self-start"
            />
          </div>
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
  const router = useRouter();
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
          {getModeLabel(settings.mode)} / {getQuizSourceLabel(settings)}
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

        <div className="mt-6 flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
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
          {wrongs.length > 0 ? (
            <button
              type="button"
              onClick={() => {
                const ids = [...new Set(wrongs.map(({ q }) => q.word.id))];
                saveWrongWordIdsForRetry(ids);
                const params = new URLSearchParams({
                  mode: settings.mode,
                  range: settings.range,
                  count: String(settings.count),
                  wrongOnly: "1",
                  _r: String(Date.now()),
                });
                router.push(`/quiz/play?${params.toString()}`);
              }}
              className="inline-flex w-full items-center justify-center gap-2 min-h-[48px] px-5 bg-white text-gray-900 border border-gray-900 text-base font-medium whitespace-nowrap hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-colors sm:mx-auto sm:w-auto"
            >
              <Target className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>
                間違えた語だけでもう一度（{wrongs.length}語）
              </span>
            </button>
          ) : null}
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
                <WordRelationsCallout
                  notes={getWordRelations(q.word.id)}
                  className="mt-3 bg-white"
                />
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
