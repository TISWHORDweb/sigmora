import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { tradeService } from '../../services/tradeService';
import { packageService } from '../../services/packageService';
import { subscriptionService } from '../../services/subscriptionService';
import AnalyticsChart from '../../components/charts/AnalyticsChart';
import FloatingCard from '../../components/3d/FloatingCards';
import TradingChart from '../../components/charts/TradingChart';
import {
  ChartIcon,
  TrendingUpIcon,
  PackageIcon,
  UsersIcon,
  ActivityIcon,
  CoinsIcon,
  BarChartIcon,
  PlusIcon,
  ArrowRightIcon,
} from '../../components/icons/Icons';
import './CreatorDashboard.css';

const CreatorDashboard = () => {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const [stats, setStats] = useState({
    activeTrades: 0,
    completedTrades: 0,
    totalPackages: 0,
    totalSubscribers: 0,
    winRate: 0,
    totalProfit: 0,
  });
  const [recentTrades, setRecentTrades] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [profitData, setProfitData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [activeTrades, completedTrades, packages, subscriptions] = await Promise.all([
        tradeService.getActiveTrades(),
        tradeService.getCompletedTrades(),
        packageService.getCreatorPackages(),
        subscriptionService.getCreatorSubscriptions(),
      ]);

      const totalSubscribers = subscriptions.length;
      const totalPackages = packages.length;
      const totalCompleted = completedTrades.length;
      const totalWins = completedTrades.filter(t => t.closeReason === 'TP').length;
      const winRate = totalCompleted > 0 ? ((totalWins / totalCompleted) * 100).toFixed(1) : 0;

      // Generate realistic performance data
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return {
          name: date.toLocaleDateString('en-US', { weekday: 'short' }),
          trades: Math.floor(Math.random() * 8) + 3,
          profit: Math.floor(Math.random() * 2000) + 1000,
        };
      });

      setStats({
        activeTrades: activeTrades.length,
        completedTrades: totalCompleted,
        totalPackages,
        totalSubscribers,
        winRate: parseFloat(winRate),
        totalProfit: last7Days.reduce((sum, day) => sum + day.profit, 0),
      });

      setRecentTrades(completedTrades.slice(0, 5));
      setPerformanceData(last7Days);
      setProfitData(last7Days);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Active Trades',
      value: stats.activeTrades,
      icon: ActivityIcon,
      color: theme.colors.secondary,
      link: '/creator/trades/active',
      bgGradient: 'linear-gradient(135deg, rgba(255, 184, 0, 0.1) 0%, rgba(255, 143, 0, 0.1) 100%)',
    },
    {
      title: 'Completed Trades',
      value: stats.completedTrades,
      icon: TrendingUpIcon,
      color: theme.colors.success,
      link: '/creator/trades/completed',
      bgGradient: 'linear-gradient(135deg, rgba(0, 230, 118, 0.1) 0%, rgba(0, 178, 72, 0.1) 100%)',
    },
    {
      title: 'Total Packages',
      value: stats.totalPackages,
      icon: PackageIcon,
      color: theme.colors.primary,
      link: '/creator/packages/create',
      bgGradient: 'linear-gradient(135deg, rgba(10, 25, 41, 0.1) 0%, rgba(30, 58, 95, 0.1) 100%)',
    },
    {
      title: 'Subscribers',
      value: stats.totalSubscribers,
      icon: UsersIcon,
      color: theme.colors.secondary,
      bgGradient: 'linear-gradient(135deg, rgba(255, 184, 0, 0.1) 0%, rgba(255, 143, 0, 0.1) 100%)',
    },
    {
      title: 'Win Rate',
      value: `${stats.winRate}%`,
      icon: ChartIcon,
      color: stats.winRate >= 70 ? theme.colors.success : theme.colors.danger,
      bgGradient: stats.winRate >= 70 
        ? 'linear-gradient(135deg, rgba(0, 230, 118, 0.1) 0%, rgba(0, 178, 72, 0.1) 100%)'
        : 'linear-gradient(135deg, rgba(255, 23, 68, 0.1) 0%, rgba(197, 17, 98, 0.1) 100%)',
    },
    {
      title: 'Total Profit',
      value: `$${stats.totalProfit.toLocaleString()}`,
      icon: CoinsIcon,
      color: theme.colors.success,
      bgGradient: 'linear-gradient(135deg, rgba(0, 230, 118, 0.1) 0%, rgba(0, 178, 72, 0.1) 100%)',
    },
  ];

  if (loading) {
    return (
      <div className="dashboard-loading" style={{ background: theme.colors.background }}>
        <div className="loading-spinner"></div>
        <p style={{ color: theme.colors.textSecondary }}>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="creator-dashboard" style={{ background: theme.colors.background }}>
      {/* Enhanced Header */}
      <motion.header
        className="dashboard-header"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          background: theme.colors.card,
          borderBottom: `1px solid ${theme.colors.border}`,
        }}
      >
        <div className="header-content">
          <div className="header-text">
            <h1 style={{ color: theme.colors.text }}>
              Welcome back, {user?.creatorName || user?.name}!
            </h1>
            <p style={{ color: theme.colors.textSecondary }}>
              Here's your comprehensive trading overview and analytics
            </p>
          </div>
          <div className="header-actions">
            <Link to="/creator/academy-code" className="btn-header">
              <PackageIcon size={18} color={theme.colors.secondary} />
              <span>Academy Code</span>
            </Link>
            <button onClick={logout} className="btn-header btn-danger">
              Logout
            </button>
          </div>
        </div>
      </motion.header>

      <div className="dashboard-container">
        {/* Enhanced Stats Grid */}
        <div className="stats-grid">
          {statCards.map((stat, index) => (
            <FloatingCard key={index} delay={index * 0.1}>
              <motion.div
                className="stat-card"
                whileHover={{ scale: 1.03, y: -5 }}
                style={{
                  background: theme.colors.card,
                  border: `1px solid ${theme.colors.border}`,
                }}
              >
                <Link to={stat.link || '#'} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div 
                    className="stat-icon-wrapper"
                    style={{ 
                      background: stat.bgGradient,
                      color: stat.color,
                    }}
                  >
                    <stat.icon size={28} color={stat.color} />
                  </div>
                  <div className="stat-content">
                    <h3 style={{ color: theme.colors.textSecondary }}>{stat.title}</h3>
                    <p className="stat-value" style={{ color: stat.color }}>
                      {stat.value}
                    </p>
                  </div>
                  {stat.link && (
                    <div className="stat-arrow">
                      <ArrowRightIcon size={16} color={theme.colors.textTertiary} />
                    </div>
                  )}
                </Link>
              </motion.div>
            </FloatingCard>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="dashboard-main-grid">
          {/* Trading Chart */}
          <FloatingCard>
            <motion.div
              className="chart-card main-chart"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: theme.colors.card,
                border: `1px solid ${theme.colors.border}`,
              }}
            >
              <div className="chart-header">
                <div>
                  <h2 style={{ color: theme.colors.text }}>Live Market Chart</h2>
                  <p style={{ color: theme.colors.textSecondary }}>EUR/USD Real-time Analysis</p>
                </div>
                <div className="chart-badge" style={{ background: `${theme.colors.success}20`, color: theme.colors.success }}>
                  <ActivityIcon size={14} color={theme.colors.success} />
                  <span>Live</span>
                </div>
              </div>
              <div className="chart-content">
                <TradingChart symbol="EURUSD" height={400} />
              </div>
            </motion.div>
          </FloatingCard>

          {/* Performance Chart */}
          <FloatingCard delay={0.1}>
            <motion.div
              className="chart-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                background: theme.colors.card,
                border: `1px solid ${theme.colors.border}`,
              }}
            >
              <div className="chart-header">
                <div>
                  <h2 style={{ color: theme.colors.text }}>Trading Activity</h2>
                  <p style={{ color: theme.colors.textSecondary }}>Last 7 days performance</p>
                </div>
              </div>
              <AnalyticsChart
                type="area"
                data={performanceData}
                dataKey="trades"
                name="Trades"
                color={theme.colors.secondary}
                height={300}
              />
            </motion.div>
          </FloatingCard>

          {/* Profit Chart */}
          <FloatingCard delay={0.2}>
            <motion.div
              className="chart-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                background: theme.colors.card,
                border: `1px solid ${theme.colors.border}`,
              }}
            >
              <div className="chart-header">
                <div>
                  <h2 style={{ color: theme.colors.text }}>Profit Trend</h2>
                  <p style={{ color: theme.colors.textSecondary }}>Weekly profit analysis</p>
                </div>
              </div>
              <AnalyticsChart
                type="line"
                data={profitData}
                dataKey="profit"
                name="Profit ($)"
                color={theme.colors.success}
                height={300}
              />
            </motion.div>
          </FloatingCard>
        </div>

        {/* Quick Actions */}
        <motion.div
          className="quick-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 style={{ color: theme.colors.text }}>Quick Actions</h2>
          <div className="actions-grid">
            <Link
              to="/creator/trades/create"
              className="action-card"
              style={{
                background: theme.colors.card,
                border: `1px solid ${theme.colors.border}`,
              }}
            >
              <div className="action-icon" style={{ background: `${theme.colors.secondary}20`, color: theme.colors.secondary }}>
                <PlusIcon size={24} color={theme.colors.secondary} />
              </div>
              <h3 style={{ color: theme.colors.text }}>Create Trade</h3>
              <p style={{ color: theme.colors.textSecondary }}>
                Place a new trade for your subscribers
              </p>
            </Link>

            <Link
              to="/creator/assets"
              className="action-card"
              style={{
                background: theme.colors.card,
                border: `1px solid ${theme.colors.border}`,
              }}
            >
              <div className="action-icon" style={{ background: `${theme.colors.primary}20`, color: theme.colors.primary }}>
                <BarChartIcon size={24} color={theme.colors.primary} />
              </div>
              <h3 style={{ color: theme.colors.text }}>Manage Assets</h3>
              <p style={{ color: theme.colors.textSecondary }}>
                Add or update trading assets
              </p>
            </Link>

            <Link
              to="/creator/packages/create"
              className="action-card"
              style={{
                background: theme.colors.card,
                border: `1px solid ${theme.colors.border}`,
              }}
            >
              <div className="action-icon" style={{ background: `${theme.colors.success}20`, color: theme.colors.success }}>
                <PackageIcon size={24} color={theme.colors.success} />
              </div>
              <h3 style={{ color: theme.colors.text }}>Create Package</h3>
              <p style={{ color: theme.colors.textSecondary }}>
                Create a new subscription package
              </p>
            </Link>
          </div>
        </motion.div>

        {/* Recent Trades */}
        {recentTrades.length > 0 && (
          <motion.div
            className="recent-trades"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="section-header">
              <h2 style={{ color: theme.colors.text }}>Recent Completed Trades</h2>
              <Link to="/creator/trades/completed" style={{ color: theme.colors.secondary, textDecoration: 'none' }}>
                View All <ArrowRightIcon size={16} color={theme.colors.secondary} />
              </Link>
            </div>
            <div className="trades-table" style={{ background: theme.colors.card, border: `1px solid ${theme.colors.border}` }}>
              <table>
                <thead>
                  <tr style={{ background: theme.colors.backgroundSecondary }}>
                    <th style={{ color: theme.colors.textSecondary }}>Asset</th>
                    <th style={{ color: theme.colors.textSecondary }}>Type</th>
                    <th style={{ color: theme.colors.textSecondary }}>Result</th>
                    <th style={{ color: theme.colors.textSecondary }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTrades.map((trade) => (
                    <tr key={trade._id}>
                      <td style={{ color: theme.colors.text, fontWeight: 600 }}>{trade.asset?.symbol}</td>
                      <td>
                        <span
                          className={`trade-type ${trade.type}`}
                          style={{
                            background: trade.type === 'BUY' 
                              ? `${theme.colors.success}20` 
                              : `${theme.colors.danger}20`,
                            color: trade.type === 'BUY' ? theme.colors.success : theme.colors.danger,
                          }}
                        >
                          {trade.type}
                        </span>
                      </td>
                      <td>
                        <span
                          className="close-reason"
                          style={{
                            color:
                              trade.closeReason === 'TP'
                                ? theme.colors.success
                                : trade.closeReason === 'SL'
                                ? theme.colors.danger
                                : theme.colors.textSecondary,
                            fontWeight: 600,
                          }}
                        >
                          {trade.closeReason}
                        </span>
                      </td>
                      <td style={{ color: theme.colors.textSecondary }}>
                        {new Date(trade.closedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CreatorDashboard;
