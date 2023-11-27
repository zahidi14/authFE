import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import { Home, Notfound, Signup, Login } from "../../page";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
};
export default Router;
