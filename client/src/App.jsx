import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Home, Login, Signup, SpotifyAuth, Playlists } from "./pages";
import { CustomNavbar } from "./components";
import { useAuth } from "./hooks";

const code = new URLSearchParams(window.location.search).get("code");

const App = () => {
    const navigate = useNavigate();

    const accessToken = useAuth(code);

    if (accessToken && !localStorage.getItem("accessToken"))
        localStorage.setItem("accessToken", accessToken);

    const token = localStorage.getItem("token");
    const isAuthorized = !!token;

    useEffect(() => {
        navigate("/");
    }, [token]);

    return (
        <>
            {isAuthorized && localStorage.getItem("accessToken") && (
                <CustomNavbar />
            )}
            <Routes>
                {isAuthorized ? (
                    localStorage.getItem("accessToken") ? (
                        <Route path="/" element={<Home />} />
                    ) : (
                        <Route path="/" element={<SpotifyAuth />} />
                    )
                ) : (
                    <Route path="/" element={<Navigate to="/signup" />} />
                )}
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/playlists" element={<Playlists />} />
            </Routes>
        </>
    );
};

export default App;
