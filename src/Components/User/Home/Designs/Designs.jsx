import React, { useEffect, useState } from "react";
import "./Designs.css";
import { Link, useNavigate } from "react-router-dom";
import DesignsSkeleton from "./DesignsSkeleton";
import fetchData from "../../../Functions/fetchData";

export default function Designs(props) {
  const [designs_data, setdesigns_data] = useState([]);
  const navigate = useNavigate();
  const [skeleton, setskeleton] = useState(true);

  async function fetchAllDesigns() {
    let result = await fetchData(
      "http://clickandcall.spectricssolutions.com/apilist/adsmaker/admin.php?action=allfetchdeisgn",
      "GET",
      {}
    );
    if (result.error == false) {
      if (props.number) {
        setdesigns_data(result.details);
      } else {
        setdesigns_data(result.details.slice(0, 8));
      }
      setskeleton(false);
    }
  }
  useEffect(() => {
    fetchAllDesigns();
  }, []);

  function toggleFilterContainerSmall() {
    let filterContainerSmall = document.getElementById(
      "designs-filter-container-small-inner"
    );
    if (filterContainerSmall.style.maxHeight == "0px") {
      filterContainerSmall.style.maxHeight = "500px";
    } else {
      filterContainerSmall.style.maxHeight = "0px";
    }
  }

  return (
    <>
      <div className=" bg-white d-flex">
        <div className="designs-container-outer container my-3">
          <h3 className=" text-center">Explore designs</h3>

          <div className="designs-container-inner my-3">
            {skeleton == true ? (
              <DesignsSkeleton></DesignsSkeleton>
            ) : (
              <>
                {designs_data.map((details, index) => (
                  <div className="design bg-white">
                    <div className="design-image-container">
                      <img
                        src={`http://clickandcall.spectricssolutions.com/apilist/adsmaker/${details.upload_design}`}
                        alt=""
                      />
                    </div>
                    <div className="designs-details-container p-2 position-relative">
                      <div className="design-price-container">
                        <span>₹{details.total_prize}</span>
                      </div>
                      <h5>{details.design_name}</h5>
                      <div>
                        <div className="font-small">
                          <i class="fa-brands fa-squarespace"></i>
                          <span>{details.material_category} material</span>
                        </div>
                        <div className="font-small">
                          <i class="fa-brands fa-squarespace"></i>
                          <span>
                            ₹{details.price_per_feet} per feet for design
                          </span>
                        </div>
                        <div className="font-small">
                          <i class="fa-brands fa-squarespace"></i>
                          <span>
                            ₹{details.price_of_material} per feet for material
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="designs-btn-container p-2">
                      <button
                        className="btn order-btn"
                        onClick={() =>
                          navigate(
                            `/order_design/${details.store_id}/${details.id}`
                          )
                        }
                      >
                        <i class="fa-solid fa-bag-shopping"></i>
                        <span>Order</span>
                      </button>
                      {/* <button className="my-btn add-to-cart-btn">
                        <div
                          className={`add-to-cart-text add-to-cart-text${index}`}
                        >
                          <i class="fa-solid fa-cart-plus"></i>
                          <span>Add to cart</span>
                        </div>
                        <div
                          className={`user-spinner user-spinner-black user-spinner${index}`}
                        ></div>
                      </button> */}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          {!props.number ? (
            <div className=" text-center mt-4">
              <Link
                to="/designs"
                className=" fw-semibold border border-2 border-primary px-3 py-1 rounded rounded-5"
              >
                View more
              </Link>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
