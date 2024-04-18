import React from "react";

export default function ContactUsFAQs() {
  let FAQs = [
    {
      question: "How does BillboardBlizz work?",
      answer:
        "BillboardBlizz is a platform that connects billboard makers with advertisers. Makers upload their billboard designs, which are then available for advertisers to browse and purchase. Advertisers can search for billboards based on location, size, and other criteria, making it easy to find the perfect billboard for their needs.",
    },
    {
      question: "How do I sign up as a maker/advertiser?",
      answer: `To sign up as a maker or advertiser, simply click on the 'Sign Up' button on the homepage and follow the instructions to create your account. Once your account is created, you can start uploading your billboard designs or browsing and purchasing billboards.`,
    },
    {
      question: "What types of billboards are available on BillboardBlizz?",
      answer: `BillboardBlizz offers a wide variety of billboards, including digital and static billboards of various sizes and locations. Makers can upload their designs based on these specifications, giving advertisers plenty of options to choose from.`,
    },
    {
      question: "How are billboards priced on BillboardBlizz?",
      answer: `Billboards on BillboardBlizz are priced based on factors such as size, location, and other features. Makers set their prices when uploading their designs, allowing advertisers to easily compare prices and find the best deal`,
    },
    {
      question: "Can I customize a billboard design?",
      answer: `Yes, advertisers can request customizations to existing billboard designs. Simply contact the maker of the design you're interested in to discuss your customization needs.`,
    },
    {
      question: "What payment methods are accepted on BillboardBlizz?",
      answer: `BillboardBlizz accepts a variety of payment methods, including credit/debit cards, PayPal, and other secure payment options. Choose the payment method that's most convenient for you during the checkout process.`,
    },
    {
      question:
        "Can I sell my billboard designs exclusively on BillboardBlizz?",
      answer: `Yes, makers have the option to sell their billboard designs exclusively on BillboardBlizz. This means that the design will only be available for purchase on our platform, giving you more control over your work.`,
    },
    {
      question: "Is there a review system for makers and advertisers?",
      answer: `Yes, BillboardBlizz has a review system in place to help users make informed decisions. After completing a transaction, both parties have the opportunity to leave a review based on their experience.`,
    },
  ];
  return (
    <>
      <div className=" bg-success pt-3 pb-5">
        <h3 className="text-center text-white">FAQs</h3>

        <div
          className="accordion accordion-flush container shadow p-0 mt-3"
          id="accordionFlushExample"
        >
            {FAQs.map((faq, index)=>(
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#flush-collapse${index+1}`}
                aria-expanded="false"
                aria-controls={`flush-collapse${index+1}`}
              >
                {faq.question}
              </button>
            </h2>
            <div
              id={`flush-collapse${index+1}`}
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                {faq.answer}
              </div>
            </div>
          </div>
          ))}
        </div>
      </div>
    </>
  );
}
