import React from "react";
import ImageHead from "../../../../components/ImageHead/ImageHead";
import JustIn from "../../JustIn/JustIn";
import NourishBody from "../../NourishBody/NourishBody";
import BestSeller from "../../BestSeller/BestSeller";
import Bemember from "../../../BeMember/Bemember";
import OurCertifications from "../../../OurCertifications/OurCertifications";
import FollowUs from "../../../FollowUs/FollowUs";
import UptoDate from "../../../UpToDate/UptoDate";
import SacredRitualsRange from "./SacredRitualsRange/SacredRitualsRange";
import ShopByConcern from "../../ShopByConcern/ShopByConcern";
import ImageContainer from "../../ImageContainer/ImageContainer";
import ShopRitual from "../../../../assests/ShopRitual.png";
import Sacred from "../../../../assests/sacred.png";
import SacredM from "../../../../assests/mobile_5.png";
import { useMediaQuery } from "react-responsive";

const SacredRituals = () => {
    const isMobile = useMediaQuery({maxWidth:500})
    return(
        <>
        <ImageHead Title= "Sacred Rituals"/>
        <SacredRitualsRange/>
        <BestSeller category="Sacred Rituals"/>
        {/* <JustIn/> */}
        <NourishBody/>
        <ShopByConcern/>
        <ImageContainer Image = {isMobile?SacredM:Sacred}/>
        {/* <Bemember/> */}
        {/* <OurCertifications/> */}
        {/* <FollowUs/> */}
        <UptoDate/>
        </>
    );
}

export default SacredRituals;