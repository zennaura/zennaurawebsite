import React from "react";
import './ImageContainer.css'

// Utility to compress Cloudinary images
function compressCloudinaryUrl(url) {
  if (!url || typeof url !== 'string') return url;
  if (!url.includes('cloudinary.com')) return url;
  return url.replace('/upload/', '/upload/q_auto,f_auto/');
}

const ImageContainer = ({ Image }) => {
    return (
        <>
            <div className="ImageContainer-img">
                <img src={compressCloudinaryUrl(Image)} alt="Image"  />
            </div>
        </>
    )
};

export default ImageContainer;