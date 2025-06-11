import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../lib/api';

interface User {
  id: string;
  username: string;
  email: string;
  preferences: {
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
        if (token) {
          apiClient.setToken(token);
          // You might want to validate the token with a /me endpoint
          // For now, we'll assume the token is valid if it exists
          setUser({
            id: 'current_user',
            username: 'User',
            email: 'user@example.com',
            preferences: {
              calorie_target: 2000,
              macro_split: { protein: 40, carbs: 30, fat: 30 }
            }
          });
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        localStorage.removeItem('access_token');
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
      const error = urlParams.get('error');
      const errorDescription = urlParams.get('error_description');

      if (error) {
        setError(`OAuth Error: ${error}${errorDescription ? ` - ${errorDescription}` : ''}`);
        setIsLoading(false);
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
            
            // Set user data (you might want to fetch actual user data from /me endpoint)
            setUser({
              id: 'current_user',
              username: 'User',
              email: 'user@example.com',
              preferences: {
                calorie_target: 2000,
                macro_split: { protein: 40, carbs: 30, fat: 30 }
              }
            });

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