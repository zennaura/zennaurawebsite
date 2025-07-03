import React, { useEffect, useState, useRef, useCallback } from "react";
import './shop.css'; // Make sure this path is correct
import { useLocation } from 'react-router-dom';

// Import Components (ensure these paths are correct)
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
import UptoDate from '../../UpToDate/UptoDate.jsx';
import ImageContainer from '../../ProductCategory/ImageContainer/ImageContainer';
import NewEnerzies from '../../../assests/newenergies.png';
import AboutShop from "../../../assests/aboutShop.png";
import AboutShopM from "../../../assests/mobile_3.png";
import { useMediaQuery } from "react-responsive";


// import JustIn from '../../ProductCategory/JustIn/JustIn'; // Commented out as in your snippet

const Shop = () => {
  const location = useLocation();
  const { autoSelects } = location.state || {}; // Ensure autoSelects is handled, default to empty object/array
  const [autoSelectsState, setAutoSelectsState] = useState(autoSelects || []);
   const isMobile = useMediaQuery({query: '(max-width: 500px)' })

  // Centralized current filters state - the single source of truth
  const [currentFilters, setCurrentFilters] = useState({
    productCategories: [], // Initialize as empty, will be populated by fetchAllCategoriesForRef or autoSelects
    categories: [],
    concerns: [],
    chakra:[],
    intents: [],
    minPrice: 0,
    maxPrice: 1000,
    rating: ''
  });

  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false); // Add loading state for products
  const allCategoriesRef = useRef([]); // To store all possible categories for default filtering
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);

  // Effect to fetch all categories on mount.
  // This populates allCategoriesRef and sets the initial productCategories in currentFilters.
  useEffect(() => {
    let initialFilters = {
      productCategories: [],
      categories: [],
      concerns: [],
      chakra: [],
      intents: [],
      minPrice: 0,
      maxPrice: 1000,
      rating: ''
    };

    let selects = [];
    if (autoSelects) {
      if (Array.isArray(autoSelects)) {
        selects = autoSelects;
      } else if (typeof autoSelects === "object" && autoSelects.type && autoSelects.value) {
        selects = [autoSelects];
      }
    }

    selects.forEach(({ type, value }) => {
      if (initialFilters[type]) {
        initialFilters[type].push(value);
      }
    });

    setCurrentFilters((prev) => ({
      ...prev,
      ...initialFilters,
    }));
    setAutoSelectsState(autoSelects || []);
  }, [location.state, autoSelects]);

  // Effect to fetch all categories for fallback
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_LINK}/api/categories`);
        const data = await res.json();
        const allSubCategories = data.flatMap(parent =>
          parent.subCategories.flatMap(sub => sub.subCategory)
        );
        allCategoriesRef.current = allSubCategories;
        setCategoriesLoaded(true); // Set to true when loaded
      } catch (err) {
        console.error('Shop.jsx: Failed to fetch all categories:', err);
      }
    };
    fetchAllCategories();
  }, []);

  // Function to fetch products based on provided filters. Memoized with useCallback.
  const fetchProductsData = useCallback(async (filters) => {
    setIsLoadingProducts(true); // Set loading true when fetching products
    try {
      let {
        productCategories,
        categories = [],
        concerns = [],
        chakra =[],
        intents = [],
        minPrice = 0,
        maxPrice = 1000,
        rating = ''
      } = filters;

      // If productCategories is explicitly empty in the filters, use all categories as default
      // This ensures a broad search if no category is selected.
      if (!productCategories || productCategories.length === 0) {
        productCategories = allCategoriesRef.current;
      }

      let url = `${import.meta.env.VITE_BACKEND_LINK}/api/products`;
      const params = new URLSearchParams();

      if (productCategories && productCategories.length)
        params.append("subCategory", JSON.stringify(productCategories));
      if (categories && categories.length > 0)
        params.append("category", JSON.stringify(categories));
      if (concerns && concerns.length > 0) params.append("concerns", JSON.stringify(concerns));
      if (chakra && chakra.length > 0) params.append("chakra", JSON.stringify(chakra));
      if (intents && intents.length > 0) params.append("intents", JSON.stringify(intents));
      params.append("minPrice", minPrice);
      params.append("maxPrice", maxPrice);
      if (rating) params.append("rating", rating);

      // Only append query params if at least one filter is active
      if (
        (productCategories && productCategories.length > 0) ||
        (categories && categories.length > 0) ||
        concerns.length > 0 ||
        chakra.length >0 || 
        intents.length > 0 ||
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
      );

      setProducts(flattened);
      console.log("Shop.jsx: Fetched products:", flattened.length);
    } catch (err) {
      console.error("Shop.jsx: Error fetching products:", err);
      setProducts([]); // Clear products on error
    } finally {
      setIsLoadingProducts(false); // Set loading false after fetch completes (or errors)
    }
  }, []); // No dependencies for fetchProductsData itself, as it uses filters from its arguments

  // Effect to trigger product fetching whenever currentFilters change
  useEffect(() => {
    if (categoriesLoaded) { // Only fetch when categories are loaded
      fetchProductsData(currentFilters);
    }
  }, [currentFilters, fetchProductsData, categoriesLoaded]);

  // Callback for Filter component to notify Shop.jsx about filter changes
  const handleFilterChange = useCallback((type, payload) => {
    // The Filter component is designed to send a full filter object
    // when any filter state changes (via its internal useEffect or its buttons).
    if (type === 'fetchProducts' && typeof payload === 'object') {
      console.log("Shop.jsx: Received filter payload from Filter:", payload);
      setCurrentFilters(payload); // Update the main filter state in Shop
    }
  }, []);

  return (
    <div className="shop-page">
      <ImageHead Title="Shop" />
      <ShopBy />
      <Featuredproduct /> {/* This component likely fetches its own products */}

      <div className="shop-allproduct">
        {/* Desktop Filter */}
        <Filter
          productCategories={currentFilters.productCategories} // Pass current selected categories
          categories={currentFilters.categories}
          concerns={currentFilters.concerns}                   // Pass current selected concerns
          chakra={currentFilters.chakra}                   // Pass current selected chakra
          intents={currentFilters.intents}                     // Pass current selected intents
          priceRange={[currentFilters.minPrice, currentFilters.maxPrice]} // Pass current price range
          rating={currentFilters.rating}                       // Pass current rating
          autoCheck={autoSelectsState} // For initial selections coming from location.state
          onFilterChange={handleFilterChange} // Callback for Filter to update Shop
        />

        {/* Mobile Filter Controls (if this component also needs filters, pass them) */}
        <MobileFilterControls
          productCategories={currentFilters.productCategories}
          categories={currentFilters.categories}
          concerns={currentFilters.concerns}
          chakra={currentFilters.chakra}
          intents={currentFilters.intents}
          priceRange={[currentFilters.minPrice, currentFilters.maxPrice]}
          rating={currentFilters.rating}
          onFilterChange={handleFilterChange}
        />

        {/* Main Product Listing */}
        {isLoadingProducts ? (
            <div className="loading-indicator">
          <div className="loading-spinner"></div> {/* This is the new spinner element */}
          Loading Products...
      </div>
        ) : products.length > 0 ? (
            <Allproduct
              products={products}
              priceRange={[currentFilters.minPrice, currentFilters.maxPrice]}
              productCategories={currentFilters.productCategories}
              chakra={currentFilters.chakra}
              intents={currentFilters.intents}
              onFilterChange={handleFilterChange}
              autoCheck={autoSelectsState}
            />
          ) : (
              <div className="loading-indicator">
          {/* <div className="loading-spinner"></div> This is the new spinner element */}
          No Product to Fetch
      </div>

        )}
      </div>

      <ImageContainer Image={isMobile?AboutShopM:AboutShop} />
      <ToggleContent />
      <FollowUs />
      <UptoDate />
    </div>
  );
};

export default Shop;