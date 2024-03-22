import express from "express";
import { configDotenv } from "dotenv";
import ConnectDb from "../config/dbConnect";
import ErrorHandler from "../middleware/errorHandler";

const dotenv = configDotenv();

ConnectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(`/api/admin`, require("../routes/adminRoutes"));
app.use(ErrorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
