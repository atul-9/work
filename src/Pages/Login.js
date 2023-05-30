import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const initialState = {
  email: '',
  pass: '',
  role: '',
  msg: '',
};

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { email, pass } = values;

    if (!email || !pass) {
      console.log('Invalid inputs');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8800/api/auth', {
        email: email,
        pass: pass,
      });

      setValues({ ...values, msg: response.data[0].msg, role: response.data[0].role });

      if (response.data[0].msg === '0') {
        navigateToRole(response.data[0].role);
      } else {
        alert(response.data[0].msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToRole = (role) => {
    if (role === 'Student') {
      navigate('/student');
    } else if (role === 'Teacher') {
      navigate('/teacher');
    } else if (role === 'Admin') {
      navigate('/admin');
    }
  };

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          name="email"
          type="email"
          onChange={handleChange}
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          name="pass"
          onChange={handleChange}
          className="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Check me out
        </label>
      </div>
      <button type="button" className="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
};

export default Login;
