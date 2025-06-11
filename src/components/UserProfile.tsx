import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar, ExternalLink, GitBranch } from 'lucide-react';

const UserProfile: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="flex items-center space-x-4 mb-6">
        {user.avatar_url ? (
          <img
            src={user.avatar_url}
            alt={user.name}
            className="w-16 h-16 rounded-full border-4 border-primary-200 shadow-sm"
          />
        ) : (
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-primary-600" />
          </div>
        )}
        <div>
          <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-gray-600 flex items-center">
            <GitBranch className="w-4 h-4 mr-1" />
            @{user.username}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3 text-gray-600">
          <Mail className="w-5 h-5 text-primary-500" />
          <span>{user.email || 'No public email'}</span>
        </div>
        <div className="flex items-center space-x-3 text-gray-600">
          <ExternalLink className="w-5 h-5 text-primary-500" />
          <a
            href={`https://gitlab.com/${user.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-800 transition-colors font-medium"
          >
            View GitLab Profile
          </a>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">Connected to GitLab</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Your account is securely connected and authenticated
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;