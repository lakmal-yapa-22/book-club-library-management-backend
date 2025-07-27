// src/app.ts
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { ConnectDb } from "./db/db";
import rootRouter from "./routes/routes";

import {ErrorHandler} from "./middleware/errorHandeler";
import notifyRoutes from "./routes/notifyRoutes";


dotenv.config();

const app = express();

const PORT = process.env.SERVER_PORT || 3000;

const corsOptions = {
  origin: process.env.CLIENT_ORIGIN,
  credentials: true,
  methods: "GET,POST,PUT,PATCH,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/notify", notifyRoutes);
app.use("/api", rootRouter);

// Error handling middleware
app.use(ErrorHandler);

// Connect to MongoDB and start server
ConnectDb()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error("Failed to connect to DB", error);
      process.exit(1);
    });

