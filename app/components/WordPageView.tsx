import { WordItem } from "./WordItem";
import { Pagination } from "./Pagination";
import { getWordsForPage, getTotalPages, thaiWords } from "@/lib/data/thaiWords";

type Props = {
  page: number;
};

export function WordPageView({ page }: Props) {
  const words = getWordsForPage(page);
  const totalPages = getTotalPages();
  const totalWords = thaiWords.length;
  const startIndex = (page - 1) * 100 + 1;
  const endIndex = startIndex + words.length - 1;

  return (
    <div className="mx-auto w-full max-w-screen-md px-4 py-6 sm:py-8">
      <header className="border border-gray-200 bg-white p-4 sm:p-6">
        <p className="text-xs uppercase tracking-wider text-gray-500">
          Vocabulary
        </p>
        <h1 className="mt-1 text-xl sm:text-2xl font-semibold tracking-wide text-gray-900">
          基礎単語帳
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          よく使われる順 / 全 {totalWords} 語 / 100語ごとにページ分け
        </p>
        <div className="mt-3 flex items-center justify-between gap-2 border-t border-gray-100 pt-3">
          <p className="text-sm text-gray-700">
            ページ {page} / {totalPages}
          </p>
          <p className="text-sm text-gray-700 whitespace-nowrap">
            {startIndex}-{endIndex} 語目
          </p>
        </div>
      </header>

      <ul className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
        {words.map((word) => (
          <li key={word.id}>
            <WordItem word={word} />
          </li>
        ))}
      </ul>

      <div className="mt-8 sm:mt-10">
        <Pagination currentPage={page} totalPages={totalPages} />
      </div>
    </div>
  );
}
