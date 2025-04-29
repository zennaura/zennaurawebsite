import { useState, useRef } from "react";
import "./HoverLine.css";

const videos = [
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
];

export default function HoverParagraphs() {
  const videoRef = useRef(null);

  const handleHover = (videoSrc) => {
    if (videoRef.current) {
      videoRef.current.src = videoSrc; // Change video source
      videoRef.current.load(); // Reload the video
      videoRef.current.play(); // Ensure it plays
    }
  };

  return (
    <div className="container">
      <video ref={videoRef} autoPlay loop muted className="background-video">
        <source src={videos[0]} type="video/mp4" />
      </video>
      <div className="content">
        {videos.map((video, index) => (
          <p key={index} onMouseEnter={() => handleHover(video)} className="hover-text">
            Hover over this paragraph {index + 1}
          </p>
        ))}
      </div>
    </div>
  );
}
