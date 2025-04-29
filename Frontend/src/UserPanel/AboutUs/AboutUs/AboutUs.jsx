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
import Readytoexpe from "../../../assests/readytoexpe.png"
import OurCertifications from "../../OurCertifications/OurCertifications";
import FollowUs from "../../FollowUs/FollowUs";
import UptoDate from "../../UpToDate/UptoDate";
import Spiritualjourneyimg from "../../../assests/Spiritualjourneyimg.png"
const AboutUs = () => {
  return (
    <>
    <ImageHead Title = "About Us"/>
    {/* <OurPhilosophy /> */}
    <ImageContainer Image = {Readytoexpe}/>
    <WhyWeStarted/>
    <ImageContainer Image = {Readytoexpe}/>
    <OurValues/>
    <HandMadeLove/>
    <WhyZenn/>
    <ImageContainer Image = {Spiritualjourneyimg}/>
    <MakeDifferent/>
    <OurCertifications/>
    <FollowUs/>
    <UptoDate/>
    </>
  );
};

export default AboutUs;