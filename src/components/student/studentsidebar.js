import React, { useState, useEffect } from 'react';
import { BiHome } from 'react-icons/bi';
import './sidebars.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminSidebar = () => {
  const token = localStorage.getItem('token');
  const [student, setStudent] = useState({});

  const fetchData = async () => {
    try {
      const headers = {
        'Auth-token': token
      };
      const response = await axios.post('http://localhost:8800/api/getstudent', null, { headers });

      setStudent(response.data[0]);
      localStorage.setItem('student', JSON.stringify(response.data[0])); // Store student data as JSON string
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: '280px' }}>
        <Link
          to="/student"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
        >
          <span className="fs-4">Welcome, {student.name}</span>
        </Link>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li>
            <Link to="/student" className="nav-link active" aria-current="page">
              <BiHome className="bi me-2" size={16} />
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="viewproject" className="nav-link active" aria-current="page">
              <BiHome className="bi me-2" size={16} />
              View Project
            </Link>
          </li>
          <li>
            <Link to="submitdocument" className="nav-link active" aria-current="page">
              <BiHome className="bi me-2" size={16} />
              Submit Document
            </Link>
          </li>
        </ul>
        <hr />
        <div style={{ position: 'absolute', bottom: '0', left: '0' }}>
          <div className="dropdown align-items-end">
            <Link
              to="#"
              className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
              id="dropdownUser2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
              <strong>mdo</strong>
            </Link>
            <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
              <li>
                <Link className="dropdown-item" to="#">
                  New project...
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  Settings
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  Profile
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  Sign out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
