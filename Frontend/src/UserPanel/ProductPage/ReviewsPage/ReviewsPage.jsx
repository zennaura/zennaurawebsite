import React from "react";
import { useState } from "react";
import "./ReviewsPage.css";
import ReviewFormModal from "./ReviewFormModal";

const ReviewsPage = ({ ProductId, VarientId ,product}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  console.log("Product Data:", product?.__v);
    console.log("Product Data:", product?._id);

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
                        productId={ProductId}  // Pass your product ID here
                        variantId={VarientId}  // Pass your variant ID here
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
                <div className="reviews-page-card">
                    <div className="reviews-page-card-header">
                        <span> ★★★★★★</span>
                        <span className="reviews-page-date">12/12/2004</span>
                    </div>
                    <div className="reviews-page-user">
                        <img src="" alt="" className="reviews-page-user-image" />
                        <h2 className="reviews-page-user-name">sherr singh</h2>
                    </div>
                    <div className="reviews-page-text">
                        <p>I love it! Beautiful design and great build quality. I’ve already recommended it to my friends.</p>

                    </div>
                    <div className="reviews-page-images">
                        <img src="" alt="" className="reviews-page-review-image" />
                    </div>
                </div>
                <div className="reviews-page-card">
                    <div className="reviews-page-card-header">
                        <span> ★★★★★★</span>
                        <span className="reviews-page-date">12/12/2004</span>
                    </div>
                    <div className="reviews-page-user">
                        <img src="" alt="" className="reviews-page-user-image" />
                        <h2 className="reviews-page-user-name">sherr singh</h2>
                    </div>
                    <div className="reviews-page-text">
                        <p>I love it! Beautiful design and great build quality. I’ve already recommended it to my friends.</p>

                    </div>

                </div>
                <div className="reviews-page-card">
                    <div className="reviews-page-card-header">
                        <span> ★★★★★★</span>
                        <span className="reviews-page-date">12/12/2004</span>
                    </div>
                    <div className="reviews-page-user">
                        <img src="" alt="" className="reviews-page-user-image" />
                        <h2 className="reviews-page-user-name">sherr singh</h2>
                    </div>
                    <div className="reviews-page-text">
                        <p>I love it! Beautiful design and great build quality. I’ve already recommended it to my friends.</p>
                        <p>I love it! Beautiful design and great build quality. I’ve already recommended it to my friends.</p>


                    </div>
                </div>
                <div className="reviews-page-card">
                    <div className="reviews-page-card-header">
                        <span> ★★★★★★</span>
                        <span className="reviews-page-date">12/12/2004</span>
                    </div>
                    <div className="reviews-page-user">
                        <img src="" alt="" className="reviews-page-user-image" />
                        <h2 className="reviews-page-user-name">sherr singh</h2>
                    </div>
                    <div className="reviews-page-text">
                        <p>I love it! Beautiful design and great build quality. I’ve already recommended it to my friends.</p>
                    </div>
                    <div className="reviews-page-images">
                        <img src="" alt="" className="reviews-page-review-image" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewsPage;
