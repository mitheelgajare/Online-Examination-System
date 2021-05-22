import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import HomePageNav from "./HomePageNav";
import Image from "./../HomeBackground.png";

const HomePage = ({ membership, select }) => {
  const history = useHistory();
  if (membership === "false") {
    history.push("/login");
    return null;
  }

  return (
    <div className="mega-home-page">
      <HomePageNav select={select} />
      <img src={Image} alt="" />
    </div>
  );
};

export default HomePage;
