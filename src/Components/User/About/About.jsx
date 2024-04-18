import React, { useEffect, useState } from "react";
import "./About.css";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import vision from "../../../Assets/vision.jpg";
import mission from "../../../Assets/mission.jpg";

export default function About() {
  document.title = "About";
  const [current, setcurrent] = useState("");
  useEffect(() => {
    setcurrent("about");
  }, []);
  return (
    <>
      <Navbar current={current} key={current}></Navbar>
      <div className="about-us-container py-5">
        <div className="container p-0 my-2">
          <h2>About us</h2>
          <div className=" ps-5">
            <p className=" fst-italic">
              BillboardBlizz is more than just a marketplace; it's a platform
              that is revolutionizing the way outdoor advertising works. Our
              mission is to connect billboard makers with advertisers in a
              seamless and efficient manner, making outdoor advertising
              accessible to businesses of all sizes and budgets.
            </p>
            <p className=" fst-italic">
              The idea for BillboardBlizz was born out of a passion for outdoor
              advertising and a desire to make it more accessible and effective.
              As outdoor advertising enthusiasts ourselves, we understood the
              challenges that both makers and advertisers faced in the industry.
              Makers often struggled to find buyers for their billboard designs,
              while advertisers found it difficult to navigate the complex
              process of purchasing outdoor advertising space. With this in
              mind, we set out to create a platform that would streamline the
              process, making it easier for makers to showcase their designs and
              for advertisers to find the perfect billboard for their needs.
              After months of hard work and dedication, BillboardBlizz was born.
            </p>
            <p className=" fst-italic">
              BillboardBlizz works by connecting billboard makers with
              advertisers through a user-friendly online platform. Makers can
              upload their billboard designs to the platform, where they are
              then available for advertisers to browse and purchase. Advertisers
              can search for billboards based on location, size, and other
              criteria, making it easy to find the perfect billboard for their
              needs. Once an advertiser finds a billboard they like, they can
              purchase it directly through the platform. Makers receive payment
              for their designs, and advertisers gain access to high-quality
              billboards that are ready to be installed.
            </p>
            <p className=" fst-italic">
              At BillboardBlizz, we are committed to quality in everything we
              do. We work closely with our makers to ensure that every billboard
              meets the highest standards of design and craftsmanship. We also
              carefully curate our selection of billboards to ensure that
              advertisers have access to the best possible options.
            </p>
            <p className=" fst-italic">
              Join us at BillboardBlizz and take your outdoor advertising to the
              next level. Whether you're a maker looking to sell your designs or
              an advertiser looking for the perfect billboard, we've got you
              covered. Experience the power of outdoor advertising with
              BillboardBlizz today!
            </p>
          </div>
        </div>
      </div>
      <div className="our-vision-container container d-flex p-0 mb-5">
        <div className="our-vision-left-content">
          <img src={vision} alt="" />
        </div>
        <div className="our-vision-right-content py-2 px-4">
          <h3>Our Vision</h3>
          <p>
            At BillboardBlizz, our vision is simple: to be the go-to platform
            for outdoor advertising. We want to empower businesses of all sizes
            to create impactful outdoor advertising campaigns that drive
            results. Whether you're a small local business looking to promote a
            new product or a large corporation launching a national campaign,
            BillboardBlizz has the tools and resources you need to succeed.
          </p>
          <ul>
            <li>
              Our vision is to empower businesses of all sizes to create
              impactful outdoor advertising campaigns that drive results. We
              believe that outdoor advertising should be accessible to everyone,
              and we're committed to providing the tools and resources needed to
              make that vision a reality.
            </li>
            <li>
              We aspire to be the go-to platform for outdoor advertising, known
              for our user-friendly interface, high-quality billboards, and
              exceptional customer service. We aim to set the standard for
              outdoor advertising platforms and be the first choice for
              businesses looking to advertise outdoors.
            </li>
            <li>
              We are dedicated to driving innovation in the outdoor advertising
              industry. We want to push the boundaries of what's possible with
              outdoor advertising, leveraging technology and creativity to
              create campaigns that captivate audiences and deliver results.
            </li>
          </ul>
        </div>
      </div>
      <div className="our-mission-container container d-flex p-0 mb-5">
        <div className="our-mission-left-content py-2 px-4">
          <h3>Our Mission</h3>
          <p>
            Our mission at BillboardBlizz is to revolutionize the outdoor
            advertising industry by connecting billboard makers with advertisers
            in a seamless and efficient manner. We strive to empower businesses
            of all sizes to create impactful outdoor advertising campaigns that
            drive results, while ensuring the highest standards of quality and
            customer satisfaction
          </p>
          <ul>
            <li>
              Our mission is to connect billboard makers with advertisers in a
              seamless and efficient manner. We want to make it easy for makers
              to showcase their designs and for advertisers to find the perfect
              billboard for their needs, ultimately facilitating more successful
              outdoor advertising campaigns.
            </li>
            <li>
              We are committed to ensuring quality in everything we do. From the
              billboards we offer to the customer service we provide, we strive
              to maintain the highest standards of excellence. We want every
              interaction with BillboardBlizz to be positive and productive for
              our users.
            </li>
            <li>
              We aim to drive growth for both makers and advertisers on our
              platform. For makers, we want to provide a platform where they can
              grow their business and reach a larger audience. For advertisers,
              we want to help them grow their brand and achieve their
              advertising goals through effective outdoor campaigns.
            </li>
          </ul>
        </div>
        <div className="our-mission-right-content">
          <img src={mission} alt="" />
        </div>
      </div>
      <div className="know-more-container container p-0 my-5">
        <h2>Know more</h2>
        <div className="know-more-container-inner mt-4">
          <div className="know-more sucess-stories">
            <h4>Read our sucess stories</h4>
            <div className="d-flex">
              <span>152 stories</span>
              <div className="icon-container">
                <i class="fa-solid fa-chevron-right"></i>
              </div>
            </div>
          </div>
          <div className="know-more blogs">
            <h4>Explore Blogs</h4>
            <div className="d-flex">
              <span>98 Blogs</span>
              <div className="icon-container">
                <i class="fa-solid fa-chevron-right"></i>
              </div>
            </div>
          </div>
          <div className="know-more awards">
            <h4>Awards & Recognition</h4>
            <div className="d-flex">
              <span>23 Achievements</span>
              <div className="icon-container">
                <i class="fa-solid fa-chevron-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
