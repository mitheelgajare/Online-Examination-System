import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomePageNav = ({ select }) => {
  return (
    <div className="navbar">
      <Link to="/home" className="link">
        Home
      </Link>
      {select === "admin" || select === "teacher" ? (
        <Link to="/questions" className="link">
          Questions
        </Link>
      ) : null}
      {select === "admin" || select === "teacher" ? (
        <Link to="/allQuestionPapers" className="link">
          Question Papers
        </Link>
      ) : null}
      {select === "student" ? (
        <Link to="/exam" className="link">
          Exam
        </Link>
      ) : null}
      {select === "student" ? (
        <Link to="/examResults" className="link">
          Exam Results
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
