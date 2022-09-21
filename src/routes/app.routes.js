import React from "react";
import { Routes, Route } from "react-router-dom";
import ListPrizeDraws from "../pages/ListPrizeDraws";
import Layout from "../components/Layout";
import RegisterPrizeDraw from "../pages/RegisterPrizeDraw";
import ListCustomers from "../pages/ListCustomers";
import RegisterCustomer from "../pages/RegisterCustomer";
import {
  PAGE_NEW_PRIZE_DRAW,
  PAGE_LIST_PRIZE_DRAW,
  PAGE_LIST_CUSTOMER,
  PAGE_NEW_CUSTOMER,
} from "../constants";

const AppRoutes = () => (
  <Layout>
    <Routes>
      <Route path={PAGE_LIST_PRIZE_DRAW} element={<ListPrizeDraws />} />
      <Route path={PAGE_NEW_PRIZE_DRAW} element={<RegisterPrizeDraw />} />
      <Route path={PAGE_LIST_CUSTOMER} element={<ListCustomers />} />
      <Route path={PAGE_NEW_CUSTOMER} element={<RegisterCustomer />} />
    </Routes>
  </Layout>
);

export default AppRoutes;
