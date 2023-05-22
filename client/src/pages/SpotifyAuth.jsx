import React from "react";
import { Button, Container } from "react-bootstrap";
import { AUTH_URL } from "../constants";
import { Navigate } from "react-router-dom";

const SpotifyAuth = () => {
    console.log("SpotifyAuth container created");
    const token = localStorage.getItem("token");
    const isAuthorized = !!token;
    const accessToken = localStorage.getItem("accessToken");

    if (!isAuthorized){
        return <Navigate to="/signup" />;
    }
    if (!accessToken){
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
    }
    return <Navigate to="/" />;
};

export default SpotifyAuth;
