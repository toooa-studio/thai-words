"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Languages,
  Type,
  PencilLine,
  Volume2,
  Play,
  ArrowRight,
} from "lucide-react";
import type {
  QuizMode,
  QuizRange,
  QuizCount,
} from "@/lib/types/quiz";
import { getTotalPages } from "@/lib/data/thaiWords";

type ModeOption = {
  value: QuizMode;
  label: string;
  description: string;
  icon: typeof Languages;
};

const MODE_OPTIONS: ModeOption[] = [
  {
    value: "meaning",
    label: "タイ語 → 意味",
    description: "タイ語を見て、日本語の意味を選びます。",
    icon: Languages,
  },
  {
    value: "thai",
    label: "意味 → タイ語",
    description: "日本語を見て、タイ語の単語を選びます。",
    icon: Type,
  },
  {
    value: "fill",
    label: "例文の穴埋め",
    description: "例文の空欄に入る単語を選びます。",
    icon: PencilLine,
  },
  {
    value: "audio",
    label: "音声 → 意味",
    description: "音声を聞いて意味を選びます。",
    icon: Volume2,
  },
];

const COUNT_OPTIONS: QuizCount[] = [10, 20, 50, 100];

export function QuizSettingsForm() {
  const router = useRouter();
  const [mode, setMode] = useState<QuizMode>("meaning");
  const [range, setRange] = useState<QuizRange>("all");
  const [count, setCount] = useState<QuizCount>(10);

  const totalPages = getTotalPages();
  const rangeOptions: { value: QuizRange; label: string }[] = [
    { value: "all", label: "全範囲 (1-1000)" },
    ...Array.from({ length: totalPages }, (_, i) => {
      const page = i + 1;
      const start = (page - 1) * 100 + 1;
      const end = page * 100;
      return {
        value: `p${page}` as QuizRange,
        label: `${start} - ${end} 語目`,
      };
    }),
  ];

  const handleStart = () => {
    const params = new URLSearchParams({
      mode,
      range,
      count: String(count),
    });
    router.push(`/quiz/play?${params.toString()}`);
  };

  return (
    <form
      className="grid gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        handleStart();
      }}
    >
      <fieldset className="border border-gray-200 bg-white p-4 sm:p-6">
        <legend className="px-2 text-xs uppercase tracking-wider text-gray-500">
          1. モードを選ぶ
        </legend>
        <ul className="mt-3 grid gap-2 sm:gap-3 sm:grid-cols-2">
          {MODE_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const isSelected = mode === opt.value;
            return (
              <li key={opt.value}>
                <label
                  className={`flex h-full cursor-pointer items-start gap-3 border min-h-[88px] p-3 sm:p-4 transition-colors ${
                    isSelected
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-300 bg-white text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <input
                    type="radio"
                    name="mode"
                    value={opt.value}
                    checked={isSelected}
                    onChange={() => setMode(opt.value)}
                    className="sr-only"
                  />
                  <span
                    className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center border ${
                      isSelected
                        ? "border-white bg-white text-gray-900"
                        : "border-gray-300 bg-white text-gray-900"
                    }`}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-base font-semibold">
                      {opt.label}
                    </span>
                    <span
                      className={`mt-1 block text-xs leading-relaxed ${
                        isSelected ? "text-gray-200" : "text-gray-600"
                      }`}
                    >
                      {opt.description}
                    </span>
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <fieldset className="border border-gray-200 bg-white p-4 sm:p-6">
        <legend className="px-2 text-xs uppercase tracking-wider text-gray-500">
          2. 出題範囲を選ぶ
        </legend>
        <div className="mt-3">
          <label htmlFor="range-select" className="sr-only">
            出題範囲
          </label>
          <select
            id="range-select"
            value={range}
            onChange={(e) => setRange(e.target.value as QuizRange)}
            className="block w-full min-h-[48px] border border-gray-300 bg-white px-3 text-base text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            {rangeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      <fieldset className="border border-gray-200 bg-white p-4 sm:p-6">
        <legend className="px-2 text-xs uppercase tracking-wider text-gray-500">
          3. 問題数を選ぶ
        </legend>
        <div
          role="radiogroup"
          aria-label="問題数"
          className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3"
        >
          {COUNT_OPTIONS.map((c) => {
            const isSelected = count === c;
            return (
              <label
                key={c}
                className={`flex cursor-pointer items-center justify-center min-h-[48px] border text-base font-medium transition-colors ${
                  isSelected
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-300 bg-white text-gray-900 hover:bg-gray-100"
                }`}
              >
                <input
                  type="radio"
                  name="count"
                  value={c}
                  checked={isSelected}
                  onChange={() => setCount(c)}
                  className="sr-only"
                />
                {c} 問
              </label>
            );
          })}
        </div>
      </fieldset>

      <div>
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 min-h-[56px] px-6 bg-gray-900 text-white text-base font-semibold whitespace-nowrap hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-colors"
        >
          <Play className="h-5 w-5" aria-hidden="true" />
          <span>クイズをはじめる</span>
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
