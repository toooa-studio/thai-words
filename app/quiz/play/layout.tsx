import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "クイズに挑戦",
  description: "選んだ設定でタイ語の単語クイズに挑戦します。",
};

export default function QuizPlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
