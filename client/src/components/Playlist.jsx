import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Playlist({ playlist, onDelete }) {
    return (
        <Col md={5}>
            <Link
                to={`/playlist/${playlist._id}`}
                className="d-flex align-items-center"
                style={{
                    height: "100px",
                    justifyContent: "space-between",
                }}
            >
                {playlist.songs.length < 1 ? (
                    <div
                        style={{
                            height: "100%",
                            width: "100px",
                            backgroundColor: "black",
                        }}
                    ></div>
                ) : (
                    <img
                        src={playlist.songPictures[0]}
                        style={{ height: "100%", width: "100px" }}
                    ></img>
                )}

                <div className="ml-3">
                    <div>{playlist.name}</div>
                </div>
                <i
                    onClick={onDelete}
                    className="bi bi-trash"
                    style={{ cursor: "pointer", color: "red" }}
                ></i>
            </Link>
        </Col>
    );
}

export default Playlist;
