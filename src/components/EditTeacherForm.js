import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const EditTeacherForm = ({ teacher, onSave, onCancel }) => {
    const [editedTeacher, setEditedTeacher] = useState(teacher);
const handleChange = (field, value) => {
        setEditedTeacher((prevStudent) => ({
          ...prevStudent,
          [field]: value,
        }));
      };
    
const handleSave = () => {
        onSave(editedTeacher);
      };

  return (
    <Form>
      <h3>Edit Teacher</h3>
      <Form.Group controlId="formTeacherId">
        <Form.Label>Teacher ID</Form.Label>
        <Form.Control
          type="text"
          value={editedTeacher.teacher_id}
          disabled
        />
      </Form.Group>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={editedTeacher.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formGender">
        <Form.Label>Gender</Form.Label>
        <Form.Control
          type="text"
          value={editedTeacher.gender}
          onChange={(e) => handleChange("gender", e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formContact">
        <Form.Label>Contact</Form.Label>
        <Form.Control
          type="text"
          value={editedTeacher.mobile}
          onChange={(e) => handleChange("mobile", e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          value={editedTeacher.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formSpecialization">
        <Form.Label>Specialization</Form.Label>
        <Form.Control
          type="text"
          value={editedTeacher.specialization}
          onChange={(e) => handleChange("specialization", e.target.value)}
        />
      </Form.Group>
      <Button type='submit' variant="primary" onClick={handleSave}>
        Save
      </Button>
      <Button variant="secondary" onClick={onCancel}>
        Cancel
      </Button>
    </Form>
  );
};

export default EditTeacherForm;
