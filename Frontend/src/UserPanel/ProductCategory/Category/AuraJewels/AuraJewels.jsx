import React from "react";
import JustIn from "../../JustIn/JustIn";
import NourishBody from "../../NourishBody/NourishBody";
import Bemember from "../../../BeMember/Bemember";
import OurCertifications from "../../../OurCertifications/OurCertifications";
import FollowUs from "../../../FollowUs/FollowUs";
import UptoDate from "../../../UpToDate/UptoDate";
import ImageHead from "../../../../components/ImageHead/ImageHead";
import BestSeller from "../../BestSeller/BestSeller";
import AuraJewelsRange from "./AuraJewelsRange/AuraJewelsRange";
import ShopByConcern from "../../ShopByConcern/ShopByConcern";
import ImageContainer from "../../ImageContainer/ImageContainer"; 
import WearYourEnergy from "../../../../assests/WearYourEnergy.png"; 
import Jewels from "../../../../assests/jewels.png";
import JewelsM from "../../../../assests/mobile_4.png";
import { useMediaQuery } from "react-responsive";

const AuraJewels = () => {
    const isMobile = useMediaQuery({query:"(max-width:500px)"})
    return(
        <>
        <ImageHead Title="Aura Jewels" />
        <AuraJewelsRange />
        <BestSeller category="Aura Jewels" />
        {/* <JustIn /> */}
        <NourishBody />
        <ShopByConcern />
        <ImageContainer Image={isMobile?JewelsM:Jewels} /> 
        {/* <Bemember /> */}
        {/* <OurCertifications /> */}
        {/* <FollowUs /> */}
        <UptoDate />
        </>
    );
}

export default AuraJewels;
