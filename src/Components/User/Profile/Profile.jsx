import React, { useEffect, useState } from "react";
import "./Profile.css";
import Footer from "../Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import profileImage from "../../../Assets/profile-image.png";
import { useSelector } from "react-redux";
import fetchData from "../../Functions/fetchData";
import NoDataFound from "../../Panels/Common/NoDataFound/NoDataFound";
import { useAuthenticate } from "../../Hooks/useAuthenticate";

export default function Profile() {
  const navigate = useNavigate();
  document.title = "Profile";
  const [current, setcurrent] = useState("");
  const [orders_data, setorders_data] = useState([]);
  const [isOrdersLoaded, setisOrdersLoaded] = useState(false);
  const user = useSelector((state) => state.login_reducer.user);
  const user_id = user ? user.user.id : 0;

  useAuthenticate(user, "/login");

  let local_completed_orders = useSelector(
    (state) => state.orders_reducers.completed_orders
  );
  local_completed_orders = Object.values(local_completed_orders);

  let storeID_array = [];
  const [store_ids, setstore_ids] = useState([]);

  async function fetchUserOrders() {
    let result = await fetchData(
      "http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=ads_inquiry_user_fetch",
      "POST",
      { user_id }
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

        if (!storeID_array.includes(detail.store_id)) {
          storeID_array.push(detail.store_id);
          setstore_ids(storeID_array);
        }
      }
      setorders_data(temp_orders);
    }
    setisOrdersLoaded(true);
  }

  useEffect(() => {
    setcurrent("profile");
    fetchUserOrders();
  }, []);

  let storeID_object = {};
  const [store_names, setstore_names] = useState([]);

  useEffect(() => {
    store_ids.forEach(async (id) => {
      let result = await fetchData(
        "http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=fetchstoreid",
        "POST",
        { id }
      );
      if (result.error == false) {
        storeID_object[id] = result.details[0].store_name;
        setstore_names(storeID_object);
      }
    });
  }, [store_ids]);

  const logoutBtnHandler = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <nav className="profile-navbar">
        <div className="container">
          <span className="fs-4">
            <Link to="/" className="text-white fw-semibold">
              BillboardBlizz
            </Link>
          </span>
        </div>
      </nav>
      <div className="my-profile-container container">
        <div className="my-profile-container-inner">
          <div className="profile-image-container">
            <img src={profileImage} alt="" />
          </div>
          <div className="my-info-container">
            <div>
              <span className="fs-4 fw-semibold">
                {user ? user.user.name : ""}
              </span>
              <span className="font-small">
                @{user ? user.user.username : ""}
              </span>
              <button
                className="btn b3-btn btn-danger"
                onClick={logoutBtnHandler}
              >
                <i className="fa-solid fa-sign-out"></i>
                <span>Logout</span>
              </button>
            </div>
            <div>
              <i className="fa-solid fa-phone"></i>
              <span>{user ? user.user.$phoneno : ""}</span>
            </div>
            <div>
              <i className="fa-solid fa-envelope"></i>
              <span>{user ? user.user.email : ""}</span>
            </div>
            <div>
              <i className="fa-solid fa-location-dot"></i>
              <span>{user ? user.user.address : ""}</span>
            </div>
          </div>
        </div>
        <div className="my-orders pb-5 mb-3">
          <h4>My orders</h4>
          {isOrdersLoaded ? (
            <>
              {orders_data.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>SR.NO.</th>
                      <th>Ordered from</th>
                      <th>Design & Material</th>
                      <th className="my-details-container">My details</th>
                      <th className="ordered-on-container">Ordered on</th>
                      <th>Deadline</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders_data.map((details, index) => (
                      <tr>
                        <td>#{index + 1}</td>
                        <td>{store_names[details.store_id]}</td>
                        <td>
                          <div className="d-flex flex-column">
                            <span>{details.design_to_use}</span>
                            <span className="font-small">
                              {details.material_to_use}
                            </span>
                          </div>
                        </td>
                        <td className="my-details-container">
                          <div className="d-flex flex-column">
                            <img
                              src={`http://clickandcall.spectricssolutions.com/apilist/adsmaker/${details.company_logo}`}
                              alt=""
                            />
                            <span className="fw-semibold">
                              {details.company_name}
                            </span>
                            <span className="font-small">
                              {details.tagline}
                            </span>
                            <span className="font-small">
                              {details.description.length > 100 ? (
                                <>{details.description.slice(0, 100)}...</>
                              ) : (
                                details.description
                              )}
                            </span>
                          </div>
                        </td>
                        <td className="ordered-on-container">
                          <div className="d-flex flex-column">
                            <span>{details.datetime.split("-")[0]}</span>
                            <span className="font-small text-gray">
                              {details.datetime.split("-")[1]}
                            </span>
                          </div>
                        </td>
                        <td>{details.Deadline} days</td>
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <NoDataFound message={"No orders found"}></NoDataFound>
              )}
            </>
          ) : (
            <div className="loader-container">
              <div className="loader"></div>
              <h3>Loading your orders</h3>
            </div>
          )}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
