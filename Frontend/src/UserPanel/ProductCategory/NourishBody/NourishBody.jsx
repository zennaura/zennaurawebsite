import React from "react";
import "./NourishBody.css";
const NourishBody = () => {
  return (
    <>
      <div className="nourishbody-container">
        {/* <div className="nourishbody-header">
                <h1>Nourish Your Body, Elevate Your Soul</h1>
            </div> */}
        <div className="nourishbody-content">
          <iframe
            width="1600"
            height="500"
            src="https://www.youtube.com/embed/QL-jTNToD7A?si=CeYhUNjBstSnTMEx"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default NourishBody;
