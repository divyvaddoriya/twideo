import { Subscriptions } from "../model/subscriptions.model.js";
import { Tweet } from "../model/tweet.model.js";
import { User } from "../model/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const subscribe = asyncHandler(async (req , res)=>{

    const { channelId  } = req.body;
  
    const channel = await User.findById(channelId);

    if(!channel) throw new ApiError(400 , "no channel exist by this userId");

    const subsbsription = await Subscriptions.create({
        subscriber : req.user._id ,
        channel: channel._id
    })

    res.status(200).json(200 , subsbsription ,new ApiResponse("subscribed succesfully"));
})


// unsubscribe login is wrong here 
// update it as soon as possible 
// here i need when i load a user i need to knoow wheather that video channel is subscribed by user or not;

const unsubscribe = asyncHandler(async (req , res)=>{

    const { channelId  } = req.body;

    const channel = await User.findById(channelId);

    if(!channel) throw new ApiError(400 , "no channel exist by this userId");

    const subsbsription = await Subscriptions.findOneAndDelete({
        channel: channelId , subscriber: req.user._id
    })

    res.status(200).json(200 , subsbsription ,new ApiResponse("subscribed succesfully"));
})

export {
    subscribe,
    unsubscribe
}