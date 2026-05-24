import { thaiWords } from "@/lib/data/thaiWords";
import type { ThaiWord } from "@/lib/types/word";

export const FILL_BLANK = "_____";
export const FILL_QUESTIONS_PER_PAGE = 10;

export type FillOptionLabel = "A" | "B" | "C" | "D";

export type FillOption = {
  label: FillOptionLabel;
  thai: string;
  romanization: string;
  meaning: string;
};

export type FillQuestion = {
  number: number;
  word: ThaiWord;
  sentence: string;
  options: FillOption[];
  correctLabel: FillOptionLabel;
};

const LABELS: FillOptionLabel[] = ["A", "B", "C", "D"];

function lcg(seed: number): () => number {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

function deterministicShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  const rand = lcg(seed);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getEligibleWords(): ThaiWord[] {
  return thaiWords.filter(
    (w) => w.thai.length >= 2 && w.example.includes(w.thai)
  );
}

function pickDistractors(
  pool: ThaiWord[],
  exclude: ThaiWord,
  seed: number
): ThaiWord[] {
  const candidates = pool.filter(
    (w) => w.id !== exclude.id && w.thai !== exclude.thai
  );
  const shuffled = deterministicShuffle(candidates, seed);
  const seen = new Set<string>([exclude.thai]);
  const result: ThaiWord[] = [];
  for (const w of shuffled) {
    if (seen.has(w.thai)) continue;
    seen.add(w.thai);
    result.push(w);
    if (result.length >= 3) break;
  }
  return result;
}

let cachedQuestions: FillQuestion[] | null = null;

export function getAllFillQuestions(): FillQuestion[] {
  if (cachedQuestions) return cachedQuestions;

  const eligible = getEligibleWords();

  cachedQuestions = eligible.map((word, index) => {
    const distractors = pickDistractors(eligible, word, word.id * 31 + 7);
    const allFour = [word, ...distractors];
    const shuffled = deterministicShuffle(allFour, word.id * 17 + 3);

    const options: FillOption[] = shuffled.map((w, i) => ({
      label: LABELS[i],
      thai: w.thai,
      romanization: w.romanization,
      meaning: w.meaning,
    }));

    const correctIdx = shuffled.findIndex((w) => w.id === word.id);
    const correctLabel = LABELS[correctIdx];

    return {
      number: index + 1,
      word,
      sentence: word.example.replace(word.thai, FILL_BLANK),
      options,
      correctLabel,
    };
  });

  return cachedQuestions;
}

export function getFillQuestionsForPage(page: number): FillQuestion[] {
  const all = getAllFillQuestions();
  const start = (page - 1) * FILL_QUESTIONS_PER_PAGE;
  return all.slice(start, start + FILL_QUESTIONS_PER_PAGE);
}

export function getTotalFillQuestions(): number {
  return getAllFillQuestions().length;
}

export function getTotalFillPages(): number {
  return Math.max(
    1,
    Math.ceil(getTotalFillQuestions() / FILL_QUESTIONS_PER_PAGE)
  );
}
