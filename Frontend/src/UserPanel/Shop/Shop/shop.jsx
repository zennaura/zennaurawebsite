import React from 'react';
import './shop.css';
import { useEffect, useState } from "react";

// Import Components
import Filter from '../Filter/Filter';
import Featuredproduct from '../../Featuredproducts/Featuredproducts';
import ShopBy from '../ShopBY/ShopBy';
import Allproduct from '../AllProduct/Allproduct';
import ImageHead from '../../../components/ImageHead/ImageHead';
import MobileFilterControls from '../Filter/MobileFilterControls';
import ToggleContent from '../ToggleContent/ToggleContent';
import Bemember from '../../BeMember/Bemember';
import FollowUs from '../../FollowUs/FollowUs';
import OurCertifications from '../../OurCertifications/OurCertifications';
import UptoDate from '../../UpToDate/UptoDate';
import ImageContainer from '../../ProductCategory/ImageContainer/ImageContainer';
import NewEnerzies from '../../../assests/newenergies.png';
import JustIn from '../../ProductCategory/JustIn/JustIn';

const Shop = () => {
  const [productCategories, setProductCategories] = useState([]);
  const [concerns, setConcerns] = useState([]);
  const [intents, setIntents] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchProducts = async (filters = {}) => {
    try {
      const { productCategories = [], concerns = [], intents = [] } = filters;
      const hasFilters = productCategories.length || concerns.length || intents.length;

      let url = `${import.meta.env.VITE_BACKEND_LINK}/api/products`;

      if (hasFilters) {
        const params = new URLSearchParams();
        if (productCategories.length)
          params.append("categories", JSON.stringify(productCategories));
        if (concerns.length) params.append("concerns", JSON.stringify(concerns));
        if (intents.length) params.append("intents", JSON.stringify(intents));
        url += `?${params.toString()}`;
      }

      const res = await fetch(url);
      const productsData = await res.json();

      const flattened = productsData.flatMap((product) =>
        product.variants.map((variant, index) => ({
          id: `${product._id}-${index}`,
          data: {
            ...product,
            ...variant,
          },
        }))
      )

      setProducts(flattened);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts(); // initial fetch without filters
  }, []);

  const handleFilterChange = (type, value) => {
    const stateMap = {
      productCategories: [productCategories, setProductCategories],
      concerns: [concerns, setConcerns],
      intents: [intents, setIntents],
    };
    const [state, setter] = stateMap[type];
    const newState = state.includes(value)
      ? state.filter((item) => item !== value)
      : [...state, value];

    setter(newState);

    fetchProducts({
      productCategories: type === "productCategories" ? newState : productCategories,
      concerns: type === "concerns" ? newState : concerns,
      intents: type === "intents" ? newState : intents,
    });
  };

  return (
    <div className="shop-page">
      <ImageHead Title="Shop" />
      <ShopBy />
      <Featuredproduct />

      <div className="shop-allproduct">
        {/* Desktop Filter */}
        <Filter
          productCategories={productCategories}
          concerns={concerns}
          intents={intents}
          onFilterChange={handleFilterChange}
        />

        {/* Mobile Filter Controls */}
        <MobileFilterControls />

        {/* Main Product Listing */}
        <Allproduct products={products} />
      </div>

      <ImageContainer Image={NewEnerzies} />
      <JustIn />
      <Bemember />
      <ToggleContent />
      <FollowUs />
      <OurCertifications />
      <UptoDate />
    </div>
  );
};

export default Shop;