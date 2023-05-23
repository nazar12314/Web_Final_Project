import React from "react"

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track)
  }

  return (
    <div
      className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer" }}
      onClick={handlePlay}
    >
      <img src={track.albumImage} style={{ height: "64px", width: "64px" }} />
      <div className="ml-3">
        <div>{track.artist}</div>
        <div className="text-muted">{track.title}</div>
      </div>
    </div>
  )
}