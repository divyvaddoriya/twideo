import { configDotenv } from "dotenv";
import { DBconnect } from "./src/db/DBconnect.js";
import { app } from "./app.js";

configDotenv();

const port = process.env.PORT || 8000; 

DBconnect().then(()=>{
    app.listen(port , () => {
        console.log("server is running on !! ", port);
    })
})
.catch((err)=>{
    console.log("MONGO DB CONNECTION FAILED !!!!" , err);
});