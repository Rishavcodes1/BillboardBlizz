import React, { useEffect, useState } from "react";
import "./Contact.css";


import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import ContactUsFAQs from "./ContactsUsFAQs";

export default function Contact() {
  document.title = "Contact";
  const [current, setcurrent] = useState("");
  useEffect(() => {
    setcurrent("contact");
  }, []);
  return (
    <>
      <Navbar current={current} key={current}></Navbar>
      <div className="contact-us-container py-5">
        <div className="container d-flex gap-3 mt-5">
          <div className="contact-us-left-content text-white d-flex">
            <h2 className="w-75">Contact us</h2>
            <span className="w-75">
              Need to get in touch with us? Either fill out the form with your
              inquiry or find the department email you'd like to contact below
            </span>
          </div>
          <div className="contact-us-right-content d-flex">
            <div className="form-container m-auto">
              <div>
                <div>
                  <label htmlFor="firstName">First name</label>
                  <input type="text" id="firstName" />
                </div>
                <div>
                  <label htmlFor="lastName">Last name</label>
                  <input type="text" id="lastName" />
                </div>
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" />
              </div>
              <div>
                <label htmlFor="message">What can we help you with?</label>
                <textarea id="message" rows="5"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="address-container container py-5">
        <h3 className=" text-center">Address</h3>
        <div className="map-container my-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58742.06632519504!2d72.50140227948916!3d23.046557480438892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e85dd47735387%3A0xcf681f7448982d32!2sSpectrics%20Solutions!5e0!3m2!1sen!2sin!4v1709202537290!5m2!1sen!2sin"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="other-details-container">
          <div>
            <div>
              <i class="fa-solid fa-location-dot fa-lg"></i>
            </div>
            <div>
              <span>Address</span>
              <span>GF-10 Pushti Heights EL- Maruti Complex</span>
              <span className="font-small text-black-50">
                12, Subhash Chowk, Memnagar, Ahmedabad
              </span>
            </div>
          </div>
          <div>
            <div>
              <i class="fa-solid fa-envelope fa-lg"></i>
            </div>
            <div>
              <span>Email</span>
              <span>Contact@billboardblizz.com</span>
            </div>
          </div>
          <div>
            <div>
              <i class="fa-solid fa-phone fa-lg"></i>
            </div>
            <div>
              <span>Contact</span>
              <span>+91 9632587415</span>
              <span>+91 7539514862</span>
            </div>
          </div>
          <div>
            <div>
              <i class="fa-solid fa-clock fa-lg"></i>
            </div>
            <div>
              <span>Opening hours</span>
              <span>Monday to Saturday: 9AM - 7PM</span>
            </div>
          </div>
        </div>
      </div>
      <ContactUsFAQs></ContactUsFAQs>
      <Footer></Footer>
    </>
  );
}
