import { React } from "react";
import Playlist from "../components/Playlist.jsx";
import { Row } from "react-bootstrap";

const Playlistbar = ({ playlists, handleDeletePlaylist }) => {
    return (
        <Row
            className="d-flex"
            style={{
                gap: "20px",
                paddingTop: "20px",
                justifyContent: "space-between",
            }}
        >
            {playlists.length > 0 &&
                playlists.map((playlist) => (
                    <Playlist
                        playlist={playlist}
                        key={playlist._id}
                        onDelete={() => handleDeletePlaylist(playlist._id)}
                    />
                ))}
        </Row>
    );
};

export default Playlistbar;
