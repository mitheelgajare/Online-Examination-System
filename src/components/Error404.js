import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="error-404-page">
      <div>
        <h1>Error 404</h1>
        Sorry, this is not a valid URL 😥😥. <br />
        Here are some helpful links:
        <Link to="/" className="link sl">
          Home
        </Link>
        <Link to="/login" className="link">
          Login
        </Link>
        <Link to="/logout" className="link">
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Error404;
