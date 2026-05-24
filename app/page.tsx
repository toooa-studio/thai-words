import Link from "next/link";
import {
  BookOpen,
  PencilLine,
  Newspaper,
  ListChecks,
  Headphones,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { getTotalPages, thaiWords } from "@/lib/data/thaiWords";

type Feature = {
  href: string;
  title: string;
  description: string;
  icon: typeof BookOpen;
  available: boolean;
  external?: boolean;
};

const FEATURES: Feature[] = [
  {
    href: "/vocabulary",
    title: "基礎単語帳",
    description:
      "よく使われる順に学ぶタイ語1000語。音声・タイ文字・発音・例文付き。",
    icon: BookOpen,
    available: true,
  },
  {
    href: "/fill",
    title: "穴埋め問題",
    description:
      "例文の空欄に入る単語を4択から選ぶ問題集。10問ずつページ分けで自分のペースで学べます。",
    icon: ListChecks,
    available: true,
  },
  {
    href: "/listening",
    title: "リスニング問題",
    description:
      "タイ語の例文音声を聞いて意味を選ぶ問題集。通常速度とゆっくり速度で繰り返し聞けます。",
    icon: Headphones,
    available: true,
  },
  {
    href: "/quiz",
    title: "単語クイズ",
    description:
      "覚えた単語を4択クイズで定着。意味選択・タイ語選択・例文穴埋め・音声選択の4モード。",
    icon: PencilLine,
    available: true,
  },
  {
    href: "https://toooa-studio.vercel.app/blog/blog.html",
    title: "ブログ",
    description:
      "タイ語学習のコツ、文化、開発ノウハウなどをTOOOA studioのブログで読めます。",
    icon: Newspaper,
    available: true,
    external: true,
  },
];

export default function Home() {
  const totalPages = getTotalPages();
  const totalWords = thaiWords.length;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="w-full">
      <section className="border-b border-[#2A6396] bg-[#347AB7]">
        <div className="mx-auto max-w-screen-lg px-4 py-12 sm:py-16 md:py-20 text-center">
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/80">
            Online Thai Course
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            OTOのオンライン
            <br className="sm:hidden" />
            タイ語講座
          </h1>
          <p className="mx-auto mt-5 max-w-prose text-base sm:text-lg text-white/90">
            日本語話者のための、シンプルで続けやすいタイ語学習サイト。
            <br />
            まずは基礎単語1000語から始めましょう。
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <Link
              href="/vocabulary"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 bg-gray-900 text-white text-base font-medium whitespace-nowrap hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
            >
              <BookOpen className="h-5 w-5" aria-hidden="true" />
              <span>基礎単語帳をはじめる</span>
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="features-heading"
        className="mx-auto max-w-screen-lg px-4 py-10 sm:py-14"
      >
        <div className="text-center">
          <h2
            id="features-heading"
            className="text-2xl sm:text-3xl font-bold tracking-wide text-gray-900"
          >
            学べるコンテンツ
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            目的に合わせて選んで学習できます。
          </p>
        </div>

        <ul className="mt-8 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <li key={feature.href}>
                <article className="flex h-full flex-col border border-gray-200 bg-white p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center bg-gray-900 text-white">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="mt-auto pt-5">
                    {feature.available ? (
                      feature.external ? (
                        <a
                          href={feature.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1 min-h-[44px] w-full px-4 bg-gray-900 text-white text-sm font-medium whitespace-nowrap hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-colors"
                        >
                          <span>外部サイトで読む</span>
                          <ExternalLink
                            className="h-4 w-4"
                            aria-hidden="true"
                          />
                        </a>
                      ) : (
                        <Link
                          href={feature.href}
                          className="inline-flex items-center justify-center gap-1 min-h-[44px] w-full px-4 bg-gray-900 text-white text-sm font-medium whitespace-nowrap hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-colors"
                        >
                          <span>はじめる</span>
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      )
                    ) : (
                      <span
                        aria-disabled="true"
                        className="inline-flex items-center justify-center min-h-[44px] w-full whitespace-nowrap border border-gray-200 bg-gray-100 px-4 text-sm font-medium text-gray-500"
                      >
                        準備中
                      </span>
                    )}
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </section>

      <section
        aria-labelledby="vocab-pages-heading"
        className="border-t border-gray-200 bg-white"
      >
        <div className="mx-auto max-w-screen-lg px-4 py-10 sm:py-14">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500">
                Vocabulary Pages
              </p>
              <h2
                id="vocab-pages-heading"
                className="mt-1 text-2xl sm:text-3xl font-bold tracking-wide text-gray-900"
              >
                基礎単語帳ページ一覧
              </h2>
              <p className="mt-2 text-sm sm:text-base text-gray-600">
                全 {totalWords} 語を 100 語ずつ {totalPages} ページに分けています。
              </p>
            </div>
            <Link
              href="/vocabulary"
              className="inline-flex items-center justify-center gap-1 min-h-[44px] px-4 bg-white text-gray-900 border border-gray-300 text-sm font-medium whitespace-nowrap hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-colors"
            >
              <span>すべて見る</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {pages.map((p) => {
              const start = (p - 1) * 100 + 1;
              const end = p * 100;
              const href = p === 1 ? "/vocabulary" : `/vocabulary/${p}`;
              return (
                <li key={p}>
                  <Link
                    href={href}
                    className="flex h-full flex-col items-start justify-between gap-1 border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-100 hover:border-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 min-h-[88px]"
                  >
                    <span className="text-xs uppercase tracking-wider text-gray-500">
                      Page {String(p).padStart(2, "0")}
                    </span>
                    <span className="text-base font-semibold text-gray-900">
                      {start} - {end} 語目
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
