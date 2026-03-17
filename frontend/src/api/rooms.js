import axiosInstance from "./axios";
import { toApiError } from "./errors";

// API functions for managing rooms: create, read, update, delete, search, and filter
const ROOMS_BASE = "/rooms";

export const createRoom = async (roomData) => {
  try {
    const { data } = await axiosInstance.post(ROOMS_BASE, roomData);
    return data;
  } catch (error) {
    throw toApiError(error, "Failed to create room.");
  }
};

export const getRooms = async (params = {}) => {
  try {
    const { data } = await axiosInstance.get(ROOMS_BASE, { params });
    return data;
  } catch (error) {
    throw toApiError(error, "Failed to fetch rooms.");
  }
}; 

export const getRoomByBoardingId = async (boardingId) => {
  if (!boardingId) {
    throw new Error("boardingId is required");
  }
  try {
    const { data } = await axiosInstance.get(`${ROOMS_BASE}/boarding/${boardingId}`);
    return data;
  } catch (error) {
    throw toApiError(error, "Failed to fetch room by boarding ID.");
  }
};

export const updateRoom = async (roomId, roomData) => {
  if (!roomId) {
    throw new Error("roomId is required");
  }
  try {
    const { data } = await axiosInstance.put(`${ROOMS_BASE}/${roomId}`, roomData);
    return data;
  } catch (error) {
    throw toApiError(error, "Failed to update room.");
  }
};

export const deleteRoom = async (roomId) => {
  if (!roomId) {
    throw new Error("roomId is required");
  }
  try {
    const { data } = await axiosInstance.delete(`${ROOMS_BASE}/${roomId}`);
    return data;
  } catch (error) {
    throw toApiError(error, "Failed to delete room.");
  }
};
