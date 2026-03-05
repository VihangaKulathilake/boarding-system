import axiosInstance from "./axios";
import { toApiError } from "./errors";

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw toApiError(error, "Registration failed.");
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/login", userData);
    return response.data;
  } catch (error) {
    throw toApiError(error, "Login failed.");
  }
};
