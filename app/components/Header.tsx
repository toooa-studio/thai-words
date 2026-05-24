"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ExternalLink } from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  external?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "ホーム" },
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

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-[10vh] min-h-[56px] max-w-screen-lg items-center justify-between gap-3 px-4">
        <Link
          href="/"
          aria-label="OTOのオンラインタイ語講座 トップページへ"
          className="inline-flex items-center gap-2 whitespace-nowrap text-base font-semibold tracking-wide text-gray-900 sm:text-lg"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center bg-gray-900 text-sm font-bold text-white">
            OTO
          </span>
          <span className="hidden sm:inline">のオンラインタイ語講座</span>
          <span className="sm:hidden">タイ語講座</span>
        </Link>

        <nav
          aria-label="メインナビゲーション"
          className="hidden lg:flex items-center gap-1"
        >
          {NAV_ITEMS.map((item) => {
            const active = !item.external && isActive(item.href);
            const baseClass = `inline-flex items-center justify-center gap-1 min-h-[44px] whitespace-nowrap px-3 text-sm font-medium tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 ${
              active
                ? "bg-gray-900 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`;
            if (item.external) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={baseClass}
                >
                  <span>{item.label}</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="sr-only">(外部サイト)</span>
                </a>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={baseClass}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          className="inline-flex lg:hidden items-center justify-center min-w-[44px] min-h-[44px] bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-colors"
        >
          {open ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="lg:hidden border-t border-gray-200 bg-white"
        >
          <nav
            aria-label="モバイルナビゲーション"
            className="mx-auto max-w-screen-lg px-4 py-3"
          >
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item) => {
                const active = !item.external && isActive(item.href);
                const baseClass = `flex w-full items-center justify-between gap-2 whitespace-nowrap border border-gray-200 px-4 py-3 text-base font-medium transition-colors min-h-[44px] mt-2 first:mt-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 ${
                  active
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-900 hover:bg-gray-100"
                }`;
                if (item.external) {
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={baseClass}
                      >
                        <span>{item.label}</span>
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        <span className="sr-only">(外部サイト)</span>
                      </a>
                    </li>
                  );
                }
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={baseClass}
                    >
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
