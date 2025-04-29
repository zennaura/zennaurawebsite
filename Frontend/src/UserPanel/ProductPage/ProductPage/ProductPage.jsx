import React from 'react';
import { useLocation } from 'react-router-dom';
import ImageHead from '../../../components/ImageHead/ImageHead'
import Productdetails from '../Productdetails/Productdetails'
import StoneUsed from '../StoneUsed/StoneUsed'
import ProductTabs from '../ProductTabs/ProductTabs'
import ImageContainer from '../../ProductCategory/ImageContainer/ImageContainer'
import ProductIcon from '../ProductIcon/ProductIcon';
import AllsoLike from '../AllsoLike/AllsoLike';
import ShippingTab from '../ShippingTab/ShippingTab';

const ProductPage = () => {
  const location = useLocation();
  const product = location.state || {};
  console.log("Product Data:", product);
  return (
    <div>
      <ImageHead Title="Product detail" />
      <Productdetails product={product} />
      <ProductIcon />
      <StoneUsed image={product.stoneUsedImage} />
      <ProductTabs
        productDescriptions={product.productDescriptions}
        specifications={product.specifications}
        healingImage={product.healingImage}
      />
      <AllsoLike/>
      {/* benefits */}
      <ImageContainer Image={product.benefits} />
      {/* whychoose */}
      <ImageContainer Image={product.whyChoose} />
      {/* ways to clease */}
      <ImageContainer Image={product.waysToClean} />
      {/* who wear */}
      <ImageContainer Image={product.whoWear} />
      {/* how and where wear */}
      <ImageContainer Image={product.whereHowWear} />

      <ShippingTab />

    </div>
  )
}

export default ProductPage
