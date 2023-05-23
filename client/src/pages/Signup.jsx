import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const [validated, setValidated] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
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
                    "http://localhost:8080/api/auth/register",
                    formData
                );
                const { token, user } = response.data;
                localStorage.setItem("token", token);
                localStorage.setItem("user", user._id);
                navigate("/");
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
            <h1>Sign up</h1>
            <Form
                className="p-4 d-flex flex-column"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                style={{ gap: "20px", width: "50%" }}
            >
                <Row>
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="First name"
                            onChange={handleInputChange}
                            name="firstName"
                        />
                        <Form.Control.Feedback>
                            Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please provide your first name!
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Last name"
                            name="lastName"
                            onChange={handleInputChange}
                        />
                        <Form.Control.Feedback>
                            Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please provide your last name!
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Form.Group controlId="validationCustom03">
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
                <Form.Group controlId="validationCustom04">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        required
                        name="confirmPassword"
                        onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please repeat your password!
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationCustom05">
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
                <Button type="submit">Submit</Button>
                <Link to="/login">Already have an account? Login</Link>
                <p style={{ color: "red" }}>{errorMessage}</p>
            </Form>
        </Container>
    );
};

export default Signup;
