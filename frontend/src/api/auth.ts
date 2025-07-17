import axios from "axios";
import { access } from "fs";

const API_URL = "http://localhost:3000/api/v1/user";


export const registerUser =async(userData) => {
 try {
   const user = await axios.post(`${API_URL}/register`, userData, {
     headers: {
       "Content-Type": "multipart/form-data",
     },
   });
   return user;
 } catch (error) {
  console.log("error registering user" , error);
 }
}

export const loginUser = async (credentials) =>{
 try {
  const user = await axios.post(`${API_URL}/login`, credentials, {
     headers: {
       "Content-Type": "application/json",
     },
   }); 
   return user;
 } catch (error) {
  console.log("error logining user " , error);
 }
}

export const logoutUser =async () => {
  try {
    await axios.post(`${API_URL}/logout`)
    return;
  } catch (error) {
    console.log("error in logging out of user");
  }
}
