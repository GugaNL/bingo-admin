import React from "react";
import { Routes, Route } from "react-router-dom";
import ListPrizeDraws from "../pages/ListPrizeDraws";
import Layout from "../components/Layout";
import RegisterPrizeDraw from "../pages/RegisterPrizeDraw";
import { PAGE_NEW_PRIZE_DRAW, PAGE_LIST_PRIZE_DRAW } from '../constants';

const AppRoutes = () => (
  <Layout>
    <Routes>
      <Route path={PAGE_LIST_PRIZE_DRAW} element={<ListPrizeDraws/>} />
      <Route path={PAGE_NEW_PRIZE_DRAW} element={<RegisterPrizeDraw/>} />
    </Routes>
  </Layout>
);

export default AppRoutes;
