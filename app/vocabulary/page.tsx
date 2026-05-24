import type { Metadata } from "next";
import { WordPageView } from "@/app/components/WordPageView";

export const metadata: Metadata = {
  title: "基礎単語帳",
  description:
    "よく使われる順に学ぶ、タイ語の基礎単語1000語。音声・タイ文字・発音・例文付き。",
};

export default function VocabularyPage() {
  return <WordPageView page={1} />;
}
