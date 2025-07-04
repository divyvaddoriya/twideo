import mongoose from "mongoose";
import { User } from "../model/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken"

const register = asyncHandler(async (req, res) => {

    const {username , email , password , fullname  } = req.body

    if( !username || !email || !password || !fullname ){
       throw new ApiError(404 , "enter all the details");
    }

    // check if user exist by email 
    const userExistByemail = await User.findOne({email})

    if(userExistByemail) {
        throw new ApiError(400 , "user already exists with this email")
    }
    const userExistbyUsername = await User.findOne({username})

    // check if username exist already 
    if(userExistbyUsername) {
        throw new ApiError(400 , "user already exists with this username")
    }

    // check for images and check for avatar 
 
    const avatarLocalPath = req.files?.avatar[0]?.path

    // const coverImgLocalPath = req.files?.coverImg[0]?.path

    let coverImgLocalPath = "";
    if(req.files && Array.isArray(req.files.coverImg) && req.files.coverImg.length > 0 ){
        coverImgLocalPath =  req.files?.coverImg[0]?.path;
    }

    if(!avatarLocalPath) {
        throw new ApiError(409 , "avatar file is required")
    }
   
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    // console.log( " avatar " + avatar);
    
    const coverImg = await uploadOnCloudinary(coverImgLocalPath);    
    // console.log( " coverImg" + coverImg );

    if(!avatar){
        throw new ApiError(400 , "avatar is required")
    }

   const user = await User.create({
        fullname ,
        avatar: avatar.url , 
        coverImg: coverImg?.url || "" , 
        email, 
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser) throw new ApiError(500 , "something went wrong while registering user in dabtabase") 

    const {accessToken , refreshToken } = await generateAccessAndRefreshTokens(createdUser._id);

     const options = {
        httpOnly : true,
        secure: false
    }

    return res.status(201)
    .cookie("accessToken" , accessToken , options)
    .cookie("refreshToken", refreshToken , options)
    .json(
        new ApiResponse(200 ,createdUser ,"user registered succesfully")
    )
})

const generateAccessAndRefreshTokens = async (userId) => {
    try {

        const user =  await User.findById(userId);
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken() 

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave : false});

        return {accessToken , refreshToken};

    } catch (error) {
        throw new ApiError(500  , "something went wrong while generating access and refersh token")
    }
}

const login = asyncHandler(async(req, res) => {

    // check email and username if u want
    // find the user 
    // password check 
    // access and refresh token 
    // send cookie 
    const { email , password } = req.body

    // const { email , password } = req.body

    if(!email || !password) {
        throw new ApiError(404 , "enter all the fields");
    }

    const user = await User.findOne({email : email});

    if(!user){
        throw new ApiError(404 , "user not found with this email")
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid){
        throw new ApiError(404 , "enter correct password")
    }

    const {accessToken , refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const  loggedInUser= await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly : true,
        secure: false
    }

    return res
    .status(200)
    .cookie("accessToken" , accessToken , options)
    .cookie("refreshToken", refreshToken , options)
    .json(
        new ApiResponse(200 , 
            {
                user: loggedInUser,
                accessToken,
                refreshToken
            },
            "user loggged in successfully"
        )
    )

})

const logout = asyncHandler(async(req, res) =>{
    
    const userId = req.user._id;
    
    await User.findByIdAndUpdate(userId , {
        $unset: {
            refreshToken: 1,
        }
    } , {new : true})

    const options = {
        httpOnly: true,
        secure: false
    }

    return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(201 , {} , "user logged out succesfully"))
})

const refreshAccessToken = asyncHandler(async(req , res)=>{

   try {
     const incomingRefreshToken = req.cookie.refreshToken || req.body.refreshToken;
 
     if(!incomingRefreshToken) throw new ApiError(401 , "unauthorized access")
         
     const decodedToken = jwt.verify(incomingRefreshToken , process.env.REFRESH_TOKEN_SECRET);
 
     const userId = decodedToken?._id;
 
     const user = await User.findById(userId);
 
     if(!user){
         throw new ApiError(401 , "invalid refresh token ")
     }
 
     if(incomingRefreshToken !== user?.refreshToken) throw new Error(401 , "refresh token does not match or is already used")
 
         const options = {
             httpOnly: true,
             secure: true,
         }
 
       const {accessToken , refreshToken} =  await generateAccessAndRefreshTokens(user._id);
 
         return res.status(201)
         .cookie("accesstoken" , accessToken , options )
         .cookie("refreshToken" , refreshToken , options )
         .json(new ApiResponse(200 , {accessToken , refreshToken} , "access token refreshed"))
         
   } catch (error) {
    throw new ApiError(401 , error?.message || "invalid refersh token")
   }
})

