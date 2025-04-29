import React from "react";
import './ImageContainer.css'

const ImageContainer = ({Image}) => {
    return(
        <>
        <div className="ImageContainer-img">
            <img src={Image} alt="Image" />
        </div>
        </>
    )
};

export default ImageContainer;