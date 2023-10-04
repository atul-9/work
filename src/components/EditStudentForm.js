import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const EditStudentForm = ({ student, onSave, onCancel }) => {
  const [editedStudent, setEditedStudent] = useState(student);
  const [validated, setValidated] = useState(false);

  

  const handleChange = (field, value) => {
    setEditedStudent((prevStudent) => ({
      ...prevStudent,
      [field]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      if (editedStudent.mobile.length !== 10) {
        // Contact number is not 10 digits long
        alert("Contact number should be 10 digits long");
        return;
      }
      onSave(editedStudent);

    setValidated(true);
  };
    
  };

  return (
    <Card>
      <Card.Header>Edit Student</Card.Header>
      <Card.Body>
        <Form noValidate validated={validated} onSubmit={handleSave}>
          <Form.Group controlId="prn">
            <Form.Label>PRN</Form.Label>
            <Form.Control type="text" value={editedStudent.prn} readOnly />
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              value={editedStudent.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
            required
              type="text"
              value={editedStudent.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="mobile">
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              type="text"
              value={editedStudent.mobile}
              onChange={(e) => handleChange("mobile", e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={editedStudent.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="department">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              value={editedStudent.department}
              onChange={(e) => handleChange("department", e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>{" "}
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default EditStudentForm;
