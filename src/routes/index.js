import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./app.routes";

const Routes = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default Routes;
