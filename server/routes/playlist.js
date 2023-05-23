import {
    createPlaylist,
    addSongToPlaylist,
    deleteSongFromPlaylist,
    getPlaylist,
    getPlaylists,
    deletePlaylist,
} from "../controllers/playlist.js";
import express from "express";

const playlistRouter = express.Router();

playlistRouter.post("/create-playlist", createPlaylist);
playlistRouter.post("/add-song/:id", addSongToPlaylist);
playlistRouter.post("/delete-song/:id", deleteSongFromPlaylist);
playlistRouter.get("/get-playlists/:id", getPlaylists);
playlistRouter.get("/get-playlist/:id", getPlaylist);
playlistRouter.delete("/delete-playlist/:id", deletePlaylist);

export default playlistRouter;
