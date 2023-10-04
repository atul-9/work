import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import ProjectDetails from './ProjectDetails';

const StudentProject = () => {
  const token = localStorage.getItem('token');
  const [projects, setProjects] = useState([]);
  const [searchTerms, setSearchTerms] = useState({
    project_id: '',
    title: '',
    semester: '',
    status: ''
  });
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedproject_id, setSelectedproject_id] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const headers = {
        'Auth-token': token
      };
      const response = await axios.post('http://localhost:8800/api/project', null, { headers });

      setProjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (event, column) => {
    const { value } = event.target;
    setSearchTerms((prevSearchTerms) => ({
      ...prevSearchTerms,
      [column]: value
    }));
    setSortColumn(column);
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const handleProjectDetails = (project_id) => {
    setSelectedproject_id(project_id);
  };

  const sortedProjects = [...projects].sort((a, b) => {
    if (sortColumn === 'project_id') {
      return sortOrder === 'asc'
        ? (a.project_id || 0) - (b.project_id || 0)
        : (b.project_id || 0) - (a.project_id || 0);
    } else if (sortColumn === 'title') {
      return sortOrder === 'asc'
        ? (a.title || '').localeCompare(b.title || '')
        : (b.title || '').localeCompare(a.title || '');
    } else if (sortColumn === 'semester') {
      return sortOrder === 'asc'
        ? (a.semester || '').localeCompare(b.semester || '')
        : (b.semester || '').localeCompare(a.semester || '');
    } else if (sortColumn === 'status') {
      return sortOrder === 'asc'
        ? (a.status || '').localeCompare(b.status || '')
        : (b.status || '').localeCompare(a.status || '');
    }
    return 0;
  });

  const filteredProjects = sortedProjects.filter((project) => {
    const { project_id, title, semester, status } = searchTerms;
    return (
      (project.project_id || '').toString().toLowerCase().includes(project_id.toLowerCase()) &&
      (project.title || '').toLowerCase().includes(title.toLowerCase()) &&
      (project.semester || '').toLowerCase().includes(semester.toLowerCase()) &&
      (project.status || '').toLowerCase().includes(status.toLowerCase())
    );
  });

  return (
    <div>
      <h1>Student Projects</h1>

      <Card>
        <Card.Body>
          <table style={{ border: '1px solid #ccc' }}>
            <thead>
              <tr style={{ background: '#f2f2f2' }}>
                <th style={{ border: '1px solid #ccc', padding: '8px', cursor: 'pointer' }} onClick={() => handleSort('project_id')}>
                  Project ID
                  <br />
                  <input
                    type="text"
                    value={searchTerms.project_id}
                    onChange={(event) => handleSearch(event, 'project_id')}
                  />
                </th>
                <th style={{ border: '1px solid #ccc', padding: '8px', cursor: 'pointer' }} onClick={() => handleSort('title')}>
                  Title
                  <br />
                  <input
                    type="text"
                    value={searchTerms.title}
                    onChange={(event) => handleSearch(event, 'title')}
                  />
                </th>
                <th style={{ border: '1px solid #ccc', padding: '8px', cursor: 'pointer' }} onClick={() => handleSort('semester')}>
                  Semester
                  <br />
                  <input
                    type="text"
                    value={searchTerms.semester}
                    onChange={(event) => handleSearch(event, 'semester')}
                  />
                </th>
                <th style={{ border: '1px solid #ccc', padding: '8px', cursor: 'pointer' }} onClick={() => handleSort('status')}>
                  Status
                  <br />
                  <input
                    type="text"
                    value={searchTerms.status}
                    onChange={(event) => handleSearch(event, 'status')}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => (
                <tr key={project.project_id}>
                  <td
                    style={{ border: '1px solid #ccc', padding: '8px', cursor: 'pointer' }}
                    onClick={() => handleProjectDetails(project.project_id)}
                  >
                    {project.project_id}
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{project.title}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{project.semester}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{project.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card.Body>
      </Card>

      {selectedproject_id && <ProjectDetails project_id={selectedproject_id} />}
    </div>
  );
};

export default StudentProject;
