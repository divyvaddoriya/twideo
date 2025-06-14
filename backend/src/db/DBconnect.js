import mongoose from "mongoose";
import { DB_NAME } from "../../constant.js";

export const DBconnect = async () =>{
    try {

        const connectionInstance =await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

        console.log("Data base connected successfully " + connectionInstance.connection.port);
        
    } catch (error) {

        console.error("error in connecting data base " + error);
        process.exit(1)

    }
}