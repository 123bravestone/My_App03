import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRouter from "./routes/userRouter.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/api/user", userRouter);

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Database server is running on port: ${PORT}`)
    )
  )
  .catch((error) => console.log("Error connecting to MongoDB: ", error));
