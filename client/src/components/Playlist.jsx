import React from 'react';
import { useState } from "react";
import Track from "./Track";
import axios from 'axios';

function Playlist({playlist}) {

    
    const handleDelete = async (e) =>
    {
    e.preventDefault();
    console.log("Playlist Name:", playlist._id);
    try {
        await axios.post(
            `http://localhost:8080/api/playlists/delete-playlist/${playlist._id}`
            // {id : playlist, author: localStorage.getItem("user")}
        );
    } catch (error) {
        console.log(error);
        console.log("failed deleting");
    }
}
        
    return (
        <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
            <h3>{playlist.name}</h3>
            <button type = "Submit" onClick={handleDelete}>Delete</button>
            {/* {tracks.map((track) => (
                        <Track track={track} key={track.uri} />
                    ))} */}
            </div>
    );
}

export default Playlist;

  