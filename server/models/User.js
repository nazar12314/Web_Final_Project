import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { required: true, type: String },
    password: { required: true, type: String },
});

const model = mongoose.model("User", UserSchema);
export default model;
