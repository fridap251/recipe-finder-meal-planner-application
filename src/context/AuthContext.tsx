import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';

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
  signUp: (email: string, password: string) => Promise<{ error?: string }>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signInWithOAuth: (provider: 'github' | 'google' | 'discord') => Promise<{ error?: string }>;
  resetPassword: (email: string) => Promise<{ error?: string }>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!user;

  // Get the correct redirect URL based on current environment
  const getRedirectUrl = () => {
    if (typeof window !== 'undefined') {
      // Check if we're on Netlify or localhost
      const origin = window.location.origin;
      if (origin.includes('netlify.app') || origin.includes('localhost')) {
        return `${origin}/auth/callback`;
      }
    }
    return 'http://localhost:5173/auth/callback';
  };

  // Transform Supabase user to our User interface
  const transformUser = (supabaseUser: SupabaseUser): User => ({
    id: supabaseUser.id,
    username: supabaseUser.user_metadata?.username || 
              supabaseUser.user_metadata?.user_name || 
              supabaseUser.user_metadata?.preferred_username ||
              supabaseUser.email?.split('@')[0] || 'user',
    name: supabaseUser.user_metadata?.full_name || 
          supabaseUser.user_metadata?.name || 
          supabaseUser.user_metadata?.display_name ||
          supabaseUser.email?.split('@')[0] ||
          'User',
    email: supabaseUser.email || '',
    avatar_url: supabaseUser.user_metadata?.avatar_url || 
                supabaseUser.user_metadata?.picture,
    preferences: {
      calorie_target: 2000,
      macro_split: { protein: 40, carbs: 30, fat: 30 }
    }
  });

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
          setError(error.message);
        } else if (session?.user) {
          setUser(transformUser(session.user));
        }
      } catch (err) {
        console.error('Session error:', err);
        setError('Failed to get session');
      } finally {
        setIsLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        if (session?.user) {
          setUser(transformUser(session.user));
        } else {
          setUser(null);
        }
        
        setIsLoading(false);
        setError(null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      setError(null);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: getRedirectUrl()
        }
      });

      if (error) {
        setError(error.message);
        return { error: error.message };
      }

      // Check if user needs to confirm email
      if (data.user && !data.session) {
        return { error: 'Please check your email for a confirmation link!' };
      }

      return { error: undefined };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Sign up failed';
      setError(errorMessage);
      return { error: errorMessage };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return { error: error.message };
      }

      return { error: undefined };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Sign in failed';
      setError(errorMessage);
      return { error: errorMessage };
    }
  };

  const signInWithOAuth = async (provider: 'github' | 'google' | 'discord') => {
    try {
      setError(null);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: getRedirectUrl()
        }
      });

      if (error) {
        setError(error.message);
        return { error: error.message };
      }

      return { error: undefined };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'OAuth sign in failed';
      setError(errorMessage);
      return { error: errorMessage };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setError(null);
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${getRedirectUrl().replace('/auth/callback', '')}/auth/reset-password`
      });

      if (error) {
        setError(error.message);
        return { error: error.message };
      }

      return { error: undefined };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Password reset failed';
      setError(errorMessage);
      return { error: errorMessage };
    }
  };

  // Legacy login method for compatibility
  const login = () => {
    // This will be handled by the new auth components
    setError('Please use the sign in form');
  };

  const logout = async () => {
    try {
      setError(null);
      const { error } = await supabase.auth.signOut();
      if (error) {
        setError(error.message);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Sign out failed';
      setError(errorMessage);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        signUp,
        signIn,
        signInWithOAuth,
        resetPassword,
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