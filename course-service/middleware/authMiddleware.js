import jwt from "jsonwebtoken";

import { CustomError } from "../exceptions/baseException.js";
import axios from "axios";

export const protect = async (req, res, next) => {
  let token;

  try {
    token = req.cookies.jwt;

    if (!token) {
      throw new CustomError("Not authorized, no token", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("decoded", decoded);

    // const data = await axios.get(
    //   `http://localhost:8000/api/user/${}`
    // );
    // const dataFromOtherAPI = data.data;

    // req.user = await User.findById(decoded.userId).select("-password");

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
    // console.log("role >>>", role);
    // console.log("req.user >>>", req.user);
    // console.log("pass >>>", req.user.role === role);
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
