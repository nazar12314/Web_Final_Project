import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PlaylistDetail = () => {
    const { id } = useParams();
    const [playlistData, setPlaylistData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/playlists/get-playlist/${id}`
                );

                setPlaylistData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {playlistData?.songs?.length > 0 &&
                playlistData.songs.map((song) => <h2>{song}</h2>)}
        </>
    );
};

export default PlaylistDetail;
