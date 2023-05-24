import { React, useState } from "react";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import axios from "axios";
import "./components.css";

const PlaylistForm = () => {
    const [playlistName, setPlaylistName] = useState("");

    const handleInputChange = (e) => {
        setPlaylistName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPlaylistName("");

        try {
            await axios.post(
                "http://localhost:8080/api/playlists/create-playlist",
                { name: playlistName, author: localStorage.getItem("user") }
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Form
            className="formClass"
            styles={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "row",
            }}
        >
            <Col
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "30px",
                    gap: "10px",
                }}
            >
                <Form.Group controlId="playlistName">
                    <Form.Control
                        type="text"
                        value={playlistName}
                        onChange={handleInputChange}
                        placeholder="Playlist Name"
                        className="spotify-input"
                    />
                </Form.Group>
                <Button
                    variant="dark"
                    type="submit"
                    onClick={handleSubmit}
                    className="spotify-button"
                >
                    Create Playlist
                </Button>
            </Col>
        </Form>
    );
};

export default PlaylistForm;
