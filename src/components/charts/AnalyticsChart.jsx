import { useMemo } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import './AnalyticsChart.css';

const AnalyticsChart = ({ 
  type = 'line', 
  data = [], 
  dataKey = 'value',
  name = 'Value',
  color = '#00FFA3',
  height = 300,
  showGrid = true,
  showLegend = true,
}) => {
  const { theme } = useTheme();

  const chartColors = useMemo(() => ({
    primary: theme.colors.secondary,
    success: theme.colors.success,
    danger: theme.colors.danger,
    text: theme.colors.text,
    grid: theme.colors.border,
    background: theme.colors.card,
  }), [theme]);

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 5, right: 30, left: 20, bottom: 5 },
    };

    switch (type) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />}
            <XAxis 
              dataKey="name" 
              stroke={chartColors.text}
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke={chartColors.text}
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: chartColors.background,
                border: `1px solid ${chartColors.grid}`,
                borderRadius: '8px',
              }}
              labelStyle={{ color: chartColors.text }}
            />
            {showLegend && <Legend />}
            <Area
              type="monotone"
              dataKey={dataKey}
              name={name}
              stroke={color}
              fill={color}
              fillOpacity={0.3}
            />
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />}
            <XAxis 
              dataKey="name" 
              stroke={chartColors.text}
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke={chartColors.text}
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: chartColors.background,
                border: `1px solid ${chartColors.grid}`,
                borderRadius: '8px',
              }}
              labelStyle={{ color: chartColors.text }}
            />
            {showLegend && <Legend />}
            <Bar dataKey={dataKey} name={name} fill={color} radius={[8, 8, 0, 0]} />
          </BarChart>
        );

      default: // line
        return (
          <LineChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />}
            <XAxis 
              dataKey="name" 
              stroke={chartColors.text}
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke={chartColors.text}
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: chartColors.background,
                border: `1px solid ${chartColors.grid}`,
                borderRadius: '8px',
              }}
              labelStyle={{ color: chartColors.text }}
            />
            {showLegend && <Legend />}
            <Line
              type="monotone"
              dataKey={dataKey}
              name={name}
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        );
    }
  };

  return (
    <motion.div
      className="analytics-chart-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      style={{ height: `${height}px` }}
    >
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </motion.div>
  );
};

export default AnalyticsChart;
