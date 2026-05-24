import type { Metadata } from "next";
import { FillPageView } from "@/app/components/FillPageView";

export const metadata: Metadata = {
  title: "穴埋め問題",
  description:
    "タイ語の穴埋め問題集。1問ずつ4択から空欄に入る単語を選び、解答をクリックして確認できます。",
};

export default function FillPage() {
  return <FillPageView page={1} />;
}
