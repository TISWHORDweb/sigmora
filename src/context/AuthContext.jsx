import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { normalizeSubscriberUser } from '../utils/subscriberAcademy';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      const tokenExpiresAt = localStorage.getItem('tokenExpiresAt');

      // Check if token is expired
      if (tokenExpiresAt) {
        const expirationTime = new Date(tokenExpiresAt).getTime();
        const currentTime = new Date().getTime();
        
        if (currentTime >= expirationTime) {
          // Token expired, clear storage
          localStorage.removeItem('token');
          localStorage.removeItem('tokenExpiresAt');
          localStorage.removeItem('user');
          setLoading(false);
          return;
        }
      }

      if (token && storedUser) {
        try {
          const userData = normalizeSubscriberUser(await authService.getMe());
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          // Update token expiration if provided
          if (userData.sessionExpiresAt) {
            localStorage.setItem('tokenExpiresAt', userData.sessionExpiresAt);
          }
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('tokenExpiresAt');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      // Store token expiration time
      if (data.expiresAt) {
        localStorage.setItem('tokenExpiresAt', data.expiresAt);
      }
      const user = normalizeSubscriberUser(data);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      toast.success('Login successful!');
      return user;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      throw error;
    }
  };

  const registerCreator = async (formData) => {
    try {
      const data = await authService.registerCreator(formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      // Store token expiration time
      if (data.expiresAt) {
        localStorage.setItem('tokenExpiresAt', data.expiresAt);
      }
      setUser(data);
      toast.success('Registration successful!');
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  const registerSubscriber = async (formData) => {
    try {
      const data = await authService.registerSubscriber(formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      // Store token expiration time
      if (data.expiresAt) {
        localStorage.setItem('tokenExpiresAt', data.expiresAt);
      }
      const user = normalizeSubscriberUser(data);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      toast.success('Registration successful!');
      return user;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Call logout endpoint to invalidate session on server
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/logout`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
        } catch (error) {
          // Ignore errors if server is unreachable
          console.error('Logout request failed:', error);
        }
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage regardless of server response
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiresAt');
      localStorage.removeItem('user');
      setUser(null);
      toast.success('Logged out successfully');
    }
  };

  const refreshUser = async () => {
    const userData = normalizeSubscriberUser(await authService.getMe());
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  };

  const updateProfile = async (data) => {
    try {
      const updated = await authService.updateProfile(data);
      setUser(updated);
      localStorage.setItem('user', JSON.stringify(updated));
      toast.success('Profile updated');
      return updated;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    registerCreator,
    registerSubscriber,
    logout,
    refreshUser,
    updateProfile,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

