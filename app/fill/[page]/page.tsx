import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { FillPageView } from "@/app/components/FillPageView";
import {
  FILL_QUESTIONS_PER_PAGE,
  getTotalFillPages,
  getTotalFillQuestions,
} from "@/lib/data/fillQuestions";

type Params = {
  params: Promise<{ page: string }>;
};

export function generateStaticParams() {
  const total = getTotalFillPages();
  return Array.from({ length: total }, (_, i) => ({
    page: String(i + 1),
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { page } = await params;
  const pageNumber = Number(page);
  const totalQuestions = getTotalFillQuestions();
  const start = (pageNumber - 1) * FILL_QUESTIONS_PER_PAGE + 1;
  const end = Math.min(pageNumber * FILL_QUESTIONS_PER_PAGE, totalQuestions);
  return {
    title: `穴埋め問題 ページ${pageNumber}`,
    description: `タイ語の穴埋め問題集（問題 ${start}〜${end}）。`,
  };
}

export default async function FillPaginatedPage({ params }: Params) {
  const { page } = await params;
  const pageNumber = Number(page);
  const totalPages = getTotalFillPages();

  if (
    !Number.isInteger(pageNumber) ||
    pageNumber < 1 ||
    pageNumber > totalPages
  ) {
    notFound();
  }

  if (pageNumber === 1) {
    redirect("/fill");
  }

  return <FillPageView page={pageNumber} />;
}
