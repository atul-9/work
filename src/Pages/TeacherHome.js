import React,{useState,useEffect} from 'react';
import axios from "axios";
const TeacherHome = () => {
  const token=localStorage.getItem('token');
  const [teacher, setteacher] = useState({});
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const headers = {
        'Auth-token': token
      }
      const response = await axios.post("http://localhost:8800/api/getteacher", null,{headers});
      setteacher(response.data[0])
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  });
  return (
    <div>
      {error && <p>Error: {error}</p>}
      {token && <div>
        <h2>Teacher Information</h2>
        {Object.entries(teacher).map(([key, value]) => (
          <p key={key}>
            {key}: {value}
          </p>
        ))}
      </div>
      }
      
    </div>
  )
}

export default TeacherHome



  


