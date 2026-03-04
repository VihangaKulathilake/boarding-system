export const LOGIN_MESSAGES = {
  defaultError: "Login failed. Please try again.",
  invalidCredentials: "Invalid email or password.",
  missingFields: "Email and password are required.",
  networkError: "Unable to reach server. Check your connection.",
  authenticating: "Authenticating...",
  authenticate: "Authenticate",
};

export const getLoginErrorMessage = (error) => {
  if (!error?.response) {
    return LOGIN_MESSAGES.networkError;
  }

  const serverMessage = String(error.response?.data?.message || "").trim();
  const normalized = serverMessage.toLowerCase();

  if (normalized.includes("invalid credential")) {
    return LOGIN_MESSAGES.invalidCredentials;
  }

  if (normalized.includes("email and password are required")) {
    return LOGIN_MESSAGES.missingFields;
  }

  return serverMessage || LOGIN_MESSAGES.defaultError;
};
