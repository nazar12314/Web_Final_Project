import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Playlist({ playlist, onDelete }) {
    return (
        <Col
            md={5}
            className="d-flex align-items-center"
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignContent: "center",
                // backgroundColor: "#3b3b3b",
                flexDirection: "column",
                borderRadius: "7px",
                color: "wheat",
                textDecoration: "none",
            }}
        >
            <Link to={`/playlist/${playlist._id}`}>
                {playlist.songs.length < 1 ? (
                    <img
                        src={
                            "https://i.scdn.co/image/ab67706c0000da8472badcebb8ffa6cd66172621"
                        }
                        style={{
                            height: "150px",
                            width: "150px",
                        }}
                    ></img>
                ) : (
                    <img
                        src={playlist.songPictures[0]}
                        style={{ height: "100%", width: "150px" }}
                    ></img>
                )}
            </Link>

            <div style={{ display: "flex", gap: "10px" }}>
                <div className="ml-3">
                    <div>{playlist.name}</div>
                </div>
                <i
                    onClick={onDelete}
                    className="bi bi-trash"
                    style={{ cursor: "pointer", color: "red" }}
                ></i>
            </div>
        </Col>
    );
}

export default Playlist;
