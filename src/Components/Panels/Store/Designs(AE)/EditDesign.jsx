import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../../Common/Navbar/Navbar";
import PageHeader from "../../Common/PageHeader/PageHeader";
import "./Design(AE).css";
import fetchData from "../../../Functions/fetchData";
import addDataWithImage from "../../../Functions/addDataWithImage";
import showSpinner from "../../../Functions/showSpinner";
import showToast from "../../../Functions/showToast";
import { useSelector } from "react-redux";
import { useAuthenticate } from "../../../Hooks/useAuthenticate";
import authenticAllInputs from "../../../Functions/authenticAllInputs";
import authenticSelect from "../../../Functions/authenticSelect";
import showAlert from "../../../Functions/showAlert";
import NoDataFound from "../../Common/NoDataFound/NoDataFound";

export default function AddDesign() {
  const { id } = useParams();
  document.title = "Edit design";
  const navigate = useNavigate();
  const store = useSelector((state) => state.login_reducer.store);
  const store_id = store ? store.user.id : "";
  const [isMaterialsLoaded, setisMaterialsLoaded] = useState(false);
  const [isDesignLoaded, setisDesignLoaded] = useState(false);
  const [materials_data, setmaterials_data] = useState([]);
  const [design_data, setdesign_data] = useState([]);
  const [design_name, setdesign_name] = useState("");
  const [upload_design, setupload_design] = useState(null);
  const [material_category, setmaterial_category] = useState("");
  const [price_per_feet, setprice_per_feet] = useState(0);
  const [price_of_material, setprice_of_material] = useState(0);
  const [total_prize, settotal_prize] = useState(0);

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
    setisMaterialsLoaded(true);
  }
  async function fetchDesign() {
    let result = await fetchData(
      "http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=storedesignedit",
      "POST",
      { id }
    );
    console.log(result);
    if (result.error == false) {
      setdesign_data(result.details);
      setdesign_name(result.details.design_name);
      setprice_per_feet(result.details.price_per_feet);
      setmaterial_category(result.details.material_category);
      setprice_of_material(result.details.price_of_material);
      settotal_prize(result.details.total_prize);
    }
    setisDesignLoaded(true);
  }

  useEffect(() => {
    fetchMaterials();
    fetchDesign();
  }, []);

  function materialSelectionHandler(event) {
    let index = event.target.value;
    if (index != "default") {
      setprice_of_material(materials_data[index].prize_per_feet);
      setmaterial_category(materials_data[index].material_name);
    } else {
      setprice_of_material(0);
      setmaterial_category("");
    }
  }

  function numberHandler() {
    let tempTotalPrice = 0;
    if (price_per_feet == 0 || price_of_material == 0) {
      tempTotalPrice = 0;
    } else {
      tempTotalPrice =
        [parseInt(price_per_feet) + parseInt(price_of_material)] * 1;
    }
    settotal_prize(tempTotalPrice);
  }

  useEffect(() => {
    numberHandler();
  }, [price_per_feet, price_of_material, material_category]);

  async function addDesignBtnHandler() {
    let isInputEmpty = authenticAllInputs();
    let isSelectEmpty = authenticSelect();

    if (isInputEmpty || isSelectEmpty) {
      showAlert(".alert-danger", "fill all the necessary field");
      return;
    }

    showSpinner(".add-design-btn", "span", ".spinner");
    let formData = new FormData();
    formData.append("store_id", store_id);
    formData.append("design_name", design_name);
    formData.append("upload_design", upload_design);
    formData.append("material_category", material_category);
    formData.append("price_per_feet", price_per_feet);
    formData.append("price_of_material", price_of_material);
    formData.append("total_prize", total_prize);

    let result = await addDataWithImage(
      "http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=storedesignadd",
      "POST",
      formData
    );
    if (result.error == false) {
      showToast(".b3-toast", ".successful-container-black");
      setTimeout(() => {
        navigate("/store_manageDesigns");
      }, 4000);
    }
  }

  return (
    <>
      <div className="successful-container-black d-none"></div>
      <div class="b3-toast">
        <span className="fs-5">BillboardBlizz</span>
        <span>design Updated successfully</span>
      </div>
      <Sidebar></Sidebar>
      <div className="panel-main-container-outer">
        <div className="panel-main-container-inner">
          <Navbar role={"store"}></Navbar>
          <div className="panel-main-container-inner2">
            <div className="panel-main-container-inner3">
              <PageHeader heading={"Edit designs"}></PageHeader>
              {!isMaterialsLoaded ? (
                <div className="loader-container">
                  <div className="loader"></div>
                  <h3>Loading designs data</h3>
                </div>
              ) : (
                <>
                  {materials_data.length > 0 && isDesignLoaded ? (
                    <div className="add-designs-form-container form-container bg-white b3-shadow w-75 mx-auto">
                      <div class="alert b3-alert alert-primary fw-semibold d-flex align-items-center">
                        <span class="material-symbols-outlined">info</span>

                        <span className="ms-2">
                          the total price of design is for 1 feet
                        </span>
                      </div>
                      <div className="field-container">
                        <div>
                          <label htmlFor="designName">Design name</label>
                          <input
                            type="text"
                            id="designName"
                            value={design_name}
                            onChange={(e) => {
                              setdesign_name(e.target.value);
                            }}
                          />
                        </div>
                        <div>
                          <label htmlFor="designPrice">
                            Design price (per feet)
                          </label>
                          <input
                            type="number"
                            id="designPrice"
                            value={price_per_feet}
                            onChange={(e) => {
                              setprice_per_feet(e.target.value);
                            }}
                          />
                        </div>
                        <div>
                          <label htmlFor="designImage">Design image</label>
                          <input
                            type="file"
                            id="designImage"
                            onChange={(e) => {
                              setupload_design(e.target.files[0]);
                            }}
                          />
                        </div>
                        <div>
                          <label htmlFor="materialToUse">Material to use</label>
                          <select
                            id="materialToUse"
                            onChange={materialSelectionHandler}
                          >
                            <option value="default">Select material</option>
                            {materials_data.map((details, index) =>
                              details.material_name == material_category ? (
                                <option value={index} selected>
                                  {details.material_name}
                                </option>
                              ) : (
                                <>
                                  <option value={index}>
                                    {details.material_name}
                                  </option>
                                </>
                              )
                            )}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="materialPrice">
                            Material price(per feet)
                          </label>
                          <input
                            type="text"
                            id="materialPrice"
                            value={price_of_material}
                            readOnly
                          />
                        </div>
                        <div>
                          <label htmlFor="totalPrice">Total price</label>
                          <input
                            type="text"
                            id="totalPrice"
                            value={total_prize}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="alert b3-alert alert-danger d-none"></div>
                      <button
                        className="btn b3-btn btn-success add-design-btn"
                        onClick={addDesignBtnHandler}
                      >
                        <span>Update design</span>
                        <div className="spinner spinner-white spinner-normal d-none"></div>
                      </button>
                    </div>
                  ) : (
                    <NoDataFound
                      message={"no materials found to be used in designs"}
                    ></NoDataFound>
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
