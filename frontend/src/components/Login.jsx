import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./ApiAxios";

const BaseUrl = import.meta.env.VITE_API_BASE_URL;
// console.log("base", BaseUrl);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setError(formErrors);
    } else {
      setError({});
      //   console.log("Login attempted with:", { email, password });
      try {
        const response = await axiosInstance.post("/auth/login", {
          email,
          password,
        });
        // console.log("res", response.data);
        const userData = response.data;
        // console.log(userData?.data?.role, "userData");

        localStorage.setItem("user", JSON.stringify(userData.data));
        localStorage.setItem("token", userData.token);
        if (
          userData?.data?.role === "manager" &&
          userData?.data?.forceResetPassword === false
        ) {
          navigate("/changePassword");
        } else {
          navigate("/dashboard");
        }
      } catch (err) {
        const message =
          err.response?.data?.message || "Login failed. Please try again.";
        setError({ form: message });
      }
    }
  };

  return (
    <Container>
      <Row className="login-wrapper">
        <Col xs={12} md={6} className="login-form-container">
          <h2 className="text-center mb-4">Login</h2>
          {error &&
            Object.values(error).map((message, index) => (
              <Alert key={index} variant="danger">
                {message}
              </Alert>
            ))}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-bold">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="fw-bold">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 btn-md fw-bold"
            >
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
