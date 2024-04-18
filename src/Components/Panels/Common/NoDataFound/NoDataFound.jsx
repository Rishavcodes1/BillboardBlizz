import React from "react";
import one from "../../../../Assets/No data found images/1.jpg";
import two from "../../../../Assets/No data found images/2.jpg";
import three from "../../../../Assets/No data found images/3.jpg";
import four from "../../../../Assets/No data found images/4.jpg";
import five from "../../../../Assets/No data found images/5.jpg";
import six from "../../../../Assets/No data found images/6.jpg";
import seven from "../../../../Assets/No data found images/7.jpg";

export default function NoDataFound(props) {
  const images_Array = [one, two, three, four, five, six, seven];
  let image = images_Array[Math.floor(Math.random() * 7)];
  return (
    <div className="my-auto no-data-found-container">
      <img src={image} alt="" />
      <h3>{props.message ? props.message : "no data found"}</h3>
    </div>
  );
}
