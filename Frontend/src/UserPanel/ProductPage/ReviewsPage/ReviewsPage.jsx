import React from "react";
import { useState } from "react";
import "./ReviewsPage.css";
import ReviewFormModal from "./ReviewFormModal";
import { useParams } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

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
    // Calculate average rating
    const averageRating = reviews.length > 0 ? (
      reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length
    ) : 0;
    // Count reviews by star
    const starCounts = [0, 0, 0, 0, 0]; // index 0: 5 stars, 1: 4 stars, ...
    reviews.forEach(r => {
      const rating = Math.round(r.rating || 0);
      if (rating >= 1 && rating <= 5) {
        starCounts[5 - rating] += 1;
      }
    });
    
    // Calculate percentages for each star bar
    const totalReviews = reviews.length;
    const starPercentages = starCounts.map(count => totalReviews > 0 ? (count / totalReviews) * 100 : 0);
    
    // Collect all mediaUrls from all reviews
    const allMediaUrls = reviews.flatMap(r => r.mediaUrls || []);
    
    return (
        <div div className="reviews-page">
            <div className="reviews-page-heading">
                <h1>Customers Reviews</h1>
            </div>
            <div className="reviews-page-container">
                <div className="reviews-page-summary">
                    <div className="total-reviews">
                      {/* Render full, half, and empty stars for averageRating */}
                      {Array.from({ length: Math.floor(averageRating) }).map((_, i) => (
                        <FaStar key={i} className="reviews-star" />
                      ))}
                      {averageRating % 1 >= 0.25 && averageRating % 1 < 0.75 && (
                        <FaStarHalfAlt className="reviews-star" />
                      )}
                      {averageRating % 1 >= 0.75 && (
                        <FaStar className="reviews-star" />
                      )}
                      {Array.from({ length: 5 - Math.ceil(averageRating) }).map((_, i) => (
                        <FaRegStar key={i} className="reviews-star" />
                      ))}
                      <p>{averageRating.toFixed(2)} out of 5</p>
                    </div>
                    <span> Based on {reviews?.length} reviews</span>
                </div>
                <div className="reviews-page-rating-bars">
                    <div className="reviews-page-stars1">
                        <span className="reviews-star">★★★★★</span>
                        <span className="reviews-page-processbar">
                            <span className="reviews-page-processbar-fill" style={{width: starPercentages[0] ? `${starPercentages[0]}%` : '1%'}}></span>
                        </span>
                        {starCounts[0]}
                    </div>
                    <div className="reviews-page-stars2">
                        <span className="reviews-star">★★★★</span>★
                        <span className="reviews-page-processbar">
                            <span className="reviews-page-processbar-fill" style={{width: starPercentages[1] ? `${starPercentages[1]}%` : '1%'}}></span>
                        </span>
                        {starCounts[1]}
                    </div>
                    <div className="reviews-page-stars3">
                        <span className="reviews-star">★★★</span>★★
                        <span className="reviews-page-processbar">
                            <span className="reviews-page-processbar-fill" style={{width: starPercentages[2] ? `${starPercentages[2]}%` : '1%'}}></span>
                        </span>
                        {starCounts[2]}
                    </div>
                    <div className="reviews-page-stars4">
                        <span className="reviews-star">★★</span>★★★
                        <span className="reviews-page-processbar">
                            <span className="reviews-page-processbar-fill" style={{width: starPercentages[3] ? `${starPercentages[3]}%` : '1%'}}></span>
                        </span>
                        {starCounts[3]}
                    </div>
                    <div className="reviews-page-stars5">
                        <span className="reviews-star">★</span>★★★★
                        <span className="reviews-page-processbar">
                            <span className="reviews-page-processbar-fill" style={{width: starPercentages[4] ? `${starPercentages[4]}%` : '1%'}}></span>
                        </span>
                        {starCounts[4]}
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
                    {allMediaUrls.length === 0 && (
                        <div className="reviews-page-box-video-images">No media yet</div>
                    )}
                    {allMediaUrls.map((url, idx) => (
                        url.match(/\.(mp4|webm|ogg)$/i) ? (
                            <video key={idx} src={url} controls className="reviews-page-box-video-images" />
                        ) : (
                            <img key={idx} src={url} alt="review media" className="reviews-page-box-video-images" />
                        )
                    ))}
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
