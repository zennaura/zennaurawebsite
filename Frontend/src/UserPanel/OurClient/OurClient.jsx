import React from 'react';
import Slider from 'react-slick';
import './OurClient.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const testimonials = [
  {
    name: "Wisteria",
    location: "Hogwarts",
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla .",
    star: "⭐⭐⭐⭐⭐"
  },  {
    name: "Wisteria",
    location: "Hogwarts",
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla .",
    star: "⭐⭐⭐⭐⭐"
  },  {
    name: "Wisteria",
    location: "Hogwarts",
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla .",
    star: "⭐⭐⭐⭐⭐"
  },  {
    name: "Wisteria",
    location: "Hogwarts",
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla .",
    star: "⭐⭐⭐⭐⭐"
  },  {
    name: "Wisteria",
    location: "Hogwarts",
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla .",
    star: "⭐⭐⭐⭐⭐"
  },  {
    name: "Wisteria",
    location: "Hogwarts",
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla .",
    star: "⭐⭐⭐⭐⭐"
  },

];

const OurClient = () => {
  const settings = {
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 4.2, // Changed from 4.1 to whole number
    swipeToSlide: true,
    infinite: true,
    speed: 500,
    arrows: false, 
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 3,
          centerPadding: '40px',
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2.2,
          centerPadding: '20px',
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: '10px',
        },
      },
    ],
  };

  return (
    <div className="ourclient-container">
      <h1 className="ourclient-heading">Hear From Our Clients!!</h1>
      <Slider {...settings} className="ourclient-slider">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="ourclient-slide">
            <div className="slide-inner"> {/* Added wrapper div */}
              <figure className="ourclient-figure">
                <img
                  src="https://th.bing.com/th/id/OIP.G-wHNCZAriqHvzuE68kN0gHaLH?w=1080&h=1620&rs=1&pid=ImgDetMain"
                  alt={testimonial.name}
                  className="ourclient-image"
                />
                <figcaption className="ourclient-figcaption">
                  <h3 className='ourclient-name'>{testimonial.name}</h3>
                  <h4 className='ourclient-company'>{testimonial.location}</h4>
                  <blockquote>
                    <p>{testimonial.quote}</p>
                  </blockquote>
                  <div className="ourclient-rating">
                    <span>{testimonial.star}</span> 
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default OurClient;