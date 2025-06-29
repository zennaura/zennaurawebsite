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

  // Effect to fetch all categories on mount.
  // This populates allCategoriesRef and sets the initial productCategories in currentFilters.
  useEffect(() => {
    const fetchAllCategoriesForRef = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_LINK}/api/categories`);
        const data = await res.json();
        const allSubCategories = data.flatMap(parent =>
          parent.subCategories.flatMap(sub => sub.subCategory)
        );
        allCategoriesRef.current = allSubCategories;

        setCurrentFilters(prevFilters => {
          const initialProductCategories = autoSelects?.length > 0
            ? autoSelects
            : []; // Use autoSelects if available, otherwise all categories

          // Also merge autoSelects into other filter types if they apply to them
          // This part assumes autoSelects might contain concerns/intents too
          const initialConcerns = autoSelects?.length > 0
            ? [...new Set([...prevFilters.concerns, ...autoSelects])]
            : prevFilters.concerns;
           const initialChakra = autoSelects?.length > 0
            ? [...new Set([...prevFilters.chakra, ...autoSelects])]
            : prevFilters.chakra;
          const initialIntents = autoSelects?.length > 0
            ? [...new Set([...prevFilters.intents, ...autoSelects])]
            : prevFilters.intents;


          return {
            ...prevFilters,
            productCategories: initialProductCategories,
            concerns: initialConcerns,
            chakra:initialChakra,
            intents: initialIntents,
            // Price and rating remain their default values unless autoSelects specifically sets them.
            // If autoSelects can set minPrice/maxPrice/rating, you'd add logic here.
          };
        });

      } catch (err) {
        console.error('Shop.jsx: Failed to fetch all categories:', err);
      }
    };
    fetchAllCategoriesForRef();

    // Set autoSelectsState for Filter component's autoCheck prop
    // This is useful if Filter component itself needs to manage auto-checking logic separately
    setAutoSelectsState(autoSelects || []);

  }, [location.state, autoSelects]); // Re-run if location.state (including autoSelects) changes

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
      if (categories && categories.length)
        params.append("category", JSON.stringify(categories));
      if (concerns.length) params.append("concerns", JSON.stringify(concerns));
      if (chakra.length) params.append("chakra", JSON.stringify(chakra));
      if (intents.length) params.append("intents", JSON.stringify(intents));
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
  // This is the primary mechanism for re-fetching products based on filter updates.
  useEffect(() => {
    // Ensure allCategoriesRef is populated before attempting an initial product fetch
    // that might rely on all categories as a default.
    // This prevents fetching products with an incomplete "all categories" filter.
    if (allCategoriesRef.current.length > 0) {
      fetchProductsData(currentFilters);
    }
  }, [currentFilters, fetchProductsData]); // Depend on currentFilters and the stable fetchProductsData

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
        <MobileFilterControls />

        {/* Main Product Listing */}
        {isLoadingProducts ? (
            <div className="loading-indicator">
          <div className="loading-spinner"></div> {/* This is the new spinner element */}
          Loading Products...
      </div>
        ) : products.length > 0 ? (
            <Allproduct products={products} priceRange={[currentFilters.minPrice, currentFilters.maxPrice]} />
          ) : (
              <div className="loading-indicator">
          <div className="loading-spinner"></div> {/* This is the new spinner element */}
          Loading Products...
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