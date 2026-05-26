import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ConfirmProvider } from './context/ConfirmContext';
import { ThemeProvider } from './context/ThemeContext';
import './styles/global.css';

// Public Pages
import Home from './pages/home/Home';
import About from './pages/about/About';
import Features from './pages/features/Features';
import FAQ from './pages/faq/FAQ';
import Contact from './pages/contact/Contact';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

// Creator Pages
import HappyFXDashboard from './pages/creator/HappyFXDashboard';
import ActiveTrades from './pages/creator/ActiveTrades';
import CompletedTrades from './pages/creator/CompletedTrades';
import AcademyCode from './pages/creator/AcademyCode';
import CreatorSubscribers from './pages/creator/CreatorSubscribers';
import ProfilePage from './pages/account/ProfilePage';
import NotificationsPage from './pages/notifications/NotificationsPage';

// Subscriber Pages
import JoinAcademy from './pages/subscriber/JoinAcademy';
import SubscriberDashboard from './pages/subscriber/SubscriberDashboard';
import SubscriberActiveTrades from './pages/subscriber/SubscriberActiveTrades';
import SubscriberCompletedTrades from './pages/subscriber/SubscriberCompletedTrades';
import SubscriberAcademy from './pages/subscriber/SubscriberAcademy';
import SubscriberCheckout from './pages/subscriber/SubscriberCheckout';
import SubscriberSubscriptions from './pages/subscriber/SubscriberSubscriptions';
import PaymentCallback from './pages/subscriber/PaymentCallback';

// Protected Route Component
import ProtectedRoute from './components/common/ProtectedRoute';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <ConfirmProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/features" element={<Features />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/register/creator" element={<Navigate to="/register?role=creator" replace />} />
              <Route path="/register/subscriber" element={<Navigate to="/register?role=subscriber" replace />} />
            <Route path="/join" element={<JoinAcademy />} />

            {/* Creator Routes */}
            <Route
              path="/creator/dashboard"
              element={
                <ProtectedRoute role="creator">
                  <HappyFXDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/creator/packages/create" element={<Navigate to="/creator/dashboard?view=packages" replace />} />
            <Route path="/creator/assets" element={<Navigate to="/creator/dashboard?view=assets" replace />} />
            <Route path="/creator/trades/create" element={<Navigate to="/creator/dashboard?view=trade" replace />} />
            <Route
              path="/creator/trades/active"
              element={
                <ProtectedRoute role="creator">
                  <ActiveTrades />
                </ProtectedRoute>
              }
            />
            <Route
              path="/creator/trades/completed"
              element={
                <ProtectedRoute role="creator">
                  <CompletedTrades />
                </ProtectedRoute>
              }
            />
            <Route
              path="/creator/academy-code"
              element={
                <ProtectedRoute role="creator">
                  <AcademyCode />
                </ProtectedRoute>
              }
            />
            <Route
              path="/creator/subscribers"
              element={
                <ProtectedRoute role="creator">
                  <CreatorSubscribers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/creator/profile"
              element={
                <ProtectedRoute role="creator">
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Subscriber Routes */}
            <Route
              path="/subscriber/dashboard"
              element={
                <ProtectedRoute role="subscriber">
                  <SubscriberDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/subscriber/trades/active"
              element={
                <ProtectedRoute role="subscriber">
                  <SubscriberActiveTrades />
                </ProtectedRoute>
              }
            />
            <Route
              path="/subscriber/trades/completed"
              element={
                <ProtectedRoute role="subscriber">
                  <SubscriberCompletedTrades />
                </ProtectedRoute>
              }
            />
            <Route
              path="/subscriber/profile"
              element={
                <ProtectedRoute role="subscriber">
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/subscriber/academy"
              element={
                <ProtectedRoute role="subscriber">
                  <SubscriberAcademy />
                </ProtectedRoute>
              }
            />
            <Route
              path="/subscriber/checkout"
              element={
                <ProtectedRoute role="subscriber">
                  <SubscriberCheckout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/subscriber/subscriptions"
              element={
                <ProtectedRoute role="subscriber">
                  <SubscriberSubscriptions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/subscriber/notifications"
              element={
                <ProtectedRoute role="subscriber">
                  <NotificationsPage />
                </ProtectedRoute>
              }
            />
            <Route path="/payment/callback" element={<PaymentCallback />} />

            {/* 404 Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster position="top-right" />
        </Router>
          </ConfirmProvider>
      </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

