import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
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
import RegisterCreator from './pages/auth/RegisterCreator';
import RegisterSubscriber from './pages/auth/RegisterSubscriber';

// Creator Pages
import CreatorDashboard from './pages/creator/CreatorDashboard';
import CreatePackage from './pages/creator/CreatePackage';
import AssetManagement from './pages/creator/AssetManagement';
import TradeCreation from './pages/creator/TradeCreation';
import ActiveTrades from './pages/creator/ActiveTrades';
import CompletedTrades from './pages/creator/CompletedTrades';
import AcademyCode from './pages/creator/AcademyCode';

// Subscriber Pages
import JoinAcademy from './pages/subscriber/JoinAcademy';
import SubscriberDashboard from './pages/subscriber/SubscriberDashboard';
import SubscriberActiveTrades from './pages/subscriber/SubscriberActiveTrades';
import SubscriberCompletedTrades from './pages/subscriber/SubscriberCompletedTrades';
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
            <Route path="/register/creator" element={<RegisterCreator />} />
            <Route path="/register/subscriber" element={<RegisterSubscriber />} />
            <Route path="/join" element={<JoinAcademy />} />

            {/* Creator Routes */}
            <Route
              path="/creator/dashboard"
              element={
                <ProtectedRoute role="creator">
                  <CreatorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/creator/packages/create"
              element={
                <ProtectedRoute role="creator">
                  <CreatePackage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/creator/assets"
              element={
                <ProtectedRoute role="creator">
                  <AssetManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/creator/trades/create"
              element={
                <ProtectedRoute role="creator">
                  <TradeCreation />
                </ProtectedRoute>
              }
            />
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
            <Route path="/payment/callback" element={<PaymentCallback />} />

            {/* 404 Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster position="top-right" />
        </Router>
      </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

