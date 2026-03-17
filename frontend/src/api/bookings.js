import axiosInstance from "./axios";
import { toApiError } from "./errors";

const BOOKINGS_BASE = "/bookings";

export const createBooking = async (bookingData) => {
  try {
    const { data } = await axiosInstance.post(BOOKINGS_BASE, bookingData);
    return data;
  } catch (error) {
    throw toApiError(error, "Failed to create booking.");
  }
};

export const getBookings = async (params = {}) => {
  try {
    const { data } = await axiosInstance.get(BOOKINGS_BASE, { params });
    return data;
  } catch (error) {
    throw toApiError(error, "Failed to fetch bookings.");
  }
};

export const getBookingById = async (bookingId) => {
  try {
    const { data } = await axiosInstance.get(`${BOOKINGS_BASE}/${bookingId}`);
    return data;
  } catch (error) {
    throw toApiError(error, "Failed to fetch booking.");
  }
};

export const updateBookingStatus = async (bookingId, status) => {
  try {
    const { data } = await axiosInstance.put(`${BOOKINGS_BASE}/${bookingId}`, { status });
    return data;
  } catch (error) {
    throw toApiError(error, "Failed to update booking status.");
  }
};

export const deleteBooking = async (bookingId) => {
  try {
    const { data } = await axiosInstance.delete(`${BOOKINGS_BASE}/${bookingId}`);
    return data;
  } catch (error) {
    throw toApiError(error, "Failed to delete booking.");
  }
};
