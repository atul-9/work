import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

const ProjectDetails = ({ project_id }) => {
  const [projectDetails, setProjectDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formFields, setFormFields] = useState({
    title: projectDetails.title || '',
    domain: projectDetails.domain || '',
    technology_used: projectDetails.technology_used || '',
  });
  
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    fetchProjectDetails();
  }, [project_id]);

  const fetchProjectDetails = async () => {
    try {
      
      const response = await axios.post(`http://localhost:8800/api/getprojectdetails`, {
        project_id
      });
      setProjectDetails(response.data[0]);
      setFormFields({
        title: response.data[0].title,
        domain: response.data[0].domain,
        technology_used: response.data[0].technology_used,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    if (projectDetails.status === 'completed') {
      setShowAlert(true);
    } else {
      setEditMode(true);
    }
  };
  

  const handleSave = async () => {
    try {
      
        const response= await axios.post(
        `http://localhost:8800/api/editprojectdetails`,
        {
            project_id,
          title: formFields.title,
          domain: formFields.domain,
          technology_used: formFields.technology_used,
        }
      );
      setEditMode(false);
      setShowAlert(false);
      alert(response.data.msg)
      fetchProjectDetails();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields((prevFormFields) => ({
      ...prevFormFields,
      [name]: value,
    }));
  };
  

  return (
    <div>
      <h2>Project Details</h2>
      {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          No changes can be made for a project with status "completed".
        </Alert>
      )}
      <Form>
        <Form.Group controlId="pid">
          <Form.Label>PID</Form.Label>
          <Form.Control type="text" value={project_id} readOnly disabled />
        </Form.Group>

        <Form.Group controlId="guideTeacher">
          <Form.Label>Guide Teacher</Form.Label>
          <Form.Control type="text" value={projectDetails.name} readOnly disabled />
        </Form.Group>

        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formFields.title}
            onChange={handleChange}
            readOnly={!editMode || projectDetails.status === 'completed'}
            disabled={projectDetails.status === 'completed'}
          />
        </Form.Group>

        <Form.Group controlId="domain">
          <Form.Label>Domain</Form.Label>
          <Form.Control
            type="text"
            name="domain"
            value={formFields.domain}
            onChange={handleChange}
            readOnly={!editMode || projectDetails.status === 'completed'}
            disabled={projectDetails.status === 'completed'}
          />
        </Form.Group>

        <Form.Group controlId="technology_used">
          <Form.Label>Technology Used</Form.Label>
          <Form.Control
            type="text"
            name="technology_used"
            value={formFields.technology_used}
            onChange={handleChange}
            readOnly={!editMode || projectDetails.status === 'completed'}
            disabled={projectDetails.status === 'completed'}
          />
        </Form.Group>

        <Form.Group controlId="semester">
          <Form.Label>Semester</Form.Label>
          <Form.Control type="text" value={projectDetails.semester} readOnly disabled />
        </Form.Group>

        <Form.Group controlId="numberOfFilesSubmits">
          <Form.Label>Number of Files Submits</Form.Label>
          <Form.Control type="text" value={projectDetails.files} readOnly disabled />
        </Form.Group>

        <Form.Group controlId="reviewsDone">
          <Form.Label>Reviews Done</Form.Label>
          <Form.Control type="text" value={projectDetails.reviews} readOnly disabled />
        </Form.Group>

        <Form.Group controlId="status">
          <Form.Label>Status</Form.Label>
          <Form.Control type="text" value={projectDetails.status} readOnly disabled />
        </Form.Group>

        {editMode ? (
        <div>
          <Button variant="primary" onClick={handleSave} disabled={projectDetails.status === 'completed'}>
            Save
          </Button>
          <Button variant="secondary" onClick={() => setEditMode(false)}>Cancel</Button>
        </div>
      ) : (
        <Button variant="primary" onClick={handleEdit} disabled={projectDetails.status === 'completed'}>
          Edit
        </Button>
      )}
  

      </Form>
    </div>
  );
};

export default ProjectDetails;
