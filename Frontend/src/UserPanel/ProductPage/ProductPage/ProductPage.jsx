import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ImageHead from '../../../components/ImageHead/ImageHead'
import Productdetails from '../Productdetails/Productdetails'
import StoneUsed from '../StoneUsed/StoneUsed'
import ProductTabs from '../ProductTabs/ProductTabs'
import ImageContainer from '../../ProductCategory/ImageContainer/ImageContainer'
import ProductIcon from '../ProductIcon/ProductIcon';
import AllsoLike from '../AllsoLike/AllsoLike';
import ShippingTab from '../ShippingTab/ShippingTab';
import ReviewsPage from '../ReviewsPage/ReviewsPage';
import FQApage from '../FQA/FQA';
import './ProductPage.css';

const ProductPage = () => {
  // const location = useLocation();
  // const product = location.state || {};
  // const [product, setCurrentProduct] = useState(initialProduct);

  // const handleVariantChange = (id) => {
  //   // Fetch or find product by id here, then update currentProduct state
  //   const newProduct = product.allVariants.find(p => p.id === id);
  //   setCurrentProduct(newProduct);
  // };

  const location = useLocation();
  const { id } = useParams(); // Fallback if location.state isn't available
  const initialProduct = location?.state;
  const [product, setProduct] = useState(initialProduct);

  useEffect(() => {
    const state = location?.state;

    if (state?.product ) {
      // merge selected variant into product
      const updatedProduct = {
        ...state.product,
        ...state.selectedVariant,
      };
      setProduct(updatedProduct);
    } else {
      // fallback: fetch from backend
      fetch(`/api/products/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) setProduct(data.product);
        });
    }
  }, [location.state?.selectedVariant, id]);

  console.log("Product Data:", product);
  // console.log("initial",initialProduct);
  return (
    <div>
      <ImageHead Title={product.variantname} />
      <Productdetails product={product} />
      <ProductIcon />
      <StoneUsed image={product.stoneUsedImage} />
      <ProductTabs
        productDescriptions={product.productDescriptions}
        specifications={product.specifications}
        healingImage={product.healingImage}
      />
      {/* All so like this product */}
      <AllsoLike />
   <div className="productposter-container">
  {/* Benefits Poster */}
  {product.benefits && product.benefits.length > 0 && (
    <div className="productposter benefits-poster">
      <img 
        src={product.benefits} 
        alt="Benefits" 
        className="poster-image"
      />
    </div>
  )}
  
  {/* Why Choose Poster */}
  {product.whyChoose && product.whyChoose.length > 0 && (
    <div className="productposter whychoose-poster">
      <img 
        src={product.whyChoose} 
        alt="Why Choose" 
        className="poster-image"
      />
    </div>
  )}
  
  {/* Ways to Cleanse Poster */}
  {product.waysToClean && product.waysToClean.length > 0 && (
    <div className="productposter waystocleanse-poster">
      <img 
        src={product.waysToClean} 
        alt="Ways to Cleanse" 
        className="poster-image"
      />
    </div>
  )}
  
  {/* Who Wear Poster */}
  {product.whoWear && product.whoWear.length > 0 && (
    <div className="productposter whowear-poster">
      <img 
        src={product.whoWear} 
        alt="Who Wear" 
        className="poster-image"
      />
    </div>
  )}
  
  {/* How and Where Wear Poster */}
  {product.whereHowWear && product.whereHowWear.length > 0 && (
    <div className="productposter howwherewear-poster">
      <img 
        src={product.whereHowWear} 
        alt="How and Where to Wear" 
        className="poster-image"
      />
    </div>
  )}
</div>

      {/* ShippingTab */}
      <ShippingTab />
      {/* Reviews and FQA */}
      <ReviewsPage ProductId={product._id}
        VarientId={product.__v}
        product={product}
      />
      <FQApage />

    </div>
  )
}

export default ProductPage
