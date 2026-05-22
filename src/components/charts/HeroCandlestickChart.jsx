import './HeroCandlestickChart.css';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const Y_LABELS = ['1.0920', '1.0880', '1.0840', '1.0800', '1.0760'];

/* o, h, l, c — normalized 0–100 chart space */
const CANDLES = [
  { o: 52, h: 58, l: 48, c: 55, bull: true },
  { o: 55, h: 57, l: 50, c: 51, bull: false },
  { o: 51, h: 54, l: 46, c: 48, bull: false },
  { o: 48, h: 56, l: 45, c: 54, bull: true },
  { o: 54, h: 62, l: 52, c: 60, bull: true },
  { o: 60, h: 63, l: 56, c: 58, bull: false },
  { o: 58, h: 65, l: 55, c: 63, bull: true },
  { o: 63, h: 66, l: 58, c: 59, bull: false },
  { o: 59, h: 68, l: 57, c: 66, bull: true },
  { o: 66, h: 72, l: 64, c: 70, bull: true },
  { o: 70, h: 71, l: 62, c: 64, bull: false },
  { o: 64, h: 70, l: 61, c: 68, bull: true },
  { o: 68, h: 75, l: 66, c: 73, bull: true },
  { o: 73, h: 74, l: 67, c: 69, bull: false },
  { o: 69, h: 78, l: 68, c: 76, bull: true },
  { o: 76, h: 80, l: 72, c: 74, bull: false },
  { o: 74, h: 82, l: 71, c: 80, bull: true },
  { o: 80, h: 85, l: 77, c: 83, bull: true },
  { o: 83, h: 84, l: 76, c: 78, bull: false },
  { o: 78, h: 86, l: 75, c: 84, bull: true },
];

const TREND_LINE = [55, 51, 48, 54, 60, 58, 63, 59, 66, 70, 64, 68, 73, 69, 76, 74, 80, 83, 78, 84];

const chartW = 320;
const chartH = 180;
const padL = 8;
const padR = 52;
const padT = 12;
const padB = 28;
const plotW = chartW - padL - padR;
const plotH = chartH - padT - padB;

const yScale = (v) => padT + plotH - (v / 100) * plotH;
const xStep = plotW / CANDLES.length;
const bodyW = Math.max(4, xStep * 0.55);

const trendPath = TREND_LINE.map((v, i) => {
  const x = padL + i * xStep + xStep / 2;
  const y = yScale(v);
  return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
}).join(' ');

const areaPath = `${trendPath} L ${padL + (CANDLES.length - 1) * xStep + xStep / 2} ${padT + plotH} L ${padL + xStep / 2} ${padT + plotH} Z`;

const HeroCandlestickChart = () => (
  <div className="hero-candlestick-chart" aria-hidden="true">
    <svg
      viewBox={`0 0 ${chartW} ${chartH}`}
      className="hero-candlestick-svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="trendAreaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
        </linearGradient>
        <filter id="trendGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Grid */}
      {Y_LABELS.map((_, i) => {
        const y = padT + (i / (Y_LABELS.length - 1)) * plotH;
        return (
          <line
            key={`grid-${i}`}
            x1={padL}
            y1={y}
            x2={padL + plotW}
            y2={y}
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
          />
        );
      })}

      {/* Area fill */}
      <path d={areaPath} fill="url(#trendAreaGrad)" />

      {/* Trend line */}
      <path
        d={trendPath}
        fill="none"
        stroke="var(--brand)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#trendGlow)"
        opacity="0.9"
      />

      {/* Candles */}
      {CANDLES.map((c, i) => {
        const cx = padL + i * xStep + xStep / 2;
        const color = c.bull ? 'var(--brand)' : 'var(--danger)';
        const yHigh = yScale(c.h);
        const yLow = yScale(c.l);
        const yOpen = yScale(c.o);
        const yClose = yScale(c.c);
        const bodyTop = Math.min(yOpen, yClose);
        const bodyH = Math.max(2, Math.abs(yClose - yOpen));

        return (
          <g key={i}>
            <line x1={cx} y1={yHigh} x2={cx} y2={yLow} stroke={color} strokeWidth="1" />
            <rect
              x={cx - bodyW / 2}
              y={bodyTop}
              width={bodyW}
              height={bodyH}
              fill={color}
              rx="1"
            />
          </g>
        );
      })}

      {/* X-axis labels */}
      {MONTHS.filter((_, i) => i % 2 === 0).map((m, i) => {
        const idx = i * 2;
        const x = padL + idx * xStep + xStep / 2;
        return (
          <text
            key={m}
            x={x}
            y={chartH - 6}
            textAnchor="middle"
            className="axis-label axis-x"
          >
            {m}
          </text>
        );
      })}

      {/* Y-axis labels */}
      {Y_LABELS.map((label, i) => {
        const y = padT + (i / (Y_LABELS.length - 1)) * plotH + 4;
        return (
          <text
            key={label}
            x={chartW - 6}
            y={y}
            textAnchor="end"
            className="axis-label axis-y"
          >
            {label}
          </text>
        );
      })}
    </svg>
  </div>
);

export default HeroCandlestickChart;
