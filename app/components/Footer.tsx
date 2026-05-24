import Link from "next/link";
import { ExternalLink } from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  external?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/vocabulary", label: "基礎単語帳" },
  { href: "/fill", label: "穴埋め問題" },
  { href: "/listening", label: "リスニング" },
  { href: "/quiz", label: "単語クイズ" },
  {
    href: "https://toooa-studio.vercel.app/blog/blog.html",
    label: "ブログ",
    external: true,
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[#1F2937] bg-[#1F2937] text-gray-100">
      <div className="mx-auto max-w-screen-lg px-4 py-8 sm:py-10">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <Link
              href="/"
              aria-label="OTOのオンラインタイ語講座 トップページへ"
              className="inline-flex items-center gap-2 whitespace-nowrap text-base font-semibold tracking-wide text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center bg-white text-sm font-bold text-[#1F2937]">
                OTO
              </span>
              <span>のオンラインタイ語講座</span>
            </Link>
            <p className="mt-3 text-sm text-gray-300">
              日本語話者のための、シンプルで続けやすいタイ語学習サイト。
            </p>
          </div>

          <nav aria-label="フッターナビゲーション">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              コンテンツ
            </h2>
            <ul className="mt-3 space-y-2">
              {NAV_ITEMS.map((item) => {
                const linkClass =
                  "inline-flex min-h-[44px] items-center gap-1 text-sm text-gray-200 hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
                if (item.external) {
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                      >
                        <span>{item.label}</span>
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        <span className="sr-only">(外部サイト)</span>
                      </a>
                    </li>
                  );
                }
                return (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 text-xs text-gray-400">
          © {year} OTOのオンラインタイ語講座
        </div>
      </div>
    </footer>
  );
}
