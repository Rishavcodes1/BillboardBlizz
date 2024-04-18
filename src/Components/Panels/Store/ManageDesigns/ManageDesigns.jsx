import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../../Common/Navbar/Navbar";
import PageHeader from "../../Common/PageHeader/PageHeader";
import { Link, useNavigate } from "react-router-dom";
import fetchData from "../../../Functions/fetchData";
import showSpinner from "../../../Functions/showSpinner";
import hideSpinner from "../../../Functions/hideSpinner";
import showToast from "../../../Functions/showToast";
import { useSelector } from "react-redux";
import { useAuthenticate } from "../../../Hooks/useAuthenticate";
import NoDataFound from "../../Common/NoDataFound/NoDataFound";

export default function ManageDesigns() {
  document.title = "Manage designs";
  const store = useSelector((state) => state.login_reducer.store);
  const store_id = store ? store.user.id : "";
  useAuthenticate(store, "/store_login");
  const navigate = useNavigate();
  const [designs_data, setdesigns_data] = useState([]);
  const [isDesignLoaded, setisDesignLoaded] = useState(false);

  async function fetchDesigns() {
    let result = await fetchData(
      "http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=storedesignfetch",
      "POST",
      { store_id }
    );

    if (result.error == false) {
      setdesigns_data(result.details);
    }
    setisDesignLoaded(true);
  }

  useEffect(() => {
    fetchDesigns();
  }, []);

  async function deleteDesignIconHandler(id) {
    showSpinner(`#icon-container-${id}`, ".fa-trash", ".spinner");
    let result = await fetchData(
      "http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=storedesigndelete",
      "POST",
      { id }
    );
    result = await result.json();
    if (result.error == false) {
      hideSpinner(`#icon-container-${id}`, ".fa-trash", ".spinner");
      showToast(".b3-toast", ".successful-container-black");
      setTimeout(() => {
        window.location.reload();
      }, 4000);
    } else {
      hideSpinner(`#icon-container-${id}`, ".fa-trash", ".spinner");
      setTimeout(() => {
        alert(result.messsage);
      }, 100);
    }
  }

  return (
    <>
      <div className="successful-container-black d-none"></div>
      <div class="b3-toast">
        <span className="fs-5">BillboardBlizz</span>
        <span>design deleted successfully</span>
      </div>
      <Sidebar></Sidebar>
      <div className="panel-main-container-outer">
        <div className="panel-main-container-inner">
          <Navbar role={"store"}></Navbar>
          <div className="panel-main-container-inner2">
            <div className="panel-main-container-inner3">
              <PageHeader heading={"Manage designs"}></PageHeader>

              {!isDesignLoaded ? (
                <div className="loader-container">
                  <div className="loader manage-design-loader"></div>
                  <h3>Loading</h3>
                </div>
              ) : (
                <>
                  {designs_data.length > 0 ? (
                    <div className="store-manage-designs-table-container b3-shadow bg-white d-flex flex-column radius-2px">
                      <div class="alert b3-alert alert-dark fw-semibold d-flex align-items-center my-2">
                        <span class="material-symbols-outlined">info</span>

                        <span className="ms-2">
                          the total price of design is for 1 feet
                        </span>
                      </div>
                      <table>
                        <thead>
                          <tr>
                            <th>SR.NO.</th>
                            <th>id</th>
                            <th>Design name</th>
                            <th>Design price (per feet)</th>
                            <th>Material used</th>
                            <th>Total Price</th>
                            <th>Design added on</th>
                            <th className="action-th">edit / delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {designs_data.map((details, index) => (
                            <tr>
                              <td>#{index + 1}</td>
                              <td>{details.id}</td>
                              <td>{details.design_name}</td>
                              <td>{details.price_per_feet}</td>
                              <td>{details.material_category}</td>
                              <td>{details.total_prize}</td>
                              <td>
                                <span className="d-block">
                                  {details.datetime.split(" ")[0]}
                                </span>
                                <span className="d-block font-small">
                                  {details.datetime.split(" ")[1]}
                                </span>
                              </td>
                              <td>
                                <div className="icon-container-outer">
                                  <div className="icon-container-inner bg-primary-subtle">
                                    <i
                                      class="fa-solid fa-pen-to-square text-primary"
                                      onClick={() =>
                                        navigate(
                                          `/store_editdesigns/${details.id}`
                                        )
                                      }
                                    ></i>
                                  </div>
                                  <div
                                    className="icon-container-inner bg-danger-subtle"
                                    id={`icon-container-${details.id}`}
                                    onClick={() =>
                                      deleteDesignIconHandler(details.id)
                                    }
                                  >
                                    <i class="fa-solid fa-trash text-danger"></i>
                                    <div className="spinner spinner-small spinner-red d-none"></div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <NoDataFound message={"no designs found"}></NoDataFound>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
