export const AUTH_TOKEN_KEY = "token";
export const AUTH_USER_KEY = "user";


export const saveAuthSession = ({ token, user }) => {
  if (token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }
  if (user) {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  }
};

export const clearAuthSession = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
};

export const getAuthToken = () => localStorage.getItem(AUTH_TOKEN_KEY);

export const getCurrentUser = () => {
  const raw = localStorage.getItem(AUTH_USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const isAuthenticated = () => Boolean(getAuthToken() && getCurrentUser());

export const getDefaultRouteByRole = (role) => {
  if (role === "landlord") return "/dashboard";
  if (role === "tenant") return "/client-home";
  return "/login";
};
