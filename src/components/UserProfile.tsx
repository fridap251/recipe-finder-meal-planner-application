import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar, ExternalLink } from 'lucide-react';

const UserProfile: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-4 mb-6">
        {user.avatar_url ? (
          <img
            src={user.avatar_url}
            alt={user.name}
            className="w-16 h-16 rounded-full border-4 border-primary-200"
          />
        ) : (
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-primary-600" />
          </div>
        )}
        <div>
          <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-gray-600">@{user.username}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-3 text-gray-600">
          <Mail className="w-5 h-5" />
          <span>{user.email}</span>
        </div>
        <div className="flex items-center space-x-3 text-gray-600">
          <ExternalLink className="w-5 h-5" />
          <a
            href={`https://gitlab.com/${user.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-800 transition-colors"
          >
            View GitLab Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;