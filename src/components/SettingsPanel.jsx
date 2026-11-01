/**
 * SettingsPanel.jsx
 *
 * Full translation of optionsView.swift. Renders all toggles for:
 *  - verb groups (regular / irregular / separable / reflexive)
 *  - tenses (Präsens, Präteritum, Perfekt, Futur I)
 *
 * Enforces the same guards as the Swift original:
 *  - atLeastOneTempus() — at least one tense must stay enabled
 *  - atLeastOneVerbGroup() — at least one verb group must stay enabled
 */

import { useLang } from '../LanguageContext.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';

const TENSES = [
  { label: 'Präsens', key: 'isPraesens' },
  { label: 'Präteritum', key: 'isPraeteritum' },
  { label: 'Perfekt', key: 'isPerfekt' },
  { label: 'Futur I', key: 'isFutur1' },
];

const TENSE_KEYS = TENSES.map((i) => i.key);

const VERB_GROUP_KEYS = ['isRegular', 'isIrregular', 'isSeparable', 'isReflexive'];

export default function SettingsPanel({ settings, onChange, onBack }) {
  const { t } = useLang();
  /** Mirrors atLeastOneTempus() — re-enables Präsens if all off. */
  function handleTenseChange(key, value) {
    const next = { ...settings, [key]: value };
    const anyOn = TENSE_KEYS.some((k) => next[k]);
    if (!anyOn) next.isPraesens = true;
    onChange(next);
  }

  /** Mirrors atLeastOneVerbGroup() — prevents turning off the last group. */
  function handleVerbGroupChange(key, value) {
    const next = { ...settings, [key]: value };
    if (!VERB_GROUP_KEYS.some((k) => next[k])) next[key] = true; // revert
    onChange(next);
  }

  return (
    <div className="settings-panel">
      <div className="settings-panel__header">
        <button className="btn btn--icon" onClick={onBack} aria-label={t.back}>
          ←
        </button>
        <h2 className="settings-panel__title">{t.settingsTitle}</h2>
      </div>

      <div className="settings-panel__body">
        {/* ── Language ── */}
        <section className="settings-section">
          <h3 className="settings-section__title">{t.sectionLanguage}</h3>
          <LanguageSwitcher />
        </section>

        {/* ── Verbos ── */}
        <section className="settings-section">
          <h3 className="settings-section__title">{t.sectionVerbs}</h3>
          <ToggleRow
            label={t.toggleRegular}
            checked={settings.isRegular}
            onChange={(v) => handleVerbGroupChange('isRegular', v)}
          />
          <ToggleRow
            label={t.toggleIrregular}
            checked={settings.isIrregular}
            onChange={(v) => handleVerbGroupChange('isIrregular', v)}
          />
          <ToggleRow
            label={t.toggleSeparable}
            checked={settings.isSeparable}
            onChange={(v) => handleVerbGroupChange('isSeparable', v)}
          />
          <ToggleRow
            label={t.toggleReflexive}
            checked={settings.isReflexive}
            onChange={(v) => handleVerbGroupChange('isReflexive', v)}
          />
        </section>

        {/* ── Tenses ── */}
        <section className="settings-section">
          <h3 className="settings-section__title">{t.sectionTenses}</h3>
          {TENSES.map(({ label, key }) => (
            <ToggleRow
              key={key}
              label={label}
              checked={settings[key]}
              onChange={(v) => handleTenseChange(key, v)}
            />
          ))}
        </section>
      </div>
    </div>
  );
}

/** Reusable toggle row — replaces SwiftUI Toggle. */
function ToggleRow({ label, checked, onChange }) {
  const id = `toggle-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <label className="toggle-row" htmlFor={id}>
      <span className="toggle-row__label">{label}</span>
      <span className={`toggle-switch ${checked ? 'toggle-switch--on' : ''}`}>
        <input
          id={id}
          type="checkbox"
          className="toggle-switch__input"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="toggle-switch__track">
          <span className="toggle-switch__thumb" />
        </span>
      </span>
    </label>
  );
}
