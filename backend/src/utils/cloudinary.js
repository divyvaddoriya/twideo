import { v2 as cloudinary } from 'cloudinary';
import  fs  from "fs"

// Configuration
cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });   

const uploadOnCloudinary = async(localFilePath) => {
    try {
        if(!localFilePath) return null;

        // upload file on cloudinary
        const response =await cloudinary.uploader.upload(localFilePath , {
            resource_type : "auto"
        })

        // file has been succesfully uploaded
        console.log("file has been uploaded succesfully" + response.url);
        return response;

    } catch (error) {
        // if file is on your local server means has been added to your public folder but has not been upladed on cloudinary means now u have to delete this un uploaded file 
        // so for that you use unlink from fs to delete that file 
        fs.unlinkSync(localFilePath)
        console.error("error in uploadind file");
        return null;
    }
}

export {uploadOnCloudinary};