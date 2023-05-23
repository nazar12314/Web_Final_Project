import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const CustomNavbar = () => {
    const username = localStorage.getItem("user");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("accessToken");

        return navigate("/signup");
    };

    return (
        <Navbar
            bg="dark"
            variant="dark"
            expand="lg"
            className="d-flex justify-space-around px-4"
        >
            <Navbar.Brand href="/">MusTracer</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
                id="basic-navbar-nav"
                className="justify-content-end"
            >
                <Nav className="mx-5">
                    <Link to="/playlists">Playlists</Link>
                    {/* <Link to="/recomendations">Recomendations</Link> */}
                </Nav>
                <Nav className="d-flex" style={{ gap: "20px" }}>
                    <Navbar.Text className="">
                        Logged in as: {username}
                    </Navbar.Text>
                    <Button variant="outline-light" onClick={handleLogout}>
                        Logout
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default CustomNavbar;
