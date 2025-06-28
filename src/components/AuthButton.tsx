import React, { useState } from 'react';
import { LogIn, LogOut, User, Mail, Lock, Github } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthButton: React.FC = () => {
  const { user, isAuthenticated, isLoading, logout, signIn, signUp, signInWithOAuth, error } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);

    try {
      const { error } = isSignUp 
        ? await signUp(email, password)
        : await signIn(email, password);
      
      if (error) {
        setAuthError(error);
        // Don't close modal if there's an error
      } else {
        setShowAuthModal(false);
        setEmail('');
        setPassword('');
      }
    } catch (err) {
      setAuthError('Authentication failed');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleGitHubLogin = async () => {
    setAuthLoading(true);
    setAuthError(null);
    
    try {
      const { error } = await signInWithOAuth('github');
      if (error) {
        setAuthError(error);
      }
      // Note: For OAuth, the modal will stay open until redirect happens
    } catch (err) {
      setAuthError('GitHub authentication failed');
      setAuthLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-sm text-gray-600 hidden sm:inline">Loading...</span>
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          {user.avatar_url ? (
            <img
              src={user.avatar_url}
              alt={user.name}
              className="w-8 h-8 rounded-full border-2 border-primary-200 shadow-sm"
            />
          ) : (
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-primary-600" />
            </div>
          )}
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">@{user.username}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-error-600 transition-colors rounded-md hover:bg-gray-50"
          title="Sign out"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Sign out</span>
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowAuthModal(true)}
        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        <LogIn className="w-4 h-4" />
        <span>Sign In</span>
      </button>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h2>
              <button
                onClick={() => {
                  setShowAuthModal(false);
                  setAuthError(null);
                  setEmail('');
                  setPassword('');
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>

            {(authError || error) && (
              <div className="mb-4 p-3 bg-error-50 border border-error-200 rounded-md">
                <p className="text-error-600 text-sm">{authError || error}</p>
              </div>
            )}

            {/* GitHub OAuth Button */}
            <div className="mb-6">
              <button
                onClick={handleGitHubLogin}
                disabled={authLoading}
                className="w-full flex items-center justify-center px-4 py-2 bg-gray-900 text-white rounded-md shadow-sm text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Github className="w-5 h-5 mr-2" />
                {authLoading ? 'Connecting...' : 'Continue with GitHub'}
              </button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or sign in with email</span>
              </div>
            </div>

            <form onSubmit={handleEmailAuth} className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input pl-10"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input pl-10"
                    placeholder="Enter your password"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="btn-primary w-full"
              >
                {authLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    {isSignUp ? 'Creating Account...' : 'Signing In...'}
                  </div>
                ) : (
                  isSignUp ? 'Create Account' : 'Sign In'
                )}
              </button>
            </form>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setAuthError(null);
                  }}
                  className="ml-1 text-primary-600 hover:text-primary-800 font-medium"
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </div>

            {isSignUp && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-blue-700 text-xs">
                  By creating an account, you'll be able to save your favorite recipes and create meal plans.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AuthButton;