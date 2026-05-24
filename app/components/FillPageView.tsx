import { FillQuestion } from "./FillQuestion";
import { Pagination } from "./Pagination";
import {
  FILL_QUESTIONS_PER_PAGE,
  getFillQuestionsForPage,
  getTotalFillPages,
  getTotalFillQuestions,
} from "@/lib/data/fillQuestions";

type Props = {
  page: number;
};

export function FillPageView({ page }: Props) {
  const questions = getFillQuestionsForPage(page);
  const totalPages = getTotalFillPages();
  const totalQuestions = getTotalFillQuestions();
  const start = (page - 1) * FILL_QUESTIONS_PER_PAGE + 1;
  const end = Math.min(page * FILL_QUESTIONS_PER_PAGE, totalQuestions);

  return (
    <div className="mx-auto w-full max-w-screen-md px-4 py-6 sm:py-8">
      <header className="border-b border-gray-200 pb-4 sm:pb-6">
        <p className="text-xs uppercase tracking-wider text-gray-500">
          Fill in the Blank
        </p>
        <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
          穴埋め問題 ページ {page}
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          問題 {start} - {end}（全 {totalQuestions} 問 / {totalPages} ページ）
        </p>
      </header>

      <div className="mt-6 sm:mt-8">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          basePath="/fill"
          groupSize={10}
        />
      </div>

      <div className="mt-6 sm:mt-8 grid gap-5 sm:gap-6">
        {questions.map((q) => (
          <FillQuestion key={q.number} question={q} />
        ))}
      </div>

      <div className="mt-8 sm:mt-10">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          basePath="/fill"
          groupSize={10}
        />
      </div>
    </div>
  );
}
