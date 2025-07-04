import React from 'react';
import { 
  Home, 
  Compass, 
  PlaySquare, 
  Clock, 
  ThumbsUp, 
  User, 
  Users,
  Settings,
  TrendingUp,
  Music,
  Gamepad2,
  Newspaper,
  Sparkles
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: TrendingUp, label: 'Trending', path: '/trending' },
    { icon: Compass, label: 'Explore', path: '/explore' },
    { icon: PlaySquare, label: 'Subscriptions', path: '/subscriptions' },
  ];

  const libraryItems = [
    { icon: Clock, label: 'History', path: '/history' },
    { icon: PlaySquare, label: 'Your Videos', path: '/your-videos' },
    { icon: ThumbsUp, label: 'Liked Videos', path: '/liked' },
    { icon: Users, label: 'Playlists', path: '/playlists' },
  ];

  const categories = [
    { icon: Music, label: 'Music' },
    { icon: Gamepad2, label: 'Gaming' },
    { icon: Newspaper, label: 'News' },
  ];

  return (
    <aside className="fixed left-0 top-16 w-64 h-full bg-gray-900/50 backdrop-blur-xl border-r border-gray-700/50 overflow-y-auto">
      <div className="p-6 space-y-8">
        {/* Main Menu */}
        <div>
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group relative flex items-center space-x-4 px-4 py-3 rounded-2xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
                      : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-30"></div>
                  )}
                  <Icon className="w-5 h-5 relative z-10" />
                  <span className="font-medium relative z-10">{item.label}</span>
                  {isActive && (
                    <Sparkles className="w-4 h-4 text-white/70 ml-auto relative z-10" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>

        {/* Library */}
        <div>
          <h3 className="text-gray-400 font-semibold text-sm uppercase tracking-wider mb-4 px-4">
            Library
          </h3>
          <nav className="space-y-2">
            {libraryItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group relative flex items-center space-x-4 px-4 py-3 rounded-2xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
                      : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-30"></div>
                  )}
                  <Icon className="w-5 h-5 relative z-10" />
                  <span className="font-medium relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>

        {/* Browse */}
        <div>
          <h3 className="text-gray-400 font-semibold text-sm uppercase tracking-wider mb-4 px-4">
            Browse
          </h3>
          <nav className="space-y-2">
            {categories.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className="group flex items-center space-x-4 px-4 py-3 rounded-2xl text-gray-300 hover:bg-gray-700/50 hover:text-white transition-all duration-300 w-full text-left"
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>

        {/* Settings */}
        <div>
          <Link
            to="/settings"
            className="group flex items-center space-x-4 px-4 py-3 rounded-2xl text-gray-300 hover:bg-gray-700/50 hover:text-white transition-all duration-300"
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;