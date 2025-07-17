import React, { useState } from 'react';
import { Search, Bell, User, Upload, Menu, Sparkles, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { logoutUser } from '@/api/auth';
import { useAuth } from '@/context/authContext';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
const {setUser} = useAuth();
  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/50 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-700/50 rounded-xl md:hidden transition-colors duration-200">
            <Menu className="w-5 h-5" />
          </button>
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur-lg opacity-30"></div>
            </div>
            <span className="text-2xl font-bold text-white hidden sm:block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              VidStream
            </span>
          </Link>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-2xl mx-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-600/50 group-focus-within:border-blue-500/50 transition-all duration-300">
              <input
                type="text"
                placeholder="Search videos, channels, and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-white px-6 py-3 pl-6 pr-14 rounded-2xl focus:outline-none placeholder-gray-400"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-600/50 rounded-xl transition-colors duration-200">
                <Search className="w-5 h-5 text-gray-400 group-focus-within:text-blue-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <Link 
            to="/upload"
            className="group relative flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
          >
            <Upload className="w-4 h-4" />
            <span className="hidden sm:block font-medium">Upload</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          
          <button className="relative p-3 hover:bg-gray-700/50 rounded-2xl transition-colors duration-200 group">
            <Bell className="w-5 h-5 text-gray-300 group-hover:text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"></span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-ping"></span>
          </button>
          
          <Link to="/profile" className="p-3 hover:bg-gray-700/50 rounded-2xl transition-colors duration-200 group">
            <User className="w-5 h-5 text-gray-300 group-hover:text-white" />
          </Link>

          <Link to="/profile" className="p-3 hover:bg-gray-700/50 rounded-2xl transition-colors duration-200 group">
                      <span className="hidden sm:block font-medium">
                        <button onClick={()=>
                          {
                            logoutUser()
                            setUser();
                          }
                          }>
                              Logout
                        </button>
                      </span>
            <LogOut className="w-5 h-5 text-gray-300 group-hover:text-white" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;