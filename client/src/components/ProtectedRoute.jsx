import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const isAuthorized = !!token;

    const accessToken = localStorage.getItem("accessToken");

    console.log(isAuthorized);

    if (isAuthorized) {
        if (accessToken){
            return children;
        }
        return <Navigate to="/spotify-auth" />; // navigate to SpotifyAuth
    }
    return <Navigate to="/signup" />; // navigate to signup
  };