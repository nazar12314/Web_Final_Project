import {
    createPlaylist,
    addSongToPlaylist,
    deleteSongFromPlaylist,
    getPlaylist,
    getPlaylists,
} from "../controllers/playlist";

const playlistRouter = express.Router();

playlistRouter.post("/create-playlist", createPlaylist);
playlistRouter.post("/add-song/:id", addSongToPlaylist);
playlistRouter.post("/delete-song/:id", deleteSongFromPlaylist);
playlistRouter.get("/get-playlists", getPlaylists);
playlistRouter.get("/get-playlist/:id", getPlaylist);

export default playlistRouter;
