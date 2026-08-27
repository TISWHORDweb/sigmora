'use client';

import './SigmoraLoader.css';

/**
 * Simple blur overlay loader.
 * @param {boolean} fullScreen - fixed viewport overlay (auth, route guards)
 * @param {boolean} inline - fills parent; use inside panels / chart areas
 * @param {string} [message] - optional loading text
 */
const SigmoraLoader = ({ fullScreen = true, inline = false, message = 'Loading…' }) => {
  return (
    <div
      className={`sigmora-loader ${fullScreen ? 'sigmora-loader--fullscreen' : ''} ${inline ? 'sigmora-loader--inline' : ''}`}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <div className="sigmora-loader__backdrop" />
      <p className="sigmora-loader__text">{message}</p>
    </div>
  );
};

export default SigmoraLoader;
