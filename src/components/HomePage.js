import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import HomePageNav from "./HomePageNav";

const HomePage = ({ membership, select }) => {
  const history = useHistory();
  if (membership === "false") {
    history.push("/login");
    return null;
  }

  return (
    <div className="mega-home-page">
      <HomePageNav select={select} />
    </div>
  );
};

export default HomePage;
