import React,{useState,useEffect} from 'react';
import axios from "axios";
import { Card } from 'react-bootstrap';
const Info = () => {
  const token = localStorage.getItem('token');
  const [Completed,setCompleted] = useState(0);
  const [Total,setTotal] = useState(0);
  const [Incompleted,setIncompleted] = useState(0);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const headers = {
        'Auth-token': token
      };
      console.log("Infor token: ",token)
      const response = await axios.post('http://localhost:8800/api/project', null, { headers });
      const projects = response.data;
      
      console.log(projects)
      setTotal(projects.length);

      const completedProjects = projects.filter((project) => project.status === 'completed');
      setCompleted(completedProjects.length);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setIncompleted(Total - Completed);
  }, [Total, Completed]);
 
  return (
    <div style={{marginTop:"250px", marginLeft:"300px"}}>
      <Card style={{width:"500px", height:"300px"}}>
        <Card.Body>
       <div className="row">
                        <div className="col-md-4 col-sm-4 col-xs-6">
                            <div className="salert alert-info back-widget-set text-center">
                                <i className="fa fa-history fa-5x"></i>
                            <h1>
                                {Total}
                            </h1>
                            Total Projects
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-6">
                        <div className="alert alert-success back-widget-set text-center">
                            <i className="fa fa-users fa-5x"></i>
                           
                            <h1>{Completed}</h1>
                            Completed
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-6">
                        <div className="alert alert-warning back-widget-set text-center">
                            <i className="fa fa-recycle fa-5x"></i>
                            <h1>{Incompleted}</h1>
                            Incompleted
                        </div>
                    </div>
                </div>
                </Card.Body>
                </Card>
    </div>
  )
}

export default Info
