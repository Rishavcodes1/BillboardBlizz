import React from "react";
import "./MadeOnBillboardblizz.css";

export default function MadeOnBillboardblizz() {
  let data = [
    {
      imageSrc:
        "https://graphicsfamily.com/wp-content/uploads/edd/2022/08/Juice-Company-Billboard-Banner-Design-Template-scaled.jpg",
      madeBy: "Billboard Masters",
      rating: "4.9",
      ago: "a year ago",
      year: "2023",
    },
    {
      imageSrc:
        "https://cdn.bannerbuzz.ca/media/catalog/product/resize/650/b/i/billboard-printing-1.jpg",
      madeBy: "Elite Billboards",
      rating: "4.7",
      ago: "a month ago",
      year: "2024",
    },
    {
      imageSrc:
        "https://media.licdn.com/dms/image/D5612AQHjL4iQsCNAAw/article-cover_image-shrink_720_1280/0/1687790209563?e=2147483647&v=beta&t=5WtkIFO1AkI0aU-n8xgV7NjXNt-0bfBd-Bk2B6rsvDw",
      madeBy: "Creative Callout",
      rating: "4.7",
      ago: "3 months ago",
      year: "2023",
    },
    {
      imageSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl4TSStSOWObVLPTirh3ISJUwLgoW3CTfaAJyQHQ57oTSTAtAme8Nvm_4gaaduYvGwkbs&usqp=CAU",
      madeBy: "Redesigner",
      rating: "4.6",
      ago: "5 days ago",
      year: "2024",
    },
    {
      imageSrc:
        "https://billboardprints.com/wp-content/uploads/2022/03/PGFA2C0-scaled.jpg",
      madeBy: "Peak City Signs",
      rating: "4.8",
      ago: "2 years ago",
      year: "2021",
    },
    {
      imageSrc:
        "https://mockuptree.com/wp-content/uploads/edd/2023/08/Free_Billboard_Mockups-960x640.jpg",
      madeBy: "Raider Graphics",
      rating: "4.5",
      ago: "2 years ago",
      year: "2022",
    },
    {
      imageSrc:
        "https://adquick-public.imgix.net/landing+images/media_formats/billboard-carvana.png?auto=format",
      madeBy: "SoloBitz",
      rating: "4.6",
      ago: "3 years ago",
      year: "2021",
    },
    {
      imageSrc:
        "https://images.squarespace-cdn.com/content/v1/5beb9eb22714e57d24605f7d/602899b4-45ef-465d-9821-3763c8af7c86/Toronto+Billboard.png",
      madeBy: "The Cascade Shop",
      rating: "4.7",
      ago: "3 years ago",
      year: "2020",
    },
    {
      imageSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRddpBRnrg20ujAdFGXkvCRNLY0a12kWc5D_HPPkAhL_MPpr90UnyHd2rZQd-_-G5qfYZw&usqp=CAU",
      madeBy: "Create Bills",
      rating: "4.7",
      ago: "3 years ago",
      year: "2020",
    },
    {
      imageSrc: "https://www.bluelinemedia.com/images/bulletin-1-500x375.jpg",
      madeBy: "Grilled Designs",
      rating: "4.3",
      ago: "8 months ago",
      year: "2023",
    },
    {
      imageSrc:
        "https://d1xv5jidmf7h0f.cloudfront.net/circleone/images/products_gallery_images/Billboard-Printing-_Hoardings_.jpg",
      madeBy: "Billboard Boush",
      rating: "4.8",
      ago: "5 months ago",
      year: "2023",
    },
    {
      imageSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-H5CgP6vadFG2GzNnGmAW1huAAfgzVheFTQ&usqp=CAU",
      madeBy: "Ink Engraving",
      rating: "4.7",
      ago: "5 yearss ago",
      year: "2018",
    },
    {
      imageSrc:
        "https://cms.clearchanneloutdoor.com/wp-content/uploads/2023/02/BOS-4-Content-Aligned-DMA-750x500.jpg",
      madeBy: "Ink Engraving",
      rating: "4.8",
      ago: "5 yearss ago",
      year: "2019",
    },
    {
      imageSrc:
        "https://graphicsfamily.com/wp-content/uploads/edd/2020/06/Free-Restaurant-Billboard-Advertising-Template-scaled.jpg",
      madeBy: "Spineworks",
      rating: "4.9",
      ago: "4 yearss ago",
      year: "2020",
    },
    {
      imageSrc: "https://movia.media/wp-content/uploads/2020/04/201.jpg",
      madeBy: "Stonewerke",
      rating: "4.6",
      ago: "4 yearss ago",
      year: "2019",
    },
    {
      imageSrc:
        "https://themarketingbirds.com/wp-content/uploads/2018/08/ededed.jpg",
      madeBy: "Arciva Design",
      rating: "4.5",
      ago: "4 yearss ago",
      year: "2020",
    },
  ];
  return (
    <>
      <div className="made-on-billboardblizz-container my-5">
        <div className="container p-0">
          <h3>Made on BillboardBlizz</h3>
          <div className="made-on-billboardblizz-container-inner">
            {data.map((details) => (
              <div className="made-design">
                <img src={details.imageSrc} alt="" />
                <div className="made-on-design-details-container  text-white p-2 d-flex flex-column">
                  <div className="d-flex">
                    <div>
                      <span>Made by</span>
                      <h5>{details.madeBy}</h5>
                    </div>
                    <div className="ms-auto">
                      <i className=" fa-solid fa-star text-warning"></i>
                      <span>{details.rating}</span>
                    </div>
                  </div>
                  <div className="d-flex mt-auto">
                    <span>{details.ago}</span>
                    <span className="  ms-auto">| {details.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
