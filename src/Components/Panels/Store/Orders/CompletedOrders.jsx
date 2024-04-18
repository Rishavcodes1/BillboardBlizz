import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../../Common/Navbar/Navbar";
import Orders from "./Orders";
import PageHeader from "../../Common/PageHeader/PageHeader";
import fetchData from "../../../Functions/fetchData";
import { useSelector } from "react-redux";
import { useAuthenticate } from "../../../Hooks/useAuthenticate";

export default function CompletedOrders() {
  document.title = "Completed orders";
  const store = useSelector((state) => state.login_reducer.store);
  let local_completed_orders = useSelector(
    (state) => state.orders_reducers.completed_orders
  );
  local_completed_orders = Object.values(local_completed_orders);
  const store_id = store ? store.user.id : "";
  useAuthenticate(store, "/store_login");
  const [completed_orders, setcompleted_orders] = useState([]);
  const [isOrdersLoaded, setisOrdersLoaded] = useState(false);
  const [current, setcurrent] = useState("");
  async function fetchOrders() {
    let result = await fetchData(
      "http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=ads_inquiry_store_fetch",
      "POST",
      { store_id }
    );
    let temp_completed_orders = [];
    if (result.error == false) {
      for (let detail of result.details) {
        if (local_completed_orders.includes(detail.id)) {
          temp_completed_orders.push(detail);
        }
      }
      setcompleted_orders(temp_completed_orders);
      setisOrdersLoaded(true);
    }
  }

  useEffect(() => {
    fetchOrders();
    setcurrent("completedOrders");
  }, []);
  return (
    <>
      <Sidebar></Sidebar>
      <div className="panel-main-container-outer">
        <div className="panel-main-container-inner">
          <Navbar role={"store"}></Navbar>
          <div className="panel-main-container-inner2">
            <div className="panel-main-container-inner3">
              <PageHeader heading={"Completed orders"}></PageHeader>
              {!isOrdersLoaded ? (
                <div className="loader-container">
                  <div className="loader"></div>
                  <h3>Loading</h3>
                </div>
              ) : (
                <Orders
                  orders={completed_orders}
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
