// src/pages/StudentList.js
import React, { useState, useEffect } from 'react';
import './StudentPages.css';
import axios from "axios"

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

useEffect(()=>{
    axios.get("http://localhost:5000/students")

    .then(response =>{
        setStudents(response.data)
    })
    .catch(error => {
        console.log("Error fetching data")
    })
})


  return (
    <div className="page-container">
      <div className="page-header">
        <h1>All Students</h1>
        <button className="btn-primary" >
          Refresh List
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading students...</div>
      ) : (
        <div className="students-grid">
          {students.map(student => (
            <div key={student._id} className="student-card">
              <h3>{student.name}</h3>
          
              <p><strong>Age:</strong> {student.age}</p>
              <p><strong>Department:</strong> {student.department}</p>
              <div className="card-actions">
                <button className="btn-edit" onClick={handleClickEdit}>Edit</button>
                <button className="btn-delete">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && students.length === 0 && (
        <div className="empty-state">
          <p>No students found.</p>
        </div>
      )}
    </div>
  );
};

export default StudentList;