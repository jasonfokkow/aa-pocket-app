export type ConfidenceRating = 'got-it' | 'wasnt-sure' | 'didnt-know';

export interface CardState {
  cardId: string;
  interval: number;       // days until next review
  repetitions: number;    // number of successful reviews
  nextReview: string;     // ISO date string (YYYY-MM-DD)
  lastReviewed: string | null;
}

export interface SessionResult {
  cardId: string;
  rating: ConfidenceRating;
  reviewedAt: string;
}

const today = (): string => new Date().toISOString().slice(0, 10);

const addDays = (dateStr: string, days: number): string => {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

export const initialCardState = (cardId: string): CardState => ({
  cardId,
  interval: 1,
  repetitions: 0,
  nextReview: today(),
  lastReviewed: null,
});

export const updateCardState = (state: CardState, rating: ConfidenceRating): CardState => {
  const now = today();

  switch (rating) {
    case 'got-it': {
      // Successful recall — increase interval
      const newInterval = state.repetitions === 0
        ? 1
        : state.repetitions === 1
        ? 3
        : Math.round(state.interval * 2.5);
      return {
        ...state,
        interval: newInterval,
        repetitions: state.repetitions + 1,
        nextReview: addDays(now, newInterval),
        lastReviewed: now,
      };
    }
    case 'wasnt-sure': {
      // Partial recall — short interval
      const newInterval = Math.max(1, Math.round(state.interval / 2));
      return {
        ...state,
        interval: newInterval,
        repetitions: Math.max(0, state.repetitions - 1),
        nextReview: addDays(now, newInterval),
        lastReviewed: now,
      };
    }
    case 'didnt-know': {
      // Failed — reset to tomorrow
      return {
        ...state,
        interval: 1,
        repetitions: 0,
        nextReview: addDays(now, 1),
        lastReviewed: now,
      };
    }
  }
};

export const isDue = (state: CardState): boolean => {
  return state.nextReview <= today();
};

export const getDueCards = (
  cardIds: string[],
  allStates: Record<string, CardState>
): string[] => {
  return cardIds.filter((id) => {
    const state = allStates[id] ?? initialCardState(id);
    return isDue(state);
  });
};

export const sortByUrgency = (
  cardIds: string[],
  allStates: Record<string, CardState>
): string[] => {
  return [...cardIds].sort((a, b) => {
    const stateA = allStates[a] ?? initialCardState(a);
    const stateB = allStates[b] ?? initialCardState(b);
    // Cards with lower interval (harder) first, then by next review date
    if (stateA.nextReview < stateB.nextReview) return -1;
    if (stateA.nextReview > stateB.nextReview) return 1;
    return stateA.interval - stateB.interval;
  });
};

export const getNextReviewDate = (states: Record<string, CardState>): string | null => {
  const futureReviews = Object.values(states)
    .map((s) => s.nextReview)
    .filter((d) => d > today())
    .sort();
  return futureReviews[0] ?? null;
};

export const getNextReviewLabel = (states: Record<string, CardState>): string => {
  const nextDate = getNextReviewDate(states);
  if (!nextDate) return 'No upcoming reviews';

  const now = new Date(today());
  const next = new Date(nextDate);
  const diffDays = Math.round((next.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === 0) return 'Today';
  return `In ${diffDays} days`;
};

// Estimate session time: roughly 25 seconds per card
export const estimateSessionMinutes = (cardCount: number): number => {
  return Math.max(1, Math.round((cardCount * 25) / 60));
};
