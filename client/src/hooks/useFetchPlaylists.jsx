import React, { useState } from "react";
import axios from "axios";

const useFetchPlaylists = () => {
    const [playlists, setPlaylists] = useState([]);
    const userId = localStorage.getItem("user");

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

    return { playlists, fetchData };
};

export default useFetchPlaylists;
