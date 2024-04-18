import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Home.css";
import nike_ad from "../../../Assets/nike_ad.mp4";
import { Link } from "react-router-dom";
import Designs from "./Designs/Designs";
import MadeOnBillboardblizz from "./MadeOnBillboardblizz/MadeOnBIllboardblizz";
import WhyUs from "./WhyUs/WhyUs";
import TrustedBy from "./TrustedBy/TrustedBy";
import Testimonials from "./Testimonials/Testimonials";
import Stats from "./Stats/Stats";
import Footer from "../Footer/Footer";


export default function Home() {
  document.title = "Home";
  const[current, setcurrent] = useState("")
  const toggleVideoAction = (event) => {
    let video = document.getElementById("video");
    if (video.paused) {
      video.play();
      event.target.innerText = "pause";
    } else {
      video.pause();
      event.target.innerText = "play";
    }
  };
  useEffect(()=>{
    setcurrent("home")
  },[])
  return (
    <>
      <Navbar current={current} key={current}></Navbar>
      <div className="home-main-app hero d-flex align-items-center justify-content-center position-relative flex-column">
        <video autoPlay muted loop id="video">
          <source src={nike_ad} type="video/mp4" />
        </video>
        <span className="fs-1 fw-semibold text-white w-75 text-center">
          Unlock your business potential with billboard advertising
        </span>
        <Link className="text-white bg-primary p-2 fw-semibold my-3">
          explore designs
        </Link>
        <button
          className="my-btn play-pause-btn position-absolute fw-semibold"
          onClick={toggleVideoAction}
        >
          Pause
        </button>
      </div>
      <Designs></Designs>
      <WhyUs></WhyUs>
      <MadeOnBillboardblizz></MadeOnBillboardblizz>
      <div className="trusted-by-and-stats-container d-flex container gap-2 my-5">
        <TrustedBy></TrustedBy>
        <Stats></Stats>
      </div>
      <Testimonials></Testimonials>
      <Footer></Footer>
    </>
  );
}
