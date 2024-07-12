import React from "react";
import DbHeader from "./DbHeader";
import { Route, Routes } from "react-router-dom";
import DBHome from "../Components/DBHome";
import DBOrders from "../Components/DBOrders";
import DBProducts from "../Components/DBProducts";
import DBAddItems from "../Components/DBAddItems";
import DBUsers from "../Components/DBUsers";
import DBCategories from "./DBCategories";
import DBCoupons from "./DBCoupons";
import DBSalesReport from "./DBSalesReport";
import DBOffers from "./DBOffers";
import DBStatistics from "./DBStatistics";

const DBright = () => {
  return (
    <div className="flex flex-col  px-12 flex-1 h-full">
      <DbHeader />
      <div className="flex flex-col flex-1 overflow-y-scroll scrollbar-none">
        {/* <DBHome/> */}
        <Routes>
          <Route path="/home" element={<DBHome />} />
          <Route path="/orders" element={<DBOrders />} />
          <Route path="/products" element={<DBProducts />} />
          <Route path="/additems" element={<DBAddItems />} />
          <Route path="/users" element={<DBUsers />} />
          <Route path="/categories" element={<DBCategories />} />
          <Route path="/coupons" element={<DBCoupons />} />
          <Route path="/salesreport" element={<DBSalesReport />} />
          <Route path="/offers" element={<DBOffers />} />
          {/* <Route path="/statistics" element={<DBStatistics />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default DBright;
