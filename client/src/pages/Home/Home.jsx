import React, { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import { Track, Player } from "../../components";
import SpotifyPlayer from "react-spotify-player";

const spotifyApi = new SpotifyWebApi({
    clientId: "0dc9a9a29bb946609a69ff4d365123cd",
});

const size = {
    width: "100%",
    height: 300,
};
const view = "list"; // or 'coverart'
const theme = "black"; // or 'white'

const Home = () => {
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState({});
    const [responseError, setResponseError] = useState("");

    const accessToken = localStorage.getItem("accessToken");
    spotifyApi.setAccessToken(accessToken);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            if (!search) return;
            spotifyApi
                .searchTracks(search)
                .then((res) => {
                    setSearchResults(
                        res.body.tracks.items.map((track) => ({
                            artist: track.artists[0].name,
                            title: track.name,
                            uri: track.uri,
                            albumImage: track.album.images[0]?.url,
                        }))
                    );
                })
                .catch((err) => setResponseError(err));
        }, 500);

        return () => {
            clearTimeout(debounceTimer);
        };
    }, [search, accessToken]);

    return (
        <Container className="d-flex flex-column p-5 gap-3">
            <h2>
                <b>Find a track:</b>
            </h2>
            <Form.Control
                type="search"
                placeholder="Search for a song"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
                {searchResults.length > 0 &&
                    !responseError &&
                    searchResults.map((track) => (
                        <Track track={track} key={track.uri} />
                    ))}
                <p>{responseError && !!responseError}</p>
            </div>
            <div className="">
                <SpotifyPlayer
                    uri="spotify:album:1TIUsv8qmYLpBEhvmBmyBk"
                    size={size}
                    view={view}
                    theme={theme}
                />
            </div>
        </Container>
    );
};

export default Home;
