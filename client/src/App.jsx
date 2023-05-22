import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Home, Login, Signup, SpotifyAuth, Playlists } from "./pages";
import { CustomNavbar } from "./components";
import { useAuth } from "./hooks";
import { ProtectedRoute } from "./components/ProtectedRoute";

const code = new URLSearchParams(window.location.search).get("code");

const App = () => {
    const navigate = useNavigate();

    const accessToken = useAuth(code);

    if (accessToken && !localStorage.getItem("accessToken"))
        localStorage.setItem("accessToken", accessToken);

    const token = localStorage.getItem("token");
    const isAuthorized = !!token;

    return (
        <>

            <Routes>
                <Route path="/" element={<ProtectedRoute><CustomNavbar /><Home /></ProtectedRoute>} />
                <Route path="/spotify-auth" element={<SpotifyAuth />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/playlists" element={<ProtectedRoute><CustomNavbar /><Playlists /></ProtectedRoute>} />
            </Routes>
        </>
    );
};

export default App;
