import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Home,
    Login,
    Signup,
    SpotifyAuth,
    Playlists,
    PlaylistDetail,
} from "./pages";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { CustomNavbar } from "./components";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <CustomNavbar />
                <Home />
            </ProtectedRoute>
        ),
    },
    { path: "/spotify-auth", element: <SpotifyAuth /> },
    { path: "/signup", element: <Signup /> },
    { path: "/login", element: <Login /> },
    {
        path: "/playlists",
        element: (
            <ProtectedRoute>
                <CustomNavbar />
                <Playlists />
            </ProtectedRoute>
        ),
    },
    {
        path: "/playlist/:id",
        element: (
            <ProtectedRoute>
                <CustomNavbar />
                <PlaylistDetail />
            </ProtectedRoute>
        ),
    },
]);

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
