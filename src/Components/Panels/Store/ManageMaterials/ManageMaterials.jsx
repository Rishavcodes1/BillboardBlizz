import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../../Common/Navbar/Navbar";
import PageHeader from "../../Common/PageHeader/PageHeader";
import fetchData from "../../../Functions/fetchData";
import showSpinner from "../../../Functions/showSpinner";
import hideSpinner from "../../../Functions/hideSpinner";
import showToast from "../../../Functions/showToast";
import { useSelector } from "react-redux";
import { useAuthenticate } from "../../../Hooks/useAuthenticate";
import NoDataFound from '../../Common/NoDataFound/NoDataFound'

export default function ManageMaterials() {
  document.title = "Manage materials";
  const store = useSelector((state) => state.login_reducer.store);
  const store_id = store ? store.user.id : "";
  useAuthenticate(store, "/store_login");
  const navigate = useNavigate();
  const [materials_data, setmaterials_data] = useState([]);
  const [isMaterialsLoaded, setisMaterialsLoaded] = useState(false);

  async function fetchMaterials() {
    let result = await fetchData(
      "http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=storecategoryfetch",
      "POST",
      { store_id }
    );
    if (result.error == false) {
      setmaterials_data(result.details);
    }
    setisMaterialsLoaded(true);
  }

  useEffect(() => {
    fetchMaterials();
  }, []);

  async function getDesignsHavingThisMaterial(materialName) {
    let designsList = [];
    let result = await fetchData(
      "http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=storedesignfetch",
      "POST",
      { store_id }
    );
    if (result.error == false) {
      for (let details of result.details) {
        if (details.material_category == materialName) {
          designsList.push(details.id);
        }
      }

      return designsList;
    } else if (result.error == true) {
      return 0;
    }
  }

  async function deleteDesign(id) {
    let result = await fetchData(
      "http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=storedesigndelete",
      "POST",
      { id }
    );
    if (result.error == false) {
      return 1;
    } else {
      return 0;
    }
  }

  async function deleteMaterialIconHandler(id, material_name) {
    let decision = window.confirm(
      `By deleting the material "${material_name}", all the designs made using this material will also be deleted\n\n are you sure you want to delete it?`
    );
    if (decision) {
      showSpinner(`#icon-container-${id}`, ".fa-trash", ".spinner");
      let designs = await getDesignsHavingThisMaterial(material_name);
      let allDesignsDeleted = 0;
      if (designs.length > 0) {
        console.log("woring");
        for (let designID of designs) {
          let tempNumber = await deleteDesign(designID);
          if (tempNumber) {
            allDesignsDeleted = 1;
            continue;
          } else {
            allDesignsDeleted = 0;
            break;
          }
        }
      } else {
        allDesignsDeleted = 1;
      }

      if (allDesignsDeleted) {
        let result = await fetchData(
          "http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=storecategorydelete",
          "POST",
          { id }
        );
        if (result.error == false) {
          showToast(".b3-toast", ".successful-container-black");
          setTimeout(() => {
            window.location.reload();
          }, 4000);
        }
      } else {
        hideSpinner(`#icon-container-${id}`, ".fa-trash", ".spinner");
        setTimeout(() => {
          alert("delete operation failed");
        }, 100);
      }
    }
  }
  return (
    <>
      <div className="successful-container-black d-none"></div>
      <div class="b3-toast">
        <span className="fs-5">BillboardBlizz</span>
        <span>material deleted successfully</span>
      </div>
      <Sidebar></Sidebar>
      <div className="panel-main-container-outer">
        <div className="panel-main-container-inner">
          <Navbar role={"store"}></Navbar>
          <div className="panel-main-container-inner2">
            <div className="panel-main-container-inner3">
              <PageHeader heading={"Manage materials"}></PageHeader>
              {!isMaterialsLoaded ? (
                <div className="loader-container">
                  <div className="loader"></div>
                  <h3>Loading</h3>
                </div>
              ) : (
                <>
                  {materials_data.length > 0 ? (
                    <div className="bg-white b3-shadow">
                      <table>
                        <thead>
                          <tr>
                            <th>SR.NO.</th>
                            <th>Material name</th>
                            <th>id</th>
                            <th>price (per feet)</th>
                            <th>edit / delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {materials_data.map((details, index) => (
                            <tr>
                              <td>#{index + 1}</td>
                              <td>{details.material_name}</td>
                              <td>{details.id}</td>
                              <td>₹{details.prize_per_feet}</td>
                              <td>
                                <div className="icon-container-outer">
                                  <div
                                    className="icon-container-inner bg-primary-subtle"
                                    onClick={() => {
                                      navigate(
                                        `/store_editmaterials/${details.id}`
                                      );
                                    }}
                                  >
                                    <i class="fa-solid fa-pen-to-square text-primary"></i>
                                  </div>
                                  <div
                                    className="icon-container-inner bg-danger-subtle"
                                    id={`icon-container-${details.id}`}
                                    onClick={() =>
                                      deleteMaterialIconHandler(
                                        details.id,
                                        details.material_name
                                      )
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
                    <NoDataFound message={"no materials found"}></NoDataFound>
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
