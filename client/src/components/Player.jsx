import { useState, useEffect } from "react"
import SpotifyPlayer from "react-spotify-web-playback"

const Player = ({ accessToken, trackUri }) => {
  const [play, setPlay] = useState(false)

  useEffect(() => setPlay(true), [trackUri])

  const isList = Array.isArray(trackUri)

  if (!accessToken) return null
  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      callback={state => {
        if (!state.isPlaying) setPlay(false)
      }}
      play={play}
      uris={trackUri ? (isList ? trackUri : [trackUri]) : []}
      hideAttribution={true}
      styles={{ activeColor: '#fff',
      bgColor: '#333',
      color: '#fff',
      loaderColor: '#fff',
      sliderColor: '#1cb954', 
      trackArtistColor: '#ccc', 
      trackNameColor: '#fff'}}
    />
  )
}

export default Player;
