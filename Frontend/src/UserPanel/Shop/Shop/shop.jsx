import React from 'react'
import './shop.css'
import Filter from '../Filter/Filter'
import Featuredproduct from '../../Featuredproducts/Featuredproducts'
import ShopBy from '../ShopBY/ShopBy'
import Allproduct from '../AllProduct/Allproduct'
import ImageHead from '../../../components/ImageHead/ImageHead'
import ToggleContent from '../ToggleContent/ToggleContent'
import Bemember from '../../BeMember/Bemember'
import FollowUs from '../../FollowUs/FollowUs'
import OurCertifications from '../../OurCertifications/OurCertifications'
import UptoDate from '../../UpToDate/UptoDate'
import ImageContainer from '../../ProductCategory/ImageContainer/ImageContainer'
import NewEnerzies from '../../../assests/newenergies.png'
import JustIn from '../../ProductCategory/JustIn/JustIn'

const shop = () => {
    return (
        <div>
            <ImageHead Title="Shop" />
            <ShopBy />
            <Featuredproduct />
            <div className="shop-allproduct">
                <Filter />
                <Allproduct />
            </div>
            <ImageContainer Image={NewEnerzies}/>
            <JustIn/>
            <Bemember/>
            <ToggleContent/>
            <FollowUs/>
            <OurCertifications/>
            <UptoDate/>
        </div>
    )
}

export default shop
