import React from 'react'
import "./Navbar.css"

const ParentNav = () => {
  return (
    <nav className="navbar">
    <div className="container">
      <a href="#" className="brand">EduSync</a>
      {/* <div class="menu-toggle">&#9776;</div> */}
      <ul className="menu">
        <li><a href="#">My Courses</a></li>
        <li><a href="#">Join New Course</a></li>
        <li><a href="#">Community Tab</a></li>
      </ul>
    </div>
  </nav>
  )
}

export default ParentNav