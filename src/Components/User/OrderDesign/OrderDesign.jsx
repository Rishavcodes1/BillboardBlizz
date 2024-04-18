import React, { useEffect, useState } from "react";
import "./OrderDesign.css";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthenticate } from "../../Hooks/useAuthenticate";
import { useSelector } from "react-redux";
import fetchData from "../../Functions/fetchData";
import authenticAllInputs from "../../Functions/authenticAllInputs";
import authenticateTextarea from "../../Functions/authenticateTextarea";
import authenticSelect from "../../Functions/authenticSelect";
import authenticSpecificInputs from "../../Functions/authenticSpecificInputs";
import showAlert from "../../Functions/showAlert";
import hideAlert from "../../Functions/hideAlert";
import showSpinner from "../../Functions/showSpinner";
import showToast from "../../Functions/showToast";
import addDataWithImage from "../../Functions/addDataWithImage";
import hideSpinner from "../../Functions/hideSpinner";

export default function OrderDesign() {
  document.title = "Order design";
  const { storeID, designID } = useParams();
  let store_id = storeID;
  let design_id = designID;
  let date = new Date();
  const user = useSelector((state) => state.login_reducer.user);
  console.log(user);
  const user_id = user ? user.user.id : "";

  const [material_data, setmaterial_data] = useState([]);
  const [design_data, setdesign_data] = useState();
  const [store_data, setstore_data] = useState([]);
  const [price_of_design, setprice_of_design] = useState(0);
  const [company_name, setcompany_name] = useState("");
  const [company_logo, setcompany_logo] = useState(null);
  const [tagline, settagline] = useState("");
  const [description, setdescription] = useState("");
  const [size, setsize] = useState(0);
  const [design_to_use, setdesign_to_use] = useState("");
  const [material_to_use, setmaterial_to_use] = useState("");
  const [price_of_material, setprice_of_material] = useState(0);
  const [Deadline, setDeadline] = useState("");
  const [total_price, settotal_price] = useState(0);
  const [payment_method, setpayment_method] = useState("");
  const navigate = useNavigate();

  useAuthenticate(user, "/login");

  async function fetchStoreData(store_id) {
    let id = store_id;
    let result = await fetchData(
      "http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=fetchstoreid",
      "POST",
      { id }
    );
    if (result.error == false) {
      setstore_data(result.details);
    }
  }

  async function fetchAllMaterialsOfStore(store_id) {
    let result = await fetchData(
      "http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=storecategoryfetch",
      "POST",
      { store_id }
    );
    if (result.error == false) {
      setmaterial_data(result.details);
    } else {
      return;
    }
  }

  async function fetchDesignData(design_id) {
    let id = design_id;
    let result = await fetchData(
      "http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=storedesignedit",
      "POST",
      { id }
    );
    if (result.error == false) {
      setdesign_data(result.details);
      setprice_of_design(result.details.price_per_feet);
      setdesign_to_use(result.details.design_name);
    } else {
      return;
    }
  }

  useEffect(() => {
    fetchStoreData(store_id);
    fetchDesignData(design_id);
    fetchAllMaterialsOfStore(store_id);
  }, []);

  function orderDesignContinueBtnHandler(
    currentProcessNumber,
    nextProcessNumber
  ) {
    let isInputEmpty = authenticSpecificInputs(
      `.process-${currentProcessNumber}-container`,
      "input"
    );
    if (currentProcessNumber == 1) {
      let isSelectEmpty = authenticSelect();
      if (isInputEmpty || isSelectEmpty) {
        return;
      }
    } else if (currentProcessNumber == 2) {
      let isTextareaEmpty = authenticateTextarea();
      if (isInputEmpty || isTextareaEmpty) {
        return;
      }
    }

    let currentProcessContainer = document.getElementsByClassName(
      `process-${currentProcessNumber}-container`
    )[0];
    let nextProcessContainer = document.getElementsByClassName(
      `process-${nextProcessNumber}-container`
    )[0];
    let tickIcon = document.querySelectorAll(
      `.process-${currentProcessNumber}-container .process-title-container i`
    )[0];
    tickIcon.classList.remove("d-none");
    currentProcessContainer.classList.remove("process-expanded");
    nextProcessContainer.classList.add("process-expanded");
  }

  function orderDesignShowBtnHandler(targetProcessNumber) {
    let expandedContainer =
      document.getElementsByClassName("process-expanded")[0];
    let containerToExpand = document.getElementsByClassName(
      `process-${targetProcessNumber}-container`
    )[0];

    expandedContainer.classList.remove("process-expanded");
    containerToExpand.classList.add("process-expanded");
  }
  let imageAddress =
    "https://graphicsfamily.com/wp-content/uploads/edd/2022/08/Juice-Company-Billboard-Banner-Design-Template-scaled.jpg";

  function materialSelectionHandler(event) {
    let index = event.target.value;
    if (index != "default") {
      setprice_of_material(material_data[index].prize_per_feet);
      setmaterial_to_use(material_data[index].material_name);
    } else {
      setprice_of_material(0);
      setmaterial_to_use("");
    }
  }

  function numberHandler() {
    let tempTotalPrice = 0;
    if (size == 0 || price_of_material == 0) {
      tempTotalPrice = 0;
    } else {
      tempTotalPrice =
        [parseInt(price_of_design) + parseInt(price_of_material)] * size;
    }
    settotal_price(tempTotalPrice);
  }

  useEffect(() => {
    numberHandler();
  }, [size, price_of_material, material_to_use, price_of_design]);

  function paymentMethodHandler(method) {
    setpayment_method(method);

    let continueBtn = document.querySelectorAll(
      ".process-3-container .order-design-continue-btn span"
    )[0];
    if (method == "COD") {
      continueBtn.innerText = "Continue";
    } else {
      continueBtn.innerText = `₹pay ${total_price}`;
    }
  }

  async function placeOrder(
    store_id,
    user_id,
    company_name,
    company_logo,
    tagline,
    description,
    size,
    design_to_use,
    material_to_use,
    Deadline
  ) {
    let formData = new FormData();
    formData.append("store_id", store_id);
    formData.append("user_id", user_id);
    formData.append("company_name", company_name);
    formData.append("company_logo", company_logo);
    formData.append("tagline", tagline);
    formData.append("description", description);
    formData.append("size", size);
    formData.append("design_to_use", design_to_use);
    formData.append("material_to_use", material_to_use);
    formData.append("Deadline", Deadline);
    let datetime =
      date.toDateString().slice(4) + "-" + date.toLocaleTimeString();
    formData.append("datetime", datetime);

    let result = await addDataWithImage(
      "http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=ads_inquiry_user",
      "POST",
      formData
    );
    console.log(result);
    if (result.error == false) {
      return 1;
    } else if (result.error == true) {
      hideSpinner(".order-design-continue-btn", "span", ".spinner");
      setTimeout(() => {
        alert(result.message);
      }, 100);
      return 0;
    }
  }

  async function paymentProcessContinueBtnHandler(method) {
    let isInputEmpty = 0;

    let inputTags = document.querySelectorAll(".process-3-container input");

    for (let input of inputTags) {
      if (input.checked) {
        isInputEmpty = 0;
        break;
      } else {
        isInputEmpty = 1;
      }
    }

    if (isInputEmpty) {
      showAlert(".alert-danger", "Select payment method");
      return;
    }
    hideAlert(".alert-danger");

    let allInputEmpty = 0;

    for (let i = 1; i <= 2; i++) {
      let isInputEmpty = authenticSpecificInputs(
        `.process-${i}-container`,
        "input"
      );
      if (i == 1) {
        let isSelectEmpty = authenticSelect();
        if (isInputEmpty || isSelectEmpty) {
          document
            .getElementsByClassName(`process-${i}-container`)[0]
            .classList.add("process-expanded");
          allInputEmpty = 1;
        }
      } else if (i == 2) {
        let isTextareaEmpty = authenticateTextarea();
        if (isInputEmpty || isTextareaEmpty) {
          document
            .getElementsByClassName(`process-${i}-container`)[0]
            .classList.add("process-expanded");
          allInputEmpty = 1;
        }
      }
    }
    if (allInputEmpty) {
      showAlert(".alert-danger", "fill all the necessary field");
      return;
    }

    if (method == "COD") {
      hideAlert(".alert-danger");
      showSpinner(".btn-primary", "span", ".spinner");
      let isOrderPlaced = await placeOrder(
        store_id,
        user_id,
        company_name,
        company_logo,
        tagline,
        description,
        size,
        design_to_use,
        material_to_use,
        Deadline
      );
      if (isOrderPlaced) {
        console.log("hello");
        showToast(".b3-toast", ".successful-container-black");
        setTimeout(() => {
          navigate("/");
        }, 4000);
      } else {
        hideSpinner(".order-design-continue-btn", "span", ".spinner");
        return;
      }
    }
  }

  return (
    <>
      <div className="successful-container-black d-none"></div>
      <div class="b3-toast">
        <span className="fs-5">BillboardBlizz</span>
        <span>Order placed successfully</span>
      </div>
      <div className="bg-white order-design-page-white-container">
        <nav className="order-design-navbar">
          <div className="container">
            <span
              className="fs-4 fw-semibold text-white"
              onClick={() => navigate("/")}
            >
              BillboardBlizz
            </span>
          </div>
        </nav>
        <div className="container order-design-container-outer">
          <div className="order-design-container-inner">
            <div className="order-design-process-container">
              <div className="process process-1-container process-expanded">
                <div className="process-header">
                  <div className="process-number-container">1</div>
                  <div className="d-flex w-100">
                    <div className="process-title-container">
                      <span>Order summary</span>
                      <i className="fa-solid fa-check fa-lg ms-2 d-none"></i>
                    </div>
                    <span
                      className="text-primary ms-auto"
                      id="show-order-summary-btn"
                      onClick={() => orderDesignShowBtnHandler(1)}
                    >
                      Show
                    </span>
                  </div>
                </div>

                <div className="order-design-form-container mt-4">
                  <div className="order-design-image-container">
                    {design_data ? (
                      <img
                        src={`http://clickandcall.spectricssolutions.com/apilist/adsmaker/${design_data.upload_design}`}
                        onError={(val) =>
                          (val.target.src =
                            "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg")
                        }
                        alt=""
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    <div className="design-details">
                      <i className="fa-solid fa-palette"></i>
                      <span className="fs-5 fw-semibold">
                        {design_data ? design_data.design_name : ""}
                      </span>
                    </div>
                    <div className="store-details">
                      <i className="fa-solid fa-shop fa-xs"></i>
                      {store_data.map((details) => (
                        <span className="font-small">{details.store_name}</span>
                      ))}
                    </div>
                    <div className="order-design-form-container-inner">
                      <div>
                        <label htmlFor="materialName">Material to use</label>
                        <select
                          id="materialName"
                          onChange={materialSelectionHandler}
                        >
                          <option value="default">
                            Select material to use
                          </option>
                          {material_data.map((details, index) => (
                            <option value={index}>
                              {details.material_name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="materialPrice">
                          Material price (per feet)
                        </label>
                        <input
                          type="text"
                          id="materialPrice"
                          value={price_of_material}
                          readOnly
                        />
                      </div>
                      <div>
                        <label htmlFor="size">Size (in feet)</label>
                        <input
                          type="number"
                          id="size"
                          onChange={(val) => setsize(val.target.value)}
                        />
                      </div>
                      <div>
                        <label htmlFor="deadline">Deadline (in days)</label>
                        <input
                          type="number"
                          id="deadline"
                          onChange={(val) => setDeadline(val.target.value)}
                        />
                      </div>
                      <div>
                        <span className="fw-semibold">
                          Total price: ₹{total_price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className="btn b3-btn btn-primary order-design-continue-btn"
                  onClick={() => orderDesignContinueBtnHandler(1, 2)}
                >
                  Continue
                </button>
              </div>
              <div className="process process-2-container">
                <div className="process-header">
                  <div className="process-number-container">2</div>
                  <div className="d-flex w-100">
                    <div className="process-title-container">
                      <span>Company details</span>
                      <i className="fa-solid fa-check fa-lg ms-2 d-none"></i>
                    </div>
                    <span
                      className="text-primary ms-auto"
                      id="show-company-details-btn"
                      onClick={() => orderDesignShowBtnHandler(2)}
                    >
                      Show
                    </span>
                  </div>
                </div>
                <div className="order-design-company-details-container mt-4">
                  <div>
                    <label htmlFor="companyName">Company name</label>
                    <input
                      type="text"
                      id="companyName"
                      onChange={(val) => setcompany_name(val.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="companyLogo">Company logo</label>
                    <input
                      type="file"
                      id="companyLogo"
                      onChange={(val) => setcompany_logo(val.target.files[0])}
                    />
                  </div>
                  <div id="companyTagline-container">
                    <label htmlFor="companyTagline">Company Tagline</label>
                    <input
                      type="text"
                      id="companyTagline"
                      onChange={(val) => settagline(val.target.value)}
                    />
                  </div>
                  <div id="description-container">
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      onChange={(val) => setdescription(val.target.value)}
                    ></textarea>
                  </div>
                </div>
                <button
                  className="btn b3-btn btn-primary order-design-continue-btn"
                  onClick={() => orderDesignContinueBtnHandler(2, 3)}
                >
                  Continue
                </button>
              </div>
              <div className="process process-3-container">
                <div className="process-header">
                  <div className="process-number-container">3</div>
                  <div className="d-flex w-100">
                    <div className="process-title-container">
                      <span>Payment options</span>
                      <i className="fa-solid fa-check fa-lg ms-2 d-none"></i>
                    </div>
                    <span
                      className="text-primary ms-auto"
                      id="show-payment-options-btn"
                      onClick={() => orderDesignShowBtnHandler(3)}
                    >
                      Show
                    </span>
                  </div>
                </div>
                <div className="order-design-payment-methods-container mt-4">
                  <div>
                    <div>
                      <input
                        type="radio"
                        name="payment_method"
                        onClick={() => paymentMethodHandler("UPI")}
                      />
                      <label htmlFor="UPI">UPI</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="payment_method"
                        onClick={() => paymentMethodHandler("COD")}
                      />
                      <label htmlFor="COD">Cash on delivery</label>
                    </div>
                  </div>
                </div>
                <button
                  className="btn b3-btn btn-primary order-design-continue-btn"
                  onClick={() =>
                    paymentProcessContinueBtnHandler(payment_method)
                  }
                >
                  <span>Continue</span>
                  <div className="spinner spinner-normal spinner-white d-none"></div>
                </button>
                <div className="alert b3-alert alert-danger my-3 d-none"></div>
              </div>
            </div>
            <div className="price-breakdown-container">
              <div>
                <h4>Price breakdown</h4>
                <div className="price-breakdown-container-inner mt-4">
                  <div>
                    <div className="d-flex justify-content-between">
                      <div>
                        <i className="fa-solid fa-palette"></i>
                        <span>Design price</span>
                      </div>
                      <span>₹{size * price_of_design}</span>
                    </div>
                    <div>
                      <span className="font-small2">
                        ({size ? size : "0"} x ₹{price_of_design})
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="d-flex justify-content-between">
                      <div>
                        <i className="fa-solid fa-recycle"></i>
                        <span>Material price</span>
                      </div>
                      <span>₹{size * price_of_material}</span>
                    </div>
                    <div>
                      <span className="font-small2">
                        ({size ? size : "0"} x ₹{price_of_material})
                      </span>
                    </div>
                  </div>
                  <hr className="divider" />
                  <div>
                    <div className="d-flex justify-content-between">
                      <div>
                        <i className="fa-solid fa-wallet"></i>
                        <span>Total price</span>
                      </div>
                      <span>₹{total_price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
