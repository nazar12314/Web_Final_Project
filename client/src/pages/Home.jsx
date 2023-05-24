import React, { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import { Track, Player } from "../components";
import { SPOTIFY_CLIENT_ID } from "../constants";
import axios from "axios";
import './index.css'

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

    const fetchPopularTracks = () => {
        spotifyApi
          .getPlaylistTracks('37i9dQZEVXbMDoHDwVN2tF') // playlist ID 
          .then((res) => {
            setSearchResults(
              res.body.items.map((item) => {
                const track = item.track;
                return {
                  artist: track.artists[0].name,
                  title: track.name,
                  uri: track.uri,
                  albumImage: track.album.images[0]?.url,
                };
              })
            );
          })
          .catch((err) => setResponseError(err));
      };

    useEffect(() => {fetchPopularTracks();}, []);

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
                className="d-flex flex-column gap-3 general"
                style={{ height: "100vh", background: "#1a1a1a", maxWidth:"100%", color: "white", padding: "50px", paddingBottom:"80px" }}
            >
            <Form.Control
                type="search"
                placeholder="Search for a song"
                className="searchField"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ background: "#242424", 
                color: "white", 
                maxWidth:"350px",
                fontSize: "16px", }}
                
            />
                <h4 style={{margin:"0px"}}>
                {search.length > 0 && !responseError ? (
                    searchResults.length > 0 ? (
                    <p style={{margin:"0px"}}>Search results:</p>
                    ) : (
                    <p style={{margin:"0px"}}>No results found</p>
                    )
                ) : (
                    <p style={{margin:"0px"}}>Recommended tracks:</p>
                )}
                </h4>
                <div className="flex-grow-1 my-2" style={{ overflowY:"scroll"}}>
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
                    position: "fixed",
                    bottom: "0",
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
