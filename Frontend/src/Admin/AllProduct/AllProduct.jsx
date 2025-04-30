import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../components/Productcart/ProductCart'; 

const AllProduct = () => {
  const [variantCards, setVariantCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/api/products`);
        const products = await res.json();

        const flattened = products.flatMap((product) =>
          product.variants.map((variant, index) => ({
            id: `${product._id}-${index}`,
            data: {
              // Full product-level data
              _id: product._id,
              name: product.name,
              title: product.title,
              description: product.description,
              sku: product.sku,
              tags: product.tags,
              stoneUsedImage: product.stoneUsedImage,
              rating: product.rating,
              frontImage: product.frontImage,
              otherimages: product.otherimages,
              healingImage: product.healingImage,
              benefits: product.benefits,
              whyChoose: product.whyChoose,
              waysToClean: product.waysToClean,
              whoWear: product.whoWear,
              whereHowWear: product.whereHowWear,
              productDescriptions: product.productDescriptions,

              // Variant-level data
              ...variant,
            },
          }))
        );

        setVariantCards(flattened);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  const handleClick = (variant) => {
    navigate(`/product/${variant.id}`, {
      state: variant.data,
    });
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {variantCards.map((variant) => (
        <div
          key={variant.id}
          onClick={() => handleClick(variant)}
          className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition"
        >
          <ProductCard
            id={variant.id}
            title={variant.data.title}
            subtitle={variant.data.description}
            image={variant.data.frontImage}
            price={variant.data.salePrice}
            originalPrice={variant.data.originalPrice}
            rating={variant.data.rating}
          />
        </div>
      ))}
    </div>
  );
};

export default AllProduct;
