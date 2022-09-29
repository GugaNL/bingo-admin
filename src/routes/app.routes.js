import React from "react";
import { Routes, Route } from "react-router-dom";
import ListPrizeDraws from "../pages/ListPrizeDraws";
import Layout from "../components/Layout";
import RegisterPrizeDraw from "../pages/RegisterPrizeDraw";
import ListCustomers from "../pages/ListCustomers";
import RegisterCustomer from "../pages/RegisterCustomer";
import EditTicket from "../pages/EditTicket";
import {
  PAGE_NEW_PRIZE_DRAW,
  PAGE_LIST_PRIZE_DRAW,
  PAGE_LIST_CUSTOMER,
  PAGE_NEW_CUSTOMER,
  PAGE_EDIT_TICKET
} from "../constants";

const AppRoutes = () => (
  <Layout>
    <Routes>
      <Route path={PAGE_LIST_PRIZE_DRAW} element={<ListPrizeDraws />} />
      <Route path={PAGE_NEW_PRIZE_DRAW} element={<RegisterPrizeDraw />} />
      <Route path={PAGE_LIST_CUSTOMER} element={<ListCustomers />} />
      <Route path={PAGE_NEW_CUSTOMER} element={<RegisterCustomer />} />
      <Route path={PAGE_EDIT_TICKET} element={<EditTicket />} />
    </Routes>
  </Layout>
);

export default AppRoutes;
