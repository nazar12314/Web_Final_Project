import React, { useEffect, useState } from "react";
import { Modal, Row } from "react-bootstrap";
import ModalPlaylist from "./ModalPlaylist";
import axios from "axios";

export default function TrackSearchResult({ track, chooseTrack, playlists }) {
    const [showDialog, setShowDialog] = useState(false);

    const handlePlay = () => {
        chooseTrack(track);
    };

    const handleDialogToggle = () => {
        setShowDialog(!showDialog);
    };

    return (
        <div
            className="d-flex m-2 align-items-center"
            style={{
                cursor: "pointer",
                gap: "20px",
                justifyContent: "space-between",
            }}
            onClick={handlePlay}
        >
            <div
                style={{
                    gap: "20px",
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

            <i
                onClick={handleDialogToggle}
                className="bi bi-plus"
                style={{ fontSize: "24px" }}
            ></i>

            <Modal show={showDialog} onHide={handleDialogToggle}>
                <Modal.Header closeButton>
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
                                    track={track.uri}
                                    setShowDialog={setShowDialog}
                                />
                            ))}
                    </Row>
                </Modal.Body>
            </Modal>
        </div>
    );
}
