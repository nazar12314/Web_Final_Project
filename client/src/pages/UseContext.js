import React, { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("user");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState({});
  const [responseError, setResponseError] = useState("");
  const [playingTrack, setPlayingTrack] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  return (
    <AppContext.Provider
      value={{
        accessToken,
        userId,
        search,
        setSearch,
        searchResults,
        setSearchResults,
        responseError,
        setResponseError,
        playingTrack,
        setPlayingTrack,
        playlists,
        setPlaylists
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
