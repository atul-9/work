import React from 'react';
import {  BiHome,  BiTable, BiGrid } from 'react-icons/bi'; // Example icons from react-icons
import './sidebars.css';
import {Link} from "react-router-dom"

const AdminSidebar = () => {
  return (
    <div>
      <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: '280px' }}>
        <Link to="/admin" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
          {/* Replace with your custom logo */}
         {/* <BiBootstrap className="bi me-2" size={40} /> */}
          <span className="fs-4">Admin</span>
        </Link>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link to="/Admin" className="nav-link active" aria-current="page">
              <BiHome className="bi me-2" size={16} />
              Home
            </Link>
          </li>
          <li>
            <Link to={"addstudent"} className="nav-link link-dark">
              {console.log(window.location.pathname + "/addstudent")}
              {/* <BiSpeedometer2 className="bi me-2" size={16} /> */}
              Add Student
            </Link>
          </li>
          <li>
            <Link to={"addteacher"}  className="nav-link link-dark">
              <BiTable className="bi me-2" size={16} />
              Add Teacher
            </Link>
          </li>
          <li>
            <Link to={'allstudents'} className="nav-link link-dark">
              <BiGrid className="bi me-2" size={16} />
              Get All Students
            </Link>
          </li>
          <li>
            <Link to={"allteachers"} className="nav-link link-dark">
              {/* <BiPeopleCircle className="bi me-2" size={16} /> */}
              Get All Teachers
            </Link>
          </li>
          <li>
            <Link to={"allocateproject"} className="nav-link link-dark">
              {/* <BiPeopleCircle className="bi me-2" size={16} /> */}
              Allocate Project
            </Link>
          </li>
          <li>
            <Link to={"allproject"} className="nav-link link-dark">
              {/* <BiPeopleCircle className="bi me-2" size={16} /> */}
              Get All Project
            </Link>
          </li>
        </ul>
        <hr />
        <div className="dropdown">
          <Link to="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
            <strong>mdo</strong>
          </Link>
          <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
            <li><Link className="dropdown-item" to="#">New project...</Link></li>
            <li><Link className="dropdown-item" to="#">Settings</Link></li>
            <li><Link className="dropdown-item" to="#">Profile</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li><Link className="dropdown-item" to="#">Sign out</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
