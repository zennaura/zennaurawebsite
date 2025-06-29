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


const SkinnCare = () => {

    const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
    return(
        <>
        <ImageHead Title= "Body Soap"/>
        <DiscoverSkin/>
            <BestSeller category="Skin Care" />
        {/* <JustIn/> */}
        <NourishBody/>
        <ShopByConcern/>
            <ImageContainer Image={isMobile?SoapM:Soap} />
        {/* <ExploreHandmadeSoap/> */}
        {/* <Bemember/> */}
        {/* <OurCertifications/> */}
        {/* <FollowUs/> */}
        <UptoDate/>
        </>
    );
}

export default SkinnCare;