const getCurrentUser = asyncHandler(async(req, res)=> {
    return res.status(200).
    json(new ApiResponse(201 , req.user , "current user is fetched"))
})

const changeCurrentPassword = asyncHandler(async(req , res)=>{
    const {oldPassword , newPassword} = req.body;
    const userId = req.user?._id;

    const user = await User.findById(userId);

 const isValidPassword =await user.isPasswordCorrect(oldPassword);

 if(!isValidPassword) {
    throw new ApiError(401 , "entered password is incorrect")
 }

 user.password = newPassword;
 await user.save({validateBeforeSave : false});

 return res.status(200).json(new ApiResponse(200 , {} , "user has successfully chnaged password"));

})

const updateAccountDetails = asyncHandler(async(req, res) => {
    const {fullname , email } = req.body;

    if(!fullname || !email){
        throw new ApiError(400 , "all fields are required");
    }

   const user = await User.findByIdAndUpdate(req.user?._id , {
        $set: {
            fullname: fullname,
            email: email,
        }
    } , {new: true}).select("-password")

    return res.status(200).json(new ApiResponse(200 , user , "account details updated successfully"));

})

const updateUserAvatar = asyncHandler(async(req, res)=> {
    
    const avatarLocalPath = req.file?.path; //here we will be adding only one file into the multer and storing them so we need only req.file 
    const userId = req.user._id;

    if(!avatarLocalPath){
        new ApiError(400 ,"please enter the avatar file")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if(!avatar){
        new ApiError(500 ,"error in uploading file in clioudinary plz try again")
    }

    const user = await User.findByIdAndUpdate(userId , {
        $set: {
            avatar: avatar.url
        }
    }, {new: true}).select("-password");

    return res.status(200).json(new ApiResponse(201 , user , "avatar file is pdated succesfully"))
})

const updateUserCoverImg = asyncHandler(async(req, res)=> {
    
    const coverImgLocalPath = req.file?.path; //here we will be adding only one file into the multer and storing them so we need only req.file 
    const userId = req.user._id;

    if(!coverImgLocalPath){
        new ApiError(400 ,"please enter the cover image file")
    }

    const coverImg = await uploadOnCloudinary(coverImgLocalPath);

    if(!coverImg){
        new ApiError(500 ,"error in uploading cover image file in clioudinary plz try again")
    }

    const user = await User.findByIdAndUpdate(userId , {
        $set: {
            coverImg: coverImg.url
        }
    }, {new: true}).select("-password");

    return res.status(200).json(new ApiResponse(201 , user , "cover image file is updated succesfully"))
})

const getUserChannelProfie = asyncHandler(async(req,res)=>{
    const  {username} = req.params;

    if(!username?.trim()){
        throw new ApiError(400 , "username is missing");
    }

   const channel = await User.aggregate([
        {
            $match: {
                username: username?.toLowerCase(),
            }
        },
        {
            // here foreignfield will be channel means all the subscribe field where channel is this user all that user we need
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers",
            }
        },
        {
            // this will how many channel i have subscribed to 
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as: "subscribedTo",
            }
        },
        {
            $addFields: {
                subscriberCount: {
                    $size: "$subscribers"
                },
                channelsSubscribedToCount: {
                    $size: "$subscribedTo"
                },
                isSubscribed: {
                    $cond: {
                        if: { $in: [req.user?._id , "$subscribers.subscriber"] },
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project: {
                fullName: 1,
                username: 1,
                subscriberCount: 1,
                channelsSubscribedToCount: 1,
                isSubscribed: 1,
                avatar: 1,
                coverImg: 1,
                email: 1
            }
        }
    ])


    if(!channel?.length){
        throw new ApiError(404 ,  "requested channel not found");
    }
    
    console.log("channel" + channel);

    return res.status(200).json(new ApiResponse(201 , channel[0] , "channel is fetched succesfully"))

})

const getWatchHistory = asyncHandler(async(req , res)=>{

    const  user =  await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "watchhistory",
                foreignField: "_id",
                as: "WatchHistory",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            foreignField: "_id",
                            localField: "owner",
                            as: "owner",
                        }
                    },
                    {
                        $project: {
                            fullName: 1,
                            avatar: 1,
                            username: 1,
                        }
                    },
                    {
                        $addFields: {
                            owner: {
                                $first : "$owner"
                            }
                        }
                    }
                ]
            }
        }
    ])

    return res.status(200).json(new ApiResponse(201 , user[0].watchHistory, "watch history is fetched succesfully"))
})

export {
    register , 
    login ,
    logout ,
    refreshAccessToken ,
    getCurrentUser,
    changeCurrentPassword,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImg,
    getUserChannelProfie,
    getWatchHistory
}