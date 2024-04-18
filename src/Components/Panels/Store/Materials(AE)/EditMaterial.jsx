import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuthenticate } from "../../../Hooks/useAuthenticate";
import fetchData from "../../../Functions/fetchData";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../../Common/Navbar/Navbar";
import PageHeader from "../../Common/PageHeader/PageHeader";
import authenticAllInputs from "../../../Functions/authenticAllInputs";
import showAlert from "../../../Functions/showAlert";
import showSpinner from "../../../Functions/showSpinner";
import showToast from "../../../Functions/showToast";
import hideSpinner from "../../../Functions/hideSpinner";
import NoDataFound from "../../Common/NoDataFound/NoDataFound";

export default function EditMaterial() {
  const { id } = useParams();
  const [material_name, setmaterial_name] = useState("");
  const [prize_per_feet, setprize_per_feet] = useState("");
  const [isMaterialLoaded, setisMaterialLoaded] = useState(false);
  const [material_data, setmaterial_data] = useState(0);

  document.title = "Edit materials";
  const navigate = useNavigate();

  const store = useSelector((state) => state.login_reducer.store);

  useAuthenticate(store, "/store_login");

  async function fetchMaterial() {
    let result = await fetchData(
      "http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=storecategoryedit",
      "POST",
      { id }
    );
    console.log(result)
    if (result.error == false) {
      setmaterial_name(result.details.material_name);
      setprize_per_feet(result.details.prize_per_feet);
      setmaterial_data(1);
    }
    setisMaterialLoaded(true);
  }

  useEffect(() => {
    fetchMaterial();
  }, []);

  async function updateMaterialBtnHandler() {
    let isInputsEmpty = authenticAllInputs();
    if (isInputsEmpty) {
      showAlert(".alert-danger", "Fill all the necessary field");
      return;
    }

    let data = { id, material_name, prize_per_feet };
    showSpinner(".add-material-btn", "span", ".spinner");
    let result = await fetchData(
      "http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=storecategoryupdate",
      "POST",
      data
    );
    console.log(data)
    console.log(result);
    if (result.error == false) {
      showToast(".b3-toast", ".successful-container-black");
      setTimeout(() => {
        navigate("/store_manageMaterials");
      }, 3000);
    } else {
      hideSpinner(".add-material-btn", "span", ".spinner");
    }
  }
  return (
    <>
      <div className="successful-container-black d-none"></div>
      <div class="b3-toast">
        <span className="fs-5">BillboardBlizz</span>
        <span>material updated successfully</span>
      </div>
      <Sidebar></Sidebar>
      <div className="panel-main-container-outer">
        <div className="panel-main-container-inner">
          <Navbar role={"store"}></Navbar>
          <div className="panel-main-container-inner2">
            <div className="panel-main-container-inner3">
              <PageHeader heading={"Edit materials"}></PageHeader>

              {isMaterialLoaded ? (
                <>
                  {material_data? (
                    <div className="add-materials-form-container form-container b3-shadow">
                      <div className="d-flex flex-column gap-3">
                        <div className="field-container">
                          <span className="fw-semibold">#1</span>
                          <div className="flex-grow-1">
                            <label htmlFor="materialName">Material name</label>
                            <input
                              type="text"
                              value={material_name}
                              className="material-name-container"
                              onChange={(e) => setmaterial_name(e.target.value)}
                            />
                          </div>
                          <div className="flex-grow-1">
                            <label htmlFor="materialPrice">
                              Material price (per feet)
                            </label>
                            <input
                              type="number"
                              value={prize_per_feet}
                              className="material-price-container"
                              onChange={(e) =>
                                setprize_per_feet(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="alert b3-alert alert-danger d-none"></div>
                      <button
                        className="btn b3-btn btn-success add-material-btn ms-auto"
                        onClick={updateMaterialBtnHandler}
                      >
                        <span>Update material</span>
                        <div className="spinner spinner-normal spinner-white d-none"></div>
                      </button>
                    </div>
                  ) : (
                    <NoDataFound
                      message={"No material found for given id"}
                    ></NoDataFound>
                  )}
                </>
              ) : (
                <div className="loader-container">
                  <div className="loader"></div>
                  <h3>Loading material detials</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
