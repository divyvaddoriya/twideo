import axios from "axios";
export const subscribe = async (channelId) =>
  await axios.post(`http://localhost:3000/api/v1/subscribtion/${channelId}`, { withCredentials: true });

export const unsubscribe = async (channelId) =>
  await axios.delete(`http://localhost:3000/api/v1/subscribtion/${channelId}`, {
    withCredentials: true,
  });
