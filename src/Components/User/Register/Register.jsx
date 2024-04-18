import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";

import billlboard1 from "../../../Assets/billboard images/billboard-img-1.jpg";
import billlboard2 from "../../../Assets/billboard images/billboard-img-6.jpg";
import billlboard3 from "../../../Assets/billboard images/billboard-img-7.jpg";
import billlboard4 from "../../../Assets/billboard images/billboard-img-11.jpg";
import billlboard5 from "../../../Assets/billboard images/billboard-img-15.jpg";
import billlboard6 from "../../../Assets/billboard images/billboard-img-8.jpg";
import Navbar from "../Navbar/Navbar";

import authenticAllInputs from "../../Functions/authenticAllInputs";
import showAlert from "../../Functions/showAlert";
import showSpinner from "../../Functions/showSpinner";
import fetchData from "../../Functions/fetchData";
import hideSpinner from "../../Functions/hideSpinner";
import togglePassword from "../../Functions/togglePassword";


export default function Register() {
  document.title = "Register";
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const [address, setaddress] = useState("");
  const [phoneno, setphoneno] = useState("");
  const [email, setemail] = useState("");
  const navigate = useNavigate();

  let images = [
    billlboard1,
    billlboard2,
    billlboard3,
    billlboard4,
    billlboard5,
    billlboard6,
  ];

  let registerIndex = 1;

  let registerImages = document.getElementsByClassName("register-left-image");
  const changeRegisterMockupImage = setInterval(() => {
    if (registerIndex > images.length - 1) {
      registerIndex = 0;
    }
    try {
      document.getElementById("register-left-image-active").id = "";
      registerImages[registerIndex].id = "register-left-image-active";
    } catch (error) {
      clearInterval(changeRegisterMockupImage);
    }
    registerIndex = registerIndex + 1;
  }, 5000);
  async function userRegisterBtnHandler() {
    let isInputEmpty = authenticAllInputs();
    if (isInputEmpty) {
      showAlert(".alert-danger", "fill all the necessary field");
      return;
    }
    showSpinner(".register-btn", "span", ".spinner");
    let data = { username, password, name, address, phoneno, email };

    let result = await fetchData(
      "http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=userregister",
      "POST",
      data
    );

    if (result.error == false) {
      navigate("/login");
    } else {
      showAlert(".alert-danger", result.message);
      hideSpinner(".register-btn", "span", ".spinner");
      return;
    }
  }
  
  return (
    <>
      <Navbar></Navbar>
      <div className="register-container d-flex py-5">
        <div className="register-left-content">
          {images.map((source, index2) =>
            index2 == 0 ? (
              <img
                src={source}
                className="register-left-image"
                id="register-left-image-active"
                alt=""
              />
            ) : (
              <img src={source} className="register-left-image" alt="" />
            )
          )}
        </div>
        <div className="register-right-content d-flex">
          <div className="register-form-container m-auto">
            <h3>Register here</h3>
            <span>Find creators and Explore designs</span>
            <div>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  onChange={(val) => setname(val.target.value)}
                />
              </div>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  onChange={(val) => setusername(val.target.value)}
                />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  onChange={(val) => setemail(val.target.value)}
                />
              </div>
              <div>
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  onChange={(val) => setphoneno(val.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="phone">Address</label>
              <textarea
                id="address"
                onChange={(val) => setaddress(val.target.value)}
              ></textarea>
            </div>
            <div className="password-container">
              <label htmlFor="username">Password</label>
              <input
                type="password"
                id="password"
                onChange={(val) => setpassword(val.target.value)}
              />
              <span className="font-small" onClick={togglePassword}>
                show
              </span>
            </div>
            <div className="alert b3-alert alert-danger d-none"></div>
            <button
              className="btn b3-btn btn-primary register-btn mt-3 w-100"
              onClick={userRegisterBtnHandler}
            >
              <span>Register</span>
              <div className="spinner spinner-normal spinner-white d-none"></div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
