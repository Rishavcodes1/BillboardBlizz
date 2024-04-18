import React from "react";

export default function PageHeader(props) {
  const colors_array = ["primary", "success", "purple", "warning", "danger"];

  let color =
    props.heading == "Add store"
      ? "primary"
      : colors_array[Math.floor(Math.random() * 5)];

  return (
    <div>
      <div className="page-header my-3">
        <div className={`bg-${color}`}>
          <i class="fa-solid fa-server fa-lg"></i>
        </div>
        <div>
          <span className="fw-semibold">{props.heading}</span>
          <span className="font-small">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At,
            facilis?
          </span>
        </div>
      </div>
    </div>
  );
}
