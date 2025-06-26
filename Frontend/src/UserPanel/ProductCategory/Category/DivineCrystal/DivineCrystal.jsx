import React from "react";
import ImageHead from "../../../../components/ImageHead/ImageHead";
import JustIn from "../../JustIn/JustIn";
import NourishBody from "../../NourishBody/NourishBody";
import BestSeller from "../../BestSeller/BestSeller";
import Bemember from "../../../BeMember/Bemember";
import OurCertifications from "../../../OurCertifications/OurCertifications";
import FollowUs from "../../../FollowUs/FollowUs";
import UptoDate from "../../../UpToDate/UptoDate";
import DivineCrystalRange from "./DivineCrystalRange/DivineCrystalRange"
import ShopByConcern from "../../ShopByConcern/ShopByConcern";
import ImageContainer from "../../ImageContainer/ImageContainer"; 
import CrystalEnergyImg from "../../../../assests/CrystalEnergy.png"
import Divine from "../../../../assests/divine.png";
import DivineM from "../../../../assests/mobile_6.png";
import { useMediaQuery } from "react-responsive";
const DivineCrystal = () => {
    const isMobile = useMediaQuery({query:"(max-width:500px)"})
    return(
        <>
        <ImageHead Title= "Divine Crystals"/>
        <DivineCrystalRange/>
        <BestSeller category="Divine Crystals"/>
        {/* <JustIn/> */}
        <NourishBody/>
        <ShopByConcern/>
        <ImageContainer Image = {isMobile?DivineM:Divine}/>
        {/* <Bemember/> */}
        {/* <OurCertifications/> */}
        {/* <FollowUs/> */}
        <UptoDate/>
        </>
    );
}

export default DivineCrystal;