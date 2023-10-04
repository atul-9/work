import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import axios from 'axios';
const AddTeacher = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      if (contactNumber.length !== 10) {
        // Contact number is not 10 digits long
        alert("Contact number should be 10 digits long");
        return;
      }
      try {
        const response = await axios.post(
          "http://localhost:8800/api/addteacherr",
          {
            name: name,
            gender: gender,
            email: email,
            mobile: contactNumber,
            // How to get Password as it is Tid
            pass: "t6",
            spec: "ML",
          }
        );

        alert(response.data.msg);
      } catch (error) {
        console.log(error);
      }
      console.log(
        "Form submitted:",
        name,
        gender,
        contactNumber,
        email,
        specialization
      );
    }
    setValidated(true);
  };

  return (
    <div className="m-3">
      <Card>
        <Card.Body style={{ width: "750px" }}>
          <Card.Title>Teacher Registration</Card.Title>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Name
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  required
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your name.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Gender
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  required
                  type="radio"
                  label="Male"
                  name="gender"
                  value="male"
                  onChange={(e) => setGender(e.target.value)}
                />
                <Form.Check
                  required
                  type="radio"
                  label="Female"
                  name="gender"
                  value="female"
                  onChange={(e) => setGender(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please select your gender.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Contact Number
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  required
                  type="text"
                  placeholder="Contact Number"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your contact number.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Email
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  required
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email address.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Specialization
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  required
                  type="text"
                  placeholder="Specialization"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your specialization.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit">Submit</Button>
              </Col>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddTeacher;
