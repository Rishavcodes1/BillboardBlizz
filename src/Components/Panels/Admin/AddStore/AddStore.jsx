import React, { useState } from "react";
import { useNavigate } from "react-router";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../../Common/Navbar/Navbar";
import PageHeader from "../../Common/PageHeader/PageHeader";
import addDataWithImage from "../../../Functions/addDataWithImage";
import "./AddStore.css";
import showSpinner from "../../../Functions/showSpinner";
import showToast from "../../../Functions/showToast";
import { useSelector } from "react-redux";
import { useAuthenticate } from "../../../Hooks/useAuthenticate";
import authenticAllInputs from "../../../Functions/authenticAllInputs";
import showAlert from "../../../Functions/showAlert";
import authenticateTextarea from "../../../Functions/authenticateTextarea";
import togglePassword from "../../../Functions/togglePassword";

export default function AddStore() {
  document.title = "Add store";
  const navigate = useNavigate();
  let formdata = new FormData();
  const admin = useSelector((state) => state.login_reducer.admin);
  const admin_id = admin ? admin.user.id : "";
  const username = admin ? admin.user.admin_username : "";
  const adminEmail = admin.user ? admin.user.email : "";
  useAuthenticate(admin, "/admin_login");

  const [store_username, setstore_username] = useState("");
  const [store_password, setstore_password] = useState("");
  const [owner_name, setowner_name] = useState("");
  const [store_name, setstore_name] = useState("");
  const [store_phone, setstore_phone] = useState("");
  const [email, setemail] = useState("");
  const [opening_time, setopening_time] = useState("");
  const [closing_time, setclosing_time] = useState("");
  const [owner_phone, setowner_phone] = useState("");
  const [store_license_doc, setstore_license_doc] = useState(null);
  const [owner_doc, setowner_doc] = useState(null);
  const [store_start_date, setstore_start_date] = useState("");
  const [address, setaddress] = useState("");
  const [store_image, setstore_image] = useState(null);
  const [gst_no, setgst_no] = useState("");
  const [hsn_sac, sethsn_sac] = useState("");

  formdata.append("store_username", store_username);
  formdata.append("store_password", store_password);
  formdata.append("admin_id", admin_id);
  formdata.append("owner_name", owner_name);
  formdata.append("store_name", store_name);
  formdata.append("store_phone", store_phone);
  formdata.append("email", email);
  formdata.append("opening_time", opening_time);
  formdata.append("closing_time", closing_time);
  formdata.append("owner_phone", owner_phone);
  formdata.append("store_license_doc", store_license_doc);
  formdata.append("owner_doc", owner_doc);
  formdata.append("store_start_date", store_start_date);
  formdata.append("address", address);
  formdata.append("store_image", store_image);
  formdata.append("gst_no", gst_no);
  formdata.append("hsn_sac", hsn_sac);
  formdata.append("status", 1);

  async function addStoreBtnHandler() {
    let isInputsEmpty = authenticAllInputs();
    let isTextareaEmpty = authenticateTextarea();
    if (isInputsEmpty || isTextareaEmpty) {
      showAlert(".alert-danger", "fill all the necessary field");
      return;
    }

    showSpinner(".add-store-btn", "span", ".spinner");
    let result = await addDataWithImage(
      "http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=addstore",
      "POST",
      formdata
    );

    if (result.error == false) {
      showToast(".b3-toast", ".successful-container-black");
      setTimeout(() => {
        navigate("/admin_manageStore");
      }, 4000);
    }
  }

  return (
    <>
      <div className="successful-container-black d-none"></div>
      <div class="b3-toast">
        <span className="fs-5">BillboardBlizz</span>
        <span>store added successfully</span>
      </div>
      <Sidebar></Sidebar>
      <div className="panel-main-container-outer">
        <div className="panel-main-container-inner">
          <Navbar
            username={username}
            email={adminEmail}
            role={"admin"}
          ></Navbar>
          <div className="panel-main-container-inner2">
            <div className="panel-main-container-inner3">
              <PageHeader heading={"Add store"}></PageHeader>
              <div className="admin-add-store-form-container form-container b3-shadow">
                <div>
                  <h5>Owner details</h5>
                  <hr className="divider" />
                  <div className="owner-details-container">
                    <div>
                      <label htmlFor="ownerName">Owner name</label>
                      <input
                        type="text"
                        id="ownerName"
                        onChange={(e) => setowner_name(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="ownerPhone">Owner phone</label>
                      <input
                        type="text"
                        id="ownerPhone"
                        onChange={(e) => setowner_phone(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="ownerDocument">Owner document</label>
                      <input
                        type="file"
                        id="ownerDocument"
                        onChange={(e) => setowner_doc(e.target.files[0])}
                      />
                    </div>
                  </div>
                  <h5>Store details</h5>
                  <hr className="divider" />
                  <div className="store-other-details-container">
                    <div>
                      <label htmlFor="storeName">Store name</label>
                      <input
                        type="text"
                        id="storeName"
                        onChange={(e) => setstore_name(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="storeUsername">Store username</label>
                      <input
                        type="text"
                        id="storeUsername"
                        onChange={(e) => setstore_username(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="storePhone">Store phone</label>
                      <input
                        type="text"
                        id="storePhone"
                        onChange={(e) => setstore_phone(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="storeEmail">Store email</label>
                      <input
                        type="text"
                        id="storeEmail"
                        onChange={(e) => setemail(e.target.value)}
                      />
                    </div>
                    <div className="address-container">
                      <label htmlFor="address">Address</label>
                      <textarea
                        id="address"
                        onChange={(e) => setaddress(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label htmlFor="openingTime">Opening time</label>
                      <input
                        type="time"
                        id="openingTime"
                        onChange={(e) => setopening_time(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="closingTime">Closing time</label>
                      <input
                        type="time"
                        id="closingTime"
                        onChange={(e) => setclosing_time(e.target.value)}
                      />
                    </div>
                    <div className="store-establishment-container">
                      <label htmlFor="storeStartDate">
                        Store establishment
                      </label>
                      <input
                        type="date"
                        id="storeStartDate"
                        onChange={(e) => setstore_start_date(e.target.value)}
                      />
                    </div>
                    <div className="gst-container">
                      <label htmlFor="gst">GST NO.</label>
                      <input
                        type="text"
                        id="gst"
                        onChange={(e) => setgst_no(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="hsn">HSN SAC</label>
                      <input
                        type="text"
                        id="hsn"
                        onChange={(e) => sethsn_sac(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="storeImage">Store image</label>
                      <input
                        type="file"
                        id="storeImage"
                        onChange={(e) => setstore_image(e.target.files[0])}
                      />
                    </div>
                    <div>
                      <label htmlFor="storeDocument">Store document</label>
                      <input
                        type="file"
                        id="storeDocument"
                        onChange={(e) =>
                          setstore_license_doc(e.target.files[0])
                        }
                      />
                    </div>
                    <div className="password-container">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        id="password"
                        onChange={(e) => setstore_password(e.target.value)}
                      />
                      <span className="font-small" onClick={togglePassword}>show</span>
                    </div>
                  </div>
                </div>
                <div className="alert b3-alert alert-danger d-none"></div>
                <button
                  className="btn b3-btn ms-auto btn-success add-store-btn"
                  onClick={addStoreBtnHandler}
                >
                  <span>Add store</span>
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
