import React from "react";
import { Button, Container } from "react-bootstrap";
import { AUTH_URL } from "../constants";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks";

const code = new URLSearchParams(window.location.search).get("code");

const SpotifyAuth = () => {
    const token = localStorage.getItem("token");
    const isAuthorized = !!token;

    const accessToken = useAuth(code);

    if (accessToken && !localStorage.getItem("accessToken"))
        localStorage.setItem("accessToken", accessToken);

    if (!isAuthorized) {
        return <Navigate to="/signup" />;
    }
    if (!localStorage.getItem("accessToken")) {
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
