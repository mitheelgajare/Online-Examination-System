import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import HomePageNav from "./HomePageNav";

const AddUser = ({ select, membership }) => {
  const history = useHistory();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");

  if (select === "student" || select === "teacher") {
    history.push("/login");
    return null;
  }

  if (membership === "false") {
    history.push("/login");
    return null;
  }

  const handleSubmit = e => {
    e.preventDefault();
    let member = { uid: id, password: password, role: role };
    axios
      .post("http://localhost:5000/addUser", member)
      .then(res => {
        console.log(res);
        if (res.status === 201) {
          alert("User added successfully!");
          history.push("/home");
        }
      })
      .catch(err => {
        if (err.response.status === 500) {
          alert("Something went wrong");
          console.log(err);
        } else if (err.response.status === 409) {
          alert("User already exists");
        }
      });
    return null;
  };

  return (
    <div className="add-user-page">
      <HomePageNav select={select} />
      <div className="title">Add a User</div>
      <form action="" autoComplete="off" onSubmit={handleSubmit}>
        <label htmlFor="id">User ID</label>
        <input
          type="text"
          value={id}
          onChange={e => setId(e.target.value)}
          id="id"
          placeholder="User ID"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          id="password"
          placeholder="Password"
          required
        />
        <label htmlFor="role">Role</label>
        <br />
        <select
          name=""
          id="role"
          value={role}
          onChange={e => setRole(e.target.value)}
          required
        >
          <option value="admin">Admin</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
        <br />
        <br />
        <button>Submit!</button>
      </form>
    </div>
  );
};

export default AddUser;
