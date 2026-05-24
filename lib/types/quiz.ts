import type { ThaiWord } from "./word";

export type QuizMode = "meaning" | "thai" | "fill" | "audio";

export type QuizRange =
  | "all"
  | "p1"
  | "p2"
  | "p3"
  | "p4"
  | "p5"
  | "p6"
  | "p7"
  | "p8"
  | "p9"
  | "p10";

export type QuizCount = 10 | 20 | 50 | 100;

export type QuizOption = {
  text: string;
  detail?: string;
};

export type QuizQuestion = {
  id: string;
  word: ThaiWord;
  mode: QuizMode;
  prompt: {
    text: string;
    thai?: string;
    romanization?: string;
    speakText?: string;
    description?: string;
  };
  options: QuizOption[];
  correctIndex: number;
};

export type QuizSettings = {
  mode: QuizMode;
  range: QuizRange;
  count: QuizCount;
  /** 指定時はこの語IDのみから出題する（ミス復習など） */
  restrictWordIds?: number[];
};
