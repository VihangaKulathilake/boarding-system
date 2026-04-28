import axiosInstance from "./axios";
import { toApiError } from "./errors";

async function getRecommendations(user, boardings) {
  const res = await axiosInstance.post("http://127.0.0.1:8000/recommend", {
    user,
    boardings
  });

  return res.data;
}