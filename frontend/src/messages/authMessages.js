export const LOGIN_MESSAGES = {
  defaultError: "Login failed. Please try again.",
  invalidCredentials: "Invalid email or password.",
  missingFields: "Email and password are required.",
  networkError: "Unable to reach server. Check your connection.",
  authenticating: "Authenticating...",
  authenticate: "Authenticate",
};

export const REGISTER_MESSAGES = {
  defaultError: "Registration failed. Please try again.",
  userExists: "This email is already registered.",
  missingFields: "All fields are required.",
  weakPassword: "Password must be at least 8 characters.",
  networkError: "Unable to reach server. Check your connection.",
  creating: "Creating account...",
  create: "Launch Account",
  success: "Account created successfully. Redirecting to login...",
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

export const getRegisterErrorMessage = (error) => {
  if (!error?.response) {
    return REGISTER_MESSAGES.networkError;
  }

  const serverMessage = String(error.response?.data?.message || "").trim();
  const normalized = serverMessage.toLowerCase();

  if (normalized.includes("already exists") || normalized.includes("already registered")) {
    return REGISTER_MESSAGES.userExists;
  }

  if (normalized.includes("all fields are required")) {
    return REGISTER_MESSAGES.missingFields;
  }

  if (normalized.includes("at least 8")) {
    return REGISTER_MESSAGES.weakPassword;
  }

  return serverMessage || REGISTER_MESSAGES.defaultError;
};
