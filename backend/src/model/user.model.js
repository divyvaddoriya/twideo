import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    username: {
        type:   String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    email : {
        type: String,
        unique: true,
        required: [true, "email is required"],
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        min: [6 , "password should be minimum of 6 letters"] ,
        max: [20 , "password should not be greater than 20 letter"]
    },
    fullName: {
        type: String,
        required: true,
        index: true,
    },
    avatar: {
        type: String, // cloudinary url 
        required: true
    },
    coverImage: {
        type: String, // cloudinary url 
    },
    watchHistory: [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    refreshToken : {
        type: String,
    }
} , { timestamps : true })

userSchema.pre("save" ,async function (next) {

    if(!this.isModified("password")) return next();
    // here is modified means if u are not changing the password then u should continue

    this.password = bcrypt.hash(this.password , 10);
    next();
}) // arrow funciton does not have this object so we have to use function 

userSchema.methods.isPasswordCorrect = async function (password) {
    return  await bcrypt.compare(password  , this.password);
}

userSchema.methods.generateAccessToken = function(){
    jwt.sign(
        {
            _id: this._id,
            email : this.email,
            username: this.username,
            fullName : this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
     jwt.sign(
        {
            _id: this._id,
            email : this.email,
            username: this.username,
            fullName : this.fullName,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User" , userSchema);
// this name will be stored in data base as users 