import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "./components.css";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faList } from '@fortawesome/free-solid-svg-icons';

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
            className="d-flex justify-space-around px-4 navBar"
        >
            <Navbar.Brand href="/">MusTracer</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
                id="basic-navbar-nav"
                className="justify-content-end"
                style={{minWidth: "10px"}}
            >
                <Nav className="mx-5">
                    {/* <FontAwesomeIcon icon={faList} className="mr-2" /> */}
                    <Link to="/playlists" className="navLink">Playlists</Link>

                    {/* <Link to="/recomendations">Recomendations</Link> */}
                </Nav>
                <Nav className="d-flex" style={{ gap: "20px" }}>
                    <Navbar.Text className="">
                        Logged in as: {username}
                    </Navbar.Text>
                    <Button variant="outline-light" onClick={handleLogout} style={{maxWidth:
                    "100px", alignSelf:"center"}}>
                        Log out
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default CustomNavbar;
