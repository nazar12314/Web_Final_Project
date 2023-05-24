import React, { createContext, useState } from "react";

// Create a new context
const PlayerContext = createContext();

// Create a provider component to wrap your app
const PlayerProvider = ({ children }) => {
  const [playerState, setPlayerState] = useState({
    trackId: null,
    timestamp: 0,
  });

  // Update the player state
  const updatePlayerState = (trackId, timestamp) => {
    setPlayerState({ trackId, timestamp });
  };

  return (
    <PlayerContext.Provider value={{ playerState, updatePlayerState }}>
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerProvider };
