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
const DivineCrystal = () => {
    return(
        <>
        <ImageHead Title= "Divine Crystals"/>
        <DivineCrystalRange/>
        <JustIn/>
        <NourishBody/>
        <ShopByConcern/>
        <BestSeller/>
        <ImageContainer Image = {CrystalEnergyImg}/>
        {/* <Bemember/> */}
        <OurCertifications/>
        <FollowUs/>
        <UptoDate/>
        </>
    );
}

export default DivineCrystal;