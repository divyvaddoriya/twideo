import { Comment } from "../model/comment.model.js";
import { Video } from "../model/video.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addComment = asyncHandler(async (req , res)=>{

    const {  videoId , content } = req.body;

    if(!content) throw new ApiError ( 400 ,"enter content for comment")

    const video = await Video.findById(videoId);

    if(!video) throw new ApiError(400 , "no video exist by this userId");

    const comment = await Comment.create({
        content , 
        owner : req.user._id,
        video : video._id
    })

    res.status(200).json(200 , comment ,new ApiResponse("comment created succesfully"));
})

export {
    addComment
}