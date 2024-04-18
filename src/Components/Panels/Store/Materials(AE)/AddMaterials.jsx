import React, { useState } from "react";
import { useNavigate } from "react-router";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../../Common/Navbar/Navbar";
import PageHeader from "../../Common/PageHeader/PageHeader";
import { Link } from "react-router-dom";
import "./Material(AE).css";
import fetchData from "../../../Functions/fetchData";
import showSpinner from "../../../Functions/showSpinner";
import hideSpinner from "../../../Functions/hideSpinner";
import showToast from "../../../Functions/showToast";
import { useSelector } from "react-redux";
import { useAuthenticate } from "../../../Hooks/useAuthenticate";
import authenticAllInputs from "../../../Functions/authenticAllInputs";
import showAlert from "../../../Functions/showAlert";

export default function AddMaterials() {
  document.title = "Add materials";
  const navigate = useNavigate();

  const store = useSelector((state) => state.login_reducer.store);
  
  const store_id = store ? store.user.id : "";
  useAuthenticate(store, "/store_login");
  const [material_data, setmaterial_data] = useState([
    { material_name: "", material_price: "" },
  ]);

  function addRowBtnHandler() {
    setmaterial_data([
      ...material_data,
      { material_name: "", material_price: "" },
    ]);
  }

  function addMaterialNameHandler(index, value) {
    let previousList = [...material_data];
    previousList[index].material_name = value;
    setmaterial_data(previousList);
  }
  function addMaterialPriceHandler(index, value) {
    let previousList = [...material_data];
    previousList[index].material_price = value;
    setmaterial_data(previousList);
  }

  async function addMaterials(material_name, prize_per_feet) {
    let data = { store_id, material_name, prize_per_feet };
    let result = await fetchData(
      "http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=storecategoryadd",
      "POST",
      data
    );
    if (result.error == false) {
      return 1;
    } else {
      return 0;
    }
  }

  async function addMaterialBtnHandler() {
    let isInputsEmpty = authenticAllInputs();

    if (isInputsEmpty) {
      showAlert(".alert-danger", "fill all the necessary field");
      return;
    }

    showSpinner(".add-material-btn", "span", ".spinner");
    let allMaterialsAdded = 0;
    for (let data of material_data) {
      let tempMaterialAdded = await addMaterials(
        data.material_name,
        data.material_price
      );
      if (tempMaterialAdded) {
        allMaterialsAdded = 1;
        continue;
      } else {
        allMaterialsAdded = 0;
      }
    }
    if (allMaterialsAdded) {
      showToast(".b3-toast", ".successful-container-black");
      setTimeout(() => {
        navigate("/store_manageMaterials");
      }, 4000);
    } else {
      hideSpinner(".add-material-btn", "span", ".spinner");
      setTimeout(() => {
        alert("Error while adding materials");
      }, 100);
    }
  }

  return (
    <>
      <div className="successful-container-black d-none"></div>
      <div class="b3-toast">
        <span className="fs-5">BillboardBlizz</span>
        <span>material added successfully</span>
      </div>
      <Sidebar></Sidebar>
      <div className="panel-main-container-outer">
        <div className="panel-main-container-inner">
          <Navbar role={"store"}></Navbar>
          <div className="panel-main-container-inner2">
            <div className="panel-main-container-inner3">
              <PageHeader heading={"Add materials"}></PageHeader>

              <div className="add-materials-form-container form-container b3-shadow">
                <div className="d-flex flex-column gap-3">
                  {material_data.map((i, index) => (
                    <div className="field-container">
                      <span className="fw-semibold">#{index + 1}</span>
                      <div className="flex-grow-1">
                        <label htmlFor="materialName">Material name</label>
                        <input
                          type="text"
                          className="material-name-container"
                          id={`materialName${index + 1}`}
                          onChange={(e) =>
                            addMaterialNameHandler(index, e.target.value)
                          }
                        />
                      </div>
                      <div className="flex-grow-1">
                        <label htmlFor="materialPrice">
                          Material price (per feet)
                        </label>
                        <input
                          type="number"
                          className="material-price-container"
                          id={`materialPrice${index + 1}`}
                          onChange={(e) =>
                            addMaterialPriceHandler(index, e.target.value)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <Link className="ms-auto my-2" onClick={addRowBtnHandler}>
                  + add row
                </Link>
                <div className="alert b3-alert alert-danger d-none"></div>
                <button
                  className="btn b3-btn btn-success add-material-btn ms-auto"
                  onClick={addMaterialBtnHandler}
                >
                  <span>Add material</span>
                  <div className="spinner spinner-normal spinner-white d-none"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
