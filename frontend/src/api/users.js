import axiosInstance from "./axios";
import { toApiError } from "./errors";

// API functions for managing users: fetch all users, fetch by ID, fetch by role, get current user, update, delete, and search
const USERS_BASE = "/users";

export const getMe = async () => {
  try {
    const { data } = await axiosInstance.get(`${USERS_BASE}/me`);
    return data;
  } catch (error) {
    throw toApiError(error, "Failed to fetch profile.");
  }
};

export const updateMe = async (userData) => {
  try {
    const { data } = await axiosInstance.put(`${USERS_BASE}/me`, userData);
    return data;
  } catch (error) {
    throw toApiError(error, "Failed to update profile.");
  }
};

export const changePassword = async (passwordData) => {
  try {
    const { data } = await axiosInstance.put(`${USERS_BASE}/me/password`, passwordData);
    return data;
  } catch (error) {
    throw toApiError(error, "Failed to change password.");
  }
};

export const getUsers = async (params = {}) => {
  try {
    const { data } = await axiosInstance.get(USERS_BASE, { params });
    return data;
  } catch (error) {
    throw toApiError(error, "Failed to fetch users.");
  }
};

export const getUserById = async (userId) => {
  if (!userId) {
    throw new Error("userId is required");
  }
  try {
    const { data } = await axiosInstance.get(`${USERS_BASE}/${userId}`);
    return data;
  } catch (error) {
    throw toApiError(error, "Failed to fetch user.");
  }
};

export const getUserByRole = async (role) => {
  try {
    const { data } = await axiosInstance.get(`${USERS_BASE}`, { params: { role } });
    return data;
  } catch (error) {
    throw toApiError(error, "Failed to fetch users by role.");
  }
};

export const getCurrentUser = async () => {
  try {
    const { data } = await axiosInstance.get(`${USERS_BASE}/current-user`);
    return data;
  } catch (error) {
    throw toApiError(error, "Failed to fetch current user.");
  }
};

export const updateUser = async (userId, userData) => {
  if (!userId) {
    throw new Error("userId is required");
  }
  try {
    const { data } = await axiosInstance.put(`${USERS_BASE}/${userId}`, userData);
    return data;
  } catch (error) {
    throw toApiError(error, "Failed to update user.");
  }
};

export const deleteUser = async (userId) => {
  if (!userId) {
    throw new Error("userId is required");
  }
  try {
    const { data } = await axiosInstance.delete(`${USERS_BASE}/${userId}`);
    return data;
  } catch (error) {
    throw toApiError(error, "Failed to delete user.");
  }
};

export const searchUsers = async (query, params = {}) => {
  try {
    const { data } = await axiosInstance.get(`${USERS_BASE}/search`, { params: { ...params, query } });
    return data;
  } catch (error) {
    throw toApiError(error, "Failed to search users.");
  }
};
