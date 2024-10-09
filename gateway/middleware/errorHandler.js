import { AppBaseError } from "../exceptions/baseException.js";
import { logEvents } from "./logger.js";

const errorHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}: ${err.message}\t${res.method}\t${req.url}\t${req.headers.origin}`,
    "errLog.log"
  );

  console.log("error >>", err.message);

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
