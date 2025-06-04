import React, { useEffect, useState, useRef } from "react";
import './shop.css';
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const { autoSelects } = location.state || {};
  const [autoSelectsState, setAutoSelectsState] = useState(autoSelects || []);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const allCategoriesRef = useRef([]);

  // Fetch all categories on mount and set as default
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_LINK}/api/categories`);
        const data = await res.json();
        // Flatten all subCategory values
        const allSubCategories = data.flatMap(parent =>
          parent.subCategories.flatMap(sub => sub.subCategory)
        );
        allCategoriesRef.current = allSubCategories;
        setProductCategories(allSubCategories);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
    setAutoSelectsState(autoSelects || []);
  }, [location.state]);

  const fetchProducts = async (filters = {}) => {
    try {
      let {
        productCategories,
        concerns = [],
        intents = [],
        minPrice = 0,
        maxPrice = 1000,
        rating = ''
      } = filters;

      // If productCategories is empty, use all categories by default
      if (!productCategories || productCategories.length === 0) {
        productCategories = allCategoriesRef.current;
      }

      let url = `${import.meta.env.VITE_BACKEND_LINK}/api/products`;
      const params = new URLSearchParams();

      if (productCategories.length)
        params.append("subCategory", JSON.stringify(productCategories));
      if (concerns.length) params.append("concerns", JSON.stringify(concerns));
      if (intents.length) params.append("intents", JSON.stringify(intents));
      params.append("minPrice", minPrice);
      params.append("maxPrice", maxPrice);
      if (rating) params.append("rating", rating);

      if (
        productCategories.length ||
        concerns.length ||
        intents.length ||
        minPrice !== 0 ||
        maxPrice !== 1000 ||
        rating
      ) {
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

  // const handleFilterChange = (type, value) => {
  //   const stateMap = {
  //     productCategories: [productCategories, setProductCategories],
  //     concerns: [concerns, setConcerns],
  //     intents: [intents, setIntents],
  //   };
  //   const [state, setter] = stateMap[type];
  //   const newState = state.includes(value)
  //     ? state.filter((item) => item !== value)
  //     : [...state, value];

  //   setter(newState);

  //   fetchProducts({
  //     productCategories: type === "productCategories" ? newState : productCategories,
  //     concerns: type === "concerns" ? newState : concerns,
  //     intents: type === "intents" ? newState : intents,
  //   });
  // };

  const handleFilterChange = (type, value) => {
  // Handle individual checkbox changes (existing logic)
  if (typeof value === 'string') {
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
  }
  // Handle batch filter operations (new logic for price, rating, filter/clear buttons)
  else if (type === 'fetchProducts' && typeof value === 'object') {
    // Update your state variables if needed
     setPriceRange([value.minPrice || 0, value.maxPrice || 1000]);
    setProductCategories(value.productCategories || []);
    setConcerns(value.concerns || []);
    setIntents(value.intents || []);
    
    // Call fetchProducts with all filter data including price and rating
    fetchProducts({
      productCategories: value.productCategories || [],
      concerns: value.concerns || [],
      intents: value.intents || [],
      minPrice: value.minPrice || 0,
      maxPrice: value.maxPrice || 1000,
      rating: value.rating || ''
    });
  }
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
          autoCheck={[autoSelectsState]}
          onFilterChange={handleFilterChange}
        />

        {/* Mobile Filter Controls */}
        <MobileFilterControls />

        {/* Main Product Listing */}
        <Allproduct products={products} priceRange={priceRange}/>
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