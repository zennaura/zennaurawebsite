import React from "react";
import "./AboutUs.css";
// import OurPhilosophy  from "../OurPhilosophy/OurPhilosophy"
import HandMadeLove from "../HandMadeLove/HandMadeLove"
import MakeDifferent from "../MakeDifferent/MakeDifferent"
import OurValues from "../OurValues/OurValue"
import WhyWeStarted from "../WhyWeStarted/WhyWeStarted"
import WhyZenn from "../WhyZenn/WhyZenn"
import ImageHead from "../../../components/ImageHead/ImageHead";
import ImageContainer from "../../ProductCategory/ImageContainer/ImageContainer";
import Readytoexpe from "../../../assests/readytoexpe.png";
import AboutUs1 from "../../../assests/aboutus1.png";
import AboutUsM from "../../../assests/mobile_2.png";
import OurCertifications from "../../OurCertifications/OurCertifications";
import FollowUs from "../../FollowUs/FollowUs";
import UptoDate from "../../UpToDate/UptoDate";
import Spiritualjourneyimg from "../../../assests/Spiritualjourneyimg.png"
import AboutShop from "../../../assests/aboutShop.png";
import AboutShopM from "../../../assests/mobile_3.png";

import NourishBody from "../../ProductCategory/NourishBody/NourishBody";
import { useMediaQuery } from "react-responsive";
const AboutUs = () => {
   const isMobile = useMediaQuery({query: '(max-width: 500px)' })
  return (
    <>
    <ImageHead Title = "About Us"/>
    {/* <OurPhilosophy /> */}
    <ImageContainer Image = {isMobile?AboutUsM:AboutUs1}/>
    {/* <WhyWeStarted/> */}
    <NourishBody/>
    <OurValues/>
    <ImageContainer Image = {isMobile?AboutShopM:AboutShop}/>
    <HandMadeLove/>
    <WhyZenn/>
    {/* <ImageContainer Image = {Spiritualjourneyimg}/> */}
    {/* <MakeDifferent/> */}
    {/* <OurCertifications/> */}
    {/* <FollowUs/> */}
    <UptoDate/>
    </>
  );
};

export default AboutUs;