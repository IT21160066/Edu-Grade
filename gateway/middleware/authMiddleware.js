import jwt from "jsonwebtoken";
import { CustomError } from "../exceptions/baseException.js";

export const protect = async (req, res, next) => {
  let token;
  console.log(req.cookies);
  try {
    if (req.url && req.url == "/api/user/auth") {
      next();
    }

    token = req.cookies;
    console.log(token);

    if (!token) {
      throw new CustomError("Not authorized, no token", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // req.user = await User.findById(decoded.userId).select("-password");

    req.user = await fetch("http://localhost:8001/api/user/" + decoded.userId, {
      method: "GET",
    });

    if (!req.user) {
      throw new CustomError("Unauthorized, user not found", 401);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const checkRole = (role) => {
  return (req, res, next) => {
    try {
      if (!req.user || req.user.role !== role) {
        throw new CustomError(`Access denied, ${role} role required`, 403);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
