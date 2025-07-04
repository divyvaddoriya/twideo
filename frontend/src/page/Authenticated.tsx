import VideoCard from '@/components/ui/VideoCard';
import React from 'react';

const Home = () => {
  // Mock data - replace with actual API calls
  const videos = [
    {
      id: '1',
      title: 'How to Build a Modern React Application from Scratch',
      thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=500',
      channelName: 'TechMaster',
      channelAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      views: '125K views',
      duration: '15:32',
      uploadTime: '2 days ago',
    },
    {
      id: '2',
      title: 'Amazing Travel Destinations You Must Visit in 2024',
      thumbnail: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=500',
      channelName: 'Wanderlust',
      channelAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
      views: '89K views',
      duration: '12:45',
      uploadTime: '1 week ago',
    },
    {
      id: '3',
      title: 'Cooking the Perfect Italian Pasta - Chef\'s Secret Recipe',
      thumbnail: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=500',
      channelName: 'Culinary Arts',
      channelAvatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=100',
      views: '234K views',
      duration: '18:20',
      uploadTime: '3 days ago',
    },
    {
      id: '4',
      title: 'Machine Learning Explained in Simple Terms',
      thumbnail: 'https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=500',
      channelName: 'AI Simplified',
      channelAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100',
      views: '456K views',
      duration: '22:10',
      uploadTime: '5 days ago',
    },
    {
      id: '5',
      title: 'Guitar Tutorial: Master These 5 Essential Chords',
      thumbnail: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=500',
      channelName: 'Music Academy',
      channelAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      views: '67K views',
      duration: '14:55',
      uploadTime: '1 day ago',
    },
    {
      id: '6',
      title: 'Wildlife Photography: Capturing Nature\'s Beauty',
      thumbnail: 'https://images.pexels.com/photos/792381/pexels-photo-792381.jpeg?auto=compress&cs=tinysrgb&w=500',
      channelName: 'Nature Focus',
      channelAvatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100',
      views: '91K views',
      duration: '16:30',
      uploadTime: '4 days ago',
    },
    {
      id: '7',
      title: 'The Future of Web Development: What\'s Coming Next',
      thumbnail: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=500',
      channelName: 'DevTrends',
      channelAvatar: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=100',
      views: '178K views',
      duration: '19:45',
      uploadTime: '6 hours ago',
    },
    {
      id: '8',
      title: 'Minimalist Home Design Ideas That Will Transform Your Space',
      thumbnail: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=500',
      channelName: 'Design Studio',
      channelAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
      views: '92K views',
      duration: '13:28',
      uploadTime: '12 hours ago',
    },
  ];

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

        {/* Trending Section */}
        <div className="mb-12">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            <h2 className="text-2xl font-bold text-white">Trending Now</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {videos.slice(0, 4).map((video) => (
              <VideoCard key={video.id} {...video} />
            ))}
          </div>
        </div>

        {/* Latest Videos */}
        <div className="mb-12">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
            <h2 className="text-2xl font-bold text-white">Latest Videos</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {videos.slice(4).map((video) => (
              <VideoCard key={video.id} {...video} />
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="flex justify-center">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105">
            <span className="relative z-10">Load More Videos</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;