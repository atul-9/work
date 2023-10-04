import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login';
import StudentHome from './Pages/StudentHome';
import TeacherHome from './Pages/TeacherHome';
import AdminHome from './Pages/AdminHome';
import AddStudent from "./components/AddStudent";
import AddTeacher from './components/AddTeacher';
import AllocateProject from './components/AllocateProject';
import GetAllStudent from './components/GetAllStudent';
import GetAllTeachers from './components/GetAllTeachers';
import GetAllProject from './components/GetAllProject';
import Info from './components/student/info';
import StudentProject from './components/student/studentproject';
import Submitdocument from './components/student/submitdocument';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Login />} />
      <Route exact path='/student' element={<StudentHome />} >
           <Route exact path='' element={<Info />} />
           <Route exact path='viewproject' element={<StudentProject/>} />
           <Route exact path='submitdocument' element={<Submitdocument/>} />
      </Route>
      <Route exact path='/admin' element={<AdminHome />} >
          <Route exact path='addstudent' element={<AddStudent />} />
          <Route exact path='addteacher' element={<AddTeacher />} />
          <Route exact path='allocateproject' element={<AllocateProject />} />
          <Route exact path='allstudents' element={<GetAllStudent />} />
          <Route exact path='allteachers' element={<GetAllTeachers />} />
          <Route exact path='allproject' element={<GetAllProject/>} />
      </Route>  
      <Route exact path='/teacher' element={<TeacherHome />} />
      <Route path='*' element={<h1>Error</h1>} />
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
