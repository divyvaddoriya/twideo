import axios from "axios";
export const addLike = async (type, videoId) =>
  await axios.post(`http://localhost:3000/api/v1/like`, { type, id: videoId }, { withCredentials: true });

export const removeLike = async (type, videoId) =>
  await axios.delete(`http://localhost:3000/api/v1/like`, {
    data: { type, id: videoId },
    withCredentials: true,
  });
