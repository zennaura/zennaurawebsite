import React from "react";
import ImageHead from "../../../../components/ImageHead/ImageHead";
import DiscoverSkin from "./DiscoverSkin/DiscoverSkin";
import JustIn from "../../JustIn/JustIn";
import NourishBody from "../../NourishBody/NourishBody"
import BestSeller from "../../BestSeller/BestSeller";
import ExploreHandmadeSoap from "./ExploreHandmadeSoap/ExploreHandmadeSoap"
import OurCertifications from "../../../OurCertifications/OurCertifications";
import Bemember from "../../../BeMember/Bemember";
import FollowUs from "../../../FollowUs/FollowUs";
import UptoDate from "../../../UpToDate/UptoDate";
import ShopByConcern from "../../ShopByConcern/ShopByConcern";
import Soap from "../../../../assests/soap.png";
import SoapM from "../../../../assests/mobile_7.png";
import ImageContainer from "../../ImageContainer/ImageContainer";
import { useMediaQuery } from "react-responsive";
import launchingsoon from "../../../../assests/launchingsoon.jpg";


const SkinnCare = () => {

    const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
    return(
        <>
            <img src={launchingsoon} alt="launch" />
        {/* <ImageHead Title= "Body Soap"/>
        <DiscoverSkin/>
            <BestSeller category="Skin Care" />
        <JustIn/> not there
        <NourishBody/> not there
        <ShopByConcern/>
            <ImageContainer Image={isMobile?SoapM:Soap} />
        <ExploreHandmadeSoap/> not there
        <Bemember/> not there
        <OurCertifications/> not there
        <FollowUs/> not there
        <UptoDate/> */}
        </>
    );
}

export default SkinnCare;