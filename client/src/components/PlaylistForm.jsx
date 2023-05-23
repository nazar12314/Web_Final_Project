import { React, useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

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
        <Form>
            <Row>
                <Form.Group controlId="playlistName" as={Col} md={8}>
                    <Form.Label></Form.Label>
                    <Form.Control
                        type="text"
                        value={playlistName}
                        onChange={handleInputChange}
                        placeholder="Playlist Name:"
                    />
                </Form.Group>
                <Button
                    variant="dark"
                    type="submit"
                    as={Col}
                    md={4}
                    onClick={handleSubmit}
                >
                    Create Playlist
                </Button>
            </Row>
        </Form>
    );
};

export default PlaylistForm;
