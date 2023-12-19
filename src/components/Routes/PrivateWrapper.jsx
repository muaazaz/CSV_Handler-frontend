import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

const PrivateWrapper = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default PrivateWrapper;
