import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AllocateProject = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [fetchClicked, setFetchClicked] = useState(false);
  const [students, setStudents] = useState();
  const [selectedStudent, setSelectedStudent] = useState("");
  const [studentDetails, setStudentDetails] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [teacherDetails, setTeacherDetails] = useState(null);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDomain, setProjectDomain] = useState("");
  const [technologyUsed, setTechnologyUsed] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8800/api/getdept");
      setDepartments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await axios.get("http://localhost:8800/api/getteachers");
      setTeachers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchTeachers();
  }, []);

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
  };

  const handleFetchClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8800/api/getstudentsforallocation",
        {
          sem: selectedSemester,
          dept: selectedDepartment,
        }
      );

      setStudents(response.data);
      setFetchClicked(true);
      setStudentDetails(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStudentChange = async (event) => {
    setSelectedStudent(event.target.value);
    try {
      const response = await axios.get(
        `http://localhost:8800/api/getstudentdetail?prn=${event.target.value}`
      );
      setStudentDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTeacherChange = async (event) => {
    setSelectedTeacher(event.target.value);
    try {
      const response = await axios.get(
        `http://localhost:8800/api/getteacherdetail?teacher_id=${event.target.value}`
      );
      setTeacherDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // You can perform the submit logic here
    if (selectedStudent && selectedTeacher) {
      console.log("Student ID: ", selectedStudent);
      console.log("Teacher ID: ", selectedTeacher);
      console.log("Project Title:", projectTitle);
      console.log("Domain:", projectDomain);
      console.log("Technology Used:", technologyUsed);
      console.log("Start Date:", startDate);
      console.log("End Date:", endDate);
      try {
        const response = await axios.post(
          "http://localhost:8800/api/addproject",
          {
                "title":projectTitle,
                "domain":projectDomain,
                "technology_used":technologyUsed,
                "start_date":startDate,
                "end_date":endDate,
                "std_id":selectedStudent,
                "teacher_id":selectedTeacher,
                "sem":selectedSemester
          }
        );

        alert(response.data.msg);
        await handleFetchClick();
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Select Student and Teacher");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-start"
      style={{ height: "100vh" }}
    >
      <div className="card-container text-center">
        
        <Card>
          <Card.Body>
            <Card.Title>Department Information</Card.Title>
            <Form>
              <Form.Group controlId="formDepartment">
                <Form.Label>Department</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedDepartment}
                  onChange={handleDepartmentChange}
                >
                  <option value="">Select Department</option>
                  {departments.map((department) => (
                    <option key={department.id} value={department.name}>
                      {department.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formSemester">
                <Form.Label>Semester</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedSemester}
                  onChange={handleSemesterChange}
                >
                  <option value="">Select Semester</option>
                  <option value="1st">1st</option>
                  <option value="2nd">2nd</option>
                  <option value="3rd">3rd</option>
                  <option value="4th">4th</option>
                  <option value="5th">5th</option>
                  <option value="6th">6th</option>
                  <option value="7th">7th</option>
                  <option value="8th">8th</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Button
                  variant="primary"
                  onClick={handleFetchClick}
                  disabled={!selectedDepartment || !selectedSemester}
                >
                  Fetch Data
                </Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
        {fetchClicked && (
          <div>
            <Card>
              <Card.Body>
                <Card.Title>List of Students</Card.Title>
                <Form.Group controlId="formStudent">
                  <Form.Label>Student</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedStudent}
                    onChange={handleStudentChange}
                  >
                    <option value="">Select Student</option>
                    {students && students.length > 0 ? (
                      students.map((student) => (
                        <option key={student.prn} value={student.prn}>
                          {student.prn + " - " + student.name}
                        </option>
                      ))
                    ) : (
                      <option value="">No students found</option>
                    )}
                  </Form.Control>
                </Form.Group>
                {studentDetails && (
                  <Card.Text>
                    <h4>Student Details</h4>
                    <strong>PRN:</strong> {studentDetails[0].prn}
                    <br />
                    <strong>Name:</strong> {studentDetails[0].name}
                    <br />
                    <strong>Gender:</strong> {studentDetails[0].gender}
                    <br />
                    <strong>Email:</strong> {studentDetails[0].email}
                    <br />
                    <strong>Contact Number:</strong>
                    {studentDetails[0].mobile}
                    <br />
                    <strong>Department:</strong> {studentDetails[0].department}
                  </Card.Text>
                )}
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>List of Teachers</Card.Title>
                <Form.Group controlId="formTeacher">
                  <Form.Label>Teacher</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedTeacher}
                    onChange={handleTeacherChange}
                  >
                    <option value="">Select Teacher</option>
                    {teachers && teachers.length > 0 ? (
                      teachers.map((teacher) => (
                        <option
                          key={teacher.teacher_id}
                          value={teacher.teacher_id}
                        >
                          {teacher.teacher_id + " - " + teacher.name}
                        </option>
                      ))
                    ) : (
                      <option value="">No teachers found</option>
                    )}
                  </Form.Control>
                </Form.Group>
                {teacherDetails && (
                  <Card.Text>
                    <h4>Teacher Details</h4>
                    <strong>Teacher ID:</strong> {teacherDetails[0].teacher_id}
                    <br />
                    <strong>Name:</strong> {teacherDetails[0].name}
                    <br />
                    <strong>Gender:</strong> {teacherDetails[0].gender}
                    <br />
                    <strong>Email:</strong> {teacherDetails[0].email}
                    <br />
                    <strong>Contact Number:</strong> {teacherDetails[0].mobile}
                    <br />
                    <strong>Specialization:</strong>{" "}
                    {teacherDetails[0].specialization}
                  </Card.Text>
                )}
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>Project Details</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formProjectTitle">
                    <Form.Label>Project Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={projectTitle}
                      onChange={(event) => setProjectTitle(event.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formProjectDomain">
                    <Form.Label>Domain</Form.Label>
                    <Form.Control
                      type="text"
                      value={projectDomain}
                      onChange={(event) => setProjectDomain(event.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formTechnologyUsed">
                    <Form.Label>Technology Used</Form.Label>
                    <Form.Control
                      type="text"
                      value={technologyUsed}
                      onChange={(event) =>
                        setTechnologyUsed(event.target.value)
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formStartDate">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={startDate}
                      onChange={(event) => setStartDate(event.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formEndDate">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={endDate}
                      onChange={(event) => setEndDate(event.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllocateProject;
