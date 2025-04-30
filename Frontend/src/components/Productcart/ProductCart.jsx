import React from "react";
import { FaHeart, FaStar, FaRegStar } from "react-icons/fa";
import axios from "axios";
import { useUser } from '../../components/AuthContext/AuthContext';
import "./productCard.css";

const ProductCard = ({ id, name, title, image, price, originalPrice, isBest, isFeatured, rating, onBuyNowClick ,isBestSeller }) => {
  const [liked, setLiked] = React.useState(false); // State to track if the product is liked
  const { user } = useUser(); // Get user from context

  // Extract product ID and variant ID
  const productId = id.split("-")[0];
  const variantId = id.split("-")[1];

  // Fetch wishlist when the component mounts
  React.useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) return;

      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/wishlist/${user._id}`);
       
        const isInWishlist = response.data.items.some(
          (item) =>
            item.productId.toString() === productId && item.variantId.toString() === variantId
        );
        // console.log("Is Product in Wishlist?", isInWishlist);

        setLiked(isInWishlist); // Set the initial liked state
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [user, id]); // Re-fetch if user or product ID changes

  // Function to handle wishlist toggle
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

      // console.log("Toggle Wishlist Response:", response.data);

      // Update the liked state based on the server's response
      const isInWishlist = response.data.wishlist.items.some(
        (item) =>
          item.productId.toString() === productId && item.variantId.toString() === variantId
      );
      // console.log("Updated Is Product in Wishlist?", isInWishlist);

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
          productId: id, // Full ID like "67f96b7992d4b635fe174cab-0"
          variantId: id.split('-')[1], // Just the "0" part
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
      {/* Wishlist Icon */}
      <div className="product-card-wishlist" onClick={handleWishlistClick}>
        {liked ? (
          <FaHeart className="product-card-wishlist-liked" />
        ) : (
          <FaHeart className="product-card-wishlist-default" />
        )}
      </div>

      {/* Image Section */}
      <div className="product-card-image-container">
        <img
          src={image || "https://images.pexels.com/photos/3018845/pexels-photo-3018845.jpeg?cs=srgb&dl=cosmetic-products-3018845.jpg&fm=jpg"}
          alt={title}
          className="product-card-image"
        />
      </div>

      {/* Content Section */}
      <div className="product-card-content">
        <h3 className="product-card-title">{name}</h3>
        <p className="product-card-subtitle">{title}</p>

        {/* Price Section */}
        <div className="product-card-price-container">
          <span className="product-card-price">₹{price}</span>
          <span className="product-card-original-price">₹{originalPrice}</span>
        </div>

        {/* Rating Section */}
        <div className="product-card-rating">
          {[...Array(Math.floor(rating))].map((_, index) => (
            <FaStar key={index} className="product-card-star-filled" />
          ))}
          {rating % 1 !== 0 && <FaRegStar className="product-card-star-filled" />}
          {Array.from({ length: 5 - Math.ceil(rating) }).map((_, index) => (
            <FaRegStar key={index} className="product-card-star-empty" />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="product-card-actions">
          <button className="product-card-add-to-cart" onClick={handleAddToCart}>
            ADD TO CART
          </button>
          <button onClick={onBuyNowClick} className="product-card-buy-now">
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;