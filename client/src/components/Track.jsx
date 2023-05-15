import { useState } from "react";

const Track = ({ track }) => {
    return (
        <div className={`d-flex m-2 align-items-center`}>
            <img
                src={track.albumImage}
                style={{ height: "64px", width: "64px" }}
            />
            <div
                style={{
                    marginLeft: "20px",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <h5>{track.artist}</h5>
                <h6 className="text-muted">{track.title}</h6>
            </div>
        </div>
    );
};

export default Track;
