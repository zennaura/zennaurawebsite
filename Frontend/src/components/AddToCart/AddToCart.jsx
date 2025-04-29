import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './CartSidebar.css';
import { useUser } from '../AuthContext/AuthContext';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

const CartSidebar = ({ isOpen, onClose, cartItemCount, updateCartCount }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [giftWrapItems, setGiftWrapItems] = useState({});
  const FREE_SHIPPING_THRESHOLD = 699;
  const GIFT_WRAP_PRICE = 50;

  useEffect(() => {
    if (isOpen && user) {
      fetchCartItems();
    }
  }, [isOpen, user]);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/cart/fetchCartItems?userId=${user._id}`);
      setCartItems(response.data.items);
      updateCartCount(response.data.items.reduce((total, item) => total + item.quantity, 0));

      // Initialize gift wrap state
      const initialGiftWrap = {};
      response.data.items.forEach(item => {
        initialGiftWrap[`${item.productId}-${item.variantId}`] = false;
      });
      setGiftWrapItems(initialGiftWrap);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, variantId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      await axios.put(`http://localhost:5000/api/cart/updateQuantity`, {
        userId: user._id,
        productId,
        variantId,
        quantity: newQuantity
      });
      fetchCartItems();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };  

  const removeItem = async (productId, variantId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/removeItem`, {
        data: {
          userId: user._id,
          productId,
          variantId
        }
      });
      fetchCartItems();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const toggleGiftWrap = (productId, variantId) => {
    setGiftWrapItems(prev => ({
      ...prev,
      [`${productId}-${variantId}`]: !prev[`${productId}-${variantId}`]
    }));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const calculateGiftWrapTotal = () => {
    return Object.entries(giftWrapItems).reduce((total, [key, value]) => {
      if (value) {
        const [productId, variantId] = key.split('-');
        const item = cartItems.find(i => i.productId === productId && i.variantId === variantId);
        if (item) {
          return total + (GIFT_WRAP_PRICE * item.quantity);
        }
      }
      return total;
    }, 0);
  };

  const calculateTotalDiscount = () => {
    return cartItems.reduce((total, item) => {
      return total + ((item.originalPrice - item.price) * item.quantity);
    }, 0);
  };

  const calculateDiscountPercentage = () => {
    const originalTotal = cartItems.reduce((total, item) => {
      return total + (item.originalPrice * item.quantity);
    }, 0);

    if (originalTotal === 0) return 0;

    const discountAmount = calculateTotalDiscount();
    return Math.round((discountAmount / originalTotal) * 100);
  };

  const calculatePreShippingTotal = () => {
    return calculateSubtotal() + calculateGiftWrapTotal();
  };

  const calculateShipping = () => {
    return calculatePreShippingTotal() >= FREE_SHIPPING_THRESHOLD ? 0 : 50;
  };

  const calculateTotal = () => {
    return calculatePreShippingTotal() + calculateShipping();
  };

  const getShippingMessage = () => {
    const preShippingTotal = calculatePreShippingTotal();
    if (preShippingTotal >= FREE_SHIPPING_THRESHOLD) {
      return "Free shipping unlocked!";
    } else {
      const amountNeeded = FREE_SHIPPING_THRESHOLD - preShippingTotal;
      return `Spend ₹${amountNeeded.toFixed(2)} more for free shipping!`;
    };
  };

  const handleCheckout = () => {
    // Prepare products data in the format expected by CheckoutPage
    const productsForCheckout = cartItems.map(item => ({
      _id: item.productId,
      name: item.name,
      title: item.title,
      salePrice: item.price,
      costPrice: item.originalPrice,
      size: item.variantId || 'Default',
      frontImage: item.image,
      quantity: item.quantity,
      discount: item.discount || 0
    }));

    navigate("/checkout-page", {
      state: {
        products: productsForCheckout
      }
    });
  };

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />

      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <div className="cart-total-product-count">
            <h2>Cart <span className="cart-product-count">{cartItemCount}</span></h2>
            <button onClick={onClose} className="close-btn">×</button>
          </div>
          <div className="shipping-message">
            {getShippingMessage()}
          </div>
        </div>

        <div className="cart-content">
          {loading ? (
            <div className="loading-spinner-container">
              <div className="loading-spinner" />
              <p>Loading cart...</p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="cart-empty">
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="quick-add-section">
                <h3>View quick add items:</h3>
                {cartItems.map((item) => (
                  <div key={`${item.productId}-${item.variantId}`} className="cart-item">
                    <div className="item-image-container">
                      <img
                        src={item.image || 'https://via.placeholder.com/80'}
                        alt={item.name}
                        className="item-image"
                      />
                      <div className="quantity-control">
                        <button
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                        >
                          <FaMinus size={10} />
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                        >
                          <FaPlus size={10} />
                        </button>
                      </div>
                    </div>
                    <div className="item-info">
                      <h4 className="item-title">{item.name}</h4>
                      <p className="item-subtitle">{item.title}</p>
                      <div className="item-cart-price">
                        <div className="item-price">₹{item.price.toFixed(2)}</div>
                        {item.originalPrice > item.price && (
                          <div className="item-originalPrice">₹{item.originalPrice.toFixed(2)}</div>
                        )}
                      </div>
                      <div className="item-variant">Variant: {item.variantId || 'Default'}</div>
                      {item.discount > 0 && (
                        <div className="item-discount-badge">{item.discount}% OFF</div>
                      )}
                      <div
                        className="gift-wrap-option"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleGiftWrap(item.productId, item.variantId);
                        }}
                      >
                        <label className="gift-wrap-label">
                          <input
                            type="checkbox"
                            checked={giftWrapItems[`${item.productId}-${item.variantId}`] || false}
                            onChange={() => toggleGiftWrap(item.productId, item.variantId)}
                            onClick={(e) => e.stopPropagation()}
                          />
                          {giftWrapItems[`${item.productId}-${item.variantId}`] ? (
                            <span>Gift wrap added (₹{GIFT_WRAP_PRICE})</span>
                          ) : (
                            <span>Add gift wrap (₹{GIFT_WRAP_PRICE})</span>
                          )}
                        </label>
                      </div>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.productId, item.variantId)}
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="order-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Gift Wrap</span>
                  <span>₹{calculateGiftWrapTotal().toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>
                    {calculatePreShippingTotal() >= FREE_SHIPPING_THRESHOLD ? 'FREE' : '₹50.00'}
                  </span>
                </div>
                <div className="summary-row discount-row">
                  <div>
                    <span>Discount</span>
                    <span className="discount-percentage">({calculateDiscountPercentage()}% OFF)</span>
                  </div>
                  <span>-₹{calculateTotalDiscount().toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>₹{calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              <button className="checkout-btn" onClick={() => {handleCheckout(); onClose();}}>CHECKOUT</button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;