import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  avatar_url: string;
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
        const token = localStorage.getItem('gitlab_access_token');
        if (token) {
          const userData = await fetchUserData(token);
          setUser(userData);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        localStorage.removeItem('gitlab_access_token');
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
      const state = urlParams.get('state');
      const error = urlParams.get('error');

      if (error) {
        setError(`OAuth Error: ${error}`);
        setIsLoading(false);
        return;
      }

      if (code) {
        setIsLoading(true);
        try {
          // Validate state parameter
          const storedState = localStorage.getItem('oauth_state');
          if (state !== storedState) {
            throw new Error('Invalid state parameter. Possible CSRF attack.');
          }

          const response = await fetch('/.netlify/functions/gitlab-oauth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code, state }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to authenticate');
          }

          const tokenData = await response.json();
          localStorage.setItem('gitlab_access_token', tokenData.access_token);

          const userData = await fetchUserData(tokenData.access_token);
          setUser(userData);

          // Clean up URL and state
          window.history.replaceState({}, document.title, window.location.pathname);
          localStorage.removeItem('oauth_state');
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Authentication failed');
        } finally {
          setIsLoading(false);
        }
      }
    };

    handleOAuthCallback();
  }, []);

  const fetchUserData = async (token: string): Promise<User> => {
    const response = await fetch('https://gitlab.com/api/v4/user', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    return response.json();
  };

  const generateRandomState = () => {
    return Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
  };

  const login = () => {
    const clientId = '1d28de9d8a7bcbfb1c41cbc05b6133ac1a08f5891a7f4116a4df4f207a128312';
    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);
    const state = generateRandomState();
    const scopes = 'read_user';
    
    localStorage.setItem('oauth_state', state);
    
    const authUrl = `https://gitlab.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${encodeURIComponent(scopes)}&state=${state}`;
    
    window.location.href = authUrl;
  };

  const logout = () => {
    localStorage.removeItem('gitlab_access_token');
    localStorage.removeItem('oauth_state');
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