import React, { useState, useEffect } from 'react';
import './Redefining.css';
import Redefiningimg1 from '../../assests/Redefiningimg1.png';
import Redefiningimg2 from '../../assests/Redefiningimg2.png';
import Redefiningimg3 from '../../assests/Redefiningimg3.png';
import Redefiningimg4 from '../../assests/Redefiningimg4.png';
import Redefiningimg5 from '../../assests/Redefiningimg5.png';

const Redefining = () => {
    const [hoveredWord, setHoveredWord] = useState('');
    const [images, setImages] = useState([
        Redefiningimg1,
        Redefiningimg2,
        Redefiningimg3,
        Redefiningimg4,
        Redefiningimg5
    ]);
    const [fade, setFade] = useState(false);

    const getImagesForWord = (word) => {
        switch (word) {
            case 'Manifest':
                return [Redefiningimg1, Redefiningimg2, Redefiningimg3, Redefiningimg4, Redefiningimg5];
            case 'Cleanse':
                return [Redefiningimg2, Redefiningimg3, Redefiningimg4, Redefiningimg5, Redefiningimg1];
            case 'Heal':
                return [Redefiningimg3, Redefiningimg4, Redefiningimg5, Redefiningimg1, Redefiningimg2];
            default:
                return [Redefiningimg1, Redefiningimg2, Redefiningimg3, Redefiningimg4, Redefiningimg5];
        }
    };

    useEffect(() => {
        if (hoveredWord) {
            setFade(true); // Start fade out
            setTimeout(() => {
                setImages(getImagesForWord(hoveredWord));
                setFade(false); // Fade in new images
            }, 300); // Fade out duration
        } else {
            setFade(true);
            setTimeout(() => {
                setImages(getImagesForWord(''));
                setFade(false);
            }, 300);
        }
    }, [hoveredWord]);

    return (
        <div className="redefining-container">
            <div className="redefining-image-left images">
                <div className="img-box redifining-img-box1">
                    <img src={images[0]} alt="Skincare Model" className={fade ? 'fade-out' : ''} />
                </div>
                <div className="img-box redifining-img-box2">
                    <img src={images[1]} alt="Skincare Model" className={fade ? 'fade-out' : ''} />
                </div>
            </div>

            <div className="redefining-content">
                <div className="redefining-icon">
                    <span className="redefining-ball3"></span>
                    <span className="redefining-ball2"></span>
                    <span className="redefining-ball1"></span>
                </div>

                <div className="redefining-words-span">
                    {['Manifest', 'Cleanse', 'Heal'].map((word) => (
                        <span
                            className="word"
                            key={word}
                            onMouseEnter={() => setHoveredWord(word)}
                            onMouseLeave={() => setHoveredWord('')}
                        >
                            {word}
                        </span>
                    ))}
                </div>

                <div className="redefining-icon">
                    <span className="redefining-ball1"></span>
                    <span className="redefining-ball2"></span>
                    <span className="redefining-ball3"></span>
                </div>
            </div>

            <div className="redefining-image-right images">
                <div className="img-box redifining-img-box3">
                    <img src={images[2]} alt="Skincare Model" className={fade ? 'fade-out' : ''} />
                </div>
                <div className="img-box redifining-img-box4">
                    <img src={images[3]} alt="Skincare Model" className={fade ? 'fade-out' : ''} />
                </div>
                <div className="img-box redifining-img-box5">
                    <img src={images[4]} alt="Skincare Model" className={fade ? 'fade-out' : ''} />
                </div>
            </div>
        </div>
    );
};

export default Redefining;
