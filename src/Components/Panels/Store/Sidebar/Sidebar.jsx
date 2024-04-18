import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../../Common/Sidebar.css";

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
      if (link.href === window.location.href) {
        link.classList.add("sidebar-link-active");
      }
    }
  }, []);

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-branding-container d-flex align-items-center justify-content-between">
          <Link>
            <h4>BillboardBlizz</h4>
          </Link>
          <i
            className="fa-solid fa-xmark fa-xl"
            id="store-sidebar-close-icon"
            onClick={closeSidebar}
          ></i>
        </div>
        <ul className="sidebar-links-container mt-3 p-0">
          <li>
            <Link to="/store_dashboard">
              <i class="fa-solid fa-server"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          {/* <li>
            <Link to="store_sales">
              <i class="fa-solid fa-chart-line"></i>
              <span>Sales</span>
            </Link>
          </li> */}
          <li>
            <span>
              <i class="fa-solid fa-boxes-packing"></i>
              <span>Materials</span>
              <i class="fa-solid fa-angle-down ms-auto"></i>
            </span>
            <ul className=" sidebar-links-container-inner">
              <li>
                <Link to="/store_addMaterials">
                  <i class="fa-regular fa-square-plus"></i>
                  <span>Add materials</span>
                </Link>
              </li>
              <li>
                <Link to="/store_manageMaterials">
                  <i class="fa-solid fa-file-pen"></i>
                  <span>Manage materials</span>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <span>
              <i class="fa-solid fa-palette"></i>
              <span>Designs</span>
              <i class="fa-solid fa-angle-down ms-auto"></i>
            </span>
            <ul className=" sidebar-links-container-inner">
              <li>
                <Link to="/store_addDesigns">
                  <i class="fa-regular fa-square-plus"></i>
                  <span>Add designs</span>
                </Link>
              </li>
              <li>
                <Link to="/store_manageDesigns">
                  <i class="fa-solid fa-file-pen"></i>
                  <span>Manage designs</span>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <span>
              <span class="material-symbols-outlined">list_alt</span>
              <span>Orders</span>
              <i class="fa-solid fa-angle-down ms-auto"></i>
            </span>
            <ul className=" sidebar-links-container-inner">
              <li>
                <Link to="/store_pendingOrders">
                  <span class="material-symbols-outlined">inactive_order</span>
                  <span>Pending orders</span>
                </Link>
              </li>
              <li>
                <Link to="/store_completedOrders">
                  <span class="material-symbols-outlined">order_approve</span>
                  <span>Completed orders</span>
                </Link>
              </li>
            </ul>
          </li>
          {/* <li>
            <span>
              <i class="fa-solid fa-file-invoice-dollar"></i>
              <span>Invoices</span>
              <i class="fa-solid fa-angle-down ms-auto"></i>
            </span>
            <ul className=" sidebar-links-container-inner">
              <li>
                <Link to="/store_generateInvoice">
                  <span class="material-symbols-outlined">edit_document</span>
                  <span>Generate invoice</span>
                </Link>
              </li>
              <li>
                <Link to="/store_invoiceHistory">
                  <span class="material-symbols-outlined">receipt_long</span>
                  <span>Invoice history</span>
                </Link>
              </li>
            </ul>
          </li> */}
          {/* <li>
            <Link to="/store_transactions">
              <i class="fa-solid fa-money-bill-transfer"></i>
              <span>Transactions</span>
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
