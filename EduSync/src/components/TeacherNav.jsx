import React from 'react'
import './Navbar.css'

const TeacherNav = () => {
  return (
    <nav class="navbar">
    <div class="container">
      <a href="/" class="brand">EduSync</a>
      {/* <div class="menu-toggle">&#9776;</div> */}
      <ul class="menu">
        <li><a href="#">Create New Course</a></li>
        <li><a href="#">My Courses</a></li>
        <li><a href="#">Community Tab</a></li>
      </ul>
    </div>
  </nav>
  )
}

export default TeacherNav