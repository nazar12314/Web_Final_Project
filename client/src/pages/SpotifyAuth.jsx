import React from "react";
import { Button, Container } from "react-bootstrap";
import { AUTH_URL } from "../constants";

const SpotifyAuth = () => {
    return (
        <Container
            style={{ height: "100vh" }}
            className="d-flex justify-content-center align-items-center"
        >
            <Button
                href={AUTH_URL}
                className="btn-success btn-lg"
                type="submit"
            >
                Login spotify
            </Button>
        </Container>
    );
};

export default SpotifyAuth;
