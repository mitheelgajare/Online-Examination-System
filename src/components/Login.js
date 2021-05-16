import React, { useState, useEffect } from "react";

const Login = ({ select }) => {
  const handleSubmit = e => {
    e.preventDefault();
  };
  let placeholder = select[0].toUpperCase() + select.substr(1) + " ID";

  return (
    <div className="login-page">
      <form action="" autoComplete="off" onSubmit={handleSubmit}>
        <input type="text" placeholder={placeholder} />
      </form>
    </div>
  );
};

export default Login;
