// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StudentList from './pages/StudentList';
// import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';
// import DeleteStudent from './pages/DeleteStudent';
import './App.css';





function App() {
  return (
    <Router>
      <div className="App">
        <nav className="main-nav">
          <div className="nav-container">
            <h1 className="nav-logo">Student Management</h1>
            <ul className="nav-menu">
              <li><Link to="/">All Students</Link></li>
              {/* <li><Link to="/add">Add Student</Link></li> */}
              <li><Link to="/edit">Edit Student</Link></li>
              {/* <li><Link to="/delete">Delete Student</Link></li> */}
            </ul>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<StudentList />} />
            {/* <Route path="/add" element={<AddStudent />} /> */}
            <Route path="/edit" element={<EditStudent />} />
            {/* <Route path="/delete" element={<DeleteStudent />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

