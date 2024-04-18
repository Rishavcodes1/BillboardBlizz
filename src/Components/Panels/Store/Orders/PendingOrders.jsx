import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../../Common/Navbar/Navbar";
import Orders from "./Orders";
import PageHeader from "../../Common/PageHeader/PageHeader";
import fetchData from "../../../Functions/fetchData";
import { useSelector } from "react-redux";
import { useAuthenticate } from "../../../Hooks/useAuthenticate";

export default function PendingOrders() {
  document.title = "Pending orders";
  const store = useSelector((state) => state.login_reducer.store);
  const store_id = store ? store.user.id : "";
  useAuthenticate(store, "/store_login");
  let local_completed_orders = useSelector(
    (state) => state.orders_reducers.completed_orders
  );
  local_completed_orders = Object.values(local_completed_orders);
  const [pending_orders, setpending_orders] = useState([]);
  const [isOrdersLoaded, setisOrdersLoaded] = useState(false);
  const [current, setcurrent] = useState("");
  async function fetchOrders() {
    let result = await fetchData(
      "http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=ads_inquiry_store_fetch",
      "POST",
      { store_id }
    );
    let temp_pending_orders = [];
    if (result.error == false) {
      for (let detail of result.details) {
        if (!local_completed_orders.includes(detail.id)) {
          temp_pending_orders.push(detail);
        }
      }
      setpending_orders(temp_pending_orders);
      setisOrdersLoaded(true);
    }
  }

  

  useEffect(() => {
    fetchOrders();
    setcurrent("pendingOrders");
  }, []);
  return (
    <>
      <Sidebar></Sidebar>
      <div className="panel-main-container-outer">
        <div className="panel-main-container-inner">
          <Navbar role={"store"}></Navbar>
          <div className="panel-main-container-inner2">
            <div className="panel-main-container-inner3">
              <PageHeader heading={"Pending orders"}></PageHeader>
              {!isOrdersLoaded ? (
                <div className="loader-container">
                  <div className="loader"></div>
                  <h3>Loading</h3>
                </div>
              ) : (
                <Orders
                  orders={pending_orders}
                  current={current}
                  key={current}
                ></Orders>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
