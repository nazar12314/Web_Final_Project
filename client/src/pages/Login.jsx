import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [validated, setValidated] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        password: "",
        email: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        try {
            if (form.checkValidity()) {
                const response = await axios.post(
                    "http://localhost:8080/api/auth/login",
                    formData
                );
                const { token, user } = response.data;
                localStorage.setItem("token", token);
                localStorage.setItem("user", user.name);
                navigate("/spotify-auth");
            }
        } catch (error) {
            setErrorMessage(error.response.data.message);
        }

        setValidated(true);
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center flex-column"
            style={{ height: "100vh" }}
        >
            <h1>Sign in</h1>
            <Form
                className="p-4 d-flex flex-column"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                style={{ gap: "20px", width: "50%" }}
            >
                <Form.Group controlId="validationCustomE">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Email"
                        required
                        name="email"
                        onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide your email.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationCustomP">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        required
                        name="password"
                        onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid password!
                    </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit">Submit</Button>
                <Link to={"/signup"}>Don't have an account? Register</Link>
                <p style={{ color: "red" }}>{errorMessage}</p>
            </Form>
        </Container>
    );
};

export default Login;
