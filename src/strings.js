/**
 * strings.js
 *
 * All user-facing UI text in one place, per interface language ('en' | 'pt').
 * The language is chosen in the app (see LanguageContext.jsx / LanguageSwitcher.jsx).
 * The German tense names themselves are NOT translated (they live in
 * engine/filters.js) because they are what the learner studies.
 */

export const LANG_STORAGE_KEY = 'konjugator-lang';

/** Languages offered in the switcher. */
export const LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'pt', label: 'PT', name: 'Português' },
];

/** Saved choice, else the browser language (Portuguese if it starts with "pt"), else English. */
export function detectLang() {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved && STRINGS[saved]) return saved;
  } catch { /* ignore */ }
  const nav = (typeof navigator !== 'undefined' && navigator.language) || 'en';
  return nav.toLowerCase().startsWith('pt') ? 'pt' : 'en';
}

export const STRINGS = {
  en: {
    appTitle: 'Konjugator',
    appSubtitle: 'German',
    homeSettings: 'Choose conjugations',
    homeTrain: 'Start training!',
    back: 'Back',
    options: 'Options',
    settingsTitle: 'Options',
    sectionLanguage: 'Language',
    sectionVerbs: 'Verbs',
    toggleRegular: 'Regular verbs',
    toggleIrregular: 'Irregular verbs',
    toggleSeparable: 'Separable verbs (aufstehen)',
    toggleReflexive: 'Reflexive verbs (sich freuen)',
    hintSeparable: 'Separable verb: the prefix goes to the end, e.g. "ich stehe auf".',
    hintReflexive: 'Reflexive verb: include the reflexive pronoun, e.g. "ich freue mich".',
    sectionTenses: 'Tenses',
    loading: 'Loading...',
    prompt: 'Conjugate',
    singular: 'singular',
    plural: 'plural',
    personLabel: (p, n) => `in the ${p}${{ 1: 'st', 2: 'nd', 3: 'rd' }[p]} person ${n}`,
    tensePrefix: 'in the',
    placeholder: 'With pronoun, e.g. "ich gehe" ...',
    test: 'Check',
    correctMsg: '✅ Well done! Your answer was correct. 🚀',
    correctBtn: 'Great! 👍',
    wrongMsg: '🙅 Not this time! ❌',
    correctForm: 'The correct form is:',
    wrongBtn: 'Too bad ☹️',
    typoBtn: 'Just a typo! 🤦',
    exactSpelling: 'Exact spelling:',
  },
  pt: {
    appTitle: 'Konjugator',
    appSubtitle: 'Alemão',
    homeSettings: 'Escolha as conjugações',
    homeTrain: 'Comece o treino!',
    back: 'Voltar',
    options: 'Opções',
    settingsTitle: 'Opções',
    sectionLanguage: 'Idioma',
    sectionVerbs: 'Verbos',
    toggleRegular: 'Verbos regulares',
    toggleIrregular: 'Verbos irregulares',
    toggleSeparable: 'Verbos separáveis (aufstehen)',
    toggleReflexive: 'Verbos reflexivos (sich freuen)',
    hintSeparable: 'Verbo separável: o prefixo vai para o fim, p. ex. "ich stehe auf".',
    hintReflexive: 'Verbo reflexivo: inclua o pronome reflexivo, p. ex. "ich freue mich".',
    sectionTenses: 'Tempos verbais',
    loading: 'A carregar...',
    prompt: 'Forme a conjugação de',
    singular: 'singular',
    plural: 'plural',
    personLabel: (p, n) => `na ${p}ª pessoa ${n}`,
    tensePrefix: 'de',
    placeholder: 'Com pronome, p. ex. "ich gehe" ...',
    test: 'Testar',
    correctMsg: '✅ Arrasou! A sua resposta foi correta. 🚀',
    correctBtn: 'Joia! 👍',
    wrongMsg: '🙅 Esta vez não! ❌',
    correctForm: 'A forma correta é:',
    wrongBtn: 'Que pena! ☹️',
    typoBtn: 'Erro de digitação! 🤦',
    exactSpelling: 'Ortografia exata:',
  },
};
