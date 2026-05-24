import type { WordRelationNotes } from "@/lib/data/wordRelations";

type Props = {
  notes: WordRelationNotes;
  className?: string;
};

export function WordRelationsCallout({ notes, className = "" }: Props) {
  if (!notes.breakdown && !notes.synonyms && !notes.antonyms) return null;

  const sectionClass = (hasTopBorder: boolean) =>
    hasTopBorder ? "mt-3 border-t border-gray-200 pt-3" : "";

  return (
    <div
      className={`mt-3 sm:mt-4 border border-gray-200 bg-gray-50 p-3 sm:p-4 text-left ${className}`.trim()}
    >
      {notes.breakdown ? (
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500">
            語の分解
          </p>
          <p className="mt-1 text-sm sm:text-base text-gray-900 break-words leading-relaxed whitespace-pre-line">
            {notes.breakdown}
          </p>
        </div>
      ) : null}
      {notes.synonyms ? (
        <div className={sectionClass(Boolean(notes.breakdown))}>
          <p className="text-xs uppercase tracking-wider text-gray-500">
            類義語・近い表現
          </p>
          <p className="mt-1 text-sm sm:text-base text-gray-900 break-words leading-relaxed">
            {notes.synonyms}
          </p>
        </div>
      ) : null}
      {notes.antonyms ? (
        <div className={sectionClass(Boolean(notes.breakdown || notes.synonyms))}>
          <p className="text-xs uppercase tracking-wider text-gray-500">
            対義語・反対側の表現
          </p>
          <p className="mt-1 text-sm sm:text-base text-gray-900 break-words leading-relaxed">
            {notes.antonyms}
          </p>
        </div>
      ) : null}
    </div>
  );
}
