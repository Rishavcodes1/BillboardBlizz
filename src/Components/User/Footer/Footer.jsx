import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <>
      <footer className="footer-container py-3">
        <div className="container">
          <div className="footer-subscribe-container">
            <h3>BillboardBlizz</h3>
            <span className="fst-italic">
              "Subscribe with email and get updates on offers and various other
              services faster"
            </span>
            <div>
              <input type="text" placeholder="Email address" />
              <button className="btn b3-btn btn-primary footer-subscribe-btn">Subscribe</button>
            </div>
          </div>
          <div className="footer-links-container">
            <h3>BillboardBlizz |</h3>
            <div>
              <span>Privacy policy</span>
              <span>Terms & Conditions</span>
              <span>Careers</span>
              <span>Customer care</span>
              <span>Blogs</span>
              <span>Testimonials</span>
              <span>FAQs</span>
            </div>
            <div className="footer-social-media-links-container">
              <h5>Get in touch</h5>
              <div>
                <div>
                  <i className=" fa-brands fa-facebook-f"></i>
                </div>
                <div>
                  <i className=" fa-brands fa-instagram fa-lg"></i>
                </div>
                <div>
                  <i className=" fa-brands fa-x-twitter"></i>
                </div>
                <div>
                  <i className=" fa-brands fa-youtube"></i>
                </div>
                <div>
                  <i className=" fa-brands fa-linkedin-in"></i>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <p className=" text-center">
            <strong>&copy; </strong>2024 BillboardBlizz | All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
