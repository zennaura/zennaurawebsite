
import React from 'react'
import Carousel from '../Carousel/Carousel';
import LuxuryPage from '../LuxuryPage/LuxuryPage';
import SelfCare from '../SelfCare/SelfCare';
import Journey from '../Journey/Journey';
import Redefining from '../Redefining/Redefining';
import Slider from '../Slider/Slider';
import ProductCard from '../Featuredproducts/Featuredproducts';
import OurCertifications from '../OurCertifications/OurCertifications';
import OurStory from '../OurStory/OurStory';
import UptoDate from '../UpToDate/UptoDate';
import FollowUs from '../FollowUs/FollowUs';
import Bemember from '../BeMember/Bemember';
import ImageContainer from "../ProductCategory/ImageContainer/ImageContainer";
import Homepageposter from '../../assests/awaken.png';
import OurClient2 from '../OurClient/OurClient2.jsx';
import { useUser } from '../../components/AuthContext/AuthContext';
import PosterSlider from './posterSlider'


const Homepage = () => {

    const { user } = useUser();

    // console.log("received data through context" , user)

    // console.log("Received user data through context", user )
    return (
        <>
            {/* Main Homepage Section */}

            <PosterSlider />
            <Carousel />
            <ImageContainer Image={Homepageposter} />
            <ProductCard />
            <Slider />
             <OurStory />
             
            <Journey />
            <Redefining />
            <OurCertifications />
            <LuxuryPage />
           
            {/* <SelfCare /> */}
            <OurClient2 />
            <Bemember />
            {/* <FollowUs /> */}
            <UptoDate />
        </>


    );
}

export default Homepage
