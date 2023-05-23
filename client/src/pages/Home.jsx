import React, { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import { Track, Player } from "../components";
import { SPOTIFY_CLIENT_ID } from "../constants";
import axios from "axios";

const spotifyApi = new SpotifyWebApi({
    clientId: SPOTIFY_CLIENT_ID,
});

const Home = () => {
    const userId = localStorage.getItem("user");
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState({});
    const [responseError, setResponseError] = useState("");
    const [playingTrack, setPlayingTrack] = useState([]);
    const [playlists, setPlaylists] = useState([]);

    function chooseTrack(track) {
        setPlayingTrack(track);
        setSearch("");
    }

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/playlists/get-playlists/${userId}`
                );

                setPlaylists(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Container
                className="d-flex flex-column p-5 gap-3"
                style={{ height: "100vh" }}
            >
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
                            <Track
                                track={track}
                                key={track.uri}
                                chooseTrack={chooseTrack}
                                playlists={playlists}
                            />
                        ))}
                    <p>{responseError && !!responseError}</p>
                </div>
            </Container>
            <div
                className="bottom-player"
                style={{
                    position: "sticky",
                    bottom: 0,
                    width: "100%",
                    margin: 0,
                }}
            >
                <Player
                    accessToken={accessToken}
                    trackUri={playingTrack?.uri}
                />
            </div>
        </>
    );
};

export default Home;
