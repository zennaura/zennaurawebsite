import "./WhyWeStarted.css";
import React from "react";
// import backgroundVideo from "../../assets/your-video-file.mp4"; 

const WhyWeStarted = () => {
  return (
    <div className="whywestart-container">
      <h1 className="whywestart-title">Why We Started – A Story Of Purity & Purpose</h1>
      <div className="whywestart-content">
        <video 
          className="whywestart-video"
          autoPlay
          muted
          loop
          playsInline
          poster="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
        >
          <source src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default WhyWeStarted;