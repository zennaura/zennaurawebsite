import React from "react";
import "./ShortsGallery.css";

const shortsData = [
  {
    id: 1,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    views: "41.5K",
  },
  {
    id: 2,
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    views: "732K",
  },
  {
    id: 3,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    views: "45.6K",
  },
  {
    id: 4,
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    views: "26.7K",
  },
  {
    id: 5,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    views: "18.6K",
  },
];


const ShortsGallery = () => {
  return (

    <div className="shorts-container">
          
      <h2 className="title">YouTube Shorts</h2>
      <div className="shorts-scroll">
        {shortsData.map((short) => (
          <div key={short.id} className="short-item">
            <video
              src={short.videoUrl}
              muted
              loop
              className="short-video"
              onMouseEnter={(e) => e.target.play()}
              onMouseLeave={(e) => e.target.pause()}
            />
            <div className="views-overlay">▶ {short.views}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShortsGallery;
