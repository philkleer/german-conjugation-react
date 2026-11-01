/**
 * AnswerInput.jsx
 *
 * Renders the text input and submit button, plus the inline feedback card
 * that replaces the Swift Alert dialog. The feedback card offers:
 *  - Correct:        counts as correct (shows exact spelling if ae/oe/ue/ss was typed)
 *  - Wrong:          counts as wrong
 *  - Wrong + typo:   counts as correct
 */

import { useEffect, useRef } from 'react';
import { useLang } from '../LanguageContext.jsx';

export default function AnswerInput({ hint, setHint, feedback, submitAnswer, confirmResult }) {
  const { t } = useLang();
  const inputRef = useRef(null);

  // Auto-focus the input when a new round starts (feedback is null).
  useEffect(() => {
    if (!feedback && inputRef.current) inputRef.current.focus();
  }, [feedback]);

  const handleKeyDown = (e) => {
    if (e.key !== 'Enter') return;
    if (!feedback && hint.trim()) { submitAnswer(); return; }
    if (feedback) confirmResult(feedback.correct);
  };

  return (
    <div className="answer-section">
      {/* ── Input row ── */}
      <div className="answer-input-row">
        <input
          ref={inputRef}
          className="answer-input"
          type="text"
          value={hint}
          onChange={(e) => setHint(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t.placeholder}
          disabled={!!feedback}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
        />
        <button
          className="btn btn--primary"
          onClick={submitAnswer}
          disabled={!hint.trim() || !!feedback}
        >
          {t.test}
        </button>
      </div>

      {/* ── Feedback card ── */}
      {feedback && (
        <div className={`feedback-card feedback-card--${feedback.correct ? 'correct' : 'wrong'}`}>
          {feedback.correct ? (
            <>
              <p className="feedback-card__message">{t.correctMsg}</p>
              {!feedback.exact && (
                <p className="feedback-card__correct">
                  {t.exactSpelling}&nbsp;<strong>{feedback.target}</strong>
                </p>
              )}
              <div className="feedback-card__actions">
                <button className="btn btn--success" onClick={() => confirmResult(true)}>
                  {t.correctBtn}
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="feedback-card__message">{t.wrongMsg}</p>
              <p className="feedback-card__correct">
                {t.correctForm}&nbsp;<strong>{feedback.target}</strong>
              </p>
              <div className="feedback-card__actions">
                <button className="btn btn--danger" onClick={() => confirmResult(false)}>
                  {t.wrongBtn}
                </button>
                <button className="btn btn--outline" onClick={() => confirmResult(true)}>
                  {t.typoBtn}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
