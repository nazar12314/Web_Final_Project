import React, { useEffect, useState } from "react";
import axios from "axios";

const useAuth = (code) => {
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        const fetchAccessToken = async () => {
            try {
                const response = await axios.post(
                    "http://localhost:8080/api/auth/spotifyLogin",
                    { code }
                );
                const { accessToken } = response.data;
                setAccessToken(accessToken);
                window.history.pushState({}, null, "/");
            } catch (error) {
                console.log(error);
            }
        };

        if (code) fetchAccessToken();
    }, [code]);

    return accessToken;
};

export default useAuth;
