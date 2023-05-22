import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth";
import playlistRouter from "./routes/playlist";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/playlists", playlistRouter);
mongoose.set("strictQuery", true);

const start = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.y2vlb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
        );
        console.log("Connected to the database");
        app.listen(8080);
    } catch (error) {
        console.log(error.message);
    }
};

start();
