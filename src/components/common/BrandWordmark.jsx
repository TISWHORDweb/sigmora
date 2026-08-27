'use client';

import { Link } from '../../lib/router';
import './BrandWordmark.css';

/**
 * Brand mark: S logo + "igmora" (reads as Sigmora with the S glyph).
 * Text is drawn in SVG so descenders (g) never get clipped by CSS line-height.
 */
const BrandWordmark = ({
  to = '/',
  className = '',
  imgClassName = '',
  textClassName = '',
  as: As = null,
  onClick,
}) => {
  const classes = `brand-wordmark ${className}`.trim();
  const content = (
    <>
      <img src="/logo.png" alt="" className={`brand-wordmark__img ${imgClassName}`.trim()} />
      <svg
        className={`brand-wordmark__svg ${textClassName}`.trim()}
        viewBox="0 0 118 40"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <text
          x="2"
          y="28"
          fill="currentColor"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
          fontSize="26"
          fontWeight="700"
          letterSpacing="0.2"
        >
          igmora
        </text>
      </svg>
    </>
  );

  if (As) {
    return (
      <As className={classes} onClick={onClick} type={As === 'button' ? 'button' : undefined}>
        {content}
      </As>
    );
  }

  if (onClick && !to) {
    return (
      <button type="button" className={classes} onClick={onClick}>
        {content}
      </button>
    );
  }

  return (
    <Link to={to} className={classes} aria-label="Sigmora home" onClick={onClick}>
      {content}
    </Link>
  );
};

export default BrandWordmark;
