import React, { useEffect, useState } from "react";
import Designs from "./Designs";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";

export default function AllDesigns() {
  const [current, setcurrent] = useState("");
  useEffect(() => {
    setcurrent("designs");
  }, []);
  return (
    <>
      <Navbar current={current} key={current}></Navbar>
      <div className="pt-5">
        <Designs number={1}></Designs>
        <Footer></Footer>
      </div>
    </>
  );
}
