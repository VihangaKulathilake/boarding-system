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

export const toApiError = (error, fallbackMessage = "Request failed") => {
  const response = error?.response;

  if (!response) {
    return new ApiError("Network error. Please check your connection.", {
      isNetworkError: true,
      code: error?.code ?? null,
    });
  }

  const serverMessage =
    response?.data?.message ||
    response?.data?.error ||
    response?.statusText ||
    fallbackMessage;

  return new ApiError(serverMessage, {
    status: response.status,
    code: response?.data?.code ?? null,
    details: response?.data ?? null,
  });
};
