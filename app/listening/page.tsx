import type { Metadata } from "next";
import { ListeningPageView } from "@/app/components/ListeningPageView";

export const metadata: Metadata = {
  title: "リスニング問題",
  description:
    "タイ語の例文音声を聞いて意味を選ぶリスニング問題集。通常速度とゆっくり速度で再生でき、解答クリックで答え合わせができます。",
};

export default function ListeningPage() {
  return <ListeningPageView page={1} />;
}
