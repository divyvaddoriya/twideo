import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, MessageCircle, TrendingUp } from 'lucide-react';
import TweetCard from '@/components/ui/TweetCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
// import { fetchTweets, createTweet } from '../api/tweets';
import { fetchTweets , createTweet } from '@/api/tweet';
import { useAuth } from '@/context/authContext';

const Tweets = () => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTweet, setNewTweet] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalResults: 0
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Mock current user - replace with actual auth
  const { user} = useAuth(); 
  const currentUser = user;
  const loadTweets = async (page: number = 1) => {
    try {
      setLoading(page === 1);
      setError(null);
      
      const response = await fetchTweets();
      
      if (page === 1) {
        setTweets(response.data);
      } else {
        setTweets(prev => [...prev, ...response.data]);
      }
    //   loadTweets()
    } catch (err) {
      console.error('Error loading tweets:', err);
      setError('Failed to load tweets. Please try again.');
      
      // Mock data fallback
 const tweets =  await fetchTweets();
setTweets(tweets);

} finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newTweet.trim()) return;

    try {
      setIsPosting(true);
      const tweet = await createTweet(newTweet);
      
      // Add new tweet to the top of the list
      setTweets(prev => [tweet, ...prev]);
      
      // Reset form
      setNewTweet('');
    } catch (err) {
      console.error('Error posting tweet:', err);
      alert('Failed to post tweet. Please try again.');
    } finally {
      setIsPosting(false);
    }
  };


  const loadMoreTweets = () => {
    if (pagination.page < pagination.totalPages) {
      loadTweets(pagination.page + 1);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [newTweet]);

  useEffect(() => {
    loadTweets(1);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-2xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-1">
            <div className="bg-gray-900 rounded-3xl p-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl"></div>
              <div className="relative z-10 flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Social Feed
                  </h1>
                  <p className="text-xl text-gray-300">
                    Share your thoughts with the community
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Create Tweet */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 mb-8">
          <form onSubmit={handleSubmit}>
            <div className="flex space-x-4">
              <img
                src={currentUser.avatar}
                alt="Your avatar"
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              
              <div className="flex-1">
                <textarea
                  ref={textareaRef}
                  value={newTweet}
                  onChange={(e) => setNewTweet(e.target.value)}
                  placeholder="What's happening?"
                  className="w-full bg-transparent text-white text-lg placeholder-gray-400 resize-none focus:outline-none min-h-[60px] max-h-[200px]"
                  maxLength={280}
                />

                {/* Actions */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700/50">
                  <div></div>

                  <div className="flex items-center space-x-4">
                    <span className={`text-sm ${
                      newTweet.length > 260 ? 'text-red-400' : 'text-gray-400'
                    }`}>
                      {280 - newTweet.length}
                    </span>
                    
                    <button
                      type="submit"
                      disabled={!newTweet.trim() || isPosting}
                      className="group relative px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      <span className="relative z-10 flex items-center space-x-2">
                        {isPosting ? (
                          <>
                            <LoadingSpinner size="sm" />
                            <span>Posting...</span>
                          </>
                        ) : (
                          <>
                            <span>Tweet</span>
                            <Sparkles className="w-4 h-4" />
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Trending Topics */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-semibold text-white">Trending Topics</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {['#WebDevelopment', '#React', '#JavaScript', '#TechNews', '#Programming'].map((tag) => (
              <button
                key={tag}
                className="px-3 py-1 bg-gray-700/50 hover:bg-gray-600/50 text-blue-400 rounded-full text-sm transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Tweets Feed */}
        <div className="space-y-6">
          {loading && tweets.length === 0 ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : error && tweets.length === 0 ? (
            <ErrorMessage 
              message={error} 
              onRetry={() => loadTweets(1)}
              className="py-8"
            />
          ) : tweets.length > 0 ? (
            <>
              {tweets.map((tweet) => (
                <TweetCard 
                  key={tweet._id} 
                  tweet={tweet}
                />
              ))}

              {/* Load More Button */}
              {pagination.page < pagination.totalPages && (
                <div className="flex justify-center mt-8">
                  <button 
                    onClick={loadMoreTweets}
                    disabled={loading}
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <span className="relative z-10 flex items-center space-x-2">
                      {loading ? (
                        <>
                          <LoadingSpinner size="sm" />
                          <span>Loading...</span>
                        </>
                      ) : (
                        <span>Load More Tweets</span>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No tweets yet</h3>
              <p className="text-gray-400">Be the first to share something!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tweets;