import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

// all compulsary middlewares
app.use(cors({
    origin : process.env.CORS_ORIGIN ,
    credentials : true ,
}))
app.use(express.json({limit : "16kb"})) //when there is data coming in form of json 
app.use(express.urlencoded({extended: true , limit: "16kb"})) // when u want to send data from url into the app u use uelendcoded
app.use(express.static("public"))
app.use(cookieParser())  //it make cookie easily redable from your application 



import userRoutes from "./src/routes/auth.route.js";
// routes configuration 
app.use('/api/v1/user' , userRoutes);

export { app }