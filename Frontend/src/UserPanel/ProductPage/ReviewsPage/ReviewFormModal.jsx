import React, { useState } from "react";
import "./ReviewFormModal.css";

const ReviewFormModal = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = () => {
    alert(`You rated ${rating} stars`);
    onClose();
  };

  return (
    <div className="review-modal-overlay">
      <div className="review-modal">
        <button className="review-modal-close" onClick={onClose}>←</button>
        <h2>Write a Review</h2>

        <div className="review-stars">
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <span
                key={index}
                className={`star-icon ${starValue <= (hover || rating) ? "filled" : ""}`}
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHover(starValue)}
                onMouseLeave={() => setHover(0)}
              >
                ★
              </span>
            );
          })}
        </div>

        <input type="text" placeholder="Give your review a title" maxLength="100" />
        <textarea placeholder="Write your reviews here"></textarea>

        <p>Picture/Video (optional)</p>
        <div className="review-upload-box">⬆️ Upload</div>

        <input type="text" placeholder="YouTube URL" />
        <input type="text" placeholder="Enter your name (public)" />
        <input type="email" placeholder="Enter your email (private)" />

        <p className="review-policy">
          How we use your data: We’ll contact you about the review you left, and only if necessary.
          By submitting your review, you agree to our terms, privacy, and content policies.
        </p>

        <div className="review-buttons">
          <button className="cancel-btn" onClick={onClose}>CANCEL REVIEW</button>
          <button className="submit-btn" onClick={handleSubmit}>SUBMIT REVIEW</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewFormModal;
