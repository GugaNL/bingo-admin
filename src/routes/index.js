import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./app.routes";
import SignRoutes from "./sign.routes";
import { useAuth } from "../hooks/auth";

const Routes = () => {
  const { logged } = useAuth();
  return (
    <BrowserRouter>{logged ? <AppRoutes /> : <SignRoutes />}</BrowserRouter>
  );
};

export default Routes;
