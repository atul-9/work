import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login';
import StudentHome from './Pages/StudentHome';
import TeacherHome from './Pages/TeacherHome';
import AdminHome from './Pages/AdminHome';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Login />} />
      <Route exact path='/student' element={<StudentHome />} />
      <Route exact path='/admin' element={<AdminHome />} />
      <Route exact path='/teacher' element={<TeacherHome />} />
      <Route path='*' element={<h1>Error</h1>} />
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
