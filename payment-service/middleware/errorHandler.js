import { AppBaseError } from "../exceptions/baseException.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof AppBaseError) {
    console.log(err.message);
    res.status(err.status).json({
      message: err.message,
      type: err.type,
    });
  } else {
    res.status(500).json({
      message: err.message,
      type: "Internal Server Error",
    });
  }
};

export default errorHandler;
