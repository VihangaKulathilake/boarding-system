import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization || "";

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "Server auth configuration error" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};

// Like protect, but doesn't block requests without a token.
// Populates req.user if a valid token is provided, otherwise continues without it.
export const optionalProtect = (req, res, next) => {
  const authHeader = req.headers.authorization || "";

  if (!authHeader.startsWith("Bearer ")) {
    return next(); // no token — that's fine
  }

  const token = authHeader.split(" ")[1];

  try {
    if (process.env.JWT_SECRET) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;
    }
  } catch {
    // invalid token — ignore, proceed as unauthenticated
  }

  return next();
};

export const authorizeRoles = (...roles) => (req, res, next) => {
  const userRole = req.user?.role;

  if (!userRole) {
    return res.status(401).json({ message: "Not authorized, user role missing" });
  }

  if (!roles.includes(userRole)) {
    return res.status(403).json({ message: "Forbidden: insufficient role permissions" });
  }

  return next();
};

