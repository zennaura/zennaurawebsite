import React from "react";
import "./OurCertifications.css"; 

import iso from "../../assests/iso.png";
import gmp from "../../assests/gmp.png";
import mii from "../../assests/MII.png";
import hand from "../../assests/hand.png";
import organic from "../../assests/organic.png";
import handmade from "../../assests/hademade.png";
import crueltyFree from "../../assests/crultyfree.png";

const certifications = [
  { src: iso, alt: "ISO Certified" },
  { src: gmp, alt: "GMP Certified" },
  { src: mii, alt: "Make in India" },
  { src: hand, alt: "Handpicked" },
  { src: organic, alt: "100% Organic" },
  { src: handmade, alt: "Handmade" },
  { src: crueltyFree, alt: "Cruelty Free" }
];


const OurCertifications = () => {
  return (
    <section className="certifications">
      <h2>Our Certifications</h2>
      <div className="certifications-container">
        {certifications.map((cert, index) => (
          <img key={index} src={cert.src} alt={cert.alt} className="cert-image" />
        ))}
      </div>
      <p className="cert-text">
        "PETA: All our products are certified Animal Cruelty Free by PETA – the largest animal rights organization in the world!"
      </p>
    </section>
  );
};

export default OurCertifications;
