import Playlist from "../models/Playlist.js";

export const createPlaylist = async (req, res) => {
    const { name, author } = req.body;

    try {
        const newPlaylist = new Playlist({ name, author });
        await newPlaylist.save();
        res.status(201).json(newPlaylist);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const addSongToPlaylist = async (req, res) => {
    try {
        const { author, song, songPicture } = req.body;
        const id = req.params.id;

        const playlist = await Playlist.findById(id);

        if (playlist.author != author)
            res.status(300).json({
                message: "This user has no access to specified playlist",
            });

        const playlistSongs = [...playlist.songs, song];
        const playlistSongPictures = [...playlist.songPictures, songPicture];

        const updatedPost = await Playlist.findByIdAndUpdate(id, {
            songs: playlistSongs,
            songPictures: playlistSongPictures,
        });

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteSongFromPlaylist = async () => {
    try {
        const { song, author } = req.body;
        const id = req.params.id;

        const playlist = await Playlist.findById(id);

        if (playlist.author != author)
            res.status(300).json({
                message: "This user has no access to specified playlist",
            });

        const playlistSongs = playlist.songs.filter((item) => item != song);

        const updatedPost = await Playlist.findByIdAndUpdate(id, {
            songs: playlistSongs,
        });

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getPlaylist = (req, res) => {
    try {
        const id = req.params.id;
        const playlist = Playlist.findById(id);
        res.status(200).json(playlist);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getPlaylists = async (req, res) => {
    try {
        const author = req.params.id;

        const playlists = await Playlist.find({ author: author });
        res.status(200).json(playlists);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deletePlaylist = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedPlaylist = await Playlist.findByIdAndDelete(id);

        if (!deletedPlaylist) {
            return res.status(404).json({ message: "Playlist not found!" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
