import React from 'react';
import Sidebar from "../components/student/studentsidebar";
import { Outlet} from 'react-router-dom'
const StudentHome = () => {
  
  return (
    <div className="d-flex flex-row">
      <div ><Sidebar/></div>
      
    <Outlet />
    </div>
  )
}

export default StudentHome
