import React from 'react';  
import "./ImageHead.css";
import { useState, useEffect } from "react";
import header_mobile from "../../assests/header_mobile.jpg";
import header from "../../assests/header_lap.jpg";
import { useMediaQuery } from 'react-responsive';

const ImageHead = ({ Title }) => {
  const [title, setTitle] = useState(Title); 
  const isMobile = useMediaQuery({maxWidth:500})
  const backgroundImg = isMobile?header_mobile:header
    useEffect(() => {
      setTitle(Title); 
    }, [Title]);

  return (
    <>
    <div className="imageHead-container" style={{backgroundImage:`url(${backgroundImg})`,backgroundPosition:isMobile?"center center":"bottom center"}}>
      <div className="imageHead-content">
        <h1 className="imageHead-title">{title}</h1>
      </div>
    </div>
    </>
  );
};

export default ImageHead;