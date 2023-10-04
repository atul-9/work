import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import axios from 'axios';

const AddStudent = () => {
  const [prn, setPrn] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
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
        const response = await axios.post("http://localhost:8800/api/addstudent", {
          prn : prn,
          name: name,
          gender: gender,
          email: email,
          mobile: contactNumber,
          dept: department,
          pass: prn,
        });

        alert(response.data.msg)
      } catch (error) {
        console.log(error);
      }
      console.log(
        "Form submitted:",
        prn,
        name,
        gender,
        contactNumber,
        email,
        department
      );
    }

    setValidated(true);
  };

  const handleContactNumberChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d{0,10}$/.test(value)) {
      setContactNumber(value);
    }
  };

  return (
    <div className="m-3">
      <Card>
        <Card.Body style={{ width: "750px" }}>
          <Card.Title>Add Student</Card.Title>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                PRN
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  required
                  type="text"
                  placeholder="PRN"
                  value={prn}
                  onChange={(e) => setPrn(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a PRN.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Name of Student
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
                  Please enter a name.
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
                  value="Male"
                  checked={gender === "Male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <Form.Check
                  required
                  type="radio"
                  label="Female"
                  name="gender"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please select a gender.
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
                  onChange={handleContactNumberChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a 10-digit contact number.
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
                Department
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  as="select"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="MCA">MCA</option>
                  <option value="CS">CS</option>
                  <option value="EEE">EEE</option>
                  <option value="Mech">Mech</option>
                  <option value="Civil">Civil</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please select a department.
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

export default AddStudent;
