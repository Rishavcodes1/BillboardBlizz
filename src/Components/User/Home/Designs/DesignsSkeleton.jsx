import React, { useEffect, useState } from "react";

export default function DesignsSkeleton() {
  let data = [1, 1, 1, 1, 1, 1, 1, 1];
  return (
    <>
      {data.map(() => (
        <div className="design bg-white design-skeleton-outer">
          <div className="design-image-container design-skeleton"></div>
          <div className="designs-details-container p-2 position-relative">
            <div className="design-price-container design-skeleton"></div>
            <h5 className="design-skeleton"></h5>
            <div className="small-details">
              <div className="design-skeleton"></div>
              <div className="design-skeleton"></div>
              <div className="design-skeleton"></div>
            </div>
          </div>
          <div className="designs-btn-container mt-auto p-2">
            <div className="design-skeleton"></div>
            <div className="design-skeleton"></div>
          </div>
        </div>
      ))}
    </>
  );
}
