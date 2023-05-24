import React from "react";
import { Col } from "react-bootstrap";
import axios from "axios";

function ModalPlaylist({ playlist, track, setShowDialog }) {
    const addSong = async () => {
        try {
            await axios.post(
                `http://localhost:8080/api/playlists/add-song/${playlist._id}`,
                {
                    author: localStorage.getItem("user"),
                    song: track.uri,
                    songPicture: track.albumImage,
                    title: track.title,
                    songAuthor: track.artist,
                }
            );
        } catch (error) {
            console.log(error);
        }

        setShowDialog(false);
    };

    return (
        <Col
            md={12}
            className="d-flex align-items-center choosePlaylist"
            style={{
                height: "100px",
                justifyContent: "space-between",
                cursor: "pointer",
            }}
            onClick={addSong}
        >
            {playlist.songs.length < 1 ? (
                <div
                    style={{
                        height: "90%",
                        width: "90px",
                        backgroundColor: "#3f3f3f",
                    }}
                ></div>
            ) : (
                <img
                    src={playlist.songPictures[0]}
                    style={{ height: "90%", width: "90px" }}
                ></img>
            )}
    
            <div className="ml-3">
                <div>{playlist.name}</div>
            </div>
        </Col>
    );
}

export default ModalPlaylist;
