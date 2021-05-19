import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomePageNav = ({ select }) => {
  return (
    <div className="navbar">
      <Link to="/home" className="link">
        Home
      </Link>
      <Link to="/about" className="link">
        Exam Results
      </Link>
      <Link to="/about" className="link">
        Exam
      </Link>
      {select === "admin" || select === "teacher" ? (
        <Link to="/questions" className="link">
          Questions
        </Link>
      ) : null}
      {select === "admin" || select === "teacher" ? (
        <Link to="/about" className="link">
          Question Papers
        </Link>
      ) : null}
      {select === "admin" ? (
        <Link to="/addUser" className="link">
          Add User
        </Link>
      ) : null}
      <Link to="/" className="mlink link">
        OES
      </Link>
      <Link to="/logout" className="link">
        Logout
      </Link>
    </div>
  );
};

export default HomePageNav;
