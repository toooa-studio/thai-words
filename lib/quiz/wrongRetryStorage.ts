const STORAGE_KEY = "thai-words-quiz-wrong-retry-ids";

export function saveWrongWordIdsForRetry(ids: number[]): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function loadWrongWordIdsForRetry(): number[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return null;
    const ids = parsed.filter(
      (x): x is number => typeof x === "number" && Number.isInteger(x)
    );
    return ids.length > 0 ? ids : null;
  } catch {
    return null;
  }
}
