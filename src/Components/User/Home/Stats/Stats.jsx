import React from "react";
import "./Stats.css";

export default function Stats() {
  return (
    <>
      <div className="stats-container">
        <div>
          <div>
            <i class="fa-solid fa-users fa-2xl"></i>
          </div>
          <div>
            <span>50,000+</span>
            <span>Satiesfied clients</span>
          </div>
        </div>
        <div>
          <div>
            <i class="fa-solid fa-user-pen fa-2xl"></i>
          </div>
          <div>
            <span>3,000+</span>
            <span>Creators</span>
          </div>
        </div>
        <div>
          <div>
            <i class="fa-solid fa-brush fa-2xl"></i>
          </div>
          <div>
            <span>3,50,000+</span>
            <span>Designs made</span>
          </div>
        </div>
        <div>
          <div>
            <i class="fa-solid fa-handshake fa-2xl"></i>
          </div>
          <div>
            <span>125+</span>
            <span>Partners</span>
          </div>
        </div>
      </div>
    </>
  );
}
