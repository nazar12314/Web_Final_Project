import {React, useState, useEffect} from 'react';
import PlaylistForm from '../components/PlaylistForm.jsx';
import Playlist from '../components/Playlist.jsx';
import axios from 'axios';

const Playlists = () => {

    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const fetchAccessToken = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/playlists/get-playlists/${localStorage.getItem(
                        "user"
                    )}`
                );

                setPlaylists(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchAccessToken();
    }, []);

    function handleDelete(e){
        console.log("delete");
        console.log(e);
    }

  return (
    <>
    <div>
      <h1>Create New Playlist</h1>
      <PlaylistForm />
    </div>
    {
    playlists.length > 0 ? 
        playlists.map((playlist) => (
            <div>

            <Playlist playlist={playlist} key={playlist.name}
            onClick = {handleDelete}
            />
            {/* <h4
                onClick={handleDelete}
                style={{
                    position: "relative",
                    marginLeft: "auto",
                    color: "#1DB954",
                    display: "flex", 
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer"
                }}
            >
                Delete </h4> */}
            </div>
            ))
         : <h2>No available playlists</h2>
    }
      </>
  );
};

export default Playlists;