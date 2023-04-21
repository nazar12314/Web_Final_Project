import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";

const app = express();

app.use(express.json());
app.use("/api/auth", authRouter);
mongoose.set("strictQuery", true);

const start = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://nazar:qwerty123@cluster0.y2vlb.mongodb.net/web_final_project?retryWrites=true&w=majority"
        );
        console.log("Connected to the database");
        app.listen(8080);
    } catch (error) {
        console.log(error.message);
    }
};

start();
