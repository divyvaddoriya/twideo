import React, { useState } from 'react';
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
// import { Tweet } from '../types/channel';
import { formatTimeAgo } from '@/lib/formatter';
import { useAuth } from '@/context/authContext';
import { deleteTweet } from '@/api/tweet';
// import { likeTweet, deleteTweet } from '../api/tweets';


const TweetCard = ({ 
  tweet, 
}) => {
  const [isLiked, setIsLiked] = useState(tweet.isLiked);
  const [likesCount, setLikesCount] = useState(tweet.likes);
  const [showMenu, setShowMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  
  const handleLike = async()=>{
    console.log("handling like functionality");
    
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this tweet?')) return;
    setIsDeleting(true);
    try {
      await deleteTweet(tweet._id);
        console.log("tweet deleted");
        setIsDeleting(false);
        window.location.reload();
    } catch (error) {
      console.error('Error deleting tweet:', error);
      setIsDeleting(false);
    } 
  };

  const {user} = useAuth();

  console.log(user);
  
console.log(tweet);

  const isOwner = user._id == tweet.owner._id;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
      <div className="flex space-x-4">
        {/* Avatar */}
        <Link to={`/channel/${tweet.owner._id}`}>
          <img
            src={tweet.owner.avatar}
            alt={tweet.owner.fullname}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-transparent hover:ring-blue-500 transition-all duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100';
            }}
          />
        </Link>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Link 
                to={`/channel/${tweet.owner._id}`}
                className="font-semibold text-white hover:text-blue-400 transition-colors"
              >
                {tweet.owner.fullname}
              </Link>
              <span className="text-gray-400">@{tweet.owner.username}</span>
              <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
              <span className="text-gray-500 text-sm">{formatTimeAgo(tweet.createdAt)}</span>
            </div>

            {/* Menu */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-gray-700/50 rounded-full transition-colors"
              >
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </button>

              {showMenu && (
                <div className="absolute right-0 top-full mt-2 bg-gray-800 border border-gray-700 rounded-xl shadow-xl z-10 min-w-[150px]">
                  {isOwner && (
                    <button
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="w-full flex items-center space-x-2 px-4 py-3 text-red-400 hover:bg-gray-700/50 transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
                    </button>
                  )}
                  <button className="w-full flex items-center space-x-2 px-4 py-3 text-gray-300 hover:bg-gray-700/50 transition-colors">
                    <Share className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="mb-4">
            <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">
              {tweet.content}
            </p>
          </div>

          {/* Images */}
          {tweet.images && tweet.images.length > 0 && (
            <div className={`mb-4 grid gap-2 rounded-2xl overflow-hidden ${
              tweet.images.length === 1 ? 'grid-cols-1' : 
              tweet.images.length === 2 ? 'grid-cols-2' : 
              'grid-cols-2'
            }`}>
              {tweet.images.slice(0, 4).map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Tweet image ${index + 1}`}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {tweet.images!.length > 4 && index === 3 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        +{tweet.images!.length - 4}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between max-w-md">
            <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-blue-500/10 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="text-sm">{tweet.replies}</span>
            </button>

            <button className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-green-500/10 transition-colors">
                <Repeat2 className="w-4 h-4" />
              </div>
              <span className="text-sm">{tweet.retweets}</span>
            </button>

            <button 
              onClick={handleLike}
              className={`flex items-center space-x-2 transition-colors group ${
                isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
              }`}
            >
              <div className={`p-2 rounded-full transition-colors ${
                isLiked ? 'bg-red-500/10' : 'group-hover:bg-red-500/10'
              }`}>
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              </div>
              <span className="text-sm">{likesCount}</span>
            </button>

            <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-blue-500/10 transition-colors">
                <Share className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetCard;