import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { WordPageView } from "@/app/components/WordPageView";
import { getTotalPages } from "@/lib/data/thaiWords";

type Params = {
  params: Promise<{ page: string }>;
};

export function generateStaticParams() {
  const total = getTotalPages();
  return Array.from({ length: total }, (_, i) => ({
    page: String(i + 1),
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { page } = await params;
  const pageNumber = Number(page);
  return {
    title: `基礎単語帳 ページ${pageNumber}`,
    description: `よく使われる順のタイ語基礎単語(${
      (pageNumber - 1) * 100 + 1
    }〜${pageNumber * 100}語目)。`,
  };
}

export default async function VocabularyPaginatedPage({ params }: Params) {
  const { page } = await params;
  const pageNumber = Number(page);
  const totalPages = getTotalPages();

  if (!Number.isInteger(pageNumber) || pageNumber < 1 || pageNumber > totalPages) {
    notFound();
  }

  if (pageNumber === 1) {
    redirect("/vocabulary");
  }

  return <WordPageView page={pageNumber} />;
}
