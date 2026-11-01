/**
 * LanguageSwitcher.jsx
 *
 * Small EN | PT toggle for the interface language.
 */

import { useLang } from '../LanguageContext.jsx';
import { LANGUAGES } from '../strings.js';

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <div className="lang-switcher" role="group" aria-label="Language / Idioma">
      {LANGUAGES.map(({ code, label, name }) => (
        <button
          key={code}
          type="button"
          className={`lang-switcher__btn ${lang === code ? 'lang-switcher__btn--active' : ''}`}
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          title={name}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
