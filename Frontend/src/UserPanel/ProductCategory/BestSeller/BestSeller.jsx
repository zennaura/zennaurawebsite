import { FaHeart, FaStar, FaRegStar } from "react-icons/fa";
import "./BestSeller.css";
import React from "react";
import ProductCart from "../../../components/Productcart/ProductCart";


const BestSeller = () => {

    // Sample product data (replace with API data or props)
    const products = [
      {
        id: 1,
        title: "Cosmic Flow Bracelet",
        subtitle: "Awaken your chakras",
        image: "https://via.placeholder.com/200",
        price: 499,
        originalPrice: 999,
        rating: 4.5,
      },
      {
        id: 2,
        title: "Zen Harmony Cushion",
        subtitle: "Enhance meditation",
        image: "https://via.placeholder.com/200",
        price: 799,
        originalPrice: 1299,
        rating: 4.8,
      },
      {
        id: 3,
        title: "Crystal Healing Kit",
        subtitle: "Balance your energy",
        image: "https://via.placeholder.com/200",
        price: 699,
        originalPrice: 1199,
        rating: 4.2,
      },
      {
        id: 4,
        title: "Chakra Balancing Oil",
        subtitle: "Nourish your spirit",
        image: "https://via.placeholder.com/200",
        price: 399,
        originalPrice: 799,
        rating: 4.7,
      },
    ];
  return (
    <div className="BestSeller-container">
      <h1 className="BestSeller-heading">Best Sellers</h1>
      <div className="BestSeller-cards">
      {products.map((product, index) => (
          <div
            key={product.id}
            className={`Featuredproducts-card ${
              index === 1 || index === 2 ? "featured-card-center" : ""
            }`}
          >
            <ProductCart {...product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;