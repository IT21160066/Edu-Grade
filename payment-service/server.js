import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import morgan from "morgan";
import Stripe from "stripe";

import errorHandler from "./middleware/errorHandler.js";

import checkoutRoutes from "./routes/payment.route.js";

const app = express();

const PORT = process.env.PORT || 9000;
connectDB();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

// app.get("/", (req, res) => {
//   res.json({ message: "Proxy is working 👌" });
// });

export const stripe = new Stripe(process.env.SECRET_KEY);

app.use("/checkout", checkoutRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Node server listening at PORT ${PORT}`);
});
