import React, { useEffect } from "react";
import "../../Common/Sidebar.css";
import { Link } from "react-router-dom";

export default function Sidebar() {
  function closeSidebar() {
    let sidebar = document.querySelector(".sidebar");
    let navbar = document.querySelector(".panel-navbar");
    let panelMainContainerOuter = document.querySelector(
      ".panel-main-container-outer"
    );
    let branding = document.querySelector(".panel-navbar-branding-container");

    sidebar.style.transform = "translateX(-300px)";
    panelMainContainerOuter.style.paddingLeft = 0;
    navbar.style.width = "calc(100% - 1rem)";
    branding.style.display = "flex";
  }
  useEffect(() => {
    let links = document.querySelectorAll("ul a");

    for (let link of links) {
      if (link.href == window.location.href) {
        link.classList.add("sidebar-link-active");
      }
    }
  }, []);               

  return (
    <>
      <div className="sidebar" id="admin-sidebar">
        <div className="sidebar-branding-container d-flex align-items-center justify-content-between">
          <h4>BillboardBlizz</h4>
          <i
            className="fa-solid fa-xmark fa-xl"
            id="admin-sidebar-close-icon"
            onClick={closeSidebar}
          ></i>
        </div>
        <ul className="sidebar-links-container mt-3 p-0">
          <li>
            <Link to="/admin_dashboard">
              <i class="fa-solid fa-server"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          {/* <li>
            <Link to="admin_sales">
              <i class="fa-solid fa-chart-line"></i>
              <span>Sales</span>
            </Link>
          </li> */}
          <li>
            <span>
              <i class="fa-solid fa-shop"></i>
              <span>Store</span>
              <i class="fa-solid fa-angle-down ms-auto"></i>
            </span>
            <ul className="sidebar-links-container-inner">
              <li>
                <Link to="/admin_addstore">
                  <i class="fa-regular fa-square-plus"></i>
                  <span>Add store</span>
                </Link>
              </li>
              <li>
                <Link to="/admin_managestore">
                  <i class="fa-solid fa-file-pen"></i>
                  <span>Manage store</span>
                </Link>
              </li>
            </ul>
          </li>
          {/* <li>
            <Link to="admin_transactions">
              <i class="fa-solid fa-money-bill-transfer"></i>
              <span>Transactions</span>
            </Link>
          </li>
          <li>
            <Link to="admin_invoice">
              <i class="fa-solid fa-file-invoice-dollar"></i>
              <span>Invoices</span>
            </Link>
          </li> */}
        </ul>
        {/* <div className="mt-auto">
          <li className="list-unstyled">
            <Link>
              <i class="fa-solid fa-globe"></i>
              <span>English</span>
              <i class="fa-solid fa-angle-right ms-auto"></i>
            </Link>
          </li>
          <li className="list-unstyled">
            <Link>
              <i class="fa-solid fa-gear"></i>
              <span>Settings</span>
              <i class="fa-solid fa-angle-right ms-auto"></i>
            </Link>
          </li>
        </div> */}
      </div>
    </>
  );
}
