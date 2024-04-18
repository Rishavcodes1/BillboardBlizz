import React from "react";
import notFound404 from "../Assets/404.jpg";
import {useNavigate} from 'react-router-dom'

export default function NotFound404() {
  const naivgate = useNavigate()
  return (
    <>
      <div className="no-data-found-container 404-container">
        <img src={notFound404} alt="" />
        <h3>Page not found</h3>
        <span className="text-center">
          The page you are looking for might have been removed or is temporarily
          unavailable
        </span>
        <button onClick={()=>(naivgate("/"))}>Go to home page</button>
      </div>
    </>
  );
}
