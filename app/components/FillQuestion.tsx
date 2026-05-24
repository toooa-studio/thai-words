import { ChevronRight } from "lucide-react";
import type { FillQuestion as FillQuestionType } from "@/lib/data/fillQuestions";
import { getWordRelations } from "@/lib/data/wordRelations";
import { WordRelationsCallout } from "@/app/components/WordRelationsCallout";
import { SpeakButton } from "./SpeakButton";

type Props = {
  question: FillQuestionType;
};

export function FillQuestion({ question }: Props) {
  const { number, word, sentence, options, correctLabel } = question;
  const correctOption = options.find((o) => o.label === correctLabel);

  return (
    <article
      aria-labelledby={`q-${number}-heading`}
      className="border border-gray-200 bg-white"
    >
      <header className="border-b border-gray-200 px-4 sm:px-6 py-4 sm:py-5">
        <h3
          id={`q-${number}-heading`}
          className="text-2xl sm:text-3xl font-semibold text-gray-900"
        >
          問題{number}
        </h3>
      </header>

      <div className="px-4 sm:px-6 py-5 sm:py-6">
        <p className="text-lg sm:text-xl text-gray-900 leading-relaxed break-words">
          {sentence}
        </p>

        <ul className="mt-5 sm:mt-6 space-y-2">
          {options.map((opt) => (
            <li
              key={opt.label}
              className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-base text-gray-900 break-words"
            >
              <span className="text-gray-700">({opt.label})</span>
              <span className="font-semibold">{opt.thai}</span>
              <span className="text-sm text-gray-500 font-mono">
                {opt.romanization}
              </span>
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
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
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
                  <WordRelationsCallout
                    notes={getWordRelations(word.id)}
                    className="mt-3"
                  />
                </div>
                <SpeakButton
                  text={word.thai}
                  ariaLabel={`「${word.thai}」を再生`}
                  size="sm"
                />
              </div>

              <div className="mt-4 border-t border-gray-200 pt-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-wider text-gray-500">
                      Complete sentence
                    </p>
                    <p className="mt-1 text-base sm:text-lg text-gray-900 break-words leading-relaxed">
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
                    ariaLabel={`例文「${word.example}」を再生`}
                    size="sm"
                  />
                </div>
              </div>
            </div>
          ) : null}
        </details>
      </div>
    </article>
  );
}
