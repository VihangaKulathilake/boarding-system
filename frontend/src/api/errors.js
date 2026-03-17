export class ApiError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = "ApiError";
    this.status = options.status ?? null;
    this.code = options.code ?? null;
    this.details = options.details ?? null;
    this.isNetworkError = options.isNetworkError ?? false;
  }
}

// Convert an Axios error into a standardized ApiError with relevant information extracted from the response
export const toApiError = (error, fallbackMessage = "Request failed") => {
  const response = error?.response;

  // If there's no response, it's likely a network error, so we return an ApiError with a specific message and flag
  if (!response) {
    return new ApiError("Network error. Please check your connection.", {
      isNetworkError: true,
      code: error?.code ?? null,
    });
  }

  // Extract a meaningful message from the server response, falling back to a generic message if necessary
  const serverMessage =
    response?.data?.message ||
    response?.data?.error ||
    response?.statusText ||
    fallbackMessage;

  // Return a new ApiError with the extracted message and additional details from the response for better error handling in the application
  return new ApiError(serverMessage, {
    status: response.status,
    code: response?.data?.code ?? null,
    details: response?.data ?? null,
  });
};
