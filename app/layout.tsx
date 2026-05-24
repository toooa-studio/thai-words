import "../lib/fonts/_active.css";
import "../lib/fonts/_vars.css";
import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export const metadata: Metadata = {
  title: {
    default: "TonSonのオンラインタイ語講座",
    template: "%s | TonSonのオンラインタイ語講座",
  },
  description:
    "日本語話者のためのシンプルなタイ語学習サイト。よく使われる順の基礎単語帳、穴埋め問題、ブログ。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased font-body min-h-dvh flex flex-col bg-gray-50 text-gray-900 overflow-x-hidden">
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
