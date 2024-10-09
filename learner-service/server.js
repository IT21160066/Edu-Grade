import express from "express";
import cors from "cors";
import ConnectDB from "./config/db.js";
import enrollRoutes from "./routes/enroll.route.js";
import errorHandler from "./middleware/errorHandler.js";
import completeContent from "./routes/contentCompletion.route.js";

const app = express();
const PORT = process.env.PORT || 3011;

app.use(cors());
app.use(express.json());

ConnectDB();
app.use("/enrollment", enrollRoutes);
app.use("/complete", completeContent);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
