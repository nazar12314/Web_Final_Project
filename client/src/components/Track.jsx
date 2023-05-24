import React, { useState } from "react";
import { Modal, Row } from "react-bootstrap";
import ModalPlaylist from "./ModalPlaylist";
import "./components.css";

export default function TrackSearchResult({
    track,
    chooseTrack,
    playlists,
    addPlaylist,
}) {
    const [showDialog, setShowDialog] = useState(false);

    const handlePlay = () => {
        chooseTrack(track);
    };

    const handleDialogToggle = () => {
        setShowDialog(!showDialog);
    };

    return (
        <div style={{display: "flex", alignItems: "center"}}>
        <div
            className="d-flex m-2 align-items-center track"
            style={{
                cursor: "pointer",
                gap: "20px",
                justifyContent: "space-between",
                margin: "10px",
                width: "95%"
            }}
            onClick={handlePlay}
        >
            <div
                style={{
                    gap: "20px",
                    margin: "10px",
                    display: "flex",
                }}
            >
                <img
                    src={track.albumImage}
                    style={{ height: "64px", width: "64px" }}
                />
                <div className="ml-3">
                    <div>{track.artist}</div>
                    <div className="text-muted">{track.title}</div>
                </div>
            </div>
            <div>
            </div>
            </div>
            {addPlaylist && (
                <div className="addButton">
                    <span
                        onClick={handleDialogToggle}
                        className="bi bi-plus plusToggle"
                        style={{ fontSize: "24px" }}
                    ></span>
                </div>
            )}
            <Modal show={showDialog} onHide={handleDialogToggle}>
                <Modal.Header closeButton style={{ color: "white" }}>
                    <Modal.Title>Choose playlist to add:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                                <ModalPlaylist
                                    playlist={playlist}
                                    key={playlist._id}
                                    track={track}
                                    setShowDialog={setShowDialog}
                                />
                            ))}
                    </Row>
                </Modal.Body>
            </Modal>
        </div>
    );
}
