import { thaiWords } from "@/lib/data/thaiWords";
import type { ThaiWord } from "@/lib/types/word";
import type {
  QuizMode,
  QuizQuestion,
  QuizRange,
  QuizSettings,
} from "@/lib/types/quiz";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickDistractors(
  pool: ThaiWord[],
  exclude: ThaiWord,
  count: number,
  uniqueKey: (w: ThaiWord) => string
): ThaiWord[] {
  const seen = new Set<string>([uniqueKey(exclude)]);
  const result: ThaiWord[] = [];
  const candidates = shuffle(pool);
  for (const w of candidates) {
    if (w.id === exclude.id) continue;
    const key = uniqueKey(w);
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(w);
    if (result.length >= count) break;
  }
  return result;
}

export function getWordsInRange(range: QuizRange): ThaiWord[] {
  if (range === "all") return thaiWords;
  const m = range.match(/^p(\d+)$/);
  if (m) {
    const page = Number(m[1]);
    const start = (page - 1) * 100;
    return thaiWords.slice(start, start + 100);
  }
  return thaiWords;
}

export function getRangeLabel(range: QuizRange): string {
  if (range === "all") return "全 1000 語";
  const m = range.match(/^p(\d+)$/);
  if (m) {
    const page = Number(m[1]);
    return `${(page - 1) * 100 + 1}-${page * 100} 語目`;
  }
  return "全範囲";
}

export function getQuizSourceLabel(settings: QuizSettings): string {
  if (settings.restrictWordIds?.length) {
    return `間違い復習（${settings.restrictWordIds.length} 語）`;
  }
  return getRangeLabel(settings.range);
}

export function getModeLabel(mode: QuizMode): string {
  switch (mode) {
    case "meaning":
      return "タイ語 → 意味";
    case "thai":
      return "意味 → タイ語";
    case "fill":
      return "例文の穴埋め";
    case "audio":
      return "音声 → 意味";
  }
}

export function getModeDescription(mode: QuizMode): string {
  switch (mode) {
    case "meaning":
      return "タイ語の単語を見て、日本語の意味を選びます。";
    case "thai":
      return "日本語の意味を見て、対応するタイ語を選びます。";
    case "fill":
      return "例文の空欄に当てはまるタイ語の単語を選びます。";
    case "audio":
      return "音声を聞いて、その単語の意味を選びます。";
  }
}

function buildQuestion(
  word: ThaiWord,
  mode: QuizMode,
  distractorPool: ThaiWord[],
  index: number
): QuizQuestion | null {
  if (mode === "meaning") {
    const distractors = pickDistractors(distractorPool, word, 3, (w) => w.meaning);
    if (distractors.length < 3) return null;
    const all = shuffle([word, ...distractors]);
    return {
      id: `${word.id}-${index}`,
      word,
      mode,
      prompt: {
        text: word.thai,
        thai: word.thai,
        romanization: word.romanization,
        description: "次のタイ語の意味は?",
      },
      options: all.map((w) => ({ text: w.meaning })),
      correctIndex: all.findIndex((w) => w.id === word.id),
    };
  }

  if (mode === "thai") {
    const distractors = pickDistractors(distractorPool, word, 3, (w) => w.thai);
    if (distractors.length < 3) return null;
    const all = shuffle([word, ...distractors]);
    return {
      id: `${word.id}-${index}`,
      word,
      mode,
      prompt: {
        text: word.meaning,
        description: "次の意味のタイ語は?",
      },
      options: all.map((w) => ({ text: w.thai, detail: w.romanization })),
      correctIndex: all.findIndex((w) => w.id === word.id),
    };
  }

  if (mode === "audio") {
    const distractors = pickDistractors(distractorPool, word, 3, (w) => w.meaning);
    if (distractors.length < 3) return null;
    const all = shuffle([word, ...distractors]);
    return {
      id: `${word.id}-${index}`,
      word,
      mode,
      prompt: {
        text: "音声を聞いて意味を選んでください",
        speakText: word.thai,
        description: "音声の意味は?",
      },
      options: all.map((w) => ({ text: w.meaning })),
      correctIndex: all.findIndex((w) => w.id === word.id),
    };
  }

  // fill mode
  if (!word.example.includes(word.thai)) return null;
  const distractors = pickDistractors(distractorPool, word, 3, (w) => w.thai);
  if (distractors.length < 3) return null;
  const blanked = word.example.replace(word.thai, "_____");
  const all = shuffle([word, ...distractors]);
  return {
    id: `${word.id}-${index}`,
    word,
    mode,
    prompt: {
      text: blanked,
      thai: blanked,
      description: "空欄に入るタイ語は?",
    },
    options: all.map((w) => ({ text: w.thai, detail: w.romanization })),
    correctIndex: all.findIndex((w) => w.id === word.id),
  };
}

export function generateQuiz(settings: QuizSettings): QuizQuestion[] {
  const { mode, range, count, restrictWordIds } = settings;
  let pool: ThaiWord[];

  if (restrictWordIds?.length) {
    const idSet = new Set(restrictWordIds);
    pool = thaiWords.filter((w) => idSet.has(w.id));
  } else {
    pool = getWordsInRange(range);
  }

  if (mode === "fill") {
    pool = pool.filter((w) => w.example.includes(w.thai));
  }

  const distractorPool =
    pool.length >= 4 ? pool : thaiWords;

  const candidates = shuffle(pool);
  const questions: QuizQuestion[] = [];
  let i = 0;
  for (const word of candidates) {
    if (questions.length >= count) break;
    const q = buildQuestion(word, mode, distractorPool, i);
    if (q) {
      questions.push(q);
      i++;
    }
  }
  return questions;
}
