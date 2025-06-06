import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./navbar.css";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const { user } = useContext(AuthContext);

  const basePath = user?.role === "staff" ? "/staff" : "/student";

  const otherDetailsItems = [
    { path: `${basePath}/aboutus`, label: "about us" },
    { path: `${basePath}/privacypolicy`, label: "privacy policy" },
    { path: `${basePath}/feedback`, label: "feedback" },
  ];

  const activeIndex = otherDetailsItems.findIndex(
    (item) => location.pathname === item.path
  );
  const displayIndex = hoveredIndex !== -1 ? hoveredIndex : activeIndex;

  const dotPosition =
    displayIndex !== -1 ? `calc(${displayIndex * 33.33 + 16}% - 5px)` : "0";

  return (
    <div className='nav-contain'>
      <div className="hamburger">
        <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#000000">
          <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
        </svg>
      </div>
      <div className="logo"><h1>logo</h1></div>
      <div className='menus'>
        <div className='menu-item' onClick={() => navigate(basePath)}>
          Home
        </div>
        <div className='menu-item' onClick={() => navigate(`${basePath}/attendence`)}>
          Attendance
        </div>
        <div className='menu-item' onClick={() => navigate(`${basePath}/${user?.role === "staff" ? "students" : "classes"}`)}>
          {user?.role === "staff" ? "Students" : "Classes"}
        </div>
      </div>
      <div className='other-details'>
        {otherDetailsItems.map((item, index) => (
          <div
            key={item.path}
            className='other-details-item'
            onClick={() => navigate(item.path)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(-1)}
          >
            {item.label}
          </div>
        ))}
        <span
          className='dot'
          style={{
            left: dotPosition,
            opacity: displayIndex !== -1 ? 1 : 0,
          }}
        ></span>
      </div>
      <div className='account' onClick={() => navigate(`${basePath}/profile`)}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='45px'
          viewBox='0 -960 960 960'
          width='45px'
          fill='#000000'
        >
          <path d='M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z' />
        </svg>
      </div>
    </div>
  );
}

export default Navbar;