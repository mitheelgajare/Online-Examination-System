import React, { useState, useEffect } from "react";
import Data from "./members.json";
import { useHistory } from "react-router-dom";

const Login = ({ select, setMembership }) => {
  const history = useHistory();
  const [uid, setUid] = useState("");
  const [psw, setPsw] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    let data = Data.filter(member => {
      return member.role === select;
    });

    for (let item of data) {
      if (item.uid === uid) {
        if (item.password === psw) {
          history.push("/home");
          setMembership("true");
          return null;
        } else {
          alert("Wrong password");
          return null;
        }
      }
    }

    alert(`You are either not a member or not a ${select}`);
  };

  let placeholder = select[0].toUpperCase() + select.substr(1) + " ID";

  return (
    <div className="login-page">
      <div>Login!</div>
      <form action="" autoComplete="off" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={placeholder}
          value={uid}
          onChange={e => setUid(e.target.value)}
          className="ftest"
        />
        <input
          type="password"
          placeholder="Password"
          value={psw}
          onChange={e => setPsw(e.target.value)}
          className="test"
        />
        <button>Login!</button>
      </form>
    </div>
  );
};

export default Login;
