import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

import { useDispatch, useSelector } from "react-redux";

export default function Navbar(props) {
  let navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem("user"));

  function toggleNavbar() {
    let navbar = document.querySelector(".user-navbar");
    if (navbar.style.maxHeight == "500px") {
      navbar.style.maxHeight = "50px";
    } else {
      navbar.style.maxHeight = "500px";
    }
  }

  function toggleUserProfileContainerInner() {
    let userProfileContainerInner = document.querySelectorAll(
      ".user-profile-container-outer .user-profile-container-inner"
    )[0];
    if (userProfileContainerInner.style.opacity == 0) {
      userProfileContainerInner.style.opacity = 1;
      userProfileContainerInner.style.visibility = "visible";
      userProfileContainerInner.style.transform = "translateY(4rem)";
    } else {
      userProfileContainerInner.style.opacity = 0;
      userProfileContainerInner.style.visibility = "hidden";
      userProfileContainerInner.style.transform = "translateY(5rem)";
    }
  }
  function userLogoutBtnHandler() {
    localStorage.removeItem("user");
    navigate("/");
  }

  useEffect(() => {
    const handleScroll = () => {
      try {
        let navbar = document.querySelector(".user-navbar");

        if (window.scrollY > 100 && window.scrollY < 530) {
          navbar.style.backdropFilter = "blur(5px)";

          navbar.classList.add("user-navbar-transparent");
          navbar.classList.remove("user-navbar-regular");
        } else if (window.scrollY > 530) {
          navbar.classList.add("user-navbar-regular");
          navbar.classList.remove("user-navbar-transparent");
        } else {
          navbar.style.backdropFilter = "none";
          navbar.classList.add("user-navbar-transparent");
          navbar.classList.remove("user-navbar-regular");
        }
      } catch (error) {}
    };

    if (props.current === "home") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (props.current === "home") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [props.current]);

  useEffect(() => {
    document.querySelectorAll(".navbar-links-container a").forEach((link) => {
      if (link.href == window.location.href) {
        link.classList.add("navbar-link-active");
      }
    });
  });

  return (
    <>
      <nav
        className={`${
          props.current == "home"
            ? "user-navbar-transparent"
            : "user-navbar-regular"
        } user-navbar`}
      >
        <div className="navbar-branding-container d-flex ">
          <Link to="/" className="fs-4 fw-bold">
            BillboardBLizz
          </Link>
          <i
            className="fa-solid fa-bars-staggered fa-lg ms-auto my-auto"
            onClick={toggleNavbar}
          ></i>
        </div>

        <div className="navbar-links-container d-flex justify-content-center align-items-center">
          <ul className="p-0 m-0 d-flex gap-4 ">
            <li className="list-unstyled">
              <Link to="/">Home</Link>
            </li>
            <li className="list-unstyled">
              <Link to="/about">About</Link>
            </li>
            <li className="list-unstyled">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="list-unstyled">
              <Link to="/designs">Designs</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-account-container d-flex justify-content-end align-items-center gap-4">
          {user ? (
            <div className="d-flex gap-4">
              <div
                className="position-relative user-profile-container-outer"
                onClick={toggleUserProfileContainerInner}
              >
                <i className="fa-solid fa-user fa-lg"></i>
                <span>Profile</span>
                <div className="user-profile-container-inner">
                  <Link to="/profile" className="text-primary">
                    My profile
                  </Link>
                  <button
                    className="btn btn-danger gap-3 justify-content-center user-logout-btn"
                    onClick={userLogoutBtnHandler}
                  >
                    <span className="material-symbols-outlined">move_item</span>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
              <div className="user-profile-container-simple">
                <i className="fa-solid fa-user fa-lg"></i>
                <span>Profile</span>
              </div>

              {/* <div
                className="cart-container-outer position-relative"
                data-bs-toggle="offcanvas"
                href="#offcanvasExample"
                role="button"
                aria-controls="offcanvasExample"
              >
                <i className="fa-solid fa-cart-shopping fa-lg"></i>
                <span>Cart</span>
              </div> */}
              <button
                className="btn b3-btn btn-danger user-logout-btn-outer"
                onClick={userLogoutBtnHandler}
              >
                <span className="material-symbols-outlined">move_item</span>
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <button
                className="btn b3-btn-small register-btn b3-shadow"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
