import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routes from "./routes/routes.js";

dotenv.config(); // load env

const app = express();
const port = process.env.PORT || 3000;

// db stuff
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

// Middleware
app.use(express.json());
app.use(cors()); // enable cors beacause reasons

// Routes
app.use("/api/products", routes); // temp routes

// errors

app.listen(port, () => console.log(`Server listening on port ${port}`));
