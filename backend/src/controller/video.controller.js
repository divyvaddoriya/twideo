import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Video } from "../model/video.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import mongoose from "mongoose";
const addVideo = asyncHandler(async (req, res) => {
  const { title, description, isPublished } = req.body;
  const user = req.user;

  if (!title && !description)
    throw new ApiError(404, "fill all required field");

  const videoFileLocalPath = req.files?.videoFile[0]?.path;

  if (!videoFileLocalPath) throw new ApiError(400, "videofile is required");

  const thumbnailLocalPath = req.files?.thumbnail[0]?.path;

  if (!thumbnailLocalPath) throw new ApiError(400, "thumbnail is required");

  const videoFile = await uploadOnCloudinary(videoFileLocalPath);
  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

  if (!videoFile || !thumbnail)
    throw new ApiError(
      500,
      "error in uploading into cloudinary video or thumbnail",
    );

  const video = await Video.create({
    videoFile: videoFile.url,
    thumbnail: thumbnail.url,
    title: title,
    description: description,
    duration: videoFile.duration,
    views: 0,
    isPublished: isPublished || true,
    owner: user._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(201, video, "video uploaded succesfully"));
});

const getFeed = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 2,
    query = "",
    sortBy = "createdAt",
    sortType = "desc",
    userId,
  } = req.query;

  // Convert to correct types
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const sortDirection = sortType === "asc" ? 1 : -1;

  // Build search + filter
  const searchFilter = {
    ...(query && {
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    }),
    ...(userId && { owner: userId }, { isPublished: true }),
  };

  const videos = await Video.find(searchFilter)
    .sort({ [sortBy]: sortDirection })
    .skip((pageNum - 1) * limitNum)
    .limit(limitNum)
    .populate([{ path: "owner", select: "-password" }]);

  const total = await Video.countDocuments(searchFilter);

  res.status(200).json({
    data: videos,
    page: pageNum,
    totalPages: Math.ceil(total / limitNum),
    totalResults: total,
  });
});

const getSingleVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  // const video = await Video.findById(videoId).populate("owner");

  const video = await Video.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(videoId),
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "video",
        as: "likes",
      },
    },
    {
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "owner",
        as: "owner",
        pipeline: [
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
        ]
      },
    },
    {
      $addFields: {
        likeCount: {
          $size: "$likes",
        },
        isLiked: {
          $cond: {
            if: { $in: [req.user?._id, "$likes.likedBy"] },
            then: true,
            else: false,
          },
        },
      },
    },
    
  ]);

  if (!video) {
    throw new ApiError("video by this id does not exist");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, video, "video fetched successfully"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
});


export { addVideo, getFeed, getSingleVideo };
