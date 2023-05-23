import { Col } from "react-bootstrap";

function Playlist({ playlist, onDelete }) {
    return (
        <Col
            md={5}
            className="d-flex align-items-center"
            style={{
                height: "100px",
                justifyContent: "space-between",
                cursor: "pointer",
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
        </Col>
    );
}

export default Playlist;
