import type { QuizCount, QuizMode, QuizRange, QuizSettings } from "@/lib/types/quiz";
import { getTotalPages } from "@/lib/data/thaiWords";

const VALID_MODES: QuizMode[] = ["meaning", "thai", "fill", "audio"];
const VALID_COUNTS: QuizCount[] = [10, 20, 50, 100];

export function parseQuizPlaySearchParams(params: {
  mode?: string;
  range?: string;
  count?: string;
}): QuizSettings | null {
  const mode = params.mode as QuizMode | undefined;
  if (!mode || !VALID_MODES.includes(mode)) return null;

  const range = (params.range || "all") as QuizRange;
  const totalPages = getTotalPages();
  const validRanges: QuizRange[] = [
    "all",
    ...Array.from(
      { length: totalPages },
      (_, i) => `p${i + 1}` as QuizRange
    ),
  ];
  if (!validRanges.includes(range)) return null;

  const countNum = Number(params.count);
  const count = (VALID_COUNTS as number[]).includes(countNum)
    ? (countNum as QuizCount)
    : null;
  if (count === null) return null;

  return { mode, range, count };
}
