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

const AuraJewels = () => {
    return(
        <>
        <ImageHead Title="Aura Jewels" />
        <AuraJewelsRange />
        <BestSeller />
        {/* <JustIn /> */}
        <NourishBody />
        <ShopByConcern />
        <ImageContainer Image={Jewels} /> 
        {/* <Bemember /> */}
        {/* <OurCertifications /> */}
        {/* <FollowUs /> */}
        <UptoDate />
        </>
    );
}

export default AuraJewels;
