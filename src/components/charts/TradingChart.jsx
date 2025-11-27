import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import './TradingChart.css';

// TradingView Widget Component
const TradingChart = ({ symbol = 'EURUSD', height = 500, autosize = true }) => {
  const containerRef = useRef(null);
  const { theme, isDark } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create TradingView widget script
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (window.TradingView && containerRef.current) {
        new window.TradingView.widget({
          autosize: autosize,
          symbol: symbol,
          interval: 'D',
          timezone: 'Etc/UTC',
          theme: isDark ? 'dark' : 'light',
          style: '1',
          locale: 'en',
          toolbar_bg: isDark ? '#141B2D' : '#FFFFFF',
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: containerRef.current.id,
          height: height,
          width: '100%',
          hide_side_toolbar: false,
          studies: [
            'RSI@tv-basicstudies',
            'MACD@tv-basicstudies',
            'Volume@tv-basicstudies',
          ],
          show_popup_button: true,
          popup_width: '1000',
          popup_height: '650',
          backgroundColor: isDark ? '#141B2D' : '#FFFFFF',
        });
        setIsLoaded(true);
      }
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [symbol, isDark, height, autosize]);

  return (
    <motion.div
      className="trading-chart-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isLoaded ? 1 : 0, y: 0 }}
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
      {!isLoaded && (
        <div className="chart-loading">
          <div className="loading-spinner"></div>
          <p style={{ color: theme.colors.textSecondary }}>Loading chart...</p>
        </div>
      )}
    </motion.div>
  );
};

export default TradingChart;
