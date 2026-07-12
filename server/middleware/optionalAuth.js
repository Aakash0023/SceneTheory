import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Like authMiddleware, but does NOT reject the request when there's no
// token — it just leaves req.user undefined so public routes (e.g. viewing
// another user's profile) still work for logged-out visitors.
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next();
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (user) {
      req.user = user;
    }

    next();
  } catch (error) {
    // Invalid/expired token on a public route shouldn't block access —
    // just treat the visitor as logged out.
    next();
  }
};

export default optionalAuth;
