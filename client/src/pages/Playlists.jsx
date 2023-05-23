import { React, useEffect } from "react";
import axios from "axios";
import { useFetchPlaylists } from "../hooks";
import { PlaylistBar, PlaylistForm } from "../components";
import { Container } from "react-bootstrap";

const Playlists = () => {
    const { playlists, fetchData } = useFetchPlaylists();

    useEffect(() => {
        fetchData();
    }, [playlists]);

    const handleDeletePlaylist = async (id) => {
        try {
            await axios.delete(
                `http://localhost:8080/api/playlists/delete-playlist/${id}`
            );
            fetchData();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <div>
                <h1>Create New Playlist</h1>
                <PlaylistForm />
            </div>
            <PlaylistBar
                playlists={playlists}
                handleDeletePlaylist={handleDeletePlaylist}
            />
        </Container>
    );
};

export default Playlists;
