import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import authenticAllInputs from "../../Functions/authenticAllInputs";
import showAlert from "../../Functions/showAlert";
import signIn from "../../Functions/signIn";
import showSpinner from "../../Functions/showSpinner";
import hideSpinner from "../../Functions/hideSpinner";
import togglePassword from "../../Functions/togglePassword";

export default function Login() {
  document.title = "Login";
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  let images = [
    "https://jwallace504.files.wordpress.com/2015/04/mcdonalds2.jpg",
    "https://bestmediainfo.com/uploads/2021/12/BK-Sober-Whopper-Campaign_3.jpg",
    "https://d2oto3d7z6t29c.cloudfront.net/entries/transformed/58/a6/702624_b9eb7e0f29e048e4b728ed0fe29b8f3d.jpeg",
    "https://9to5mac.com/wp-content/uploads/sites/6/2023/06/Uber.jpg?quality=82&strip=all&w=1600",
    "https://mplan.media/wp-content/uploads/2020/02/Ola-banner.jpg",
    "https://d2oto3d7z6t29c.cloudfront.net/entries/transformed/2e/40/644219_ab7968e7bd254491b5166afd91a0c7ef.jpeg",
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhljFR3dVLSOyoJrPX4TAiFNSXCFfJIzg3vNJdjl4YFwJAxcN6u_F6umX4orHh2QGlRMcqp9topRBzTdf6UzuJxStJdHcXEHcZEt4aO2Gr82eyUyhwZkbRdND58uNSV91MImj6lMCvvZHY/s1600/shalan+nike+nyc+marathon.JPG",
    "https://media.cnn.com/api/v1/images/stellar/prod/160505174531-18-coca-cola-anniversary.jpg?q=w_1600,h_900,x_0,y_0,c_fill",
  ];

  let loginIndex = 1;
  let loginMockupImages = document.getElementsByClassName("login-mockup-image");

  const changeLoginMockupImage = setInterval(() => {
    if (loginIndex > loginMockupImages.length - 1) {
      loginIndex = 0;
    }

    try {
      document.getElementById("login-mockup-image-active").id = "";

      loginMockupImages[loginIndex].id = "login-mockup-image-active";
    } catch (error) {
      clearInterval(changeLoginMockupImage);
    }
    loginIndex = loginIndex + 1;
    console.log(loginIndex);
  }, 3000);

  async function userLoginBtnHandler() {
    let isInputEmpty = authenticAllInputs();
    if (isInputEmpty) {
      showAlert(".alert-danger", "fill all the necessary field");
      return;
    }
    showSpinner(".login-btn", "span", ".spinner");
    let data = { username, password };
    let result = await signIn(
      "http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=userlogin",
      "POST",
      data,
      "user"
    );
    if (result === 1) {
      navigate("/");
    } else {
      showAlert(".alert-danger", result.message);
      hideSpinner(".login-btn","span",".spinner")
      return;
    }
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="login-container d-flex py-5">
        <div className="login-left-content d-flex">
          <div className="login-form-container m-auto">
            <h3>Welcome back</h3>
            <span className="the-span"></span>
            <span>
              New to BillboardBlizz?{" "}
              <Link to="/register">Create an account</Link>
            </span>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                onChange={(val) => setusername(val.target.value)}
              />
            </div>
            <div className="password-container">
              <label htmlFor="username">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(val) => setpassword(val.target.value)}
              />
              <span className="font-small" onClick={togglePassword}>
                show
              </span>
            </div>
            <div className="alert b3-alert alert-danger d-none"></div>
            <button
              className="btn b3-btn btn-primary login-btn w-100"
              onClick={userLoginBtnHandler}
            >
              <span>Login</span>
              <div className="spinner spinner-white spinner-normal d-none"></div>
            </button>
          </div>
        </div>
        <div className="login-right-content">
          <div>
            <img
              src="https://trueimpactmedia.com/wp-content/uploads/2021/10/Are-BillBoards-EffectiveFT.jpg"
              alt=""
            />
          </div>

          {images.map((source, index) =>
            index == 0 ? (
              <img
                src={source}
                alt=""
                className="login-mockup-image"
                id="login-mockup-image-active"
              />
            ) : (
              <img src={source} alt="" className="login-mockup-image" />
            )
          )}
        </div>
      </div>
    </>
  );
}
