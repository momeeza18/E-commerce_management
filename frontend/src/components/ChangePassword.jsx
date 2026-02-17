import axios from "axios";
import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const BaseUrl = import.meta.env.VITE_API_BASE_URL;

const ChangenewPassword = () => {
  const token = localStorage.getItem("token");
  const [newPassword, setnewPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!newPassword) newErrors.newPassword = "new Password is required";
    else if (newPassword.length < 6)
      newErrors.newPassword = "new Password must be at least 6 characters";
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setError(formErrors);
    } else {
      setError({});
      try {
        const res = await axios.post(
          `${BaseUrl}/auth/changePassword`,
          { newPassword },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        // console.log(res.data);
        const updateUser = JSON.stringify(res.data.user);
        // console.log(updateUser, "updatedUser");
        localStorage.setItem("user", updateUser);
        if (res.data) {
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
          <h2 className="text-center mb-4">Change Password</h2>
          {error &&
            Object.values(error).map((message, index) => (
              <Alert key={index} variant="danger">
                {message}
              </Alert>
            ))}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicnewPassword">
              <Form.Label className="fw-bold">New Password</Form.Label>
              <Form.Control
                type="newPassword"
                placeholder="Type new Password"
                value={newPassword}
                onChange={(e) => setnewPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 btn-md fw-bold"
            >
              Update Password
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ChangenewPassword;
