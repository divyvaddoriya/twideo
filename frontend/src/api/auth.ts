// api/auth.ts
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/v1/user",
  withCredentials: true,
});

export const registerUser = (userData) =>
  API.post("/register", userData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const loginUser = (credentials) =>
  API.post("/login", credentials, {
    headers: {
      "Content-Type": "application/json",
    },
  }); ;

export const logoutUser = () =>
  API.post("/logout");
