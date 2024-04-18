import React, { useEffect } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar(props) {
  const navigate = useNavigate();
  let user;
  let name;
  let username;
  let email;
  if (props.role == "store") {
    user = JSON.parse(localStorage.getItem("store"));
    name = user ? user.user.store_name : "";
    username = user ? user.user.store_username : "";
    email = user ? user.user.email : "";
  } else if (props.role == "admin") {
    user = JSON.parse(localStorage.getItem("admin"));
    name = user ? user.user.admin_username : "";
    username = user ? user.user.admin_username : "";
    email = user ? user.user.email : "";
  }

  function openSidebar() {
    let sidebar = document.querySelector(".sidebar");
    sidebar.style.transform = "translateX(0)";
    if (window.innerWidth >= 1000) {
      let panelMainContainerOuter = document.querySelector(
        ".panel-main-container-outer"
      );
      let navbar = document.querySelector(".panel-navbar");
      let branding = document.querySelector(".panel-navbar-branding-container");

      panelMainContainerOuter.style.paddingLeft = "300px";
      navbar.style.width = "calc(100% - 300px - 1rem)";
      branding.style.display = "none";
    }
  }

  function profileHandler() {
    let profileContainerInner = document.getElementsByClassName(
      "panel-navbar-profile-container-inner"
    )[0];

    if (
      profileContainerInner.classList.contains(
        "panel-navbar-profile-container-inner-visible"
      )
    ) {
      profileContainerInner.classList.remove(
        "panel-navbar-profile-container-inner-visible"
      );
    } else {
      profileContainerInner.classList.add(
        "panel-navbar-profile-container-inner-visible"
      );
    }
  }

  function logoutBtnHandler() {
    localStorage.removeItem(props.role);
    if (props.role == "store") {
      navigate("/store_login");
    } else if (props.role == "admin") {
      navigate("/admin_login");
    }
  }
  return (
    <>
      <nav className="panel-navbar">
        <div className="panel-navbar-branding-container">
          <i
            class="fa-solid fa-bars-staggered"
            id="panel-navbar-hamburger-icon"
            onClick={openSidebar}
          ></i>
          <h4>BillboardBlizz</h4>
        </div>

        <div className="panel-navbar-other-elements-container ms-auto">
          <div className="position-relative d-flex">
            <i class="fa-solid fa-bell"></i>
            <div className="bg-warning">
              <span>9</span>
            </div>
          </div>
          <div className="position-relative d-flex">
            <i class="fa-solid fa-message"></i>
            <div className="bg-primary">
              <span>9</span>
            </div>
          </div>

          <div
            className="panel-navbar-profile-container position-relative"
            onClick={profileHandler}
          >
            <div>
              <i class="fa-solid fa-user"></i>
            </div>
            <span>{name}</span>
            <i class="fa-solid fa-angle-down mt-1 fa-xs"></i>
            <div className="panel-navbar-profile-container-inner">
              <div>
                <h5>@{username}</h5>
                <span className="font-small">{email}</span>
              </div>
              <div>
                <div>
                  <Link className="d-flex align-items-center gap-1">
                    <span>my profile</span>
                    <i class="fa-solid fa-arrow-up-right-from-square fa-2xs mt-1 text-primary"></i>
                  </Link>
                </div>
                <button
                  className="btn b3-btn btn-danger w-100"
                  onClick={logoutBtnHandler}
                >
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
