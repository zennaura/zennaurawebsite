import React, { useEffect, useState } from "react";
import "./OurCertifications.css"; 

import iso from "../../assests/iso.png";
import gmp from "../../assests/gmp.png";
import mii from "../../assests/MII.png";
import hand from "../../assests/handpicked.png";
import organic from "../../assests/organic.png";
import handmade from "../../assests/hademade.png";
import crueltyFree from "../../assests/crultyfree.png";

const certifications = [
  { src: iso, alt: "ISO Certified", text: "All our processes meet the internationally recognized ISO 9001 standards for quality management and consistency." },
  { src: gmp, alt: "GMP Certified", text: "Every product is crafted under strict GMP-certified environments, ensuring safety, hygiene, and uncompromised quality." },
  { src: mii, alt: "Made in India", text: "Proudly handcrafted in India, blending heritage, healing, and holistic craftsmanship in every offering." },
  { src: hand, alt: "Handpicked", text: "We use only carefully selected, ethically sourced crystals, charged and curated for energetic purity." },
  { src: organic, alt: "100% Organic", text: "All ingredients used are 100% organic, free from chemicals, toxins, and artificial additives—just nature in its purest form." },
  { src: handmade, alt: "Handmade", text: "Every product is lovingly handmade by skilled women artisans, preserving the art of slow, conscious creation." },
  { src: crueltyFree, alt: "Cruelty Free", text: "None of our products or ingredients are tested on animals — we are deeply committed to ethical, compassionate practices." }
];



const OurCertifications = () => {
  
  const [hoverText, setHoverText] = useState("We use only carefully selected, ethically sourced crystals, charged and curated for energetic purity.");
  
  return (
    <section className="certifications">
      <h2>Our Certifications</h2>
      <div className="certifications-container">
        {certifications.map((cert, index) => (
          <img key={index} src={cert.src} alt={cert.alt} className={`cert-image ${cert.alt === "Handpicked" ? "large-cert" : ""}`} onMouseEnter={() => setHoverText(cert.text)}
            onMouseLeave={() => setHoverText("We use only carefully selected, ethically sourced crystals, charged and curated for energetic purity.")}/>
        ))}
      </div>
      <p className='cert-text'>
        {/* "PETA: All our products are certified Animal Cruelty Free by PETA – the largest animal rights organization in the world!" */}
        {hoverText}
      </p>
    </section>
  );
};

export default OurCertifications;
