import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

const Logout = ({ setMembership }) => {
  const history = useHistory();
  setMembership("false");
  history.push("/");
  return null;
};

export default Logout;
