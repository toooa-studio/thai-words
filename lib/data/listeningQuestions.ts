import {
  listeningDialogues,
  type DialogueLine,
  type DialogueOption,
} from "@/lib/data/listeningDialogues";

export const LISTENING_QUESTIONS_PER_PAGE = 10;

export type ListeningOptionLabel = "A" | "B" | "C" | "D";

export type ListeningOption = DialogueOption & {
  label: ListeningOptionLabel;
};

export type ListeningQuestion = {
  number: number;
  topic: string;
  dialogue: DialogueLine[];
  question: {
    thai: string;
    romanization: string;
    meaning: string;
  };
  options: ListeningOption[];
  correctLabel: ListeningOptionLabel;
};

const LABELS: ListeningOptionLabel[] = ["A", "B", "C", "D"];

let cachedQuestions: ListeningQuestion[] | null = null;

export function getAllListeningQuestions(): ListeningQuestion[] {
  if (cachedQuestions) return cachedQuestions;

  cachedQuestions = listeningDialogues.map((d, index) => ({
    number: index + 1,
    topic: d.topic,
    dialogue: d.dialogue,
    question: d.question,
    options: d.options.map((o, i) => ({ ...o, label: LABELS[i] })),
    correctLabel: LABELS[d.correctIndex],
  }));

  return cachedQuestions;
}

export function getListeningQuestionsForPage(
  page: number
): ListeningQuestion[] {
  const all = getAllListeningQuestions();
  const start = (page - 1) * LISTENING_QUESTIONS_PER_PAGE;
  return all.slice(start, start + LISTENING_QUESTIONS_PER_PAGE);
}

export function getTotalListeningQuestions(): number {
  return getAllListeningQuestions().length;
}

export function getTotalListeningPages(): number {
  return Math.max(
    1,
    Math.ceil(getTotalListeningQuestions() / LISTENING_QUESTIONS_PER_PAGE)
  );
}
