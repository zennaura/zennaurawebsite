import React, { useState, useEffect } from 'react';
import './Redefining.css';
import c1 from '../../assests/c1.jpg';
import c2 from '../../assests/c2.jpg';
import c3 from '../../assests/c3.jpg';
import c4 from '../../assests/c4.jpg';
import c5 from '../../assests/c5.jpeg';
import h1 from '../../assests/h1.jpg';
import h2 from '../../assests/h2.jpg';
import h3 from '../../assests/h3.jpg';
import h4 from '../../assests/h4.jpg';
import h5 from '../../assests/h5.jpeg';
import m1 from '../../assests/m1.jpg';
import m2 from '../../assests/m2.jpg';
import m3 from '../../assests/m3.jpg';
import m4 from '../../assests/m4.jpeg';
import m5 from '../../assests/m5.jpeg';

const Redefining = () => {
    const [hoveredWord, setHoveredWord] = useState('');
    const [images, setImages] = useState([
        m1,
        m3,
        m2,
        m5,
        m4
    ]);
    const [fade, setFade] = useState(false);

    const getImagesForWord = (word) => {
        switch (word) {
            case 'Manifest':
                return [m1, m3, m2, m5, m4];
            case 'Cleanse':
                return [c2, c3, c4, c5, c1];
            case 'Heal':
                return [h3, h4, h5, h1, h2];
            default:
                return [m1, m3, m2, m5, m4];
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
