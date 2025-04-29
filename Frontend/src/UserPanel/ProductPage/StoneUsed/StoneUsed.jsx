import React from 'react'
import './StoneUsed.css'

const StoneUsed = ({ image = [] }) => {
    // console.log("image:", image[0]);

    return (
        <div className='StoneUsed-container'>
            <h1 className="StoneUsed-title">Stone Used</h1>
            <div className="StoneUsed-collection">
                {/* Loop through each image in the array */}
                {image.map((imgSrc, index) => (
                    <div key={index} className="StoneUsed-item">
                        {imgSrc && (
                            <img
                                src={imgSrc.image}
                                alt={`Stone used in product ${index + 1}`}
                                className="StoneUsed-image"
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default StoneUsed;
