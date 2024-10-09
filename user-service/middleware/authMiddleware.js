import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { CustomError } from "../exceptions/baseException.js";
import { tryCatch } from "../utils/tryCatchWrapper.js";

// Middleware to protect routes, verifying JWT token
const protect = tryCatch(async (req, res, next) => {
  let token;

  // Extracting JWT token from Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1]; // Extracting the token part
  }

  if (!token) {
    res.status(401);
    throw new CustomError("Not authorized, no token"); // Error message for missing token
  }

  // Verifying and decoding JWT token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Finding user by decoded user ID and excluding password field
  req.user = await User.findById(decoded.userId).select("-password");

  if (!req.user) {
    res.status(401);
    throw new CustomError("Not authorized, user not found"); // Error message for user not found
  }

  next(); // Proceeding to next middleware
});

// Middleware to check user roles
const checkRole = tryCatch((roles) => {
  return (req, res, next) => {
    // Checking if user exists and has required role
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403);
      throw new CustomError(
        `Not authorized, ${roles.join(" or ")} role required`
      ); // Error message for insufficient role
    }
    next(); // Proceeding to next middleware
  };
});

export { protect, checkRole };
