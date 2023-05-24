import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container } from "react-bootstrap";
import { Track } from "../components";

const PlaylistDetail = () => {
    const { id } = useParams();
    const [playlistData, setPlaylistData] = useState([]);
    const [playlistName, setPlaylistName] = useState([]);

    const zipArraysIntoObjects = (keys, arrays) => {
        const length = Math.min(...arrays.map((array) => array.length));
        const zipped = [];

        for (let i = 0; i < length; i++) {
            const obj = {};
            keys.forEach((key, index) => {
                obj[key] = arrays[index][i];
            });
            zipped.push(obj);
        }

        return zipped;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/playlists/get-playlist/${id}`
                );

                const data = response.data;

                const zippedData = zipArraysIntoObjects(
                    ["artist", "albumImage", "title", "uri"],
                    [
                        data.songAuthors,
                        data.songPictures,
                        data.songTitles,
                        data.songs,
                    ]
                );

                setPlaylistData(zippedData);
                setPlaylistName(data.name);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <Container
            className="d-flex flex-column gap-3 general"
            style={{
                height: "100vh",
                background: "#1a1a1a",
                maxWidth: "100%",
                color: "white",
                padding: "50px",
                paddingBottom: "80px",
            }}
        >
            <h2>{playlistName}</h2>
            {playlistData.length > 0 &&
                playlistData.map((track) => (
                    <Track
                        track={track}
                        key={track.uri}
                        // chooseTrack={chooseTrack}
                        playlists={[]}
                        addPlaylist={false}
                    />
                ))}
        </Container>
    );
};

export default PlaylistDetail;
