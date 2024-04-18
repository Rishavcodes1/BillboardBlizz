import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../../Common/Navbar/Navbar";
import PageHeader from "../../Common/PageHeader/PageHeader";
import { useSelector } from "react-redux";
import { useAuthenticate } from "../../../Hooks/useAuthenticate";
import fetchData from "../../../Functions/fetchData";

export default function AdminDashboard() {
  document.title = "Dashboard";
  const [stores_data, setstores_data] = useState([]);
  const [designs_count, setdesigns_count] = useState(0);
  const [orders, setorders] = useState([]);
  const [total_orders, settotal_orders] = useState(0);
  const admin = useSelector((state) => state.login_reducer.admin);
  const username = admin ? admin.user.admin_username : "";
  const email = admin ? admin.user.email : "";
  const admin_id = admin ? admin.user.id : "";
  useAuthenticate(admin, "/admin_login");

  async function fetchStores() {
    let result = await fetchData(
      "http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=fetchstore",
      "POST",
      { admin_id }
    );
    if (result.error == false) {
      setstores_data(result.details);
    }
  }

  async function fetchAllDesignsOfYourListedStores() {
    stores_data.forEach(async (details) => {
      let store_id = details.id;
      let result = await fetchData(
        "http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=storedesignfetch",
        "POST",
        { store_id }
      );
      if (result.error == false) {
        setdesigns_count(
          (designs_count) => designs_count + result.details.length
        );
      }
    });
  }
  async function fetchAllOrdersOfYourListedStores() {
    stores_data.forEach(async (details) => {
      let store_id = details.id;
      let result = await fetchData(
        "http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=ads_inquiry_store_fetch",
        "POST",
        { store_id }
      );
      if (result.error == false) {
        settotal_orders((total_orders) => total_orders + result.details.length);
        let updatedOrders = [...orders, {...result.details}]
        setorders(updatedOrders);
      }
    });
  }

  useEffect(() => {
    fetchStores();
  }, []);
  useEffect(() => {
    fetchAllDesignsOfYourListedStores();
    fetchAllOrdersOfYourListedStores();
    console.log(orders)
  }, [stores_data]);

  return (
    <>
      <Sidebar></Sidebar>
      <div className="panel-main-container-outer">
        <div className="panel-main-container-inner">
          <Navbar username={username} email={email} role={"admin"}></Navbar>
          <div className="panel-main-container-inner2">
            <div className="panel-main-container-inner3">
              <PageHeader heading={"Dashboard"}></PageHeader>
              <div className="dashboard-stats-container my-3">
                <div>
                  <div>
                    <span>Total stores</span>
                    <span className="fs-3 fw-semibold text-primary">
                      {stores_data.length}
                    </span>
                    <span className="font-small2 text-success fw-semibold">
                      increased 30%
                    </span>
                  </div>
                  <div className="ms-auto">
                    <div className="bg-primary icon-container-normal text-white">
                      <i class="fa-solid fa-shop"></i>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <span>Total designs of your stores</span>
                    <span className="fs-3 fw-semibold text-purple">
                      {designs_count}
                    </span>
                    <span className="font-small2 text-danger fw-semibold">
                      decreased 25%
                    </span>
                  </div>
                  <div className="ms-auto ">
                    <div className="bg-purple icon-container-normal text-white">
                      <i class="fa-solid fa-palette"></i>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <span>Total orders of your store</span>
                    <span className="fs-3 fw-semibold text-danger">
                      {total_orders}
                    </span>
                    <span className="font-small2 text-danger fw-semibold">
                      increased 57%
                    </span>
                  </div>
                  <div className="ms-auto">
                    <div className="bg-danger icon-container-normal text-white">
                      <span class="material-symbols-outlined">list_alt</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <span>Total revenue of your store</span>
                    <span className="fs-3 fw-semibold text-success">₹1,00,000</span>
                    <span className="font-small2 text-success fw-semibold">
                      decreased 20%
                    </span>
                  </div>
                  <div className="ms-auto">
                    <div className="bg-success icon-container-normal text-white fs-4">
                      ₹
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
