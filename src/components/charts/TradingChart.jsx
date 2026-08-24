'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import SigmoraLoader from '../common/SigmoraLoader';
import './TradingChart.css';

const TradingChart = ({ symbol = 'EURUSD', height = 500, autosize = true, lazy = false }) => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const { theme, isDark } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(!lazy);

  useEffect(() => {
    if (!lazy || !wrapperRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '120px', threshold: 0.05 }
    );

    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [lazy]);

  useEffect(() => {
    if (!shouldLoad || !containerRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (window.TradingView && containerRef.current) {
        new window.TradingView.widget({
          autosize,
          symbol,
          interval: 'D',
          timezone: 'Etc/UTC',
          theme: isDark ? 'dark' : 'light',
          style: '1',
          locale: 'en',
          toolbar_bg: isDark ? 'var(--surface)' : '#FFFFFF',
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: containerRef.current.id,
          height,
          width: '100%',
          hide_side_toolbar: false,
          studies: [],
          show_popup_button: true,
          popup_width: '1000',
          popup_height: '650',
          backgroundColor: isDark ? 'var(--surface)' : '#FFFFFF',
        });
        setIsLoaded(true);
      }
    };

    document.body.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [symbol, isDark, height, autosize, shouldLoad]);

  return (
    <motion.div
      ref={wrapperRef}
      className="trading-chart-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isLoaded || !shouldLoad ? 1 : 0.6, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: theme.colors.card,
        border: `1px solid ${theme.colors.border}`,
      }}
    >
      <div
        id={`tradingview_${symbol}`}
        ref={containerRef}
        className="trading-chart"
        style={{ height: `${height}px`, width: '100%' }}
      />
      {(!isLoaded || !shouldLoad) && (
        <SigmoraLoader
          fullScreen={false}
          inline
          message={shouldLoad ? 'Loading chart' : 'Chart loads when visible'}
        />
      )}
    </motion.div>
  );
};

export default TradingChart;
