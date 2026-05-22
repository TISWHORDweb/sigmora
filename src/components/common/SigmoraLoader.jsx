import { useEffect, useState } from 'react';
import './SigmoraLoader.css';

const LETTERS = ['S', 'i', 'g', 'm', 'o', 'r', 'a'];

const STATUS_LINES = [
  'Initializing workspace',
  'Syncing your session',
  'Preparing dashboard',
  'Almost ready',
];

/**
 * @param {boolean} fullScreen - fixed viewport overlay (auth, route guards)
 * @param {boolean} inline - fills parent; use inside panels / chart areas
 * @param {string} [message] - optional override under the logo
 */
const SigmoraLoader = ({ fullScreen = true, inline = false, message }) => {
  const [letterIndex, setLetterIndex] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (letterIndex < LETTERS.length) {
      const t = setTimeout(() => setLetterIndex((i) => i + 1), 140);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setDone(true), 400);
    return () => clearTimeout(t);
  }, [letterIndex]);

  useEffect(() => {
    const t = setInterval(() => {
      setStatusIndex((i) => (i + 1) % STATUS_LINES.length);
    }, 2200);
    return () => clearInterval(t);
  }, []);

  const statusText = message || STATUS_LINES[statusIndex];

  return (
    <div
      className={`sigmora-loader ${fullScreen ? 'sigmora-loader--fullscreen' : ''} ${inline ? 'sigmora-loader--inline' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Sigmora"
    >
      <div className="sigmora-loader__backdrop" />
      <div className="sigmora-loader__content">
        <div className={`sigmora-loader__word ${done ? 'sigmora-loader__word--complete' : ''}`}>
          {LETTERS.map((char, i) => (
            <span
              key={`${char}-${i}`}
              className={`sigmora-loader__letter ${i < letterIndex ? 'sigmora-loader__letter--visible' : ''} ${i === letterIndex - 1 ? 'sigmora-loader__letter--current' : ''}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {char}
            </span>
          ))}
        </div>
        <p className="sigmora-loader__status" key={statusText}>
          {statusText}
        </p>
        <div className="sigmora-loader__bar" aria-hidden="true">
          <span
            className="sigmora-loader__bar-fill"
            style={{ width: `${Math.min(100, (letterIndex / LETTERS.length) * 100 + (done ? 8 : 0))}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default SigmoraLoader;
