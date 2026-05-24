"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { QuizPlayer } from "@/app/components/QuizPlayer";
import { getModeLabel, getQuizSourceLabel } from "@/lib/quiz/quizUtils";
import { parseQuizPlaySearchParams } from "@/lib/quiz/parseQuizPlayParams";
import { loadWrongWordIdsForRetry } from "@/lib/quiz/wrongRetryStorage";
import type { QuizSettings } from "@/lib/types/quiz";

function QuizPlayContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryKey = searchParams.toString();
  const wrongOnly = searchParams.get("wrongOnly") === "1";

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const baseSettings = useMemo(() => {
    return parseQuizPlaySearchParams({
      mode: searchParams.get("mode") ?? undefined,
      range: searchParams.get("range") ?? undefined,
      count: searchParams.get("count") ?? undefined,
    });
  }, [queryKey, searchParams]);

  const settings: QuizSettings | null = useMemo(() => {
    if (!baseSettings) return null;
    if (!wrongOnly) return baseSettings;
    if (!mounted) return null;
    const ids = loadWrongWordIdsForRetry();
    if (!ids?.length) return null;
    return { ...baseSettings, restrictWordIds: ids };
  }, [baseSettings, wrongOnly, queryKey, mounted]);

  useEffect(() => {
    if (!baseSettings) {
      router.replace("/quiz");
      return;
    }
    if (!wrongOnly || !mounted) return;
    const ids = loadWrongWordIdsForRetry();
    if (!ids?.length) {
      router.replace("/quiz");
    }
  }, [baseSettings, wrongOnly, queryKey, router, mounted]);

  if (!baseSettings) {
    return (
      <div className="mx-auto max-w-screen-md px-4 py-10 text-center text-sm text-gray-600">
        設定へ戻ります…
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="mx-auto max-w-screen-md px-4 py-10 text-center text-sm text-gray-600">
        読み込み中…
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-screen-md px-4 py-3 sm:py-4 flex items-center justify-between gap-3">
          <Link
            href="/quiz"
            className="inline-flex items-center gap-1 min-h-[44px] text-sm text-gray-700 hover:text-gray-900 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>設定に戻る</span>
          </Link>
          <p className="text-xs sm:text-sm text-gray-600 text-right break-words">
            {getModeLabel(settings.mode)}
            <span className="mx-1 text-gray-300">/</span>
            {getQuizSourceLabel(settings)}
            <span className="mx-1 text-gray-300">/</span>
            {settings.count} 問
          </p>
        </div>
      </div>

      <QuizPlayer settings={settings} />
    </div>
  );
}

export default function QuizPlayPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-screen-md px-4 py-10 text-center text-sm text-gray-600">
          読み込み中…
        </div>
      }
    >
      <QuizPlayContent />
    </Suspense>
  );
}
