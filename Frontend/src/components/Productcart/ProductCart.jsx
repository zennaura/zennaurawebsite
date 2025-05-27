import React, { useState } from "react";
import { FaHeart, FaStar, FaRegStar } from "react-icons/fa";
import axios from "axios";
import { useUser } from '../../components/AuthContext/AuthContext';
import "./productCard.css";

const ProductCard = ({ id, name, title, backImage, frontimage, price, originalPrice, isBest, isFeatured, rating, onBuyNowClick, isBestSeller }) => {
  const [liked, setLiked] = React.useState(false);
  const { user } = useUser();

  const productId = id.split("-")[0];
  const variantId = id.split("-")[1];
const [hovered, setHovered] = useState(false);
  React.useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) return;
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/wishlist/${user._id}`);
        const isInWishlist = response.data.items.some(
          (item) =>
            item.productId.toString() === productId && item.variantId.toString() === variantId
        );
        setLiked(isInWishlist);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };
    fetchWishlist();
  }, [user, id]);

  const handleWishlistClick = async () => {
    if (!user) {
      alert("Please login to add items to wishlist");
      return;
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_LINK}/api/wishlist/toggle`, {
        userId: user._id,
        productId,
        variantId,
      });
      const isInWishlist = response.data.wishlist.items.some(
        (item) =>
          item.productId.toString() === productId && item.variantId.toString() === variantId
      );
      setLiked(isInWishlist);
      alert(isInWishlist ? "Added to wishlist!" : "Removed from wishlist!");
    } catch (error) {
      console.error("Error:", error.response?.data?.error || error.message);
      alert(error.response?.data?.error || "Failed to update wishlist");
    }
  };

  const handleAddToCart = async () => {
    try {
      if (!user) {
        alert('Please login to add items to cart');
        return;
      }
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_LINK}/api/cart/add`,
        {
          productId: id,
          variantId: id.split('-')[1],
          userId: user._id
        }
      );
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error:', error.response?.data?.error || error.message);
      alert(error.response?.data?.error || 'Failed to add to cart');
    }
  };

  return (
    <div className="product-card-container">
      {isBest || isBestSeller && (
        <>
          <div className="product-card-best-icon">
            <div className="product-card-icon">
              <h6>BEST PRODUCT</h6>
            </div>
          </div>
          <div className="product-card-sale-icon">
            <div className="product-card-icon">
              <h6>SALE</h6>
            </div>
          </div>
        </>
      )}

      {isFeatured && (
        <div className="product-card-featured-icon">
          <div className="product-card-icon">
            <h6>FEATURED</h6>
          </div>
        </div>
      )}
      
      <div className="product-card-wishlist" onClick={handleWishlistClick}>
        {liked ? (
          <div className="product-card-icon">
            <FaHeart className="product-card-wishlist-liked" />
          </div>
        ) : (
          <div className="product-card-icon">
            <FaHeart className="product-card-wishlist-default" />
          </div>
        )}
      </div>

      {/* Updated Image Section with Flip Effect */}
      <div className="product-card-image-container">
        <div className="product-card-image-flip"  onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
          {/* <div className="product-card-image-front"> */}
            <img
              src={frontimage || "https://images.pexels.com/photos/3018845/pexels-photo-3018845.jpeg?cs=srgb&dl=cosmetic-products-3018845.jpg&fm=jpg"}
              alt={title}
            // className="product-card-image"
             className={`hover-img ${!hovered ? 'visible' : ''}`}
            />
          {/* </div>
          <div className="product-card-image-back"> */}
            <img
              src={backImage || frontimage || "https://images.pexels.com/photos/3018845/pexels-photo-3018845.jpeg?cs=srgb&dl=cosmetic-products-3018845.jpg&fm=jpg"}
              alt={title}
            // className="product-card-image"
             className={`hover-img ${hovered ? 'visible' : ''}`}
            />
          {/* </div> */}
        </div>
      </div>

      <div className="product-card-content">
        <h3 onClick={onBuyNowClick} className="product-card-title">{name}</h3>
        <p onClick={onBuyNowClick} className="product-card-subtitle">{title}</p>

        <div className="product-card-price-container">
          <span className="product-card-price">₹{price}</span>
          <span className="product-card-original-price">₹{originalPrice}</span>
        </div>

        <div className="product-card-rating">
          {[...Array(Math.floor(rating))].map((_, index) => (
            <FaStar key={index} className="product-card-star-filled" />
          ))}
          {rating % 1 !== 0 && <FaRegStar className="product-card-star-filled" />}
          {Array.from({ length: 5 - Math.ceil(rating) }).map((_, index) => (
            <FaRegStar key={index} className="product-card-star-empty" />
          ))}
        </div>

        <div className="product-card-actions">
          <button className="product-card-add-to-cart" onClick={handleAddToCart}>
            ADD TO CART
          </button>
          <button className="product-card-buy-now">
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;