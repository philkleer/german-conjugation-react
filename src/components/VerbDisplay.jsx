/**
 * VerbDisplay.jsx
 *
 * Shows the conjugation prompt: verb, person, numerus, and tense.
 */

import { useLang } from '../LanguageContext.jsx';

export default function VerbDisplay({ round }) {
  const { t } = useLang();
  if (!round) return <div className="verb-display verb-display--loading">{t.loading}</div>;

  const { verb, verbHelper, person, numerus, personText, tense } = round;
  const simpleTense = tense === 'Präsens' || tense === 'Präteritum';

  return (
    <div className="verb-display">
      <p className="verb-display__prompt">{t.prompt}</p>
      <h1 className="verb-display__verb">{verb}</h1>
      <p className="verb-display__person">
        <strong>{t.personLabel(person, t[numerus])}</strong>&nbsp;
        <span className="verb-display__pronoun">({personText})</span>
      </p>
      <p className="verb-display__tense">{t.tensePrefix}&nbsp;<em>{tense}</em></p>
      {verbHelper.prefix && simpleTense && (
        <p className="verb-display__hint">{t.hintSeparable}</p>
      )}
      {verbHelper.reflexive && (
        <p className="verb-display__hint">{t.hintReflexive}</p>
      )}
    </div>
  );
}
