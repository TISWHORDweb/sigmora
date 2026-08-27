'use client';

import { useEffect, useState } from 'react';
import { getAssetVisual } from '../../utils/assetLogo';

function IconDisc({ icon, size, className = '' }) {
  const [src, setSrc] = useState(icon.src || null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setSrc(icon.src || null);
    setFailed(false);
  }, [icon.src, icon.fallbackSrc, icon.type, icon.code]);

  if (icon.type === 'metal' || icon.type === 'initial' || failed || !src) {
    return (
      <span
        className={`cr-asset-disc cr-asset-disc--fallback ${className}`}
        style={{
          width: size,
          height: size,
          background: icon.color || 'rgba(168, 85, 247, 0.25)',
          fontSize: Math.max(9, size * 0.34),
        }}
        aria-hidden
      >
        {icon.text || (icon.code ? String(icon.code).slice(0, 3) : '?')}
      </span>
    );
  }

  return (
    <img
      className={`cr-asset-disc ${className}`}
      src={src}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => {
        if (icon.fallbackSrc && src !== icon.fallbackSrc) {
          setSrc(icon.fallbackSrc);
          return;
        }
        setFailed(true);
      }}
    />
  );
}

const AssetAvatar = ({ symbol, size = 36, className = '' }) => {
  const visual = getAssetVisual(symbol);
  const icons = visual.icons.slice(0, 2);
  const stack = icons.length > 1;
  const disc = stack ? Math.round(size * 0.72) : size;

  return (
    <span
      className={`cr-asset-avatar ${stack ? 'cr-asset-avatar--stack' : ''} ${className}`}
      style={{ width: size, height: size }}
      title={visual.label}
    >
      {icons.map((icon, i) => (
        <IconDisc
          key={`${icon.type}-${icon.code || icon.text}-${icon.src || ''}-${i}`}
          icon={icon}
          size={disc}
          className={stack ? `cr-asset-disc--${i === 0 ? 'back' : 'front'}` : ''}
        />
      ))}
    </span>
  );
};

export default AssetAvatar;
