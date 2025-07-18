// // api/auth.ts
// import axios from "axios";

import axios from "axios";

// const API_URL = "http://localhost:3000/api/v1/tweet";

// export const addTweet = async (videoData : any ) => {
//   try {
//     const response = await axios.post(API_URL, tweetData, {
//       withCredentials: true,
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     return response;
//   } catch (error) {
//     console.log("error adding tweet ");
//     throw error;
//   }
// };

// export const fetchTweet = async () => {
//   try {
//     const response = await axios.get(`${API_URL}`);
//     return response.data;
//   } catch (error) {
//     console.log("error fetching your feed of tweets");
//     throw error;
//   }
// };



const API_BASE_URL =   'http://localhost:3000/api/v1';

export const fetchTweets = async ()=> {
  try {
    const response = await axios.get(`${API_BASE_URL}/tweet`, {
    withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tweets:', error);
    throw error;
  }
};

export const fetchUserTweets = async (channelId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tweet/${channelId}`, {
   withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching user tweets:', error);
    throw error;
  }
};

export const createTweet = async (content: string)=> {
  try {
    const response = await axios.post(`${API_BASE_URL}/tweet`, {
        content
    } , {
        withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error creating tweet:', error);
    throw error;
  }
};

export const deleteTweet = async (tweetId)=>{
  try {
    const response = await axios.delete(`${API_BASE_URL}/tweet/${tweetId}`,{
        withCredentials: true
    });
    return response.data ;
  } catch (error) {
    console.error('Error deleting tweet:', error);
    throw error;
  }
};