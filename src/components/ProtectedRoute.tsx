import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogIn, Github, Mail } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, fallback }) => {
  const { isAuthenticated, isLoading, signInWithOAuth } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <LogIn className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign In Required</h2>
          <p className="text-gray-600 mb-6">
            You need to sign in to access this feature. Choose your preferred method below.
          </p>
          
          <div className="space-y-3">
            <button
              onClick={() => signInWithOAuth('github')}
              className="w-full flex items-center justify-center px-4 py-3 bg-gray-900 text-white rounded-lg shadow-sm text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              <Github className="w-5 h-5 mr-2" />
              Continue with GitHub
            </button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 flex items-center justify-center">
              <Mail className="w-4 h-4 mr-1" />
              Use the Sign In button in the navigation for email authentication
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;