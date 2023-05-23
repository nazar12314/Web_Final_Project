import React from "react";
import { Col } from "react-bootstrap";
import axios from "axios";

function ModalPlaylist({ playlist, track, setShowDialog }) {
    const addSong = async () => {
        try {
            await axios.post(
                `http://localhost:8080/api/playlists/add-song/${playlist._id}`,
                { author: localStorage.getItem("user"), song: track }
            );
        } catch (error) {
            console.log(error);
        }

        setShowDialog(false);
    };

    return (
        <Col
            md={12}
            className="d-flex align-items-center"
            style={{
                height: "100px",
                justifyContent: "space-between",
                cursor: "pointer",
            }}
            onClick={addSong}
        >
            {playlist.songs.length <= 0 && (
                <div
                    style={{
                        height: "100%",
                        width: "100px",
                        backgroundColor: "black",
                    }}
                ></div>
            )}

            <div className="ml-3">
                <div>{playlist.name}</div>
            </div>
        </Col>
    );
}

export default ModalPlaylist;
