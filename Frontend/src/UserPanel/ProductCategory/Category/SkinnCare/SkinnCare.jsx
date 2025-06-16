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


const SkinnCare = () => {
    return(
        <>
        <ImageHead Title= "Skin Care"/>
        <DiscoverSkin/>
        <JustIn/>
        <NourishBody/>
        <ShopByConcern/>
        <BestSeller/>
        <ExploreHandmadeSoap/>
        {/* <Bemember/> */}
        <OurCertifications/>
        <FollowUs/>
        <UptoDate/>
        </>
    );
}

export default SkinnCare;