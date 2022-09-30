import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import { PAGE_LOGIN } from "../constants";

const SignRoutes = () => (
  <Routes>
    <Route path={PAGE_LOGIN} element={<Login />} />
    <Route
        path="*"
        element={<Navigate to={PAGE_LOGIN} replace />}
    />
  </Routes>
);

export default SignRoutes;
