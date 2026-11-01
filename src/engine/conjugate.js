/**
 * conjugate.js  (German)
 *
 * Public API:  trainTarget(person, numerus, tense, verb) -> string
 *               (the full expected answer INCLUDING the pronoun, e.g. "ich stehe auf")
 *
 * `verb` is an object from data/verbs.json:
 *   - irregular: { inf, aux, partizip, praesens[6], praeteritum[6] }
 *   - regular:   { inf, aux?, partizip? }            (forms are generated)
 *   - separable: adds  prefix:"auf"                  (inf includes the prefix;
 *                praesens/praeteritum list the forms WITHOUT the prefix, and
 *                partizip is the full participle, e.g. "aufgestanden")
 *   - reflexive: adds  reflexive:true                (inf starts with "sich ")
 *
 * Form order is always: ich, du, er/sie/es, wir, ihr, sie/Sie.
 */

const HABEN = ['habe', 'hast', 'hat', 'haben', 'habt', 'haben'];
const SEIN = ['bin', 'bist', 'ist', 'sind', 'seid', 'sind'];
const WERDEN = ['werde', 'wirst', 'wird', 'werden', 'werdet', 'werden'];
export const PRONOUNS = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'];
const REFLEXIVE = ['mich', 'dich', 'sich', 'uns', 'euch', 'sich'];

/** (person 1-3, numerus) -> array index 0-5 */
export function toIndex(person, numerus) {
  return (numerus === 'plural' ? 3 : 0) + person - 1;
}

// ─── Regular (weak) verbs ─────────────────────────────────────────────────────

/** Verbs like wandern / sammeln (-ern / -eln) have their own endings. */
const isErnEln = (inf) => /(er|el)n$/.test(inf);

/** Stem ends in t/d, or consonant + m/n (not l, r, h) -> extra "e" (arbeitest). */
function needsE(stem) {
  return /[td]$/.test(stem) || /[^aeiouäöüyhlr][mn]$/.test(stem);
}

function regularPraesens(inf) {
  if (isErnEln(inf)) {
    const stem = inf.slice(0, -1);                              // wander / sammel
    const ich = /eln$/.test(inf) ? `${stem.slice(0, -2)}le` : `${stem}e`; // sammle / wandere
    return [ich, `${stem}st`, `${stem}t`, inf, `${stem}t`, inf];
  }
  const stem = inf.slice(0, -2);
  const e = needsE(stem) ? 'e' : '';
  const du = /[sßxz]$/.test(stem) ? 't' : `${e}st`;             // tanzt, reist
  return [`${stem}e`, `${stem}${du}`, `${stem}${e}t`, `${stem}en`, `${stem}${e}t`, `${stem}en`];
}

function regularPraeteritum(inf) {
  const ends = ['te', 'test', 'te', 'ten', 'tet', 'ten'];
  if (isErnEln(inf)) return ends.map((end) => `${inf.slice(0, -1)}${end}`);
  const stem = inf.slice(0, -2);
  const e = needsE(stem) ? 'e' : '';
  return ends.map((end) => `${stem}${e}${end}`);
}

function regularPartizip(inf) {
  if (isErnEln(inf)) return `ge${inf.slice(0, -1)}t`;           // gewandert
  const stem = inf.slice(0, -2);
  return `ge${stem}${needsE(stem) ? 'e' : ''}t`;
}

// ─── Verb parts ───────────────────────────────────────────────────────────────

const isRegular = (verb) => !verb.praesens;
const auxOf = (verb) => verb.aux || 'haben';

/** Infinitive without "sich " (what follows "werden" in Futur I). */
const plainInf = (verb) => verb.inf.replace(/^sich /, '');

/** Infinitive of the base verb: without "sich " and without separable prefix. */
const baseInf = (verb) => {
  const inf = plainInf(verb);
  return verb.prefix ? inf.slice(verb.prefix.length) : inf;
};

function partizipOf(verb) {
  if (verb.partizip) return verb.partizip;                      // explicit (irregular, be-/ver- verbs)
  return `${verb.prefix || ''}${regularPartizip(baseInf(verb))}`; // einge-kauf-t
}

/**
 * Präsens / Präteritum: base form + reflexive pronoun + separable prefix,
 * e.g. "ziehe mich an".
 */
function simpleForms(verb, tense) {
  const base = isRegular(verb)
    ? (tense === 'Präsens' ? regularPraesens(baseInf(verb)) : regularPraeteritum(baseInf(verb)))
    : (tense === 'Präsens' ? verb.praesens : verb.praeteritum);

  return base.map((form, i) =>
    [form, verb.reflexive ? REFLEXIVE[i] : '', verb.prefix || ''].filter(Boolean).join(' ')
  );
}

// ─── Tense table ──────────────────────────────────────────────────────────────

/** Returns the six forms for a verb in a tense. */
export function allForms(verb, tense) {
  switch (tense) {
    case 'Präsens':
    case 'Präteritum':
      return simpleForms(verb, tense);
    case 'Perfekt': {
      const aux = auxOf(verb) === 'sein' ? SEIN : HABEN;
      return aux.map((a, i) =>
        [a, verb.reflexive ? REFLEXIVE[i] : '', partizipOf(verb)].filter(Boolean).join(' ')
      );
    }
    case 'Futur I':
      return WERDEN.map((w, i) =>
        [w, verb.reflexive ? REFLEXIVE[i] : '', plainInf(verb)].filter(Boolean).join(' ')
      );
    default:
      return [];
  }
}

/** Expected answer for the exercise, with the pronoun in front: "ich stehe auf". */
export function trainTarget(person, numerus, tense, verb) {
  const i = toIndex(person, numerus);
  return `${PRONOUNS[i]} ${allForms(verb, tense)[i]}`;
}

// ─── Answer checking ──────────────────────────────────────────────────────────

/** Lenient comparison form: lowercase, single spaces, ä→ae, ö→oe, ü→ue, ß→ss. */
export function normalize(s) {
  return s
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss');
}

/**
 * Acceptable spellings of an expected answer. The pronoun may be any of the
 * alternatives shown in the prompt: "er/sie/es steht" accepts "er steht",
 * "sie steht", "es steht" (and the slash form); "sie/Sie" accepts "sie".
 */
function acceptedAnswers(target) {
  const [pronoun, ...rest] = target.split(' ');
  const verbPart = rest.join(' ');
  return [...pronoun.split('/'), pronoun].map((p) => `${p} ${verbPart}`);
}

/** True if the typed answer matches, allowing ae/oe/ue/ss as stand-ins. */
export function isCorrectAnswer(input, target) {
  const typed = normalize(input);
  return acceptedAnswers(target).some((a) => normalize(a) === typed);
}

/** True if the answer matches exactly (ignoring case and extra spaces). */
export function isExactAnswer(input, target) {
  const typed = input.trim().replace(/\s+/g, ' ').toLowerCase();
  return acceptedAnswers(target).some((a) => a.toLowerCase() === typed);
}
