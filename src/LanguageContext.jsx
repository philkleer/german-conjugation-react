/**
 * LanguageContext.jsx
 *
 * Holds the interface language (en | pt), persists it in localStorage and
 * gives components access to the matching strings via useLang().
 */

import { createContext, useContext, useEffect, useState } from 'react';
import { STRINGS, LANG_STORAGE_KEY, detectLang } from './strings.js';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(detectLang);

  useEffect(() => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch { /* ignore */ }
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: STRINGS[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

/** @returns {{ lang: string, setLang: (l: string) => void, t: object }} */
export function useLang() {
  return useContext(LanguageContext);
}
