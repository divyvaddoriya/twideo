import { Tweet } from "../model/tweet.model.js";
import { User } from "../model/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addTweet = asyncHandler(async (req , res)=>{

    const { content } = req.body;

    if(!content) throw new ApiError ( 400 ,"enter content for tweet");

    const tweet = await Tweet.create({
        content , 
        owner : req.user._id,
    })

    res.status(200).json(200 , tweet ,new ApiResponse("tweet created succesfully"));
})

const removeTweet = asyncHandler(async(req , res) =>{
    
    const {tweetId}  = req.params;

    if(!tweetId) throw new ApiError(404 , "no tweet id entered")

    const removedTweet = await Tweet.findByIdAndDelete(tweetId);

    if(!removedTweet) throw new ApiError(500 , "no tweet deleted server side error")

    res.status(200).json(new ApiResponse(201 , "tweet deleted successfully"));
})

const getTweetFeed = asyncHandler(async(req , res) => {
    
    const allTweet = await Tweet.find().populate({ path :"owner" , select: "-password"})

        if(!allTweet) throw new ApiError(200 , "error in fetching all tweets");

            res.status(200).json(new ApiResponse(201 , allTweet , "all tweet fetched succesfully"));
})

const getAllTweetByChannel = asyncHandler(async(req, res) => {
    const { channelId } = req.params

     if(!channelId) throw new ApiError(200 , "no channel id provided");

    const allTweetByChannel = await Tweet.find({owner : channelId});

    return res.status(200).json(201 , allTweetByChannel , "all tweet fetched of channel")
})

const getAllTweetByMe = asyncHandler(async(req,res)=>{
   
     if(!req.user._id) throw new ApiError(200 , "no user founded login first");

    const allTweetByme = await Tweet.find({owner : req.user._id});

    return res.status(200).json(201 , allTweetByme , "all tweet fetched of channel")
})

export {
    addTweet,
    removeTweet, 
    getTweetFeed,
    getAllTweetByChannel,
    getAllTweetByMe
}