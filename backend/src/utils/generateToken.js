import jwt from "jsonwebtoken";

const signToken = (user) =>
  jwt.sign(
    { user: { id: user.id, role: user.role } },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

export default signToken;
