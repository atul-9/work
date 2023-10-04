import React, { useState, useEffect, useCallback } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import axios from "axios";
import EditStudentForm from "./EditStudentForm";
const GetAllStudent = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState({});
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [editMode, setEditMode] = useState(false);
  const [editStudent, setEditStudent] = useState(null);


  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8800/api/getstudents");
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearchChange = (field, value) => {
    setSearchText((prevSearchText) => ({
      ...prevSearchText,
      [field]: value,
    }));
  };

  const filterData = useCallback(() => {
    const filteredData = data.filter((item) =>
      Object.keys(searchText).every((field) => {
        const fieldValue = String(item[field]).toLowerCase();
        const searchValue = searchText[field].toLowerCase();
        return fieldValue.includes(searchValue);
      })
    );

    setFilteredData(filteredData);
    setCurrentPage(1);
  }, [data, searchText]);

  useEffect(() => {
    filterData();
  }, [searchText, filterData]);

  function handleSort(field) {
    if (field === sortField) {
      // Toggle sort direction if the same field is clicked again
      setSortDirection((prevSortDirection) => (prevSortDirection === "asc" ? "desc" : "asc"));
    } else {
      // Set sort field and default sort direction to ascending
      setSortField(field);
      setSortDirection("asc");
    }
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (student) => {
    setEditMode(true);
    setEditStudent(student);
  };
  const handleCancelEdit = () => {
    setEditMode(false);
    setEditStudent(null);
  };
  const handleSaveEdit = async (editedStudent) => {
    // Perform the save operation here
    console.log("Save edited student:", editedStudent);
    if (window.confirm("Are you sure you want to edit this student?")) {
    try {
      const response = await axios.post("http://localhost:8800/api/editstudent", {
        prn : editedStudent.prn,
        name: editedStudent.name,
        gender: editedStudent.gender,
        email: editedStudent.email,
        mobile: editedStudent.mobile,
        dept: editedStudent.department,
      });

      alert(response.data.msg)
    } catch (error) {
      console.log(error);
    }
  }
    setEditMode(false);
    setEditStudent(null);
    fetchData();
  };

  const handleDelete = async (prn) => {
    // Handle delete functionality
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        const response = await axios.post("http://localhost:8800/api/deleteStudent",{
          prn
        });
        
        if (response.data.affectedRows) {
          window.alert("Student removed Successfully")
          fetchData();

        }
      } catch (error) {
        console.log(error);
      }
    }
    
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  let sortedData = [...filteredData];

  if (sortField) {
    sortedData.sort((a, b) => {
      const valueA = a[sortField];
      const valueB = b[sortField];

      if (typeof valueA === "string") {
        return sortDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }

      return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
    });
  }

  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  return (
    <div className="m-3">
      <div className="m-5">
        <Button variant="primary" onClick={fetchData}>
          Fetch Data
        </Button>
      </div>
      {editMode && editStudent && (
        <EditStudentForm student={editStudent} onSave={handleSaveEdit} onCancel={handleCancelEdit} />
      )}
      <Card>
        <Card.Body>
          <Form>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th onClick={() => handleSort("prn")}>
                    PRN {sortField === "prn" && (sortDirection === "asc" ? "▲" : "▼")}
                  </th>
                  <th onClick={() => handleSort("name")}>
                    Name {sortField === "name" && (sortDirection === "asc" ? "▲" : "▼")}
                  </th>
                  <th onClick={() => handleSort("gender")}>
                    Gender {sortField === "gender" && (sortDirection === "asc" ? "▲" : "▼")}
                  </th>
                  <th onClick={() => handleSort("mobile")}>
                    Mobile {sortField === "mobile" && (sortDirection === "asc" ? "▲" : "▼")}
                  </th>
                  <th onClick={() => handleSort("email")}>
                    Email {sortField === "email" && (sortDirection === "asc" ? "▲" : "▼")}
                  </th>
                  <th onClick={() => handleSort("department")}>
                    Department {sortField === "department" && (sortDirection === "asc" ? "▲" : "▼")}
                  </th>
                  <th className="align-middle" rowSpan={2} >Option</th>
                </tr>
                <tr>
                  <th>
                    <Form.Control
                      type="text"
                      placeholder="Search PRN"
                      onChange={(e) => handleSearchChange("prn", e.target.value)}
                    />
                  </th>
                  <th>
                    <Form.Control
                      type="text"
                      placeholder="Search Name"
                      onChange={(e) => handleSearchChange("name", e.target.value)}
                    />
                  </th>
                  <th>
                    <Form.Control
                      type="text"
                      placeholder="Search Gender"
                      onChange={(e) => handleSearchChange("gender", e.target.value)}
                    />
                  </th>
                  <th>
                    <Form.Control
                      type="text"
                      placeholder="Search Mobile"
                      onChange={(e) => handleSearchChange("mobile", e.target.value)}
                    />
                  </th>
                  <th>
                    <Form.Control
                      type="text"
                      placeholder="Search Email"
                      onChange={(e) => handleSearchChange("email", e.target.value)}
                    />
                  </th>
                  <th>
                    <Form.Control
                      type="text"
                      placeholder="Search Department"
                      onChange={(e) => handleSearchChange("department", e.target.value)}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item.prn}>
                    <td>{item.prn}</td>
                    <td>{item.name}</td>
                    <td>{item.gender}</td>
                    <td>{item.mobile}</td>
                    <td>{item.email}</td>
                    <td>{item.department}</td>
                    <td>
                    <AiOutlineEdit className="edit-icon" onClick={() => handleEdit(item)} />
                      <AiOutlineDelete className="delete-icon" onClick={() => handleDelete(item.prn)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Form>
          {totalPages > 1 && (
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                <Button
                  key={pageNumber}
                  variant={currentPage === pageNumber ? "primary" : "secondary"}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </Button>
              ))}
            </div>
          )}
        </Card.Body>
      </Card>
      
    </div>
  );
};

export default GetAllStudent;
