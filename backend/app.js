import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

// all compulsary middlewares
app.use(cors({
    origin : "http://localhost:5173" ,
    credentials : true ,
}))
app.use(express.json({limit : "16kb"})) //when there is data coming in form of json 
app.use(express.urlencoded({extended: true , limit: "16kb"})) // when u want to send data from url into the app u use uelendcoded
app.use(express.static("public"))
app.use(cookieParser())  //it make cookie easily redable from your application 

import userRoutes from "./src/routes/auth.route.js";
import videoRoutes from "./src/routes/video.route.js";
import commentRoutes from "./src/routes/comment.route.js";
import tweetRoutes from "./src/routes/tweet.route.js";
import likeRoutes from "./src/routes/like.route.js";
import subscribtionRoutes from "./src/routes/subscription.route.js";
// routes configuration 
app.use('/api/v1/user' , userRoutes);
app.use('/api/v1/video' , videoRoutes);
app.use('/api/v1/comment' , commentRoutes);
app.use('/api/v1/tweet' , tweetRoutes);
app.use('/api/v1/like' , likeRoutes);
app.use('/api/v1/subscribtion' , subscribtionRoutes);

export { app }