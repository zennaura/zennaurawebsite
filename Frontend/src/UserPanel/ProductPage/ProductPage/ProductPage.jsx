import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
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
import whyChoose from "../../../assests/whyChoose.png";
import CrystalClean from "../../../assests/crystalClean.png";

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
  const navigate = useNavigate();
  const { id } = useParams();
  const initialProduct = location?.state;
  const [product, setProduct] = useState(initialProduct);
  const [selectedVariant, setSelectedVariant] = useState(
    initialProduct?.selectedVariant || initialProduct?.variants?.[0] || null
  );
  const [isLoading, setIsLoading] = useState(!initialProduct);
  const [error, setError] = useState(null);


  useEffect(() => {
    // If we have state from navigation, use it
    if (location.state?.selectedVariant) {
      setSelectedVariant(location.state.selectedVariant);
    }
    
    // Only fetch if we don't have product data
    if (!product && !initialProduct) {
      setIsLoading(true);
      setError(null);
      fetch(`${import.meta.env.VITE_BACKEND_LINK}/api/products/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setProduct(data.product);
            // Only set default variant if we don't have a selected variant
            if (!selectedVariant) {
              setSelectedVariant(data.product.variants?.[0] || null);
            }
          } else {
            setError('Product not found');
          }
        })
        .catch(err => {
          console.error('Error fetching product:', err);
          setError('Failed to load product');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (initialProduct) {
      setIsLoading(false);
    }
  }, [id, product, initialProduct, location.state, selectedVariant]);
 const [productId, variantIndex] = id.split("-");
  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
    // Update the URL with the new variant ID
    navigate(`/productdetails/${product._id}-${variantIndex}`, {
      state: {
        ...product,
        selectedVariant: variant
      },
      replace: true
    });
  };

  console.log("Product Data:", product);
  console.log("Selected Variant:", selectedVariant);
  
  // Check if the selected variant has specifications
  const variantSpecifications = selectedVariant?.specifications || product?.specifications;
  const isCrystalProduct = variantSpecifications?.material === "Crystals";
  
  // console.log("initial",initialProduct);

  // Show loading state
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh',
        fontSize: '1.2rem'
      }}>
        Loading product details...
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh',
        fontSize: '1.2rem',
        color: 'red'
      }}>
        {error}
      </div>
    );
  }

  // Show message if no product data
  if (!product) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh',
        fontSize: '1.2rem'
      }}>
        Product not found
      </div>
    );
  }

  // Debug logging
  console.log("Rendering ProductPage with:", {
    productId: product._id,
    productName: product.name,
    selectedVariant: selectedVariant?.variantname,
    hasSpecifications: !!selectedVariant?.specifications,
    variantSpecifications: selectedVariant?.specifications,
    isCrystalProduct
  });

  return (
    <div>
      <ImageHead Title={selectedVariant?.variantname || product?.variantname } />
      <Productdetails
        product={product}
        selectedVariant={selectedVariant}
        onVariantSelect={handleVariantSelect}
      />
      <ProductIcon />
      <StoneUsed image={product?.stoneUsedImage} />
      <ProductTabs
        productDescriptions={product?.productDescriptions}
        specifications={selectedVariant?.specifications ?? product?.specifications}
        healingImage={product?.healingImage}
        healingProperties={product?.healingProperties}
      />
      {/* All so like this product */}
      <AllsoLike />
   <div className="productposter-container">
  {/* Benefits Poster */}
  {product?.benefits && product?.benefits?.length > 0 && (
    <div className="productposter benefits-poster">
      <img 
        src={product?.benefits} 
        alt="Benefits" 
        className="poster-image"
      />
    </div>
  )}
  
  {/* Why Choose Poster */}
  {product?.whyChoose && product?.whyChoose?.length > 0 ?(
    <div className="productposter whychoose-poster">
      <img 
        src={product.whyChoose  }
        alt="Why Choose" 
        className="poster-image"
      />
    </div>
  ):<div className="productposter whychoose-poster">
      <img 
        src={whyChoose  }
        alt="Why Choose" 
        className="poster-image"
      />
    </div>}
        {/* {
          
  } */}
  {/* Ways to Cleanse Poster */}
  {/* {product?.waysToClean && product?.waysToClean?.length > 0 && (
    <div className="productposter waystocleanse-poster">
      
    </div>
  )} */}
        {
          isCrystalProduct?(<img 
        src={CrystalClean} 
        alt="Ways to Cleanse" 
        className="poster-image"
      />):""
        }
  
  {/* Who Wear Poster */}
  {product?.whoWear && product?.whoWear?.length > 0 && (
    <div className="productposter whowear-poster">
      <img 
        src={product?.whoWear} 
        alt="Who Wear" 
        className="poster-image"
      />
    </div>
  )}
  
  {/* How and Where Wear Poster */}
  {product?.whereHowWear && product?.whereHowWear?.length > 0 && (
    <div className="productposter howwherewear-poster">
      <img 
        src={product?.whereHowWear} 
        alt="How and Where to Wear" 
        className="poster-image"
      />
    </div>
  )}
</div>

      {/* ShippingTab */}
      <ShippingTab />
      {/* Reviews and FQA */}
      <ReviewsPage ProductId={product?._id}
        VarientId={product?.__v}
        product={product}
      />
      <FQApage />

    </div>
  )
}

export default ProductPage
