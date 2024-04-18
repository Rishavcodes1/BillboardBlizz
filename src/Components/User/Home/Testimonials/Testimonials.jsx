import React from "react";
import "./Testimonials.css";

export default function Testimonials() {
  const testimonials_data = [
    {
      personImg:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww",
      personName: "Sarah Johnson",
      personDesignation: "Marketing Director, Lumosoft Solutions",
      message:
        "BillboardBlizz has revolutionized our advertising strategy. The platform's diverse range of billboard designs allowed us to find the perfect fit for our campaign. The process was seamless, and the results were beyond our expectations.",
    },
    {
      personImg:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      personName: "Michael Chen",
      personDesignation: "Billboard Designer, Vortex Dynamics",
      message:
        "As a billboard maker, BillboardBlizz has provided me with a valuable platform to showcase my work. The interface is user-friendly, and the support team is always ready to assist. I've seen a significant increase in sales since joining the platform.",
    },
    {
      personImg:
        "https://images.healthshots.com/healthshots/en/uploads/2020/12/08182549/positive-person.jpg",
      personName: "Emily Rodriguez",
      personDesignation: "Advertising Manager, Sunstone Innovations",
      message:
        "I've been using BillboardBlizz for my advertising needs for some time now, and I couldn't be happier. The selection of billboards is extensive, and the ability to customize designs has been incredibly useful. Highly recommended for anyone looking to make an impact with their advertising.",
    },
    {
      personImg:
        "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg&ga=GA1.1.1224184972.1711843200&semt=sph",
      personName: "Alex Thompson",
      personDesignation: "Marketing Coordinator, Nexus Technologies",
      message:
        "Finding the right billboard for our campaign was a breeze with BillboardBlizz. The platform's search features made it easy to narrow down our options, and the transaction process was smooth. We'll definitely be using BillboardBlizz for our future campaigns.",
    },
    {
      personImg:
        "https://img.freepik.com/premium-photo/portrait-handsome-young-man_53876-38137.jpg?size=626&ext=jpg&ga=GA1.1.1224184972.1711843200&semt=ais",
      personName: "David Lee",
      personDesignation: "Brand Manager, SparkleStream Enterprises",
      message:
        "Using BillboardBlizz has been a game-changer for our brand. The ability to browse through a variety of billboard designs and purchase them instantly has saved us both time and money. Our campaigns have seen a noticeable uptick in engagement since partnering with BillboardBlizz.",
    },
  ];

  let index = 1;

  

  const changeTestimonials = setInterval(() => {
    if (index >= 5) {
      index = 0;
    }
    try {
      let testimonialActive = document.querySelector(".testimonial-active");
      testimonialActive.classList.remove("testimonial-active");

      let nextTestimonial = document.querySelector(`.testimonial${index + 1}`);
      nextTestimonial.classList.add("testimonial-active");
    } catch (error) {
      clearInterval(changeTestimonials);
    }

    index = index + 1;
  }, 5000);

  return (
    <>
      <div className="container testimonials-container-outer">
        <h3>Testimonials</h3>
        <div className="testimonials-container-inner">
          {testimonials_data.map((details, index) => (
            <div
              className={`testimonial testimonial${index + 1} ${
                index + 1 == 1 ? "testimonial-active" : ""
              }`}
            >
              <div className="testimonial-header">
                <img src={details.personImg} alt="" />
                <div>
                  <span className="fw-semibold">{details.personName}</span>
                  <span className="font-small2 fw-semibold">
                    {details.personDesignation}
                  </span>
                </div>
              </div>

              <div className="testimonial-body">
                <div className="ratings-container text-warning">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </div>
                <div className="testimonial-message-container">
                  "{details.message}"
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
