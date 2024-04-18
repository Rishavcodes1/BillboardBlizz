import React from "react";
import "./TrustedBy.css"
import adidas from "../../../../Assets/brand logos/adidas.png";
import amazon from "../../../../Assets/brand logos/amazon.png";
import apple from "../../../../Assets/brand logos/apple.png";
import byjus from "../../../../Assets/brand logos/byjus.png";
import cadbury from "../../../../Assets/brand logos/cadbury.png";
import cococola from "../../../../Assets/brand logos/cococola.png";
import disney from "../../../../Assets/brand logos/disney.png";
import facebook from "../../../../Assets/brand logos/facebook.png";
import flipkart from "../../../../Assets/brand logos/flipkart.png";
import hyundai from "../../../../Assets/brand logos/hyundai.png";
import instagram from "../../../../Assets/brand logos/instagram.png";
import mcdonalds from "../../../../Assets/brand logos/mcdonalds.png";
import microsoft from "../../../../Assets/brand logos/microsoft.png";
import nestle from "../../../../Assets/brand logos/nestle.png";
import netfilx from "../../../../Assets/brand logos/netfilx.png";
import oneplus from "../../../../Assets/brand logos/oneplus.png";
import paytm from "../../../../Assets/brand logos/paytm.png";
import phonepe from "../../../../Assets/brand logos/phonepe.png";
import puma from "../../../../Assets/brand logos/puma.png";
import redbus from "../../../../Assets/brand logos/redbus.png";
import reddit from "../../../../Assets/brand logos/reddit.png";
import reebok from "../../../../Assets/brand logos/reebok.png";
import samsung from "../../../../Assets/brand logos/samsung.png";
import skoda from "../../../../Assets/brand logos/skoda.png";
import starbucks from "../../../../Assets/brand logos/starbucks.png";
import swiggy from "../../../../Assets/brand logos/swiggy.png";
import tata from "../../../../Assets/brand logos/tata.png";
import tesla from "../../../../Assets/brand logos/tesla.png";
import uber from "../../../../Assets/brand logos/uber.png";
import zomato from "../../../../Assets/brand logos/zomato.png";

let brands = [
  adidas,
  amazon,
  apple,
  byjus,
  cadbury,
  cococola,
  disney,
  facebook,
  flipkart,
  hyundai,
  instagram,
  mcdonalds,
  microsoft,
  nestle,
  netfilx,
  oneplus,
  paytm,
  phonepe,
  puma,
  redbus,
  reddit,
  reebok,
  samsung,
  skoda,
  starbucks,
  swiggy,
  tata,
  tesla,
  uber,
  zomato,
];

export default function TrustedBy() {
  return (
    <>
      <div>
        <h3 className=" mb-3">Trusted by</h3>
        <div className="trusted-by-container d-flex flex-wrap gap-4">
          <div>
            {brands.map((image) => (
              <img src={image} alt="" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
