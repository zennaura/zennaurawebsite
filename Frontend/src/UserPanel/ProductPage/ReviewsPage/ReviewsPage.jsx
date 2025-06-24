import React from "react";
import { useState } from "react";
import "./ReviewsPage.css";
import ReviewFormModal from "./ReviewFormModal";
import { useParams } from "react-router-dom";

const ReviewsPage = ({ ProductId, VarientId ,product}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  console.log("Product Data:", product?.__v);
    console.log("Product Data:", product?._id);
    console.log("Product Data:", product);
    const { id } = useParams();
    const [productid, variantIndex] = id.split("-");
    console.log("Product Data:", id);
    
    // Get reviews from product prop
    const reviews = product?.reviews || [];
    console.log("reviews", reviews);
    
    return (
        <div div className="reviews-page">
            <div className="reviews-page-heading">
                <h1>Customers Reviews</h1>
            </div>
            <div className="reviews-page-container">
                <div className="reviews-page-summary">
                    <span className="total-reviews"><span className="reviews-star">★★★★★★ </span> 4.75 out of 5</span>
                    <span> Based on 47 reviews</span>
                </div>
                <div className="reviews-page-rating-bars">
                    <div className="reviews-page-stars1">
                        <span className="reviews-star">★★★★★</span>
                        <span className="reviews-page-processbar"></span>
                        12
                    </div>
                    <div className="reviews-page-stars2">
                        <span className="reviews-star">★★★★</span>★
                        <span className="reviews-page-processbar"></span>
                        12
                    </div>
                    <div className="reviews-page-stars3">
                        <span className="reviews-star">★★★</span>★★
                        <span className="reviews-page-processbar"></span>
                        12
                    </div>
                    <div className="reviews-page-stars4">
                        <span className="reviews-star">★★</span>★★★
                        <span className="reviews-page-processbar"></span>
                        12
                    </div>
                    <div className="reviews-page-stars5">
                        <span className="reviews-star">★</span>★★★★
                        <span className="reviews-page-processbar"></span>
                        12
                    </div>
                </div>
                <div className="reviews-page-add-review">
                    <button onClick={() => setIsModalOpen(true)}>Write a review</button>
                    <ReviewFormModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        productId={productid}  // Pass your product ID here
                        variantId={variantIndex}  // Pass your variant ID here
                    />
                </div>
            </div>
            
            <div className="reviews-page-media-section">
                <h2>Customer Photos and Videos</h2>
                <div className="reviews-page-video-images">
                    <div className="reviews-page-box-video-images"></div>
                    <div className="reviews-page-box-video-images"></div>
                    <div className="reviews-page-box-video-images"></div>
                </div>
            </div>
            <div className="reviews-page-card-wrapper">
                {reviews.length === 0 && (
                  <div className="reviews-page-card">
                    <div className="reviews-page-text">
                      <p>No reviews yet. Be the first to review this product!</p>
                    </div>
                  </div>
                )}
                {reviews.map((review, idx) => (
                  <div className="reviews-page-card" key={review._id || idx}>
                    <div className="reviews-page-card-header">
                      <span className="reviews-star">{'★'.repeat(review.rating || 5)}</span>
                      <span className="reviews-page-date">{review.date ? new Date(review.date).toLocaleDateString() : ''}</span>
                    </div>
                    <div className="reviews-page-user">
                      <img src={review.mediaUrls && review.mediaUrls[0] ? review.mediaUrls[0] : ''} alt="" className="reviews-page-user-image" />
                      <h2 className="reviews-page-user-name">{review.user || review.name}</h2>
                    </div>
                    <div className="reviews-page-text">
                      {/* <b>{review.title}</b> */}
                      <p>{review.comment || review.reviewText}</p>
                    </div>
                    {review.mediaUrls && review.mediaUrls.length > 0 && (
                      <div className="reviews-page-images">
                        {review.mediaUrls.map((url, i) => (
                          <img key={i} src={url} alt="review media" className="reviews-page-review-image" />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewsPage;
