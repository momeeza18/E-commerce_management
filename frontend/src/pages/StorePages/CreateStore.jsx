import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../components/ApiAxios";
const BaseUrl = import.meta.env.VITE_API_BASE_URL;

const CreateStore = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    // console.log(data);
    try {
      const res = await axiosInstance.post(`/api/store`, data);

      // console.log("Success:", res.data);
      if (res.data) {
        alert("Store Successfully Created");
        navigate("/dashboard/stores");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Failed to create store";
      alert(message);
    }
  };
  return (
    <Container>
      <Row className="login-wrapper">
        <Col xs={12} md={6} className="login-form-container">
          <h2 className="text-center mb-4">Create Store</h2>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label className="fw-bold">Store Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter name of store"
              />
            </Form.Group>

            <Form.Select
              aria-label="Default select example"
              placeholder="Enter Location"
              name="location"
            >
              <option disabled>Select a location</option>
              <option value="Lahore">Lahore</option>
              <option value="Karachi">Karachi</option>
              <option value="Sialkot">Sialkot</option>
              <option value="Rawalpindi">Rawalpindi</option>
              <option value="Quetta">Quetta</option>
            </Form.Select>

            <Button
              variant="primary"
              type="submit"
              className="w-100 btn-md fw-bold mt-3"
            >
              Create
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateStore;
