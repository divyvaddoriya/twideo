import { User } from "../model/user.model.js";
import { ApiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async(req, res , next) => {
    
   try {

    // console.log(req.cookies);
    
     const token = req.cookies?.accessToken 
    // this authorization header is for mobile device

     if(!token){
         throw new ApiError(401 , "unauthorized request")
     }

     const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
 
     const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
 
     if(!user) throw new ApiError(401 , "invalid access token")
 
     req.user = user;
 
     next();
   } catch (error) {
        throw new ApiError(401, error?.message || "invalid access token");
   }
    
})