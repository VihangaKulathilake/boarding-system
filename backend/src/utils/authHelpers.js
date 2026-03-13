// Check if user is admin
export const isAdmin = (user) => user?.role === "admin";

// Check if user is owner of the boarding or an admin
export const isOwnerOrAdmin = (user, ownerId) =>
  isAdmin(user) || String(ownerId) === String(user?.id);
