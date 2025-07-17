// api/auth.ts
import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/video";

export const addVideo = async (videoData : any ) => {
  try {
    const response = await axios.post(API_URL, videoData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.log("error adding video ");
    throw error;
  }
};

export const fetchVideos = async (page) => {
  try {
    const response = await axios.get(`${API_URL}/?page=${page}`);
    return response.data;
  } catch (error) {
    console.log("error fetching your feed");
    throw error;
  }
};

export const getVideoData = async (videoId)=>{
   try {
    const response = await axios.get(`${API_URL}/${videoId}`);
    console.log("api video" + response);
    
    return response;
  } catch (error) {
    console.log("error fetching your feed");
    throw error;
  }
}