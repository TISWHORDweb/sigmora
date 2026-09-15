'use client';

import { Link } from '../../lib/router';
import './BrandWordmark.css';

/** Brand mark: logo image only. */
const BrandWordmark = ({
  to = '/',
  className = '',
  imgClassName = '',
  as: As = null,
  onClick,
}) => {
  const classes = `brand-wordmark ${className}`.trim();
  const content = (
    <img
      src="/new-logo.png"
      alt="Sigmora"
      className={`brand-wordmark__img ${imgClassName}`.trim()}
    />
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
