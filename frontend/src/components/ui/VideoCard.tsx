import React from 'react';
import { MoreVertical, Clock, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDuration, formatViews, formatTimeAgo } from '../../lib/formatter.ts';
import { useAuth } from '@/context/authContext.tsx';


const VideoCard = ({ video }) => {
  console.log(video);
  const {user} = useAuth();
  
  return (
    <div className="group cursor-pointer">
      <Link to={`/v/${video._id}`}>
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 p-1">
          <div className="relative rounded-xl overflow-hidden">
           <img
  src={video?.thumbnail || 'https://via.placeholder.com/480x270?text=No+Thumbnail'}
  alt={video.title}
  className="w-full object-cover aspect-video"
  onError={(e) => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://via.placeholder.com/480x270?text=Error';
  }}
/>
       
            <div className="absolute bottom-3 right-3 bg-black bg-opacity-80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{formatDuration(video.duration)}</span>
            </div>
            {!video.isPublished && video.owner._id === user?._id &&  (
              <div className="absolute top-3 left-3 bg-yellow-600 bg-opacity-90 text-white text-xs px-2 py-1 rounded-full">
                Unlisted
              </div>
            )}
          </div>
        </div>
      </Link>
      
      <div className="flex mt-4 space-x-3">
        <Link to={`/channel/${video.owner._id}`}>
          <div className="relative">
            <img
              src={video.owner.avatar}
              alt={video.owner.fullname}
              className="w-10 h-10 rounded-full flex-shrink-0 ring-2 ring-transparent group-hover:ring-blue-500 transition-all duration-300 object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100';
              }}
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </div>
        </Link>
        
        <div className="flex-1 min-w-0">
          <Link to={`/v/${video._id}`}>
            <h3 className="text-white font-semibold line-clamp-2 text-sm leading-relaxed group-hover:text-blue-400 transition-colors duration-300">
              {video.title}
            </h3>
          </Link>
          <Link to={`/channel/${video.owner._id}`}>
            <p className="text-gray-400 text-sm mt-2 hover:text-white transition-colors duration-300">
              {video.owner.fullname}
            </p>
          </Link>
          <div className="flex items-center text-gray-500 text-sm mt-1 space-x-2">
            <span>{formatViews(video.views)}</span>
            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
            <span>{formatTimeAgo(video.createdAt)}</span>
          </div>
        </div>
        
        <button className="p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-700 rounded-full">
          <MoreVertical className="w-4 h-4 text-gray-400 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default VideoCard;