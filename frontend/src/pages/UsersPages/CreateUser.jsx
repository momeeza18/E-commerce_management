import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../components/ApiAxios";
const BaseUrl = import.meta.env.VITE_API_BASE_URL;

const CreateUser = () => {
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const getAllStores = async () => {
      try {
        const response = await axiosInstance.get("/api/stores");
        // console.log(response);

        setStores(response.data.Stores );
      } catch (err) {
        err.response?.data?.message || "Failed to load stores";
      }
    };

    getAllStores();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const User = await axiosInstance.post("/api/user", data);
      if (User) {
        alert("User Created Successfully");
        navigate("/dashboard/users");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Failed to create user";
      alert(message);
    }
  };

  return (
    <Container>
      <Row className="login-wrapper">
        <Col xs={12} md={6} className="login-form-container">
          <h2 className="text-center mb-4">Create User</h2>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">User Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter user name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                placeholder="Enter city"
                required
              />
            </Form.Group>

            <Form.Select name="role" required className="mb-3">
              <option value="">Select a role</option>
              <option value="manager">Manager</option>
              <option value="customer">Customer</option>
            </Form.Select>

            <Form.Select name="store" required className="mb-3">
              <option value="">Select a Store</option>
              {stores.map((store) => (
                <option key={store._id} value={store._id}>
                  {store.name}
                </option>
              ))}
            </Form.Select>

            <Button
              variant="primary"
              type="submit"
              className="w-100 btn-md fw-bold"
            >
              Create
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateUser;
