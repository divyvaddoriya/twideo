import React, { useState, useEffect } from 'react';
import {  Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
// import VideoCard from '../components/VideoCard';
import VideoCard from '@/components/ui/VideoCard.js';
// import LoadingSpinner from '../components/LoadingSpinner';
// import ErrorMessage from '../components/ErrorMessage';
// import { Video, VideoResponse } from '../types/video';
// import { fetchVideos } from '../api/videos.js';
import { fetchVideos } from '@/api/video.js';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalResults: 0
  });

  // Mock data fallback for when API is not available
  const mockVideos = [
    {
      _id: '1',
      title: 'How to Build a Modern React Application from Scratch',
      thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=500',
      videoFile: '',
      description: 'Learn React development',
      duration: 932,
      views: 125000,
      isPublished: true,
      owner: {
        _id: '1',
        username: 'techmaster',
        email: 'tech@example.com',
        fullname: 'TechMaster',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
        coverImg: '',
        watchHistory: [],
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z',
        __v: 0
      },
      createdAt: '2025-01-02T00:00:00.000Z',
      updatedAt: '2025-01-02T00:00:00.000Z',
      __v: 0
    }
  ];

  const loadVideos = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      // Pass page parameter to fetchVideos if your API supports it
      const response = await fetchVideos(page);
      console.log('API Response:', response);
      
      // Check if response has the expected structure
      if (!response || !response.data) {
        throw new Error('Invalid API response structure');
      }
      
      // Filter only published videos (if needed)
      const publishedVideos = response.data;
      // .filter((video) => video.isPublished === true);
      
      setVideos(publishedVideos);
      
      // Set pagination with fallback values
      setPagination({
        page: response.page || page,
        totalPages: response.totalPages || Math.ceil(publishedVideos.length / 10) || 1,
        totalResults: response.totalResults || publishedVideos.length
      });

      console.log('Pagination set:', {
        page: response.page || page,
        totalPages: response.totalPages || 1,
        totalResults: response.totalResults || publishedVideos.length
      });
      
    } catch (err) {
      console.error('Error loading videos:', err);
      setError('Failed to load videos. Please check your connection.');
      
      // Use mock data as fallback
      setVideos(mockVideos);
      setPagination({ 
        page: 1, 
        totalPages: 1, 
        totalResults: mockVideos.length 
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages && newPage !== pagination.page) {
      loadVideos(newPage);
      // Scroll to top of videos section
      document.getElementById('latest-videos')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const retryLoadVideos = () => {
    loadVideos(pagination.page);
  };

  // Load videos on component mount
  useEffect(() => {
    loadVideos(1);
  }, []);

  // Pagination component
  const PaginationControls = () => {
    const { page, totalPages } = pagination;
    
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
      const delta = 2;
      const range = [];
      const rangeWithDots = [];

      // Handle edge case where totalPages is 1
      if (totalPages === 1) {
        return [1];
      }

      for (let i = Math.max(2, page - delta); i <= Math.min(totalPages - 1, page + delta); i++) {
        range.push(i);
      }

      if (page - delta > 2) {
        rangeWithDots.push(1, '...');
      } else {
        rangeWithDots.push(1);
      }

      rangeWithDots.push(...range);

      if (page + delta < totalPages - 1) {
        rangeWithDots.push('...', totalPages);
      } else if (totalPages > 1) {
        rangeWithDots.push(totalPages);
      }

      // Remove duplicates
      return [...new Set(rangeWithDots)];
    };

    return (
      <div className="flex justify-center items-center space-x-2 mt-12">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        {/* Page Numbers */}
        <div className="flex space-x-1">
          {getPageNumbers().map((pageNum, index) => (
            <button
              key={index}
              onClick={() => pageNum !== '...' && handlePageChange(pageNum)}
              disabled={pageNum === '...' || pageNum === page}
              className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                pageNum === page
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : pageNum === '...'
                  ? 'text-gray-400 cursor-default'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="p-8">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-1">
            <div className="bg-gray-900 rounded-3xl p-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl"></div>
              <div className="relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Discover Amazing Content
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl">
                  Explore trending videos, connect with creators, and share your own stories with the world.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Videos */}
        <div className="mb-12" id="latest-videos">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
            <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-6 h-6" />
              <span>Latest Videos</span>
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
            {pagination.totalResults > 0 && (
              <span className="text-gray-400 text-sm">
                Page {pagination.page} of {pagination.totalPages} ({pagination.totalResults} total videos)
              </span>
            )}
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : error && videos.length === 0 ? (
            <ErrorMessage 
              message={error} 
              onRetry={retryLoadVideos}
              className="py-8"
            />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {videos.map((video) => (
                  <VideoCard key={video._id} video={video} />
                ))}
              </div>

              {/* Pagination Controls */}
              <PaginationControls />
            </>
          )}
        </div>

        {/* No Videos Message */}
        {!loading && !error && videos.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No videos available</h3>
            <p className="text-gray-400">Be the first to upload a video!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;