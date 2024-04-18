import React from "react";
import "./WhyUs.css";

export default function WhyUs() {
  return (
    <>
      <div className="why-us-container container d-flex p-0 my-3">
        <div className="why-us-left-content p-3">
          <h3>Why us?</h3>
          <p className=" fst-italic">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            delectus distinctio accusantium ipsa deleniti non quis corrupti
            molestias accusamus possimus neque quae rem, ad ex!
          </p>

          <div className="d-flex flex-column gap-3">
            <div className=" d-flex gap-2">
              <div>
                <i class="fa-solid fa-award fa-lg"></i>
              </div>
              <div>
                <h5>
                  <span>Best marketplace for Billboards</span>
                </h5>
                <span className="font-small fst-italic">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Cumque numquam ullam dicta asperiores vero veniam.
                </span>
              </div>
            </div>
            <div className=" d-flex gap-2">
              <div>
                <i className="fa-solid fa-shield-halved fa-lg"></i>
              </div>
              <div>
                <h5>
                  <span>Safe & Secure</span>
                </h5>
                <span className="font-small fst-italic">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Cumque numquam ullam dicta
                </span>
              </div>
            </div>
            <div className=" d-flex gap-2">
              <div>
                <i class="fa-regular fa-thumbs-up fa-lg"></i>
              </div>
              <div>
                <h5>
                  <span>Highly reliable</span>
                </h5>
                <span className="font-small fst-italic">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Cumque numquam ullam dicta asperiores vero veniam.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="why-us-right-content">
          <img
            src="https://thumbs.dreamstime.com/b/billboards-advertising-signs-modern-buildings-capital-city-future-urbanist-science-fiction-advertising-billboards-276471027.jpg"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
