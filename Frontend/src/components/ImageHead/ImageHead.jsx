import React from 'react';  
import "./ImageHead.css";
import { useState, useEffect } from "react";

const ImageHead = ({ Title }) => {
    const [title, setTitle] = useState(Title); 
  
    useEffect(() => {
      setTitle(Title); 
    }, [Title]);

  return (
    <>
    <div className="imageHead-container">
      <div className="imageHead-content">
        <h1 className="imageHead-title">{title}</h1>
      </div>
    </div>
    </>
  );
};

export default ImageHead;