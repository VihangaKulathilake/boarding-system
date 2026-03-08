// Check if user is admin
const isAdmin = (user) => user?.role === "admin";

// Check if user is owner of the boarding or an admin
const isOwnerOrAdmin = (user, ownerId) =>
  isAdmin(user) || String(ownerId) === String(user?.id);
