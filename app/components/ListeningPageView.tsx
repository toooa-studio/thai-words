import { ListeningQuestion } from "./ListeningQuestion";
import { Pagination } from "./Pagination";
import {
  LISTENING_QUESTIONS_PER_PAGE,
  getListeningQuestionsForPage,
  getTotalListeningPages,
  getTotalListeningQuestions,
} from "@/lib/data/listeningQuestions";

type Props = {
  page: number;
};

export function ListeningPageView({ page }: Props) {
  const questions = getListeningQuestionsForPage(page);
  const totalPages = getTotalListeningPages();
  const totalQuestions = getTotalListeningQuestions();
  const start = (page - 1) * LISTENING_QUESTIONS_PER_PAGE + 1;
  const end = Math.min(page * LISTENING_QUESTIONS_PER_PAGE, totalQuestions);

  return (
    <div className="mx-auto w-full max-w-screen-md px-4 py-6 sm:py-8">
      <header className="border-b border-gray-200 pb-4 sm:pb-6">
        <p className="text-xs uppercase tracking-wider text-gray-500">
          Listening
        </p>
        <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
          リスニング問題 ページ {page}
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          問題 {start} - {end}（全 {totalQuestions} 問 / {totalPages} ページ）
        </p>
        <p className="mt-2 text-xs text-gray-500">
          男性と女性の会話を聞いて、質問の答えを4択から選びます。
        </p>
        <p className="mt-1 text-xs text-gray-500">
          ※ ブラウザの音声合成（タイ語）を使用します。Chrome / Safari / Edge
          推奨。
        </p>
      </header>

      <div className="mt-6 sm:mt-8">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          basePath="/listening"
          groupSize={10}
          itemsPerPage={LISTENING_QUESTIONS_PER_PAGE}
        />
      </div>

      <div className="mt-6 sm:mt-8 grid gap-5 sm:gap-6">
        {questions.map((q) => (
          <ListeningQuestion key={q.number} question={q} />
        ))}
      </div>

      <div className="mt-8 sm:mt-10">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          basePath="/listening"
          groupSize={10}
          itemsPerPage={LISTENING_QUESTIONS_PER_PAGE}
        />
      </div>
    </div>
  );
}
