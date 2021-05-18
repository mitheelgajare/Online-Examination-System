import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

const Home = ({ select, setSelect, membership }) => {
  const history = useHistory();

  if (membership === "true") {
    history.push("/home");
    return null;
  }
  const handleSubmit = e => {
    e.preventDefault();
    history.push("/login");
  };

  return (
    <div className="home-page">
      <div className="wrapper">
        <div className="title">Phadang School</div>

        <form action="" autoComplete="off" onSubmit={handleSubmit}>
          <label htmlFor="select">Who are you?</label>
          <br />
          <br />
          <select
            name=""
            id="select"
            value={select}
            onChange={e => setSelect(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
          <button>Login!</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
