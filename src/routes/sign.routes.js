import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import { PAGE_LOGIN } from "../constants";

const SignRoutes = () => (
  <Routes>
    <Route path={PAGE_LOGIN} element={<Login />} />
  </Routes>
);

export default SignRoutes;
