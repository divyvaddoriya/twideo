import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, Share, Save, MoreHorizontal, Bell, BellOff } from 'lucide-react';
import { getVideoData } from '@/api/video';
import LoadingSpinner from '@/components/LoadingSpinner';

const VideoPlayer = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [comment, setComment] = useState('');
 const [loading , setLoading ] = useState(false);
const [video , setVideo ] = useState();
  // Mock data - replace with actual API calls
  
  const {videoId}  = useParams();

  useEffect(() => {
    const fetchVideoData =async ()=>{
      const videoData =   await getVideoData(videoId);
      console.log("video " + JSON.stringify(videoData));
      setVideo(videoData.data.data);
    }
    fetchVideoData();
  } , [videoId]);
  
  // console.log(video);
  

//   const comments = [
//     {
//       id: 1,
//       author: 'John Developer',
//       avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=50',
//       content: 'Great tutorial! This really helped me understand React hooks better.',
//       likes: 45,
//       time: '2 days ago',
//     },
//     {
//       id: 2,
//       author: 'Sarah Code',
//       avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=50',
//       content: 'Amazing explanation of component architecture. Looking forward to more videos!',
//       likes: 23,
//       time: '3 days ago',
//     },
//   ];

  return (
  
    
    <div className="p-6">
   
      <div className="grid m-5 grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Video */}
        <div className="lg:col-span-2">
          {/* Video Player */}
          <div className="bg-black rounded-lg aspect-video mb-4">
            <div className="w-full h-full flex items-center justify-center text-white">
              <div className="text-center">
                {/* This is inside the video player box */}
<div className="bg-black rounded-lg aspect-video mb-4">
  <video
    controls
    className="w-full h-full object-contain rounded-lg"
    src={video?.videoFile} // 👈 This must point to the correct Cloudinary or public video URL
  >
    Your browser does not support the video tag.
  </video>
</div>
              </div>
            </div>
          </div>

          {/* Video Info */}
          <div className="space-y-4">
            <h1 className="text-xl font-bold text-white">{video?.title}</h1>
            
            <div className="flex items-center justify-between">
              <div className="text-gray-400 text-sm">
                {/* {video?..views}  */}
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center bg-gray-700 rounded-full">
                  <button className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-600 rounded-l-full">
                    <ThumbsUp className="w-5 h-5" />
                    {/* <span>{video?..likes}</span> */}
                  </button>
                  <div className="w-px h-6 bg-gray-600"></div>
                  <button className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-600 rounded-r-full">
                    <ThumbsDown className="w-5 h-5" />
                    {/* <span>{video?..dislikes}</span> */}
                  </button>
                </div>
                
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-full">
                  <Share className="w-5 h-5" />
                  <span>Share</span>
                </button>
                
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-full">
                  <Save className="w-5 h-5" />
                  <span>Save</span>
                </button>
                
                <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Channel Info */}
            <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center space-x-4">
                <img
                  src={video?.owner?.avatar}
                  alt={video?.owner?.username}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-white">{video?.owner?.username}</h3>
                  {/* <p className="text-gray-400 text-sm">{video?.channel.subscribers}</p> */}
                </div>
              </div>
              
              <button
                onClick={() => setIsSubscribed(!isSubscribed)}
                className={`flex items-center space-x-2 px-6 py-2 rounded-full font-medium transition-colors ${
                  isSubscribed
                    ? 'bg-gray-600 text-white hover:bg-gray-500'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                {isSubscribed ? <BellOff className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                <span>{isSubscribed ? 'Subscribed' : 'Subscribe'}</span>
              </button>
            </div>

            {/* Description */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className={`text-gray-300 ${showDescription ? '' : 'line-clamp-3'}`}>
                {video?.description.split('\n').map((line, index) => (
                  <p key={index} className="mb-2">{line}</p>
                ))}
              </div>
              <button
                onClick={() => setShowDescription(!showDescription)}
                className="text-blue-400 hover:text-blue-300 mt-2 font-medium"
              >
                {showDescription ? 'Show less' : 'Show more'}
              </button>
            </div>

            {/* Comments */}
            {/* <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Comments</h3>
               */}
              {/* Add Comment */}
              {/* <div className="flex space-x-3">
                <img
                  src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=50"
                  alt="Your avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full bg-transparent border-b border-gray-600 focus:border-blue-500 outline-none text-white resize-none"
                    rows={2}
                  />
                  <div className="flex justify-end space-x-2 mt-2">
                    <button className="px-4 py-2 text-gray-400 hover:text-white">
                      Cancel
                    </button>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                      Comment
                    </button>
                  </div>
                </div>
              </div> */}

              {/* Comment List */}
              {/* <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3">
                    <img
                      src={comment.avatar}
                      alt={comment.author}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 text-sm">
                        <span className="font-medium text-white">{comment.author}</span>
                        <span className="text-gray-400">{comment.time}</span>
                      </div>
                      <p className="text-gray-300 mt-1">{comment.content}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <button className="flex items-center space-x-1 text-gray-400 hover:text-white">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{comment.likes}</span>
                        </button>
                        <button className="text-gray-400 hover:text-white">
                          <ThumbsDown className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-white text-sm">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div> */}
            {/* </div> */}
          </div>
        </div>

        {/* Sidebar - Related Video?.s */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Up Next</h3>
          {/* Related video?.s would go here */}
          {/* here real video?. will come */}
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex space-x-3 cursor-pointer hover:bg-gray-800 p-2 rounded-lg transition-colors">
                <img
                  src={`https://images.pexels.com/photos/${1000000 + i}/pexels-photo-${1000000 + i}.jpeg?auto=compress&cs=tinysrgb&w=200`}
                  alt="Related video?."
                  className="w-32 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="text-white text-sm font-medium line-clamp-2">
                    Related Video?. Title {i}
                  </h4>
                  <p className="text-gray-400 text-xs mt-1">Channel Name</p>
                  <p className="text-gray-400 text-xs">100K views • 1 day ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default VideoPlayer;