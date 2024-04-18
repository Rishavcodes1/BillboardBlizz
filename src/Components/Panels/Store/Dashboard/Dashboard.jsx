import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import useFetch from "../../../Hooks/useFetch";
import Navbar from "../../Common/Navbar/Navbar";
import PageHeader from "../../Common/PageHeader/PageHeader";
import { useSelector } from "react-redux";
import { useAuthenticate } from "../../../Hooks/useAuthenticate";
import Orders from "../Orders/Orders";
import fetchData from "../../../Functions/fetchData";

export default function Dashboard() {
  document.title = "Dashboard";
  const [orders, setorders] = useState([]);
  const [materials_data, setmaterials_data] = useState([]);
  const [designs_data, setdesigns_data] = useState([]);
  const [isDataLoaded, setisDataLoaded] = useState(false);
  const [current, setcurrent] = useState("");
  const store = useSelector((state) => state.login_reducer.store);
  const store_id = store ? store.user.id : "";
  let local_completed_orders = useSelector(
    (state) => state.orders_reducers.completed_orders
  );

  useAuthenticate(store, "/store_login");
  async function fetchMaterials() {
    let result = await fetchData(
      "http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=storecategoryfetch",
      "POST",
      { store_id }
    );
    if (result.error == false) {
      setmaterials_data(result.details);
    }
  }
  async function fetchDesigns() {
    let result = await fetchData(
      "http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=storedesignfetch",
      "POST",
      { store_id }
    );

    if (result.error == false) {
      setdesigns_data(result.details);
    }
  }

  async function fetchRecentOrders() {
    let result = await fetchData(
      "http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=ads_inquiry_store_fetch",
      "POST",
      { store_id }
    );
    if (result.error == false) {
      local_completed_orders = Object.values(local_completed_orders);
      let temp_orders = [];

      for (let detail of result.details) {
        if (local_completed_orders.includes(detail.id)) {
          detail["status"] = 1;
        } else {
          detail["status"] = 0;
        }
        temp_orders.push(detail);
      }
      setorders(temp_orders);
      setisDataLoaded(true);
    }
  }

  useEffect(() => {
    fetchMaterials();
    fetchDesigns();
    fetchRecentOrders();
    setcurrent("storeDashboard");
  }, []);

  const local_pending_orders = local_completed_orders
    ? orders.length - local_completed_orders.length
    : 0;

  return (
    <>
      <Sidebar></Sidebar>
      <div className="panel-main-container-outer">
        <div className="panel-main-container-inner">
          <Navbar role={"store"}></Navbar>
          <div className="panel-main-container-inner2">
            <div className="panel-main-container-inner3">
              <PageHeader heading={"Dashboard"}></PageHeader>
              <div className="dashboard-stats-container my-3">
                <div>
                  <div>
                    <span>Total materials</span>
                    <span className="fs-3 fw-semibold text-primary">
                      {materials_data.length}
                    </span>
                    <span className="font-small2 text-success fw-semibold">
                      increased 30%
                    </span>
                  </div>
                  <div className="ms-auto">
                    <div className="bg-primary icon-container-normal text-white">
                      <i class="fa-solid fa-boxes-packing"></i>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <span>Total designs</span>
                    <span className="fs-3 fw-semibold text-purple">
                      {designs_data.length}
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
                    <span>Total orders</span>
                    <span className="fs-3 fw-semibold text-success">
                      {orders ? orders.length : ""}
                    </span>
                    <span className="font-small2 text-success fw-semibold">
                      increased 57%
                    </span>
                  </div>
                  <div className="ms-auto">
                    <div className="bg-success icon-container-normal text-white">
                      <span class="material-symbols-outlined">list_alt</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <span>Pending orders</span>
                    <span className="fs-3 fw-semibold text-danger">
                      {local_pending_orders}
                    </span>
                    <span className="font-small2 text-danger fw-semibold">
                      decreased 20%
                    </span>
                  </div>
                  <div className="ms-auto">
                    <div className="bg-danger icon-container-normal text-white">
                      <span class="material-symbols-outlined">
                        inactive_order
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <h4>Recent orders</h4>
              {isDataLoaded ? (
                <Orders
                  orders={orders}
                  current={current}
                  key={current}
                ></Orders>
              ) : (
                <div className="loader-container">
                  <div className="loader"></div>
                  <h3>Loading recent orders</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
