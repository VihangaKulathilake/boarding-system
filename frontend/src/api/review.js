import axiosInstance from "./axios";
import { toApiError } from "./errors";

const reviewApi = {
    async createReview(reviewData) {
        try {
            const response = await axiosInstance.post("/reviews", reviewData);
            return response.data;
        } catch (error) {
            throw toApiError(error, "Failed to create review");
        }
    },
    async getReviews() {
        try {
            const response = await axiosInstance.get("/reviews");
            return response.data;
        } catch (error) {
            throw toApiError(error, "Failed to fetch reviews");
        }
    },
    async getReviewById(id) {
        try {
            const response = await axiosInstance.get(`/reviews/${id}`);
            return response.data;
        } catch (error) {
            throw toApiError(error, "Failed to fetch review");
        }
    },
    async getReviewsByBoardingId(id) {
        try {
            const response = await axiosInstance.get(`/reviews/boarding/${id}`);
            return response.data;
        } catch (error) {
            throw toApiError(error, "Failed to fetch reviews by boarding id");
        }
    },
    async updateReview(id, reviewData) {
        try {
            const response = await axiosInstance.put(`/reviews/${id}`, reviewData);
            return response.data;
        } catch (error) {
            throw toApiError(error, "Failed to update review");
        }
    },
    async deleteReview(id) {
        try {
            const response = await axiosInstance.delete(`/reviews/${id}`);
            return response.data;
        } catch (error) {
            throw toApiError(error, "Failed to delete review");
        }
    }
};

export default reviewApi;