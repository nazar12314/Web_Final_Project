import React from 'react';
import { useState } from "react";
import Playlist from "./Playlist";

const Playlistbar = (playlists) => {

    function handleClick(playlist) {
        // add to database
        playlist.handleAdd(track);
      }
    

    return (
        <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
            <h3>playlists</h3>
            {playlists.map((playlist) => (
                        <p1 onClick={() => (handleClick, playlist)}>{playlist.name}</p1>
                    ))}
            </div>
    );
}

export default Playlist;
