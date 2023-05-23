import mongoose from "mongoose";

const PlaylistScheme = new mongoose.Schema({
    name: { type: String, required: true },
    author: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    songs: [String],
});

const model = mongoose.model("Playlist", PlaylistScheme);

export default model;
