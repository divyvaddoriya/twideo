import React from 'react';
import { MoreVertical, Clock, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  channelName: string;
  channelAvatar: string;
  views: string;
  duration: string;
  uploadTime: string;
}

const VideoCard: React.FC<VideoCardProps> = ({
  id,
  title,
  thumbnail,
  channelName,
  channelAvatar,
  views,
  duration,
  uploadTime,
}) => {
  return (
    <div className="group cursor-pointer">
      <Link to={`/watch/${id}`}>
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 p-1">
          <div className="relative rounded-xl overflow-hidden">
            <img
              src={thumbnail}
              alt={title}
              className="w-full aspect-video object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
            </div>
            <div className="absolute bottom-3 right-3 bg-black bg-opacity-80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{duration}</span>
            </div>
          </div>
        </div>
      </Link>
      
      <div className="flex mt-4 space-x-3">
        <Link to={`/channel/${channelName}`}>
          <div className="relative">
            <img
              src={channelAvatar}
              alt={channelName}
              className="w-10 h-10 rounded-full flex-shrink-0 ring-2 ring-transparent group-hover:ring-blue-500 transition-all duration-300"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </div>
        </Link>
        
        <div className="flex-1 min-w-0">
          <Link to={`/watch/${id}`}>
            <h3 className="text-white font-semibold line-clamp-2 text-sm leading-relaxed group-hover:text-blue-400 transition-colors duration-300">
              {title}
            </h3>
          </Link>
          <Link to={`/channel/${channelName}`}>
            <p className="text-gray-400 text-sm mt-2 hover:text-white transition-colors duration-300">
              {channelName}
            </p>
          </Link>
          <div className="flex items-center text-gray-500 text-sm mt-1 space-x-2">
            <span>{views}</span>
            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
            <span>{uploadTime}</span>
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