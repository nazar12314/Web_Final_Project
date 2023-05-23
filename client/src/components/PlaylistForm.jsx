import {React, useState} from 'react';
import {useNavigate} from "react-router-dom"
import axios from "axios"

const PlaylistForm = () => {
  const [playlistName, setPlaylistName] = useState("");
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setPlaylistName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle the form submission here (e.g., send data to the server)
    console.log("Playlist Name:", playlistName);
    // Reset the form after submission
    setPlaylistName("");

    try {
      await axios.post(
          "http://localhost:8080/api/playlists/create-playlist",
          {name : playlistName, author: localStorage.getItem("user")}
      );

      // navigate("/")
      window.location.reload();
  } catch (error) {
      console.log(error);
      console.log("failed adding");
  }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Playlist Name:
        <input type="text" value={playlistName} onChange={handleInputChange} />
      </label>
      <button type="submit">Create Playlist</button>
    </form>
  );
};

export default PlaylistForm;
