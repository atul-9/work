import React from 'react'
import Sidebar from "../components/adminsidebar";
import { Outlet} from 'react-router-dom'
const AdminHome = () => {
  return (
    <div className="d-flex flex-row">
      <div ><Sidebar/></div>
      
    <Outlet />
    </div>
  )
}

export default AdminHome