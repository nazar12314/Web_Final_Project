import React, { useState } from "react";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("profile"))
    );

    return (
        <AppBar position={"static"} color={"inherit"}>
            <div>
                <Typography variant={"h2"} component={Link} to={"/"}>
                    My app
                </Typography>
            </div>
            <Toolbar>
                <Button
                    component={Link}
                    to={"/auth"}
                    variant={"contained"}
                    color={"primary"}
                >
                    Signup
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
