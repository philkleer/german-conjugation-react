/**
 * app.jsx
 *
 * Root component (German conjugation trainer). Manages:
 *  - which view is shown ('home' | 'settings' | 'training')
 *  - persistent settings (stored in localStorage, mirrors Swift's UserDefaults)
 *  - the useExercise hook that drives the training session
 */

import { useState, useEffect } from 'react';
import SettingsPanel from './components/SettingsPanel.jsx';
import VerbDisplay from './components/VerbDisplay.jsx';
import AnswerInput from './components/AnswerInput.jsx';
import useExercise from './hooks/useExercise.js';
import TopLinks from './components/TopLinks.jsx';
import { useLang } from './LanguageContext.jsx';
import LanguageSwitcher from './components/LanguageSwitcher.jsx';
import { FaHashtag } from 'react-icons/fa';



// ─── Default settings (mirrors UserSettings.init() in environmentVars.swift) ──

const DEFAULT_SETTINGS = {
  // verb groups
  isRegular: true,
  isIrregular: true,
  isSeparable: false,
  isReflexive: false,
  // tenses
  isPraesens: true,
  isPraeteritum: false,
  isPerfekt: false,
  isFutur1: false,
};

const STORAGE_KEY = 'konjugator-settings';

function loadSettings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const { t } = useLang();
  const [view, setView] = useState('home');        // 'home' | 'settings' | 'training'
  const [settings, setSettings] = useState(loadSettings);

  // Persist settings whenever they change.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const exercise = useExercise(settings);

  function goToTraining() {
    exercise.resetScore();
    exercise.startNewRound();
    setView('training');
  }

  // ── Home view ──────────────────────────────────────────────────────────────
  if (view === 'home') {
    return (
      <div className="screen screen--home">
        <TopLinks />
        <header className="home-header">
          <h1 className="home-header__title">{t.appTitle}</h1>
          <p className="home-header__subtitle">{t.appSubtitle}</p>
        </header>

        <main className="home-actions">
          <button
            className="home-card home-card--settings"
            onClick={() => setView('settings')}
          >
            <span className="home-card__icon">⚙️</span>
            <span className="home-card__label">{t.homeSettings}</span>
          </button>

          <button
            className="home-card home-card--train"
            onClick={goToTraining}
          >
            <span className="home-card__icon">🔄</span>
            <span className="home-card__label">{t.homeTrain}</span>
          </button>
        </main>

        <LanguageSwitcher />
      </div>
    );
  }

  // ── Settings view ──────────────────────────────────────────────────────────
  if (view === 'settings') {
    return (
      <div className="screen screen--settings">
        <SettingsPanel
          settings={settings}
          onChange={setSettings}
          onBack={() => setView('home')}
        />
      </div>
    );
  }

  // ── Training view ──────────────────────────────────────────────────────────
  return (
    <div className="screen screen--training">
      <header className="training-header">
        <div className="training-header__left">
          <button
            className="btn btn--icon training-header__back"
            onClick={() => setView('home')}
            aria-label={t.back}
          >
            ←
          </button>
          <button
            className="btn btn--icon training-header__options"
            onClick={() => setView('settings')}
            aria-label={t.options}
          >
            ⚙️
          </button>
        </div>
        <div className="training-header__score">
          <span className="score-badge__correct">✓ {exercise.score.correct}</span>
          <span className="score-badge__divider">/</span>
          <span className="score-badge__wrong">✗ {exercise.score.wrong}</span>
          <span className="score-badge__divider">/</span>
          <span className="score-badge__total">
            <FaHashtag /> {exercise.score.correct + exercise.score.wrong}
          </span>
        </div>
      </header>

      <main className="training-main">
        <VerbDisplay round={exercise.round} />
        <AnswerInput
          hint={exercise.hint}
          setHint={exercise.setHint}
          feedback={exercise.feedback}
          submitAnswer={exercise.submitAnswer}
          confirmResult={exercise.confirmResult}
        />
      </main>
      <TopLinks bottom />
    </div>
  );
}
