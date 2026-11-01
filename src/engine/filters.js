/**
 * filters.js
 *
 * Pure functions that handle random-but-non-repetitive selection of tenses,
 * verbs, persons, and numerus. Translates setTense(), setVerb(), setPerson(),
 * setNumerus() and their helpers from the Swift source (now German).
 */

import verbsData from '../data/verbs.json';

// ─── Tense metadata ───────────────────────────────────────────────────────────

/** Ordered list of all supported tenses. */
export const ALL_TENSES = ['Präsens', 'Präteritum', 'Perfekt', 'Futur I'];

/** Maps each tense to the settings key that enables it. */
export const TENSE_SETTING_KEY = {
  'Präsens': 'isPraesens',
  'Präteritum': 'isPraeteritum',
  'Perfekt': 'isPerfekt',
  'Futur I': 'isFutur1',
};

// ─── helpers ──────────────────────────────────────────────────────────────────

const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

/**
 * Picks a random element from `pool` that is not already in `history`,
 * then updates the history with a sliding window of size `maxHistory`.
 *
 * Mirrors the repeat-prevention logic in Swift's setTense() / setVerb().
 *
 * @param {string[]} pool       - available options
 * @param {string[]} history    - recently used options (mutated copy returned)
 * @param {number}   maxHistory - sliding window size
 * @returns {{ choice: string, newHistory: string[] }}
 */
function pickWithHistory(pool, history, maxHistory) {
  let choice;

  if (history.length === 0) {
    choice = randomFrom(pool);
  } else {
    do {
      choice = randomFrom(pool);
    } while (history.includes(choice));
  }

  let newHistory = [...history, choice];
  if (newHistory.length > maxHistory) newHistory = newHistory.slice(1);

  return { choice, newHistory };
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Returns the subset of tenses that are currently enabled in settings.
 * Equivalent to the todos_tempos construction in Swift's setTense().
 */
export function buildTenseList(settings) {
  return ALL_TENSES.filter((t) => settings[TENSE_SETTING_KEY[t]]);
}

/**
 * Picks the next tense to practise, avoiding recent repeats when the pool is
 * large enough (>= 3). Returns the chosen tense and the updated history array.
 *
 * @param {string[]} todos_tempos  - enabled tenses
 * @param {string[]} lastTenses  - recent tense history
 * @returns {{ tense: string, newLastTenses: string[] }}
 */
export function pickTense(todos_tempos, lastTenses) {
  if (todos_tempos.length === 0) {
    return { tense: 'Präsens', newLastTenses: [] };
  }

  const maxHistory = todos_tempos.length - 1;
  const { choice, newHistory } = pickWithHistory(todos_tempos, lastTenses, maxHistory);
  return { tense: choice, newLastTenses: newHistory };
}

/**
 * Builds the pool of available verbs from the enabled verb groups
 * (regular, irregular, separable, reflexive). Falls back to regular verbs.
 */
export function buildVerbArray(settings) {
  const pool = [];
  if (settings.isRegular) pool.push(...verbsData.regular);
  if (settings.isIrregular) pool.push(...verbsData.irregular);
  if (settings.isSeparable) pool.push(...verbsData.separable);
  if (settings.isReflexive) pool.push(...verbsData.reflexive);
  return pool.length > 0 ? pool : verbsData.regular;
}

/**
 * Picks the next verb, avoiding recent repeats.
 * Returns the chosen verb object and the updated history.
 *
 * @param {object[]} todos_verbos - pool of verb objects ({ inf, ... })
 * @param {string[]}   lastVerbs  - history of recently used infinitives
 * @returns {{ verb: object, newLastVerbs: string[] }}
 */
export function pickVerb(todos_verbos, lastVerbs) {
  const maxHistory = todos_verbos.length - Math.floor(todos_verbos.length * 4 / 5);

  // Build a parallel pool of infinitives for the history check.
  const infinitives = todos_verbos.map((v) => v.inf);
  const { choice: chosenInfinitive, newHistory } = pickWithHistory(
    infinitives,
    lastVerbs,
    maxHistory
  );

  const verb = todos_verbos.find((v) => v.inf === chosenInfinitive);
  return { verb, newLastVerbs: newHistory };
}

/** Randomly selects the grammatical person (1, 2, or 3) — du / ihr always included. */
export function pickPerson() {
  const options = [1, 2, 3];
  return randomFrom(options);
}

/** Randomly selects singular or plural — mirrors setNumerus(). */
export function pickNumerus() {
  return Math.random() < 0.5 ? 'singular' : 'plural';
}

/** Returns the German pronoun for a given (person, numerus) pair. */
export function getPersonText(person, numerus) {
  if (numerus === 'plural') {
    if (person === 1) return 'wir';
    if (person === 2) return 'ihr';
    return 'sie/Sie';
  }
  if (person === 1) return 'ich';
  if (person === 2) return 'du';
  return 'er/sie/es';
}
