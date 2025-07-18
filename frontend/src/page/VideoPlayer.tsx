import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, Share, Save, MoreHorizontal, Bell, BellOff } from 'lucide-react';
import { getVideoData } from '@/api/video';
import { addLike, removeLike } from '@/api/like';
import { subscribe, unsubscribe } from '@/api/subscribe';

const VideoPlayer = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
//   const [comment, setComment] = useState('');
//  const [loading , setLoading ] = useState(false);
const [video , setVideo ] = useState();
  // Mock data - replace with actual API calls
  
  const { videoId }  = useParams();
 const fetchVideoData = async () => {
  const videoData = await getVideoData(videoId);
  console.log("video " + JSON.stringify(videoData.data.data[0]));
  const fetchedVideo = videoData.data.data[0];
  setVideo(fetchedVideo);
  setIsSubscribed(fetchedVideo.owner[0]?.isSubscribed || false); // ✅ Use the fetched data directly
}
  useEffect(() => {
    fetchVideoData();
  } , [videoId]);

 const handleLike = async () => {
  if (!video) return;

  const type = "video"; // ✅ Move this here

  try {
    if (video.isLiked) {
      const likedVideo = await removeLike(type, video._id);
      console.log("Removed like:", likedVideo);
    } else {
      const like = await addLike(type, video._id);
      console.log("Added like:", like);
    }
    await fetchVideoData(); // ✅ Always refresh after like/unlike
  } catch (err) {
    console.error("Error liking video:", err);
  }
};

const handleSubscribe =async (channelId)=>{
  console.log(video?.owner[0]._id);
  
  if(isSubscribed){
    await unsubscribe(channelId);
    console.log("toggle to " + isSubscribed);
  }
  else{
    await subscribe(channelId);
  }
  
}

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
               
               {/* like */}
                {/* <div className="flex items-center space-x-2"> */}
  <div className="flex items-center bg-gray-700 rounded-full">
    <button
      onClick={handleLike}
      className={`flex items-center space-x-2 px-4 py-2 hover:bg-gray-600 rounded-l-full ${
        video?.isLiked ? "bg-blue-600" : ""
      }`}
    >
      <ThumbsUp className="w-5 h-5" />
      <span>{video?.likeCount}</span>
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
                  src={video?.owner[0]?.avatar}
                  alt={video?.owner[0]?.username}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-white">{video?.owner[0]?.username}</h3>
                  {/* <p className="text-gray-400 text-sm">{video?.channel.subscribers}</p> */}
                </div>
              </div>
              
              <button
                onClick={async () =>{
                  await handleSubscribe(video?.owner[0]._id);
                  
                  setIsSubscribed(!isSubscribed)}}
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
                {video?.description?.split('\n').map((line, index) => (
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

      
      </div>
    </div>
  );
  
};

export default VideoPlayer;