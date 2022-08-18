import React from "react";
import { Routes, Route } from "react-router-dom";
import List from "../pages/List";
import Layout from "../components/Layout";
import RegisterSweepstake from "../pages/RegisterSweepstake";

const AppRoutes = () => (
  <Layout>
    <Routes>
      <Route path="/sweepstakes" element={<List/>} />
      <Route path="/register-sweepstake" element={<RegisterSweepstake/>} />
    </Routes>
  </Layout>
);

export default AppRoutes;
