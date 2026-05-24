import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  currentPage: number;
  totalPages: number;
  basePath?: string;
  groupSize?: number;
  itemsPerPage?: number;
};

function buildPageHref(basePath: string, page: number): string {
  return page === 1 ? basePath : `${basePath}/${page}`;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath = "/vocabulary",
  groupSize,
  itemsPerPage,
}: Props) {
  const pageHref = (p: number) => buildPageHref(basePath, p);

  if (totalPages <= 1) {
    return (
      <div className="flex items-center justify-center text-sm text-gray-500">
        ページ {currentPage} / {totalPages}
      </div>
    );
  }

  const prev = currentPage > 1 ? currentPage - 1 : null;
  const next = currentPage < totalPages ? currentPage + 1 : null;

  const useGrouping =
    typeof groupSize === "number" &&
    groupSize > 1 &&
    totalPages > groupSize;

  return (
    <nav
      aria-label="ページネーション"
      className="flex items-center justify-between gap-2 sm:gap-4"
    >
      {prev ? (
        <Link
          href={pageHref(prev)}
          aria-label={`前のページ (ページ${prev})`}
          className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] px-3 sm:px-4 bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          <span className="ml-1 hidden sm:inline">前へ</span>
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] px-3 sm:px-4 bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          <span className="ml-1 hidden sm:inline">前へ</span>
        </span>
      )}

      <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
        {useGrouping
          ? renderGroupButtons({
              currentPage,
              totalPages,
              groupSize: groupSize as number,
              pageHref,
              itemsPerPage,
            })
          : renderPageButtons({
              currentPage,
              totalPages,
              pageHref,
              itemsPerPage,
            })}
      </div>

      {next ? (
        <Link
          href={pageHref(next)}
          aria-label={`次のページ (ページ${next})`}
          className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] px-3 sm:px-4 bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-colors"
        >
          <span className="mr-1 hidden sm:inline">次へ</span>
          <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] px-3 sm:px-4 bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
        >
          <span className="mr-1 hidden sm:inline">次へ</span>
          <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </span>
      )}
    </nav>
  );
}

function renderPageButtons({
  currentPage,
  totalPages,
  pageHref,
  itemsPerPage,
}: {
  currentPage: number;
  totalPages: number;
  pageHref: (p: number) => string;
  itemsPerPage?: number;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const useItemRange = typeof itemsPerPage === "number" && itemsPerPage > 0;
  const minWidthClass = useItemRange ? "min-w-[64px]" : "min-w-[44px]";

  return pages.map((p) => {
    const isActive = p === currentPage;
    const itemStart = useItemRange ? (p - 1) * (itemsPerPage as number) + 1 : 0;
    const itemEnd = useItemRange ? p * (itemsPerPage as number) : 0;
    const label = useItemRange ? `${itemStart}-${itemEnd}` : String(p);
    const ariaLabel = useItemRange
      ? `ページ${p}（問題 ${itemStart} から ${itemEnd}）`
      : `ページ${p}`;
    return (
      <Link
        key={p}
        href={pageHref(p)}
        aria-current={isActive ? "page" : undefined}
        aria-label={ariaLabel}
        className={`inline-flex items-center justify-center ${minWidthClass} min-h-[44px] px-3 border whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 ${
          isActive
            ? "bg-gray-900 text-white border-gray-900"
            : "bg-white text-gray-900 border-gray-300 hover:bg-gray-100"
        }`}
      >
        {label}
      </Link>
    );
  });
}

function renderGroupButtons({
  currentPage,
  totalPages,
  groupSize,
  pageHref,
  itemsPerPage,
}: {
  currentPage: number;
  totalPages: number;
  groupSize: number;
  pageHref: (p: number) => string;
  itemsPerPage?: number;
}) {
  const totalGroups = Math.ceil(totalPages / groupSize);
  const useItemRange = typeof itemsPerPage === "number" && itemsPerPage > 0;
  const minWidthClass = useItemRange ? "min-w-[80px]" : "min-w-[64px]";

  const groups = Array.from({ length: totalGroups }, (_, i) => {
    const startPage = i * groupSize + 1;
    const endPage = Math.min((i + 1) * groupSize, totalPages);
    return { startPage, endPage };
  });

  return groups.map(({ startPage, endPage }) => {
    const isActive = currentPage >= startPage && currentPage <= endPage;
    const itemStart = useItemRange
      ? (startPage - 1) * (itemsPerPage as number) + 1
      : startPage;
    const itemEnd = useItemRange
      ? endPage * (itemsPerPage as number)
      : endPage;
    const label = `${itemStart}-${itemEnd}`;
    const ariaLabel = useItemRange
      ? `ページ ${startPage} から ${endPage}（問題 ${itemStart} から ${itemEnd}）`
      : `ページ ${startPage} から ${endPage}`;
    return (
      <Link
        key={startPage}
        href={pageHref(startPage)}
        aria-current={isActive ? "page" : undefined}
        aria-label={ariaLabel}
        className={`inline-flex items-center justify-center ${minWidthClass} min-h-[44px] px-3 border whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 ${
          isActive
            ? "bg-gray-900 text-white border-gray-900"
            : "bg-white text-gray-900 border-gray-300 hover:bg-gray-100"
        }`}
      >
        {label}
      </Link>
    );
  });
}
