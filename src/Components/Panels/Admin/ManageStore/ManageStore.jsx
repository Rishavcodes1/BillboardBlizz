import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../../Common/Navbar/Navbar";
import PageHeader from "../../Common/PageHeader/PageHeader";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import useFetch from "../../../Hooks/useFetch";
import fetchData from "../../../Functions/fetchData";
import showSpinner from "../../../Functions/showSpinner";
import hideSpinner from "../../../Functions/hideSpinner";
import { useSelector } from "react-redux";
import { useAuthenticate } from "../../../Hooks/useAuthenticate";
import NoDataFound from "../../Common/NoDataFound/NoDataFound";

export default function ManageStore() {
  document.title = "Manage stores";
  const navigate = useNavigate();
  const admin = useSelector((state) => state.login_reducer.admin);
  const admin_id = admin ? admin.user.id : "";
  const username = admin ? admin.user.admin_username : "";
  const email = admin.user ? admin.user.email : "";
  useAuthenticate(admin, "/admin_login");

  const [storeData, setstoreData] = useState([]);
  const [materials_data, setmaterials_data] = useState([]);
  const [designs_data, setdesigns_data] = useState([]);
  const [isStoresLoaded, setisStoresLoaded] = useState(false);

  async function fetchStores() {
    let result = await fetchData(
      "http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=fetchstore",
      "POST",
      { admin_id }
    );
    if (result.error == false) {
      console.log(result);
      setstoreData(result.details);
    }

    setisStoresLoaded(true);
  }

  useEffect(() => {
    fetchStores();
  }, []);

  async function deleteData(api, method, dataToSend) {
    let result = await fetchData(api, method, dataToSend);
    if (result.error == false) {
      return 1;
    } else {
      return 0;
    }
  }

  async function fetchAllDesignsOfStore(store_id) {
    let list = await fetchData(
      "http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=storedesignfetch",
      "POST",
      { store_id },
      []
    );

    return list;
  }

  async function fetchAllMaterialssOfStore(store_id) {
    let list = await fetchData(
      "http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=storecategoryfetch",
      "POST",
      { store_id },
      []
    );
    return list;
  }

  async function deleteAllDesignsOfStore(list) {
    let allDesignsDeleted = 0;
    for (let id of list) {
      if (
        await deleteData(
          "http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=storedesigndelete",
          "POST",
          { id }
        )
      ) {
        allDesignsDeleted = 1;
        continue;
      } else {
        allDesignsDeleted = 0;
        break;
      }
    }
    return allDesignsDeleted;
  }

  async function deleteAllMaterialssOfStore(list) {
    let allMaterialsDeleted = 0;
    for (let id of list) {
      if (
        await deleteData(
          "http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=storecategorydelete",
          "POST",
          { id }
        )
      ) {
        allMaterialsDeleted = 1;
        continue;
      } else {
        allMaterialsDeleted = 0;
        break;
      }
    }
    return allMaterialsDeleted;
  }

  async function deleteStoreBtnHandler(id) {
    showSpinner(`#icon-container-${id}`, ".fa-trash", ".spinner");

    let designIdList = await fetchAllDesignsOfStore(id);
    if (designIdList.length > 0) {
      let num = await deleteAllDesignsOfStore(designIdList);
      if (!num) {
        setTimeout(() => {
          alert("some error occured while deleting designs");
        }, 100);
        hideSpinner(`#icon-container-${id}`, ".fa-trash", ".spinner");
        return 0;
      }
    }

    let materialIdList = await fetchAllMaterialssOfStore(id);
    if (materialIdList.length > 0) {
      let num = await deleteAllMaterialssOfStore(materialIdList);
      if (!num) {
        setTimeout(() => {
          alert("some error occured while deleting materials");
        }, 100);
        hideSpinner(`#icon-container-${id}`, ".fa-trash", ".spinner");
        return 0;
      }
    }

    let result = await deleteData(
      "http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=deletestore",
      "POST",
      { id }
    );
    if (result) {
      window.location.reload();
    } else {
      setTimeout(() => {
        alert("error occured while deleting store");
      }, 100);
      hideSpinner(`#icon-container-${id}`, ".fa-trash", ".spinner");
    }
  }

  return (
    <>
      <div className="successful-container-black d-none"></div>
      <div class="b3-toast">
        <span className="fs-5">BillboardBlizz</span>
        <span>store deleted successfully</span>
      </div>
      <Sidebar></Sidebar>
      <div className="panel-main-container-outer">
        <div className="panel-main-container-inner">
          <Navbar username={username} email={email} role={"admin"}></Navbar>
          <div className="panel-main-container-inner2">
            <div className="panel-main-container-inner3">
              <PageHeader heading={"Manage stores"}></PageHeader>
              {!isStoresLoaded ? (
                <div className="loader-container">
                  <div className="loader"></div>
                  <h3>Loading</h3>
                </div>
              ) : (
                <>
                  {storeData.length > 0 ? (
                    <div className="manage-store-table-container my-3 py-2 b3-shadow">
                      <table>
                        <thead>
                          <tr>
                            <th>SR.NO</th>
                            <th>Store name</th>
                            <th>Email</th>
                            <th>Store started on</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {storeData.map((details, index) => (
                            <tr>
                              <td>#{index + 1}</td>
                              <td>
                                <span>{details.store_name}</span>
                                <span className=" font-small2 d-block">
                                  (@{details.store_username})
                                </span>
                              </td>
                              <td>{details.email}</td>
                              <td>{details.store_start_date}</td>
                              <td>
                                {details.status ? (
                                  <span className="status status-green">
                                    active
                                  </span>
                                ) : (
                                  <span className="status status-red">
                                    inactive
                                  </span>
                                )}
                              </td>
                              <td className="p-0">
                                <div className="icon-container-outer">
                                  {/* <div
                                    className="icon-container-inner bg-primary-subtle"
                                    id={`icon-container-${details.id}`}
                                  >
                                    <i class="fa-solid fa-pen-to-square text-primary"></i>
                                  </div> */}

                                  <div
                                    className="bg-danger-subtle icon-container-inner"
                                    id={`icon-container-${details.id}`}
                                    onClick={() =>
                                      deleteStoreBtnHandler(details.id)
                                    }
                                  >
                                    <i className="fa-solid fa-trash text-danger"></i>
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
                    <NoDataFound message={"no stores found"}></NoDataFound>
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
