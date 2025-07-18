import { Like } from "../model/like.model.js";
import { Tweet } from "../model/tweet.model.js";
import { Video } from "../model/video.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addLike = asyncHandler(async (req , res)=>{

    // here type can be anything like = video , tweet , comment
    const { type , id } = req.body;

    if(!id | !type) throw new ApiError ( 400 ," no anything to like , what to like")

    let toBeLiked;
    if(type == "video")  {
    toBeLiked = await Video.findById(id);
    }
 if(type == "comment"){
     toBeLiked = await Comment.findById(id);
}
if(type == "tweet"){
    toBeLiked = await Tweet.findById(id);
}

if(!toBeLiked) throw new ApiError("there is nothing to like")

    const like = await Like.create({
        type : toBeLiked,
        likedBy: req.user._id,
    })

    res.status(200).json(new ApiResponse(200 , like ,"liked succesfully"));
})

// this one is not right logic it need to be changed 
const removeLike = asyncHandler(async (req, res) => {
  const { type, id } = req.body;
  if (!id || !type) throw new ApiError(400, "Missing like target");

  let removedLikeFrom;
  if (type == "video") removedLikeFrom = await Like.findOneAndDelete({ video: id, likedBy: req.user._id });
  if (type == "tweet") removedLikeFrom = await Like.findOneAndDelete({ tweet: id, likedBy: req.user._id });
  if (type == "comment") removedLikeFrom = await Like.findOneAndDelete({ comment: id, likedBy: req.user._id });

  if (!removedLikeFrom) throw new ApiError(400, "Like not removed");

  res.status(200).json(new ApiResponse(200, removedLikeFrom, "Like removed successfully"));
});


export {
    addLike,
    removeLike
}