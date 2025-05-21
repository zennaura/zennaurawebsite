import React, { useEffect, useState } from "react";
import "./OurCertifications.css"; 

import iso from "../../assests/iso.png";
import gmp from "../../assests/gmp.png";
import mii from "../../assests/MII.png";
import hand from "../../assests/hand.png";
import organic from "../../assests/organic.png";
import handmade from "../../assests/hademade.png";
import crueltyFree from "../../assests/crultyfree.png";



/*ISO 9001
All our processes meet the internationally recognized ISO 9001 standards for quality management and consistency.

GMP (Good Manufacturing Practices)
Every product is crafted under strict GMP-certified environments, ensuring safety, hygiene, and uncompromised quality.

Made in India
Proudly handcrafted in India, blending heritage, healing, and holistic craftsmanship in every offering.

Handpicked Crystals
We use only carefully selected, ethically sourced crystals, charged and curated for energetic purity.

100% Organic
All ingredients used are 100% organic, free from chemicals, toxins, and artificial additives—just nature in its purest form.

Handmade
Every product is lovingly handmade by skilled women artisans, preserving the art of slow, conscious creation.

Cruelty-Free
None of our products or ingredients are tested on animals — we are deeply committed to ethical, compassionate practices. */

const certifications = [
  { src: iso, alt: "ISO Certified", text: "ISO 9001: All our processes meet the internationally recognized ISO 9001 standards for quality management and consistency." },
  { src: gmp, alt: "GMP Certified", text: "GMP (Good Manufacturing Practices): Every product is crafted under strict GMP-certified environments, ensuring safety, hygiene, and uncompromised quality." },
  { src: mii, alt: "Made in India", text: "Made in India: Proudly handcrafted in India, blending heritage, healing, and holistic craftsmanship in every offering." },
  { src: hand, alt: "Handpicked", text: "Handpicked Crystals: We use only carefully selected, ethically sourced crystals, charged and curated for energetic purity." },
  { src: organic, alt: "100% Organic", text: "100% Organic: All ingredients used are 100% organic, free from chemicals, toxins, and artificial additives—just nature in its purest form." },
  { src: handmade, alt: "Handmade", text: "Handmade with Love: Every product is lovingly handmade by skilled women artisans, preserving the art of slow, conscious creation." },
  { src: crueltyFree, alt: "Cruelty Free", text: "Cruelty-Free: None of our products or ingredients are tested on animals — we are deeply committed to ethical, compassionate practices." }
];



const OurCertifications = () => {
  const defaultCert = certifications.find(cert => cert.alt === "Handpicked");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoverText, setHoverText] = useState(defaultCert.text);

  return (
    <section className="certifications">
      <h2>Our Certifications</h2>
      <div className="certifications-container">
        {certifications.map((cert, index) => {
          const isHovered = index === hoveredIndex;
          const isDefaultVisible = cert.alt === "Handpicked" && hoveredIndex === null;

          return (
            <img
              key={index}
              src={cert.src}
              alt={cert.alt}
              className={`cert-image ${isHovered || isDefaultVisible ? "show-color" : ""}`}
              onMouseEnter={() => {
                setHoveredIndex(index);
                setHoverText(cert.text);
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                setHoverText(defaultCert.text);
              }}
            />
          );
        })}
      </div>
      <p className="cert-text">{hoverText}</p>
    </section>
  );
};


export default OurCertifications;
