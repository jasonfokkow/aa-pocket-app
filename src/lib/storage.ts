import AsyncStorage from '@react-native-async-storage/async-storage';
import { CardState, initialCardState } from './spaced-repetition';
import { FLASHCARDS } from '../data/flashcards';

const CARD_STATES_KEY = '@aa_pocket:card_states';

export const loadCardStates = async (): Promise<Record<string, CardState>> => {
  try {
    const raw = await AsyncStorage.getItem(CARD_STATES_KEY);
    if (!raw) return buildInitialStates();
    const saved: Record<string, CardState> = JSON.parse(raw);
    // Merge with any new cards that weren't in storage
    const merged = buildInitialStates();
    for (const id of Object.keys(saved)) {
      merged[id] = saved[id];
    }
    return merged;
  } catch {
    return buildInitialStates();
  }
};

export const saveCardStates = async (states: Record<string, CardState>): Promise<void> => {
  try {
    await AsyncStorage.setItem(CARD_STATES_KEY, JSON.stringify(states));
  } catch {
    // fail silently — state is still available in memory
  }
};

const buildInitialStates = (): Record<string, CardState> => {
  const states: Record<string, CardState> = {};
  for (const card of FLASHCARDS) {
    states[card.id] = initialCardState(card.id);
  }
  return states;
};
