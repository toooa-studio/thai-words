import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

  const pageHref = (p: number) => (p === 1 ? "/vocabulary" : `/vocabulary/${p}`);
  const prevPage = page > 1 ? page - 1 : null;
  const nextPage = page < totalPages ? page + 1 : null;

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

        {totalPages > 1 ? (
          <nav
            aria-label="ページ送り（上部）"
            className="mt-3 flex items-center justify-between gap-2 border-t border-gray-100 pt-3"
          >
            {prevPage !== null ? (
              <Link
                href={pageHref(prevPage)}
                aria-label={`前のページ（ページ${prevPage}）`}
                className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] px-3 sm:px-4 bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                <span className="ml-1 text-sm font-medium whitespace-nowrap">前のページ</span>
              </Link>
            ) : (
              <span
                aria-disabled="true"
                className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] px-3 sm:px-4 bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                <span className="ml-1 text-sm font-medium whitespace-nowrap">前のページ</span>
              </span>
            )}
            {nextPage !== null ? (
              <Link
                href={pageHref(nextPage)}
                aria-label={`次のページ（ページ${nextPage}）`}
                className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] px-3 sm:px-4 bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-colors"
              >
                <span className="mr-1 text-sm font-medium whitespace-nowrap">次のページ</span>
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </Link>
            ) : (
              <span
                aria-disabled="true"
                className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] px-3 sm:px-4 bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
              >
                <span className="mr-1 text-sm font-medium whitespace-nowrap">次のページ</span>
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </span>
            )}
          </nav>
        ) : null}
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
