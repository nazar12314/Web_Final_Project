import React, { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import { Track, Player } from "../components";

const spotifyApi = new SpotifyWebApi({
    clientId: "534fc98e66604af6b74ba67486f7590a",
});

const Home = () => {
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState({});

    const accessToken = localStorage.getItem("accessToken");
    spotifyApi.setAccessToken(accessToken);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            if (!search) return;
            spotifyApi.searchTracks(search).then((res) => {
                setSearchResults(
                    res.body.tracks.items.map((track) => ({
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumImage: track.album.images[0]?.url,
                    }))
                );
            });
        }, 500);

        return () => {
            clearTimeout(debounceTimer);
        };
    }, [search, accessToken]);

    return (
        <Container className="d-flex flex-column p-5 gap-3">
            <h2>
                <b>User: </b>
                {localStorage.getItem("user")}
            </h2>
            <Form.Control
                type="search"
                placeholder="Search for a song"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
                {searchResults.length > 0 &&
                    searchResults.map((track) => (
                        <Track track={track} key={track.uri} />
                    ))}
            </div>
            <div className="">
                <Player />
            </div>
        </Container>
    );
};

export default Home;
