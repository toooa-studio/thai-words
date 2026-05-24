import type { ThaiWord } from "@/lib/types/word";
import { words001to100 } from "./words/words001-100";
import { words101to200 } from "./words/words101-200";
import { words201to300 } from "./words/words201-300";
import { words301to400 } from "./words/words301-400";
import { words401to500 } from "./words/words401-500";
import { words501to600 } from "./words/words501-600";
import { words601to700 } from "./words/words601-700";
import { words701to800 } from "./words/words701-800";
import { words801to900 } from "./words/words801-900";
import { words901to1000 } from "./words/words901-1000";

export const thaiWords: ThaiWord[] = [
  ...words001to100,
  ...words101to200,
  ...words201to300,
  ...words301to400,
  ...words401to500,
  ...words501to600,
  ...words601to700,
  ...words701to800,
  ...words801to900,
  ...words901to1000,
];

export const WORDS_PER_PAGE = 100;

export function getTotalPages(): number {
  return Math.max(1, Math.ceil(thaiWords.length / WORDS_PER_PAGE));
}

export function getWordsForPage(page: number): ThaiWord[] {
  const start = (page - 1) * WORDS_PER_PAGE;
  return thaiWords.slice(start, start + WORDS_PER_PAGE);
}
