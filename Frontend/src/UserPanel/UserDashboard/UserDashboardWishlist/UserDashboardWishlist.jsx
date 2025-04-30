import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../../components/AuthContext/AuthContext';
import ProductCard from '../../../components/Productcart/ProductCart';
import './UserDashboardWishlist.css';
import { FaHeart } from "react-icons/fa";

const UserDashboardWishlist = () => {
  const { user } = useUser();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_LINK}/api/wishlist/${user._id}`);
        console.log('Fetched wishlist:', response.data);

        const wishlistData = response.data.items || [];

        const formattedItems = wishlistData.map(item => ({
          id: `${item.productId._id}-${item.variantId}`,
          productId: item.productId,
          variantId: item.variantId,
          // Find the specific variant to access its price
          variant: item.productId.variants.find(v =>
            v._id === item.variantId ||
            (item.productId.variants.length === 1 && item.variantId === "0")
          )
        }));

        setWishlistItems(formattedItems);
        console.log('Formatted wishlist:', formattedItems);
      } catch (err) {
        console.error('Error fetching wishlist:', err);
        setError('Failed to load wishlist');
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user]);

  const handleRemoveFromWishlist = async (productId, variantId) => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_LINK}/api/wishlist/toggle`, {
        userId: user._id,
        productId,
        variantId,
      });
      setWishlistItems(prevItems =>
        prevItems.filter(item =>
          !(item.productId._id === productId && item.variantId === variantId)
        )
      );
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      alert("Failed to remove from wishlist");
    }
  };

  if (loading) {
    return <div className="wishlist-loading">Loading your wishlist...</div>;
  }

  if (error) {
    return <div className="wishlist-error">{error}</div>;
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-empty">
        <div className="wishlist-title">
          <h3 className="wishlist-h3">Wishlist</h3>
        </div>
        <h3 className='wishlist-h3-empty'>You Have Not Added Any Products In Your Wishlist
        </h3>
        <p>
          Manifest, Cleanse, Heal—The Zenn Aura Way</p>
          <div className="UserDashboardAddAddress-buttonWrapper">
          <button type="submit" className="UserDashboardAddAddress-button ShopNow-btn">
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="user-dashboard-wishlist">
      <div className="wishlist-title">
        <h3 className="wishlist-h3">Wishlist</h3>
      </div>

      <div className="wishlist-grid">
        {wishlistItems.map((item) => {
          const product = item.productId;
          const variant = item.variant || {};
          const combinedId = `${product._id}-${item.variantId}`;

          // Use variant image if available, otherwise product images
          const mainImage = variant.variantsimages?.[0] ||
            product.frontImage ||
            product.healingImage ||
            "https://via.placeholder.com/300";

          return (
            <div key={combinedId} className="wishlist-item-container">
              <ProductCard
                id={combinedId}
                name={product.name || "Untitled Product"}
                title={product.title || ""}
                image={mainImage}
                price={variant.salePrice || variant.price || 0}
                originalPrice={variant.costPrice || variant.salePrice || variant.price || 0}
                discount={variant.discount}
                isBest={variant.bestSeller || false}
                isFeatured={variant.featureProduct || false}
                rating={product.rating || 0}
                onBuyNowClick={() => {
                  console.log('Buy now clicked for', product._id);
                }}
              />
              <button
                className="remove-from-wishlist-btn"
                onClick={() => handleRemoveFromWishlist(product._id, item.variantId)}
                aria-label="Remove from wishlist"
              >
                <FaHeart className="wishlist-heart-icon active" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserDashboardWishlist;