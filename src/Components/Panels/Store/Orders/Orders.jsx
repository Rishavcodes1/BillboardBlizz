import React from "react";
import "./Orders.css";

import { useDispatch } from "react-redux";
import { orders, pendingOrder } from "../../../StateMangement/Actions/orders";
import NoDataFound from "../../Common/NoDataFound/NoDataFound";

export default function Orders(props) {
  const dispatch = useDispatch();
  const markOrderCompleted = (orderID) => {
    let order = dispatch(orders(orderID));
    if (order) {
      window.location.reload();
    }
  };
  const markOrderPending = (orderID) => {
    let order = dispatch(pendingOrder(orderID));
    if (order) {
      window.location.reload();
    }
  };
  return (
    <>
      {props.orders.length ? (
        <div className="store-home-recent-orders-container">
          <table className="order-table b3-shadow">
            <thead>
              <tr>
                <th>Sr.No</th>
                <th>Company logo</th>
                <th>Company name</th>
                <th className="description-container">Description</th>
                <th>Size</th>
                <th>Design</th>
                <th>Deadline</th>
                <th className="ordered-on-container">Ordered on</th>
                <th>Status</th>
                {props.current == "storeDashboard" ? <></> : <th>Update</th>}
              </tr>
            </thead>
            <tbody>
              {props.orders.map((details, index) => (
                <tr>
                  <td>#{index + 1}</td>
                  <td>
                    <img
                      src={`http://clickandcall.spectricssolutions.com/apilist/adsmaker/${details.company_logo}`}
                      alt=""
                    />
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <span className="fs-5 fw-semibold">
                        {details.company_name}
                      </span>
                      <span className="font-small text-gray">
                        {details.tagline}
                      </span>
                    </div>
                  </td>
                  <td className="font-small description-container">
                    {details.description.length > 100 ? (
                      <>{details.description.slice(0, 100)}...</>
                    ) : (
                      details.description
                    )}
                  </td>
                  <td>{details.size}'</td>
                  <td>
                    <div className="d-flex flex-column">
                      <span>{details.design_to_use}</span>
                      <span className=" font-small text-gray">
                        {details.material_to_use}
                      </span>
                    </div>
                  </td>
                  <td>{details.Deadline} days</td>
                  <td className="ordered-on-container">
                    <div className="d-flex flex-column">
                      <span>{details.datetime.split("-")[0]}</span>
                      <span className="font-small text-gray">
                        {details.datetime.split("-")[1]}
                      </span>
                    </div>
                  </td>
                  {props.current == "storeDashboard" ? (
                    <>
                      <td>
                        {details.status ? (
                          <span className="status status-green-reverse">
                            Completed
                          </span>
                        ) : (
                          <span className="status status-red-reverse">
                            pending
                          </span>
                        )}
                      </td>
                    </>
                  ) : (
                    <>
                      <td>
                        {props.current == "completedOrders" ? (
                          <span className="status status-green-reverse">
                            Completed
                          </span>
                        ) : (
                          <span className="status status-red-reverse">
                            pending
                          </span>
                        )}
                      </td>
                      <td>
                        {props.current == "completedOrders" ? (
                          <button
                            className="btn b3-btn-small btn-outline-danger font-small fw-semibold"
                            onClick={() => markOrderPending(details.id)}
                          >
                            Mark Pending
                          </button>
                        ) : (
                          <button
                            className="btn b3-btn-small btn-outline-success font-small fw-semibold"
                            onClick={() => markOrderCompleted(details.id)}
                          >
                            Mark completed
                          </button>
                        )}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NoDataFound message={"no orders found"}></NoDataFound>
      )}
    </>
  );
}
