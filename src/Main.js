import React from "react";
import { Routes, BrowserRouter, Route, HashRouter } from "react-router-dom";

import StoreDashboard from "./Components/Panels/Store/Dashboard/Dashboard";
import AddMaterials from "./Components/Panels/Store/Materials(AE)/AddMaterials";
import EditMaterial from "./Components/Panels/Store/Materials(AE)/EditMaterial";
import ManageMaterials from "./Components/Panels/Store/ManageMaterials/ManageMaterials";
import AddDesign from "./Components/Panels/Store/Designs(AE)/AddDesign";
import EditDesign from "./Components/Panels/Store/Designs(AE)/EditDesign";
import ManageDesigns from "./Components/Panels/Store/ManageDesigns/ManageDesigns";
import GenerateInvoice from "./Components/Panels/Store/GenerateInvoice/GenerateInvoice";
import InvoiceHistory from "./Components/Panels/Store/InvoiceHistory/InvoiceHistory";
import CompletedOrders from "./Components/Panels/Store/Orders/CompletedOrders";
import PendingOrders from "./Components/Panels/Store/Orders/PendingOrders";
import StoreLogin from "./Components/Panels/Common/Login/StoreLogin";

import AdminLogin from "./Components/Panels/Common/Login/AdminLogin";
import AdminDashboard from "./Components/Panels/Admin/Dashboard/AdminDashboard";
import AddStore from "./Components/Panels/Admin/AddStore/AddStore";
import ManageStore from "./Components/Panels/Admin/ManageStore/ManageStore";

import Home from "./Components/User/Home/Home";
import About from "./Components/User/About/About";
import Login from "./Components/User/Login/Login";
import Register from "./Components/User/Register/Register";
import Contact from "./Components/User/Contact/Contact";
import OrderDesign from "./Components/User/OrderDesign/OrderDesign";
import NotFound404 from "./Components/404";
import AllDesigns from "./Components/User/Home/Designs/AllDesigns";
import Profile from "./Components/User/Profile/Profile";
export default function Main() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/about" element={<About></About>}></Route>
          <Route path="/contact" element={<Contact></Contact>}></Route>
          <Route path="/designs" element={<AllDesigns></AllDesigns>}></Route>
          <Route path="/profile" element={<Profile></Profile>}></Route>
          <Route
            path="/order_design/:storeID/:designID"
            element={<OrderDesign></OrderDesign>}
          ></Route>

          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>

          <Route
            path="/admin_login"
            element={<AdminLogin></AdminLogin>}
          ></Route>
          <Route
            path="/admin_dashboard"
            element={<AdminDashboard></AdminDashboard>}
          ></Route>
          <Route path="/admin_addStore" element={<AddStore></AddStore>}></Route>
          <Route
            path="/admin_manageStore"
            element={<ManageStore></ManageStore>}
          ></Route>

          <Route
            path="/store_login"
            element={<StoreLogin></StoreLogin>}
          ></Route>
          <Route
            path="/store_dashboard"
            element={<StoreDashboard></StoreDashboard>}
          ></Route>
          <Route
            path="/store_addMaterials"
            element={<AddMaterials></AddMaterials>}
          ></Route>
          <Route
            path="/store_addDesigns"
            element={<AddDesign></AddDesign>}
          ></Route>
          <Route
            path="/store_manageMaterials"
            element={<ManageMaterials></ManageMaterials>}
          ></Route>
          <Route
            path="/store_manageDesigns"
            element={<ManageDesigns></ManageDesigns>}
          ></Route>
          <Route
            path="/store_editMaterials/:id"
            element={<EditMaterial></EditMaterial>}
          ></Route>
          <Route
            path="/store_editDesigns/:id"
            element={<EditDesign></EditDesign>}
          ></Route>
          <Route
            path="/store_pendingOrders"
            element={<PendingOrders></PendingOrders>}
          ></Route>
          <Route
            path="/store_completedOrders"
            element={<CompletedOrders></CompletedOrders>}
          ></Route>
          <Route
            path="/store_invoiceHistory"
            element={<InvoiceHistory></InvoiceHistory>}
          ></Route>
          <Route
            path="/store_generateInvoice"
            element={<GenerateInvoice></GenerateInvoice>}
          ></Route>
          <Route path="*" element={<NotFound404></NotFound404>}></Route>
        </Routes>
      </HashRouter>
    </>
  );
}
