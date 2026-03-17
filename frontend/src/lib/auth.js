export const AUTH_TOKEN_KEY = "token";
export const AUTH_USER_KEY = "user";

// Save authentication session data to local storage
export const saveAuthSession = ({ token, user }) => {
  if (token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }
  if (user) {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  }
};

// Clear authentication session data from local storage
export const clearAuthSession = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
};

// Helper functions to retrieve auth data and check authentication status
export const getAuthToken = () => localStorage.getItem(AUTH_TOKEN_KEY);

// Get current user data from local storage, return null if not found or if parsing fails
export const getCurrentUser = () => {
  const raw = localStorage.getItem(AUTH_USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

// Check if the user is authenticated by verifying the presence of both token and user data
export const isAuthenticated = () => Boolean(getAuthToken() && getCurrentUser());

// Determine the default route based on the user's role
export const getDefaultRouteByRole = (role) => {
  if (role === "admin") return "/admin/dashboard";
  if (role === "landlord") return "/dashboard";
  if (role === "tenant") return "/client-home";
  return "/login";
};
