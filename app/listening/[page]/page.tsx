import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ListeningPageView } from "@/app/components/ListeningPageView";
import {
  LISTENING_QUESTIONS_PER_PAGE,
  getTotalListeningPages,
  getTotalListeningQuestions,
} from "@/lib/data/listeningQuestions";

type Params = {
  params: Promise<{ page: string }>;
};

export function generateStaticParams() {
  const total = getTotalListeningPages();
  return Array.from({ length: total }, (_, i) => ({
    page: String(i + 1),
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { page } = await params;
  const pageNumber = Number(page);
  const totalQuestions = getTotalListeningQuestions();
  const start = (pageNumber - 1) * LISTENING_QUESTIONS_PER_PAGE + 1;
  const end = Math.min(
    pageNumber * LISTENING_QUESTIONS_PER_PAGE,
    totalQuestions
  );
  return {
    title: `リスニング問題 ページ${pageNumber}`,
    description: `タイ語の例文音声を聞いて意味を選ぶリスニング問題集（問題 ${start}〜${end}）。`,
  };
}

export default async function ListeningPaginatedPage({ params }: Params) {
  const { page } = await params;
  const pageNumber = Number(page);
  const totalPages = getTotalListeningPages();

  if (
    !Number.isInteger(pageNumber) ||
    pageNumber < 1 ||
    pageNumber > totalPages
  ) {
    notFound();
  }

  if (pageNumber === 1) {
    redirect("/listening");
  }

  return <ListeningPageView page={pageNumber} />;
}
