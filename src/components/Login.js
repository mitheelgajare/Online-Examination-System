import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Login = ({ select, setMembership }) => {
  const history = useHistory();
  const [uid, setUid] = useState("");
  const [psw, setPsw] = useState("");

  // const [Data, setData] = useState(null);

  // useEffect(() => {
  //   fetch("http://localhost:5000/getUsers")
  //     .then(res => res.json())
  //     .then(data => {
  //       setData(data);
  //     });
  // }, []);

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/authenticate", { uid, psw, select })
      .then(res => {
        if (res.status === 200) {
          history.push("/home");
          setMembership("true");
          return null;
        }
      })
      .catch(err => {
        alert("Incorrect username or password");
        setPsw("");
      });
  };

  let placeholder = select[0].toUpperCase() + select.substr(1) + " ID";

  return (
    <div className="login-page">
      <div>
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
    </div>
  );
};

export default Login;
