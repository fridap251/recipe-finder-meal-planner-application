import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../lib/api';

interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  avatar_url?: string;
  preferences?: {
    calorie_target: number;
    macro_split: {
      protein: number;
      carbs: number;
      fat: number;
    };
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!user;

  // Check for existing authentication on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const savedUser = localStorage.getItem('user_data');
        
        if (token && savedUser) {
          apiClient.setToken(token);
          setUser(JSON.parse(savedUser));
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_data');
        apiClient.clearToken();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Handle OAuth callback
  useEffect(() => {
    const handleOAuthCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const mockAuth = urlParams.get('mock_auth');
      const error = urlParams.get('error');
      const errorDescription = urlParams.get('error_description');

      if (error) {
        setError(`OAuth Error: ${error}${errorDescription ? ` - ${errorDescription}` : ''}`);
        setIsLoading(false);
        return;
      }

      // Handle mock authentication
      if (mockAuth === 'true') {
        setIsLoading(true);
        try {
          const response = await apiClient.handleGitLabCallback('mock-code');
          
          if (response.error) {
            throw new Error(response.error);
          }

          if (response.data) {
            apiClient.setToken(response.data.access_token);
            
            const userData: User = {
              ...response.data.user,
              preferences: {
                calorie_target: 2000,
                macro_split: { protein: 40, carbs: 30, fat: 30 }
              }
            };
            
            setUser(userData);
            localStorage.setItem('user_data', JSON.stringify(userData));

            // Clean up URL
            window.history.replaceState({}, document.title, window.location.pathname);
            setError(null);
          }
        } catch (err) {
          console.error('Mock auth error:', err);
          setError(err instanceof Error ? err.message : 'Authentication failed');
        } finally {
          setIsLoading(false);
        }
        return;
      }

      if (code) {
        setIsLoading(true);
        try {
          console.log('Exchanging code for token...');
          const response = await apiClient.handleGitLabCallback(code);
          
          if (response.error) {
            throw new Error(response.error);
          }

          if (response.data) {
            apiClient.setToken(response.data.access_token);
            
            const userData: User = {
              ...response.data.user,
              preferences: {
                calorie_target: 2000,
                macro_split: { protein: 40, carbs: 30, fat: 30 }
              }
            };
            
            setUser(userData);
            localStorage.setItem('user_data', JSON.stringify(userData));

            // Clean up URL
            window.history.replaceState({}, document.title, window.location.pathname);
            setError(null);
          }
        } catch (err) {
          console.error('OAuth callback error:', err);
          setError(err instanceof Error ? err.message : 'Authentication failed');
        } finally {
          setIsLoading(false);
        }
      }
    };

    handleOAuthCallback();
  }, []);

  const login = async () => {
    try {
      setError(null);
      const response = await apiClient.getGitLabAuthUrl();
      
      if (response.error) {
        throw new Error(response.error);
      }

      if (response.data?.url) {
        window.location.href = response.data.url;
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to initiate login');
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_data');
    apiClient.clearToken();
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};