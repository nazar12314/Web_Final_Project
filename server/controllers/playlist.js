import Playlist from "../models/Playlist";

export const createPlaylist = async (req, res) => {
    const name = req.body.name;

    try {
        const newPlaylist = new Playlist({ name });
        await newPlaylist.save();
        res.status(201).json(newPlaylist);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const addSongToPlaylist = async (req, res) => {
    try {
        const song = req.body.song;
        const id = req.params.id;

        const playlist = await Playlist.findById(id);

        const playlistSongs = playlist.songs.push(song);

        const updatedPost = await Playlist.findByIdAndUpdate(id, {
            songs: playlistSongs,
        });

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteSongFromPlaylist = async () => {
    try {
        const song = req.body.song;
        const id = req.params.id;

        const playlist = await Playlist.findById(id);

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
        const playlists = await Playlist.find(id);
        res.status(200).json(playlists);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
