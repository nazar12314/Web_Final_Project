import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
                    ["artist", "picture", "title", "uri"],
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

    console.log(playlistData);

    return (
        <>
            <h1>{playlistName}</h1>
            {playlistData.length > 0 &&
                playlistData.map((track) => (
                    <div>
                        <h2>{track.artist}</h2>
                        <h2>{track.title}</h2>
                        <img
                            src={track.picture}
                            style={{ height: "100px", width: "100px" }}
                        />
                    </div>
                ))}
        </>
    );
};

export default PlaylistDetail;
