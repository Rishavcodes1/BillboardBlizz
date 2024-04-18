import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signIn from "../../../Functions/signIn";
import "./Login.css";
import showSpinner from "../../../Functions/showSpinner";
import hideSpinner from "../../../Functions/hideSpinner";
import showAlert from "../../../Functions/showAlert";
import authenticAllInputs from "../../../Functions/authenticAllInputs";
import togglePassword from "../../../Functions/togglePassword";


export default function Login(props) {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  async function loginBtnHandler(role) {
    let isInputEmpty = authenticAllInputs();
    if (isInputEmpty) {
      showAlert(".alert-danger", "fill all the necessary field");
      return;
    }
    showSpinner(".panel-login-btn", ".btn-text", ".spinner");
    let url;
    let data;
    let path;
    if (role == "store") {
      url =
        "http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=storelogin";
      let store_password = password;
      let store_username = username;
      data = { store_username, store_password };
      path = "/store_dashboard";
    } else if (role == "admin") {
      url =
        "http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=login";
      let admin_username = username;
      data = { admin_username, password };
      path = "/admin_dashboard";
    }

    let result = await signIn(url, "POST", data, role);

    if (result === 1) {
      navigate(path);
    } else {
      showAlert(".alert-danger", result.message);
      hideSpinner(".panel-login-btn", ".btn-text", ".spinner");
      return;
    }
  }
  return (
    <>
      <div className="panel-login-outer-div">
        <div className="panel-login-container">
          <div className="panel-login-left-content">
            <img src={props.image} alt="" />
          </div>
          <div className="panel-login-right-content">
            <div>
              <h3>{props.role} login</h3>
            </div>
            <h2>BillboardBlizz</h2>
            <div className="panel-login-form-container position-relative">
              <div className="alert b3-alert alert-danger d-none"></div>
              <div className="mb-4">
                <h4>Welcome</h4>
                <span>There is much work to do</span>
              </div>
              <div>
                <label htmlFor="storeUsername">Username</label>
                <input
                  type="text"
                  id="storeUsername"
                  onChange={(index) => setusername(index.target.value)}
                />
              </div>
              <div className="password-container">
                <label htmlFor="storePassword">Password</label>
                <input
                  type="password"
                  onChange={(index) => setpassword(index.target.value)}
                />
                <span className="font-small" onClick={togglePassword}>
                  Show
                </span>
              </div>
              <div>
                <button
                  className="btn b3-btn btn-light panel-login-btn d-flex gap-4 align-items-center"
                  onClick={() => loginBtnHandler(props.role)}
                >
                  <div className="btn-text">
                    <i class="fa-solid fa-arrow-right-to-bracket"></i>
                    <span>Login</span>
                  </div>

                  <div className="spinner spinner-normal spinner-black d-none"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
